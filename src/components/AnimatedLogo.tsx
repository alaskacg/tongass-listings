import { motion } from "framer-motion";

const AnimatedLogo = () => {
  return (
    <div className="relative w-12 h-10 flex items-center justify-center overflow-hidden">
      {/* Background glow */}
      <motion.div
        className="absolute inset-0 rounded-lg bg-gradient-to-t from-forest-deep/40 to-transparent"
        animate={{
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Forest trees silhouette */}
      <svg
        viewBox="0 0 48 32"
        className="relative w-full h-full z-10"
        fill="none"
      >
        {/* Back tree - left */}
        <motion.path
          d="M8 28 L8 18 L4 18 L10 8 L6 8 L12 2 L18 8 L14 8 L20 18 L16 18 L16 28"
          fill="hsl(var(--forest-moss))"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
        />
        
        {/* Back tree - right */}
        <motion.path
          d="M32 28 L32 20 L28 20 L34 10 L30 10 L36 4 L42 10 L38 10 L44 20 L40 20 L40 28"
          fill="hsl(var(--forest-moss))"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />
        
        {/* Main center tree */}
        <motion.path
          d="M18 28 L18 22 L13 22 L20 12 L15 12 L24 3 L33 12 L28 12 L35 22 L30 22 L30 28"
          fill="hsl(var(--primary))"
          initial={{ opacity: 0.9 }}
          animate={{ opacity: [0.85, 1, 0.85] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        {/* Tree detail highlights */}
        <motion.path
          d="M24 3 L24 8"
          stroke="hsl(var(--forest-gold))"
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
        />
      </svg>
      
      {/* Fog layer 1 - bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-muted/80 via-muted/40 to-transparent rounded-b-lg"
        initial={{ opacity: 0.3, x: -5 }}
        animate={{ 
          opacity: [0.3, 0.6, 0.3],
          x: [-5, 5, -5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Fog layer 2 - middle */}
      <motion.div
        className="absolute bottom-2 left-0 right-0 h-3 bg-gradient-to-t from-muted/50 via-muted/20 to-transparent"
        initial={{ opacity: 0.2, x: 3 }}
        animate={{ 
          opacity: [0.2, 0.5, 0.2],
          x: [3, -3, 3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      
      {/* Fog layer 3 - wispy top */}
      <motion.div
        className="absolute bottom-4 left-1 right-1 h-2 bg-gradient-to-r from-transparent via-muted/30 to-transparent rounded-full"
        initial={{ opacity: 0, x: -8 }}
        animate={{ 
          opacity: [0, 0.4, 0],
          x: [-8, 8, -8],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      
      {/* Fog wisps - floating particles */}
      <motion.div
        className="absolute bottom-3 left-2 w-1 h-1 rounded-full bg-muted/40"
        animate={{ 
          y: [-2, -6, -2],
          opacity: [0, 0.6, 0],
          x: [0, 3, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />
      <motion.div
        className="absolute bottom-2 right-3 w-0.5 h-0.5 rounded-full bg-muted/50"
        animate={{ 
          y: [-1, -5, -1],
          opacity: [0, 0.5, 0],
          x: [0, -2, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeOut",
          delay: 1.5,
        }}
      />
    </div>
  );
};

export default AnimatedLogo;
