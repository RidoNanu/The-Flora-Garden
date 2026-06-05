import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavigationControls from './NavigationControls';

const FlowerWheel = ({ products, activeIndex, setActiveIndex }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const numItems = products.length;
  const radius = windowWidth < 768 ? 140 : 260; // Responsive radius

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % numItems);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + numItems) % numItems);
  };

  return (
    <div className="relative w-full h-[450px] md:h-[600px] flex items-center justify-center">
      
      {/* Huge Background Typography */}
      <div className="absolute top-[-40px] left-0 w-full flex justify-center pointer-events-none z-0 overflow-visible lg:hidden">
        <h2 className="text-[6.5rem] leading-[0.85] font-heading font-extrabold text-[var(--color-primary-green)] text-center uppercase tracking-tighter select-none">
          THE FLORA<br />GARDEN
        </h2>
      </div>

      {/* Background soft circle */}
      <div className="absolute inset-0 m-auto w-[280px] h-[280px] md:w-[520px] md:h-[520px] rounded-full border border-gray-200/50 bg-white/20 backdrop-blur-3xl shadow-2xl shadow-[var(--color-soft-sage)]/20 pointer-events-none z-10"></div>
      
      {/* Navigation Controls */}
      <NavigationControls onPrev={handlePrev} onNext={handleNext} />

      {/* The Flowers */}
      <div className="relative w-full h-full flex items-center justify-center">
        {products.map((product, index) => {
          const isActive = index === activeIndex;
          
          // Calculate logical position on the wheel
          // We want the non-active items to be evenly spaced around the circle.
          // There are numItems - 1 items on the circumference.
          
          let angle = 0;
          let x = 0;
          let y = 0;
          let scale = 1;
          let zIndex = 10;
          let opacity = 1;

          if (isActive) {
            // Active item sits perfectly in the center
            x = 0;
            y = 0;
            scale = windowWidth < 768 ? 1.5 : 2.2;
            zIndex = 50;
            opacity = 1;
          } else {
            // Find distance from active index to determine position on the circle
            let offset = index - activeIndex;
            if (offset < 0) offset += numItems;
            
            // We have numItems elements. 1 is in center. numItems - 1 are on the circle.
            const itemsOnCircle = numItems - 1;
            const anglePerItem = 360 / itemsOnCircle;
            
            // offset is 1 for the first inactive item. Subtract 1 so it starts at 0 degrees relative to top.
            angle = ((offset - 1) * anglePerItem) - 90; // -90 starts at top
            
            const radian = (angle * Math.PI) / 180;
            x = Math.cos(radian) * radius;
            y = Math.sin(radian) * radius;
            scale = windowWidth < 768 ? 0.4 : 0.45;
            zIndex = 10;
            opacity = 0.6;
          }

          return (
            <motion.div
              key={product.id}
              onClick={() => setActiveIndex(index)}
              initial={false}
              animate={{ x, y, scale, zIndex, opacity }}
              transition={{
                type: 'spring',
                stiffness: 60,
                damping: 14,
                mass: 0.8
              }}
              className={`absolute m-auto w-32 h-32 md:w-44 md:h-44 rounded-full overflow-hidden shadow-xl bg-white border-4 border-white/80 flex items-center justify-center ${isActive ? 'cursor-default' : 'cursor-pointer hover:border-[var(--color-primary-green)]/50'}`}
              style={{
                transformOrigin: 'center center'
              }}
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
                draggable="false"
              />
            </motion.div>
          );
        })}
      </div>

    </div>
  );
};

export default FlowerWheel;
