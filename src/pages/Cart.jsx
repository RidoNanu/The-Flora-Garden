import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiTrash2, FiMinus, FiPlus, FiArrowRight } from 'react-icons/fi';
import { ShoppingBag, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from '../components/common/Button';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);

  const deliveryFee = cartTotal > 0 ? 15.00 : 0;
  const finalTotal = cartTotal + deliveryFee;

  const handleCheckout = () => {
    setShowSuccess(true);
    setTimeout(() => {
      clearCart();
      setShowSuccess(false);
    }, 5000);
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[var(--color-premium-bg)]">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="mb-12">
          <h1 className="text-4xl font-heading font-bold text-gray-900 mb-2">Shopping Bag</h1>
          <p className="text-gray-600">{cartItems.length} items in your bag</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center shadow-sm max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={40} className="text-gray-400" strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-heading font-bold text-gray-900 mb-4">Your bag is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added any beautiful blooms to your bag yet.</p>
            <Link to="/products">
              <Button size="lg">Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Cart Items List */}
            <div className="w-full lg:w-2/3">
              <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
                <div className="p-6 md:p-8">
                  <AnimatePresence>
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, height: 0, scale: 0.9 }}
                        className="flex flex-col sm:flex-row items-center py-6 border-b border-gray-100 last:border-0 gap-6"
                      >
                        {/* Item Image */}
                        <div className="w-full sm:w-32 h-32 flex-shrink-0 rounded-2xl overflow-hidden bg-gray-50">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        
                        {/* Item Details */}
                        <div className="flex-grow text-center sm:text-left">
                          <span className="text-xs text-[var(--color-primary-green)] uppercase tracking-wider font-semibold mb-1 block">{item.category}</span>
                          <Link to={`/products/${item.id}`} className="hover:text-[var(--color-primary-green)] transition-colors">
                            <h3 className="font-heading font-bold text-lg text-gray-900 mb-2">{item.name}</h3>
                          </Link>
                          <div className="text-gray-900 font-medium">₹{item.price.toFixed(2)}</div>
                        </div>

                        {/* Quantity & Actions */}
                        <div className="flex flex-wrap sm:flex-nowrap items-center justify-between sm:justify-end w-full sm:w-auto gap-4 sm:gap-6 mt-4 sm:mt-0">
                          <div className="flex items-center border border-gray-200 rounded-full h-10 w-28 px-2 bg-gray-50">
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="text-gray-500 hover:text-[var(--color-primary-green)] p-1"
                            >
                              <FiMinus size={14} />
                            </button>
                            <span className="flex-grow text-center font-medium text-sm text-gray-900">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="text-gray-500 hover:text-[var(--color-primary-green)] p-1"
                            >
                              <FiPlus size={14} />
                            </button>
                          </div>
                          <div className="font-bold text-gray-900 w-20 text-right">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-2"
                            title="Remove item"
                          >
                            <FiTrash2 size={20} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white rounded-3xl shadow-sm p-6 md:p-8 sticky top-32">
                <h3 className="text-xl font-heading font-bold text-gray-900 mb-6">Order Summary</h3>
                
                <div className="space-y-4 text-sm text-gray-600 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">₹{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="font-medium text-gray-900">₹{deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Taxes calculated at checkout</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-6 mb-8">
                  <div className="flex justify-between items-end">
                    <span className="font-heading font-bold text-gray-900 text-lg">Total</span>
                    <span className="font-heading font-bold text-[var(--color-primary-green)] text-2xl">₹{finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Button fullWidth size="lg" onClick={handleCheckout} className="h-14 font-bold text-lg shadow-xl shadow-green-100">
                  Checkout Securely
                </Button>
                
                <div className="mt-6 text-center text-xs text-gray-500 flex items-center justify-center space-x-2">
                  <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                    <Lock size={12} />
                  </span>
                  <span>Secure SSL Checkout</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Checkout Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-lg w-full text-center"
            >
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <motion.svg 
                  className="w-12 h-12 text-green-500" 
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </motion.svg>
              </div>
              <h2 className="text-3xl font-heading font-bold text-gray-900 mb-4">
                Thank You For Choosing Flora Garden!
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Your beautiful flowers are on their way to creating a memorable moment. A confirmation email has been sent to you.
              </p>
              <Link to="/">
                <Button fullWidth onClick={() => setShowSuccess(false)}>
                  Continue to Home
                </Button>
              </Link>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Cart;
