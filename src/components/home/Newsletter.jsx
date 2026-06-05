import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import Button from '../common/Button';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setShowModal(true);
      setEmail('');
      setTimeout(() => setShowModal(false), 4000);
    }
  };

  return (
    <section className="py-24 relative overflow-hidden bg-[#2D2D2D]">
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-transparent z-10"></div>
      <img 
        src="/The-Flora-Garden/images/plants/plant-1.webp" 
        alt="Background" 
        className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
      />
      
      <div className="container mx-auto px-4 md:px-6 relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <span className="text-[var(--color-soft-sage)] font-medium uppercase tracking-widest text-sm mb-4 block">Join Our Club</span>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
            Stay Blooming With Us
          </h2>
          <p className="text-gray-300 mb-10 text-lg">
            Subscribe to receive exclusive offers, floral care tips, and early access to our seasonal collections.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-green)] bg-white/10 backdrop-blur-md text-white placeholder-gray-400 border border-white/20"
              required
            />
            <Button type="submit" className="whitespace-nowrap px-8 py-4 bg-[var(--color-primary-green)] hover:bg-[#D81B60] text-white">
              Subscribe
            </Button>
          </form>
        </motion.div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-10 left-1/2 z-50 bg-white px-8 py-6 rounded-2xl shadow-2xl flex items-center space-x-4 border border-gray-100"
          >
            <div className="w-12 h-12 rounded-full bg-[var(--color-soft-green)] flex items-center justify-center text-white">
              <Check size={24} strokeWidth={3} />
            </div>
            <div>
              <h4 className="font-heading font-bold text-gray-900">Thank you for subscribing!</h4>
              <p className="text-gray-600 text-sm">Welcome to the Flora Garden family.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Newsletter;
