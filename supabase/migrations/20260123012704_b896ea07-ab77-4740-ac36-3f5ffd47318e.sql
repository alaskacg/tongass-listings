-- Create app role enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table (roles stored separately for security)
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    UNIQUE (user_id, role)
);

-- Create profiles table
CREATE TABLE public.profiles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    email text NOT NULL,
    full_name text,
    avatar_url text,
    phone text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Create listings table
CREATE TABLE public.listings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title text NOT NULL,
    description text,
    price numeric NOT NULL,
    category text NOT NULL,
    region text NOT NULL,
    images text[] DEFAULT '{}',
    contact_email text,
    contact_phone text,
    status text DEFAULT 'pending' NOT NULL CHECK (status IN ('pending', 'active', 'expired', 'deleted')),
    payment_status text DEFAULT 'unpaid' NOT NULL CHECK (payment_status IN ('unpaid', 'paid', 'refunded')),
    expires_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Create payments table
CREATE TABLE public.payments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    listing_id uuid REFERENCES public.listings(id) ON DELETE SET NULL,
    amount numeric NOT NULL,
    status text DEFAULT 'pending' NOT NULL CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    stripe_payment_intent_id text,
    stripe_session_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Create site_settings table with setting_type for security
CREATE TABLE public.site_settings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    setting_key text NOT NULL UNIQUE,
    setting_value text,
    setting_type text DEFAULT 'public' NOT NULL CHECK (setting_type IN ('public', 'secret')),
    updated_by uuid REFERENCES auth.users(id),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (user_id, email, full_name)
    VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create update triggers
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_listings_updated_at
    BEFORE UPDATE ON public.listings
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_payments_updated_at
    BEFORE UPDATE ON public.payments
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
    BEFORE UPDATE ON public.site_settings
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable RLS on all tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- USER_ROLES policies
CREATE POLICY "Users can view their own roles"
    ON public.user_roles FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
    ON public.user_roles FOR SELECT
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
    ON public.user_roles FOR ALL
    USING (public.has_role(auth.uid(), 'admin'));

-- PROFILES policies
CREATE POLICY "Users can view their own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all profiles"
    ON public.profiles FOR SELECT
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage all profiles"
    ON public.profiles FOR ALL
    USING (public.has_role(auth.uid(), 'admin'));

-- LISTINGS policies
CREATE POLICY "Anyone can view active paid listings"
    ON public.listings FOR SELECT
    USING (status = 'active' AND payment_status = 'paid');

CREATE POLICY "Users can view their own listings"
    ON public.listings FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create listings"
    ON public.listings FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own listings"
    ON public.listings FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own listings"
    ON public.listings FOR DELETE
    USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all listings"
    ON public.listings FOR SELECT
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage all listings"
    ON public.listings FOR ALL
    USING (public.has_role(auth.uid(), 'admin'));

-- PAYMENTS policies
CREATE POLICY "Users can view their own payments"
    ON public.payments FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create payments"
    ON public.payments FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all payments"
    ON public.payments FOR SELECT
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage all payments"
    ON public.payments FOR ALL
    USING (public.has_role(auth.uid(), 'admin'));

-- SITE_SETTINGS policies (secure - non-secret only for public)
CREATE POLICY "Public can read non-secret settings"
    ON public.site_settings FOR SELECT
    USING (setting_type IS DISTINCT FROM 'secret');

CREATE POLICY "Admins can read all settings"
    ON public.site_settings FOR SELECT
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage settings"
    ON public.site_settings FOR ALL
    USING (public.has_role(auth.uid(), 'admin'));

-- Create storage bucket for listing images
INSERT INTO storage.buckets (id, name, public) VALUES ('listing-images', 'listing-images', true);

-- Storage policies for listing images
CREATE POLICY "Anyone can view listing images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'listing-images');

CREATE POLICY "Authenticated users can upload listing images"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'listing-images' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own listing images"
    ON storage.objects FOR UPDATE
    USING (bucket_id = 'listing-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own listing images"
    ON storage.objects FOR DELETE
    USING (bucket_id = 'listing-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Insert default site settings
INSERT INTO public.site_settings (setting_key, setting_value, setting_type) VALUES
    ('listing_price', '10', 'public'),
    ('beta_mode', 'true', 'public'),
    ('site_name', 'Tongass Listings', 'public'),
    ('stripe_publishable_key', '', 'public'),
    ('stripe_secret_key', '', 'secret'),
    ('stripe_webhook_secret', '', 'secret');