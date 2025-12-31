import { motion } from "framer-motion";
import { Newspaper, ArrowRight, Zap, Globe } from "lucide-react";

const TongassNewsAd = () => {
  return (
    <motion.a
      href="https://tongassnews.com"
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block w-full overflow-hidden rounded-2xl bg-gradient-to-br from-forest-deep via-forest-moss/80 to-forest-deep border border-primary/20 p-6 md:p-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.01 }}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-forest-gold/30"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.2, 0.6, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Glowing accent line */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-forest-gold to-transparent"
        animate={{
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content container */}
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
        {/* Left - Icon section */}
        <div className="flex-shrink-0">
          <motion.div
            className="relative w-20 h-20 flex items-center justify-center"
            animate={{
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {/* Outer ring */}
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-forest-gold/40"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Inner glow */}
            <div className="absolute inset-2 rounded-xl bg-gradient-to-br from-forest-gold/20 to-primary/20" />
            {/* Icon */}
            <Newspaper className="relative w-10 h-10 text-forest-gold" />
            
            {/* Pulse effect */}
            <motion.div
              className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center rounded-full bg-forest-gold"
              animate={{
                scale: [1, 1.2, 1],
                boxShadow: [
                  "0 0 0 0 hsl(45 93% 58% / 0.4)",
                  "0 0 0 8px hsl(45 93% 58% / 0)",
                  "0 0 0 0 hsl(45 93% 58% / 0.4)",
                ],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Zap className="w-2.5 h-2.5 text-forest-deep" />
            </motion.div>
          </motion.div>
        </div>

        {/* Center - Text content */}
        <div className="flex-1 text-center md:text-left">
          <motion.div
            className="flex items-center justify-center md:justify-start gap-2 mb-2"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-forest-gold">
              Coming Soon
            </span>
            <motion.span
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-forest-gold/20 text-forest-gold text-xs"
              animate={{
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            >
              <Globe className="w-3 h-3" />
              NEW
            </motion.span>
          </motion.div>
          
          <motion.h3
            className="text-2xl md:text-3xl font-bold text-foreground mb-2 font-display"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Tongass News
          </motion.h3>
          
          <motion.p
            className="text-muted-foreground text-sm md:text-base max-w-md"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            Your source for Southeast Alaska news, stories, and community updates from the heart of the Tongass.
          </motion.p>
        </div>

        {/* Right - CTA */}
        <motion.div
          className="flex-shrink-0"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-forest-gold to-forest-gold/80 text-forest-deep font-semibold shadow-lg shadow-forest-gold/20 group-hover:shadow-forest-gold/40 transition-shadow">
            <span>Visit Site</span>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom fog effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-forest-deep/60 to-transparent"
        animate={{
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.a>
  );
};

export default TongassNewsAd;
