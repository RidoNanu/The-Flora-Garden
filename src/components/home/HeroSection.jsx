import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import Button from '../common/Button';
import { Link } from 'react-router-dom';
import productsData from '../../data/products.json';
import FlowerWheel from './hero/FlowerWheel';

const HeroSection = () => {
  // Grab 7 featured indoor plants for the wheel (6 on circle, 1 in center)
  const featuredProducts = productsData.filter(p => p.category === 'Indoor Plants').slice(0, 7);
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % featuredProducts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredProducts.length]);

  return (
    <section className="relative pt-28 lg:pt-32 pb-20 bg-[#FDFCF8] overflow-hidden">

      {/* Background Decorative Illustrations */}
      <div className="absolute top-0 right-0 w-full h-full opacity-30 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-bl from-[#E8F3EA] to-transparent blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-tr from-[#FFF0F0] to-transparent blur-3xl"></div>
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-10 relative z-10 flex flex-col-reverse lg:flex-row justify-between items-start">
        
        {/* LEFT SIDE: Content & Typography */}
        <div className="w-full lg:w-[55%] flex flex-col text-center lg:text-left mb-16 lg:mb-0 lg:pt-0 lg:pr-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-[var(--color-soft-sage)] px-4 py-1.5 rounded-full mb-6 mx-auto lg:mx-0 shadow-sm">
              <span className="text-[var(--color-primary-green)]">🌸</span>
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--color-primary-green)]">Premium Floral Collection</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-heading font-extrabold text-gray-900 leading-[1.1] mb-6 tracking-tight">
              Beautiful Flowers <br className="hidden xl:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary-green)] to-[#184a29]">
                For Every Occasion
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-gray-600 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-light">
              Handpicked blooms, thoughtfully arranged to make your special moments even more memorable. Experience luxury floristry.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
              <Link to="/products">
                <Button size="lg" className="w-full sm:w-auto shadow-xl shadow-green-900/20 px-10 py-3 rounded-full text-base font-semibold">
                  Shop
                </Button>
              </Link>
              <Link to="/products?category=Bouquets">
                <Button variant="outline" size="lg" className="w-full sm:w-auto px-10 py-3 rounded-full text-base font-semibold transition-all">
                  Explore
                </Button>
              </Link>
            </div>

            {/* Stats / Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-gray-200/80 max-w-3xl mx-auto lg:mx-0 text-left">
              <div>
                <p className="text-3xl font-heading font-bold text-gray-900">500+</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase mt-1 tracking-wider">Arrangements</p>
              </div>
              <div>
                <p className="text-3xl font-heading font-bold text-gray-900">10K+</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase mt-1 tracking-wider">Happy Customers</p>
              </div>
              <div>
                <p className="text-3xl font-heading font-bold text-gray-900">4.9</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase mt-1 tracking-wider">Customer Rating</p>
              </div>
              <div>
                <p className="text-3xl font-heading font-bold text-yellow-600">Best</p>
                <p className="text-[10px] text-gray-500 font-bold uppercase mt-1 tracking-wider">Local Florist</p>
              </div>
            </div>

            {/* Freshness Card */}
            <div className="mt-8 bg-gradient-to-r from-[#F6FAF7] to-transparent p-5 rounded-2xl border border-[var(--color-soft-sage)]/50 flex items-start space-x-4 max-w-md mx-auto lg:mx-0 text-left">
              <ShieldCheck className="text-[var(--color-primary-green)] mt-1 flex-shrink-0" size={24} />
              <div>
                <p className="text-sm font-bold text-gray-900">Freshness Guaranteed</p>
                <p className="text-xs text-gray-600 mt-1">We use fresh, handpicked flowers sourced daily to ensure maximum longevity and beauty.</p>
              </div>
            </div>

          </motion.div>
        </div>

        {/* RIGHT SIDE: Interactive Floral Wheel */}
        <div className="w-full lg:w-[45%] flex justify-center lg:justify-end items-start mt-8 lg:mt-0 relative">
          <FlowerWheel
            products={featuredProducts}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
