import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

const ECOSYSTEM_HUB_URL = 'https://jneflbektcqalwhgfuyo.supabase.co/functions/v1/ecosystem-listings'

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Get the authorization header to verify the user
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Verify the JWT and get user
    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)
    
    if (authError || !user) {
      console.error('Auth error:', authError)
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const body = await req.json()
    const { listing_id } = body

    if (!listing_id) {
      return new Response(
        JSON.stringify({ error: 'listing_id is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Fetch the full listing data
    const { data: listing, error: listingError } = await supabase
      .from('listings')
      .select('*')
      .eq('id', listing_id)
      .eq('user_id', user.id)
      .single()

    if (listingError || !listing) {
      console.error('Listing fetch error:', listingError)
      return new Response(
        JSON.stringify({ error: 'Listing not found or unauthorized' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Only sync active, paid listings
    if (listing.status !== 'active' || listing.payment_status !== 'paid') {
      console.log('Skipping sync - listing not active/paid:', { status: listing.status, payment_status: listing.payment_status })
      return new Response(
        JSON.stringify({ success: true, synced: false, reason: 'Listing not active or paid' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Prepare ecosystem payload
    const ecosystemPayload = {
      source_site: 'tongass-listings',
      source_id: listing.id,
      title: listing.title,
      description: listing.description,
      price: listing.price,
      category: listing.category,
      region: listing.region,
      images: listing.images || [],
      contact_name: listing.contact_name,
      contact_email: listing.contact_email,
      contact_phone: listing.contact_phone,
      expires_at: listing.expires_at,
      created_at: listing.created_at,
    }

    console.log('Syncing listing to ecosystem hub:', listing.id)

    // Forward to ecosystem hub
    const ecosystemResponse = await fetch(ECOSYSTEM_HUB_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ecosystemPayload),
    })

    if (!ecosystemResponse.ok) {
      const errorText = await ecosystemResponse.text()
      console.error('Ecosystem hub error:', ecosystemResponse.status, errorText)
      // Don't fail the request if ecosystem sync fails - it's not critical
      return new Response(
        JSON.stringify({ success: true, synced: false, reason: 'Ecosystem hub unavailable' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const ecosystemResult = await ecosystemResponse.json()
    console.log('Ecosystem sync successful:', ecosystemResult)

    return new Response(
      JSON.stringify({ success: true, synced: true, ecosystem_response: ecosystemResult }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error: unknown) {
    console.error('Sync ecosystem error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
