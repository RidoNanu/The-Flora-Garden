import React from 'react';
import { motion } from 'framer-motion';
import { FiHeart, FiEye, FiShoppingCart, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import Button from './Button';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
    >
      {/* Image Container */}
      <div className="relative h-72 overflow-hidden bg-[var(--color-cream-white)]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Badges */}
        {product.bestseller && (
          <div className="absolute top-4 left-4 bg-[var(--color-primary-green)] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Best Seller
          </div>
        )}
        
        <button className="absolute top-4 right-4 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-gray-600 hover:text-[var(--color-primary-green)] transition-colors opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300 shadow-sm">
          <FiHeart size={18} />
        </button>

        {/* Quick Actions Overlay */}
        <div className="absolute inset-x-0 bottom-4 flex justify-center space-x-3 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          <Link to={`/products/${product.id}`}>
            <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-700 hover:text-[var(--color-primary-green)] shadow-md hover:shadow-lg transition-all" title="Quick View">
              <FiEye size={20} />
            </button>
          </Link>
          <button 
            onClick={() => addToCart(product)}
            className="w-12 h-12 bg-[var(--color-primary-green)] rounded-full flex items-center justify-center text-white hover:bg-[var(--color-accent-green)] shadow-md hover:shadow-lg transition-all"
            title="Add to Cart"
          >
            <FiShoppingCart size={20} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 text-center">
        <p className="text-[var(--color-secondary-text)] text-sm mb-1 uppercase tracking-wider">{product.category}</p>
        <Link to={`/products/${product.id}`}>
          <h3 className="font-heading font-semibold text-xl text-gray-900 mb-2 hover:text-[var(--color-primary-green)] transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-center space-x-1 mb-3 text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <FiStar key={i} size={14} className={i < Math.floor(product.rating) ? 'fill-current' : ''} />
          ))}
          <span className="text-gray-400 text-xs ml-2">({product.reviews})</span>
        </div>
        <p className="text-lg font-medium text-[var(--color-primary-green)]">₹{product.price.toFixed(2)}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
