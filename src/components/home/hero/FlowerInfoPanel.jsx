import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star } from 'lucide-react';

const FlowerInfoPanel = ({ product }) => {
  return (
    <div className="absolute right-0 bottom-10 md:bottom-20 z-50 w-full md:w-80 px-4 md:px-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white"
        >
          <div className="flex flex-col items-start mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[var(--color-primary-green)]">
              {product.category}
            </span>
            <h3 className="text-2xl font-heading font-bold text-gray-900 leading-tight mt-1">
              {product.name}
            </h3>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FlowerInfoPanel;
