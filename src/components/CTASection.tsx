import { Sparkles, Clock, CheckCircle, Gift, Shield, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CTASection = () => {
  const benefits = [
    { icon: Clock, text: "60 Days Active" },
    { icon: Shield, text: "Email Verified" },
    { icon: Star, text: "5 Photos Included" },
  ];

  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-forest-deep via-forest-pine to-forest-moss" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-forest-gold/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-forest-emerald/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-forest-gold/10 rounded-full blur-3xl" />

      <div className="relative container mx-auto px-4 text-center">
        {/* Main heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-3xl md:text-5xl font-bold text-forest-light mb-4"
        >
          List for just{" "}
          <span className="text-forest-gold">$10</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-forest-light/80 max-w-2xl mx-auto mb-8"
        >
          Verified users can post{" "}
          <strong className="text-forest-gold">60-day listings</strong>{" "}
          across our Alaska network with up to 5 photos included.
        </motion.p>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10"
        >
          {benefits.map((benefit, index) => (
            <div
              key={benefit.text}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-forest-light/10 border border-forest-light/20"
            >
              <benefit.icon className="w-4 h-4 text-forest-gold" />
              <span className="text-sm text-forest-light">{benefit.text}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Link
            to="/post-listing"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-forest-gold text-forest-deep font-bold text-lg md:text-xl hover:bg-forest-gold/90 transition-all shadow-2xl shadow-forest-gold/30 hover:shadow-forest-gold/50 hover:-translate-y-1"
          >
            <Sparkles className="w-6 h-6" />
            Post Your Listing Now
            <CheckCircle className="w-6 h-6" />
          </Link>
        </motion.div>

        {/* Urgency note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-sm text-forest-light/60"
        >
          ⏰ 60-day listings • Up to 5 photos • Instant activation
        </motion.p>
      </div>
    </section>
  );
};

export default CTASection;
