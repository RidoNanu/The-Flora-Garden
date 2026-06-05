import React from 'react';
import { motion } from 'framer-motion';

const FlowerCard = ({ product, isActive, angle, radius }) => {
  // Convert angle (degrees) to radians
  const radian = (angle * Math.PI) / 180;
  
  // Calculate X and Y position on the circle
  const x = Math.cos(radian) * radius;
  const y = Math.sin(radian) * radius;

  return (
    <motion.div
      initial={false}
      animate={{
        x,
        y,
        scale: isActive ? 1.6 : 0.6,
        opacity: isActive ? 1 : 0.7,
        zIndex: isActive ? 40 : 10,
        filter: isActive ? 'blur(0px)' : 'blur(2px)'
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 70, 
        damping: 15,
        mass: 0.8
      }}
      className="absolute top-1/2 left-1/2 -ml-20 -mt-20 w-40 h-40 rounded-full overflow-hidden shadow-2xl cursor-pointer bg-white flex items-center justify-center border-4 border-white/80"
    >
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-full object-cover"
        draggable="false"
      />
    </motion.div>
  );
};

export default FlowerCard;
