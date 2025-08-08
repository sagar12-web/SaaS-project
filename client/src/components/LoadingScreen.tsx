import React from 'react';
import { motion } from 'framer-motion';
import { Loader2, Sparkles, Zap, Star } from 'lucide-react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 aurora-bg opacity-30" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-aurora-green to-aurora-blue rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 text-center">
        {/* Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <h1 className="text-6xl font-bold gradient-text mb-4">
            Revolution
          </h1>
          <p className="text-xl text-gray-300 font-light">
            Where tasks feel alive
          </p>
        </motion.div>

        {/* Loading Spinner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative mb-8"
        >
          <div className="relative">
            {/* Outer Ring */}
            <motion.div
              className="w-24 h-24 border-4 border-glass-primary rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Inner Ring */}
            <motion.div
              className="absolute inset-2 w-20 h-20 border-4 border-aurora-green rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Center Icon */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="w-8 h-8 text-aurora-yellow" />
            </motion.div>
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-4"
        >
          <motion.p
            className="text-lg text-gray-300"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Orchestrating your digital symphony...
          </motion.p>
          
          {/* Loading Dots */}
          <div className="flex justify-center space-x-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-aurora-pink rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Floating Icons */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4"
            animate={{ y: [0, -20, 0], rotate: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Sparkles className="w-6 h-6 text-aurora-blue" />
          </motion.div>
          
          <motion.div
            className="absolute top-1/3 right-1/4"
            animate={{ y: [0, 20, 0], rotate: [0, -360] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          >
            <Star className="w-5 h-5 text-aurora-green" />
          </motion.div>
          
          <motion.div
            className="absolute bottom-1/4 left-1/3"
            animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
          >
            <Zap className="w-4 h-4 text-aurora-purple" />
          </motion.div>
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-64"
      >
        <div className="w-full bg-glass-dark rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-aurora-green to-aurora-blue h-2 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
        </div>
        <motion.p
          className="text-center text-sm text-gray-400 mt-2"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Preparing your workspace...
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoadingScreen; 