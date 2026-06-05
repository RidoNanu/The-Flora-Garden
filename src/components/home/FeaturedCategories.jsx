import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Indoor Plants', image: '/The-Flora-Garden/images/plants/plant-2.webp', link: '/products?category=Indoor%20Plants' },
  { name: 'Beautiful Bouquets', image: '/The-Flora-Garden/images/bouquets/bouquet-1.webp', link: '/products?category=Bouquets' },
];

const FeaturedCategories = () => {
  return (
    <section className="py-20 bg-[var(--color-premium-bg)]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-heading font-bold text-gray-900 mb-4"
          >
            Shop By Category
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Discover our curated collections designed to express every emotion perfectly.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <Link key={index} to={category.link}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{ y: -10 }}
                className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 h-96 cursor-pointer"
              >
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 z-10"></div>
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 text-white">
                  <h3 className="font-heading text-2xl font-semibold mb-2 transform transition-transform duration-300 group-hover:-translate-y-2">{category.name}</h3>
                  <div className="flex items-center space-x-2 text-sm font-medium uppercase tracking-widest opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <span>Explore Collection</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
