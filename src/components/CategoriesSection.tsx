import { 
  Car, 
  Ship, 
  Home, 
  TreePine, 
  Building, 
  Pickaxe, 
  Compass, 
  Mountain,
  ArrowRight,
  Sparkles,
  Package
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  {
    title: "Vehicles & Autos",
    description: "Cars, trucks, ATVs, snowmachines",
    icon: Car,
    href: "/browse?category=vehicles",
    color: "from-blue-500/20 to-blue-600/10",
  },
  {
    title: "Boats & Watercraft",
    description: "Fishing boats, kayaks, skiffs",
    icon: Ship,
    href: "/browse?category=boats",
    color: "from-cyan-500/20 to-cyan-600/10",
  },
  {
    title: "Homes for Sale",
    description: "Houses, cabins, condos",
    icon: Home,
    href: "/browse?category=homes",
    color: "from-green-500/20 to-green-600/10",
  },
  {
    title: "Land & Lots",
    description: "Acreage, waterfront, remote",
    icon: TreePine,
    href: "/browse?category=land",
    color: "from-amber-500/20 to-amber-600/10",
  },
  {
    title: "Rentals",
    description: "Long-term and vacation",
    icon: Building,
    href: "/browse?category=rentals",
    color: "from-purple-500/20 to-purple-600/10",
  },
  {
    title: "Mining Equipment",
    description: "Dredges, sluices, prospecting",
    icon: Pickaxe,
    href: "/browse?category=mining",
    color: "from-yellow-500/20 to-yellow-600/10",
  },
  {
    title: "Guide Services",
    description: "Fishing, hunting, adventure",
    icon: Compass,
    href: "/browse?category=guides",
    color: "from-emerald-500/20 to-emerald-600/10",
  },
  {
    title: "Excavation",
    description: "Heavy equipment, dozers",
    icon: Mountain,
    href: "/browse?category=excavation",
    color: "from-orange-500/20 to-orange-600/10",
  },
];

const CategoriesSection = () => {
  return (
    <section className="py-16 md:py-20 bg-card">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-4"
          >
            <Package className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">What Are You Selling?</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3"
          >
            Browse by Category
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Find what you're looking for or list your items in our specialized categories
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={category.href}
                className="group relative block bg-background border border-border/50 rounded-xl p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 h-full overflow-hidden"
              >
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity`} />

                {/* Content */}
                <div className="relative">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <category.icon className="w-6 h-6 text-primary" />
                  </div>

                  <h3 className="font-display text-sm md:text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">{category.description}</p>

                  {/* Arrow */}
                  <ArrowRight className="absolute top-0 right-0 w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all transform group-hover:translate-x-1" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Free listing banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12"
        >
          <div className="relative overflow-hidden bg-gradient-to-r from-forest-deep via-forest-pine to-forest-deep rounded-2xl p-8 border border-forest-gold/30">
            {/* Animated sparkles */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                >
                  <Sparkles className="w-4 h-4 text-forest-gold/50" />
                </motion.div>
              ))}
            </div>

            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-gold/20 border border-forest-gold/40 mb-3">
                  <Sparkles className="w-3 h-3 text-forest-gold" />
                  <span className="text-xs font-bold text-forest-gold uppercase">Post Now</span>
                </div>
                <h3 className="font-display text-xl md:text-2xl font-bold text-forest-light mb-2">
                  Post Your Listing Today!
                </h3>
                <p className="text-forest-light/80 text-sm max-w-md">
                  Verified users get 60-day listings across our Alaska network with up to 5 photos included.
                </p>
              </div>
              <Link
                to="/post-listing"
                className="flex-shrink-0 px-8 py-4 rounded-xl bg-forest-gold text-forest-deep font-bold text-lg hover:bg-forest-gold/90 transition-colors shadow-lg shadow-forest-gold/30"
              >
                Post a Listing →
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesSection;
