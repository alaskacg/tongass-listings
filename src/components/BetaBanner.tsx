import { Sparkles, Gift, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BetaBanner = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-forest-moss via-forest-emerald to-forest-moss border-b border-forest-gold/30">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-forest-gold/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative container mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 text-center">
          {/* Beta badge */}
          <motion.div
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-forest-gold/20 border border-forest-gold/40"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4 text-forest-gold" />
            <span className="text-xs font-bold text-forest-gold uppercase tracking-wider">
              Beta Launch
            </span>
          </motion.div>

          {/* Main message */}
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-forest-light" />
              <span className="text-sm md:text-base font-semibold text-forest-light">
                FREE 60-Day Listings for Verified Users!
              </span>
            </div>
            <div className="hidden md:block w-px h-4 bg-forest-gold/40" />
            <span className="text-xs md:text-sm text-forest-light/80">
              Listings stay active even after beta ends
            </span>
          </div>

          {/* CTA */}
          <Link
            to="/post-listing"
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-gold text-forest-deep font-semibold text-sm hover:bg-forest-gold/90 transition-colors"
          >
            Post Free Now
            <CheckCircle className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BetaBanner;
