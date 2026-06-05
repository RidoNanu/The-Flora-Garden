import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiStar, FiMinus, FiPlus, FiShoppingCart, FiCreditCard, FiCheck } from 'react-icons/fi';
import productsData from '../data/products.json';
import { useCart } from '../context/CartContext';
import Button from '../components/common/Button';
import ProductCard from '../components/common/ProductCard';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const foundProduct = productsData.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      
      // Find related products (same category, different id)
      const related = productsData
        .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 4);
      
      // If not enough related, just pad with others
      if (related.length < 4) {
        const others = productsData.filter(p => p.id !== foundProduct.id && !related.find(r => r.id === p.id)).slice(0, 4 - related.length);
        setRelatedProducts([...related, ...others]);
      } else {
        setRelatedProducts(related);
      }
    }
  }, [id]);

  if (!product) {
    return <div className="pt-32 text-center text-2xl font-heading min-h-screen">Loading or Product Not Found...</div>;
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[var(--color-premium-bg)]">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-8 flex items-center space-x-2">
          <Link to="/" className="hover:text-[var(--color-primary-green)]">Home</Link>
          <span>/</span>
          <Link to={`/products?category=${product.category}`} className="hover:text-[var(--color-primary-green)]">{product.category}</Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 mb-24">
          {/* Left: Product Image */}
          <div className="w-full lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full rounded-3xl overflow-hidden bg-white shadow-lg h-[400px] md:h-[600px] relative group"
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125 origin-center cursor-zoom-in"
              />
            </motion.div>
          </div>

          {/* Right: Details */}
          <div className="w-full lg:w-1/2">
            <span className="text-[var(--color-primary-green)] font-medium uppercase tracking-widest text-sm mb-2 block">{product.category}</span>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-4 leading-tight">{product.name}</h1>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} size={18} className={i < Math.floor(product.rating) ? 'fill-current' : ''} />
                ))}
              </div>
              <span className="text-gray-500 text-sm">({product.reviews} customer reviews)</span>
            </div>

            <div className="text-3xl font-bold text-[var(--color-primary-green)] mb-8">
              ₹{product.price.toFixed(2)}
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Specifications */}
            <div className="mb-8">
              <h4 className="font-heading font-semibold text-lg text-gray-900 mb-4">Bouquet Includes:</h4>
              <ul className="space-y-2">
                {product.specifications.map((spec, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <FiCheck className="text-[var(--color-soft-green)] mr-3" />
                    {spec}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center space-x-2 mb-8">
              <span className="w-3 h-3 rounded-full bg-[var(--color-soft-green)]"></span>
              <span className="text-gray-700 font-medium">Available: {product.availability}</span>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 border-t border-gray-200 pt-8">
              {/* Quantity */}
              <div className="flex items-center border border-gray-300 rounded-full h-14 w-36 px-4 shrink-0 bg-white">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-gray-500 hover:text-[var(--color-primary-green)] transition-colors p-2"
                >
                  <FiMinus />
                </button>
                <span className="flex-grow text-center font-medium text-lg text-gray-900">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-gray-500 hover:text-[var(--color-primary-green)] transition-colors p-2"
                >
                  <FiPlus />
                </button>
              </div>

              <Button onClick={handleAddToCart} className="flex-grow h-14 text-lg">
                <FiShoppingCart className="mr-2" /> Add to Cart
              </Button>
            </div>
            
            <Button variant="outline" fullWidth onClick={handleBuyNow} className="h-14 text-lg border-2">
              <FiCreditCard className="mr-2" /> Buy It Now
            </Button>
          </div>
        </div>

        {/* Related Products */}
        <div className="pt-16 border-t border-gray-200">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-heading font-bold text-gray-900 mb-4">You May Also Like</h3>
            <div className="w-16 h-1 bg-[var(--color-primary-green)] mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(related => (
              <ProductCard key={related.id} product={related} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
