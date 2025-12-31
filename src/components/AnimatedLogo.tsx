import { motion } from "framer-motion";

const AnimatedLogo = () => {
  return (
    <div className="relative w-10 h-10 flex items-center justify-center">
      {/* Outer ring with glow */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-br from-forest-emerald via-forest-fern to-forest-gold opacity-80"
        animate={{
          boxShadow: [
            "0 0 10px hsl(145 60% 35% / 0.4), 0 0 20px hsl(45 93% 58% / 0.2)",
            "0 0 20px hsl(145 60% 35% / 0.6), 0 0 40px hsl(45 93% 58% / 0.3)",
            "0 0 10px hsl(145 60% 35% / 0.4), 0 0 20px hsl(45 93% 58% / 0.2)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Inner dark background */}
      <div className="absolute inset-[2px] rounded-[10px] bg-background" />
      
      {/* Tree/Forest Icon - animated */}
      <svg
        viewBox="0 0 24 24"
        className="relative w-5 h-5 z-10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Main tree - animated growth */}
        <motion.path
          d="M12 22V8"
          className="text-forest-gold"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        <motion.path
          d="M12 8L8 4L12 2L16 4L12 8Z"
          className="text-primary"
          fill="hsl(var(--primary))"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        />
        {/* Left branch */}
        <motion.path
          d="M9 11L12 14"
          className="text-forest-fern"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        />
        {/* Right branch */}
        <motion.path
          d="M15 11L12 14"
          className="text-forest-fern"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        />
        {/* Lower left branch */}
        <motion.path
          d="M8 16L12 19"
          className="text-forest-moss"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        />
        {/* Lower right branch */}
        <motion.path
          d="M16 16L12 19"
          className="text-forest-moss"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 1.4 }}
        />
      </svg>
      
      {/* Sparkle effects */}
      <motion.div
        className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-forest-gold"
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 0.5,
        }}
      />
      <motion.div
        className="absolute -bottom-1 -left-1 w-1.5 h-1.5 rounded-full bg-primary"
        animate={{
          scale: [0, 1, 0],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay: 1.5,
        }}
      />
    </div>
  );
};

export default AnimatedLogo;