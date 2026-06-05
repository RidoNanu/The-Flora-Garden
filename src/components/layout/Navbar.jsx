import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiShoppingCart, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import clsx from 'clsx';
import logo from '../../assets/logo.webp';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/products' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'glassmorphism py-3 shadow-md' : 'bg-transparent py-5'
      )}
    >
      <div className="w-full px-4 md:px-8 lg:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center h-14 md:h-16">
          <img 
            src={logo} 
            alt="Flora Garden Logo" 
            className="h-full w-auto object-contain drop-shadow-md" 
          />
        </Link>

        {/* Right Side Elements */}
        <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-8">
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={clsx(
                  'text-sm font-medium tracking-wide transition-colors hover:text-[var(--color-primary-green)]',
                  location.pathname === link.path ? 'text-[var(--color-primary-green)]' : 'text-gray-700'
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            <Link to="/cart" className="relative text-gray-700 hover:text-[var(--color-primary-green)] transition-colors">
              <FiShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[var(--color-primary-green)] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to="/profile" className="text-gray-700 hover:text-[var(--color-primary-green)] transition-colors">
              <FiUser size={20} />
            </Link>
            
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-700 hover:text-[var(--color-primary-green)] transition-colors ml-4"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md shadow-lg"
          >
            <div className="px-4 pt-2 pb-6 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-gray-800 hover:text-[var(--color-primary-green)] transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
