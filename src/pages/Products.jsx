import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiFilter } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';
import productsData from '../data/products.json';
import ProductCard from '../components/common/ProductCard';

const categories = ['All', 'Indoor Plants', 'Bouquets'];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    const searchParam = params.get('search');
    
    if (categoryParam && categories.includes(categoryParam)) {
      setActiveCategory(categoryParam);
    }
    
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [location]);

  const filteredProducts = productsData.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[var(--color-premium-bg)] pt-20">
      
      {/* Header Banner */}
      <div className="relative h-64 md:h-80 bg-botanical-gradient flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/The-Flora-Garden/images/plants/plant-1.webp" 
            alt="Floral Collection" 
            className="w-full h-full object-cover opacity-20 mix-blend-multiply"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-heading font-bold text-gray-900 mb-4"
          >
            Our Floral Collection
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-700 max-w-2xl mx-auto"
          >
            Flowers crafted for every emotion and occasion.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12">
        
        {/* Search Bar with Suggestions Dropdown */}
        <div className="flex justify-center mb-6">
          <div className="w-full max-w-md relative px-4 md:px-0">
            <input 
              type="text" 
              placeholder="Search for flowers or plants..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              className="w-full px-5 py-3 pl-12 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-green)] focus:border-transparent transition-all shadow-sm bg-white text-gray-800 placeholder-gray-400 relative z-20"
            />
            <FiSearch className="absolute left-8 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-20" size={20} />
            
            {/* Suggestions Dropdown */}
            <AnimatePresence>
              {isSearchFocused && searchQuery && filteredProducts.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute z-30 left-4 right-4 md:left-0 md:right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden max-h-64 overflow-y-auto"
                >
                  {filteredProducts.map(product => (
                    <div 
                      key={product.id}
                      onClick={() => {
                        setSearchQuery(product.name);
                        setIsSearchFocused(false);
                      }}
                      className="px-5 py-3 hover:bg-gray-50 cursor-pointer flex items-center space-x-4 transition-colors border-b border-gray-50 last:border-0"
                    >
                      <img src={product.image} alt={product.name} className="w-12 h-12 rounded-full object-cover shadow-sm border border-gray-100" />
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.category}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center mb-12">
          <div className="w-full">
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-[var(--color-primary-green)] text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-[var(--color-soft-sage)] hover:text-[var(--color-primary-green)] border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <FiFilter className="mx-auto text-gray-300 mb-4" size={48} />
                <h3 className="text-2xl font-heading font-medium text-gray-600">No flowers found</h3>
                <p className="text-gray-500 mt-2">Try adjusting your filters or search query.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default Products;
