import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../common/ProductCard';
import productsData from '../../data/products.json';
import Button from '../common/Button';
import { Link } from 'react-router-dom';

const BestSellers = () => {
  // Filter only bestsellers and take max 4
  const bestSellers = productsData.filter(product => product.bestseller).slice(0, 4);

  return (
    <section className="py-24 bg-white relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-soft-sage)] rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/4"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-[var(--color-primary-green)] font-medium uppercase tracking-widest text-sm mb-2 block">Our Signature</span>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-gray-900 mb-4">
                Best Sellers
              </h2>
              <p className="text-gray-600">
                Our most loved arrangements, handcrafted to perfection and guaranteed to impress.
              </p>
            </motion.div>
          </div>
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="mt-6 md:mt-0"
          >
            <Link to="/products">
              <Button variant="outline">View All Flowers</Button>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {bestSellers.map((product, index) => (
            <div key={product.id} className="h-full">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
