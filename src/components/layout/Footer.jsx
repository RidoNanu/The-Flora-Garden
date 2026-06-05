import React from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiFacebook, FiTwitter, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-[#1A1A1A] text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-heading font-bold tracking-wider text-[var(--color-soft-sage)]">Flora Garden</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium floral arrangements handcrafted with love to make your special moments unforgettable.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://www.instagram.com/ami_chello?igsh=MXVqcGxqdzBqazJwMg%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[var(--color-primary-green)] transition-colors"><FiInstagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-[var(--color-primary-green)] transition-colors"><FiFacebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-[var(--color-primary-green)] transition-colors"><FiTwitter size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">Home</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-white transition-colors text-sm">Shop Collections</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact Us</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Categories</h4>
            <ul className="space-y-3">
              <li><Link to="/products?category=Indoor%20Plants" className="text-gray-400 hover:text-white transition-colors text-sm">Indoor Plants</Link></li>
              <li><Link to="/products?category=Bouquets" className="text-gray-400 hover:text-white transition-colors text-sm">Beautiful Bouquets</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-heading font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm text-gray-400">
                <FiMapPin className="mt-1 flex-shrink-0 text-[var(--color-primary-green)]" />
                <span>Itanagar,<br/>Arunachal Pradesh, India</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-400">
                <FiPhone className="flex-shrink-0 text-[var(--color-primary-green)]" />
                <span>+91 96120 49451</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-400">
                <FiMail className="flex-shrink-0 text-[var(--color-primary-green)]" />
                <span>chelloami5@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Flora Garden. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
