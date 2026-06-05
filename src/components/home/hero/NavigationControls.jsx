import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const NavigationControls = ({ onPrev, onNext }) => {
  return (
    <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full max-w-[320px] md:max-w-[600px] lg:max-w-[640px] z-[60] flex justify-between items-center pointer-events-none px-2">
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onPrev}
        className="w-12 h-12 md:w-14 md:h-14 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-white/50 text-gray-800 hover:text-[var(--color-primary-green)] hover:bg-white transition-colors pointer-events-auto"
      >
        <ArrowLeft size={24} />
      </motion.button>
      
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onNext}
        className="w-12 h-12 md:w-14 md:h-14 bg-white/80 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-white/50 text-gray-800 hover:text-[var(--color-primary-green)] hover:bg-white transition-colors pointer-events-auto"
      >
        <ArrowRight size={24} />
      </motion.button>
    </div>
  );
};

export default NavigationControls;
