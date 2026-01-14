import { MapPin, ArrowRight, Anchor, Mountain, Ship, Trees, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const regions = [
  {
    name: "Juneau",
    description: "Alaska's Capital City",
    icon: Mountain,
    href: "/browse?region=juneau",
    highlight: "State capital & cruise destination",
  },
  {
    name: "Ketchikan",
    description: "First City of Alaska",
    icon: Ship,
    href: "/browse?region=ketchikan",
    highlight: "Fishing capital & totem poles",
  },
  {
    name: "Sitka",
    description: "Historical Russian Heritage",
    icon: Anchor,
    href: "/browse?region=sitka",
    highlight: "Rich cultural history",
  },
  {
    name: "Petersburg",
    description: "Little Norway",
    icon: Ship,
    href: "/browse?region=petersburg",
    highlight: "Commercial fishing hub",
  },
  {
    name: "Wrangell",
    description: "Gateway to the Stikine",
    icon: Trees,
    href: "/browse?region=wrangell",
    highlight: "Outdoor adventure base",
  },
  {
    name: "Haines",
    description: "Valley of the Eagles",
    icon: Mountain,
    href: "/browse?region=haines",
    highlight: "Bald eagle preserve",
  },
];

const RegionsSection = () => {
  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4"
          >
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Tongass Communities</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3"
          >
            Browse by Region
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Find listings in your Southeast Alaska community
          </motion.p>
        </div>

        {/* Regions Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {regions.map((region, index) => (
            <motion.div
              key={region.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={region.href}
                className="group relative block bg-card border border-border/50 rounded-xl p-5 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 h-full"
              >
                {/* Icon */}
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                  <region.icon className="w-5 h-5 text-primary" />
                </div>

                {/* Content */}
                <h3 className="font-display text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {region.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-2">{region.description}</p>
                <p className="text-xs text-primary/70 italic">{region.highlight}</p>

                {/* Arrow */}
                <ArrowRight className="absolute bottom-4 right-4 w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all transform group-hover:translate-x-1" />

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Free listing CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-forest-gold/10 border border-forest-gold/30">
            <Sparkles className="w-4 h-4 text-forest-gold" />
            <span className="text-sm text-foreground">
              <strong className="text-forest-gold">Beta Special:</strong> Post FREE listings in any region!
            </span>
            <Link
              to="/post-listing"
              className="text-sm font-semibold text-forest-gold hover:underline"
            >
              Get Started →
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RegionsSection;
