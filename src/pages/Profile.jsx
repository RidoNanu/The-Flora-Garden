import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiPackage, FiHeart, FiSettings, FiLogOut, FiPlus } from 'react-icons/fi';
import { Flower2 } from 'lucide-react';
import Button from '../components/common/Button';
import ProductCard from '../components/common/ProductCard';
import productsData from '../data/products.json';
import amiProfilePic from '../assets/ami_profile.jpeg';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');

  // Static Dummy Data for presentation
  const user = {
    name: 'Ami Chello',
    email: 'chelloami5@gmail.com',
    address: 'Itanagar, Arunachal Pradesh, India',
    phone: '+91 96120 49451',
    memberSince: 'March 2024'
  };

  const favoriteFlowers = ['Peonies', 'White Lilies', 'Orchids'];
  
  const recentOrders = [
    { id: 'ORD-8924', date: 'May 12, 2026', total: 145.00, status: 'Delivered', items: 'Mother\'s Day Special' },
    { id: 'ORD-7631', date: 'Feb 10, 2026', total: 120.00, status: 'Delivered', items: 'Romantic Velvet Roses' },
    { id: 'ORD-5421', date: 'Dec 05, 2025', total: 85.00, status: 'Delivered', items: 'Classic White Lilies' }
  ];

  // Dummy favorite products
  const favoriteProducts = productsData.slice(0, 3);

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            {/* Personal Info */}
            <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-heading font-bold text-gray-900">Personal Information</h3>
                <Button variant="outline" size="sm">Edit Profile</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Full Name</p>
                  <p className="font-medium text-gray-900">{user.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Email Address</p>
                  <p className="font-medium text-gray-900">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                  <p className="font-medium text-gray-900">{user.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Shipping Address</p>
                  <p className="font-medium text-gray-900">{user.address}</p>
                </div>
              </div>
            </div>

            {/* Favorite Flowers & Preferences */}
            <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100">
              <h3 className="text-2xl font-heading font-bold text-gray-900 mb-6">Floral Preferences</h3>
              <p className="text-sm text-gray-500 mb-4">Favorite Flowers</p>
              <div className="flex flex-wrap gap-3">
                {favoriteFlowers.map((flower, index) => (
                  <span key={index} className="flex items-center px-4 py-2 bg-[var(--color-champagne)] text-gray-800 rounded-full text-sm font-medium border border-[var(--color-champagne)]">
                    <Flower2 size={16} className="mr-2 text-[var(--color-primary-green)]" strokeWidth={2} /> {flower}
                  </span>
                ))}
                <button className="px-4 py-2 border border-dashed border-gray-300 text-gray-500 rounded-full text-sm font-medium hover:bg-gray-50 hover:text-gray-700 transition-colors flex items-center">
                  <FiPlus className="mr-1" /> Add More
                </button>
              </div>
            </div>
          </motion.div>
        );

      case 'orders':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100">
              <h3 className="text-2xl font-heading font-bold text-gray-900 mb-6">Order History</h3>
              <div className="space-y-4">
                {recentOrders.map((order, index) => (
                  <div key={index} className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all bg-gray-50/50">
                    <div className="mb-4 md:mb-0">
                      <div className="flex items-center space-x-3 mb-1">
                        <span className="font-heading font-bold text-gray-900">{order.id}</span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold uppercase tracking-wider">{order.status}</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-1">Ordered on {order.date}</p>
                      <p className="text-sm text-gray-700 font-medium">{order.items}</p>
                    </div>
                    <div className="flex items-center justify-between md:flex-col md:items-end gap-3">
                      <span className="text-lg font-bold text-[var(--color-primary-green)]">₹{order.total.toFixed(2)}</span>
                      <Button variant="outline" size="sm" className="bg-white">Track Order</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 'favorites':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100">
              <h3 className="text-2xl font-heading font-bold text-gray-900 mb-6">My Favorite Plants</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {favoriteProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 'settings':
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100">
              <h3 className="text-2xl font-heading font-bold text-gray-900 mb-6">Account Settings</h3>
              <div className="space-y-6 max-w-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Change Password</label>
                  <input type="password" placeholder="Current Password" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[var(--color-primary-green)] mb-3" />
                  <input type="password" placeholder="New Password" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[var(--color-primary-green)]" />
                </div>
                <div>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-[var(--color-primary-green)] focus:ring-[var(--color-primary-green)]" defaultChecked />
                    <span className="text-gray-700">Receive marketing emails and exclusive offers</span>
                  </label>
                </div>
                <Button>Save Changes</Button>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[var(--color-premium-bg)]">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="mb-12">
          <h1 className="text-4xl font-heading font-bold text-gray-900 mb-2">My Account</h1>
          <p className="text-gray-600">Welcome back, {user.name.split(' ')[0]}!</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
              <div className="p-8 text-center bg-botanical-gradient">
                <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 p-1 shadow-md">
                  <img src={amiProfilePic} alt={user.name} className="w-full h-full object-cover rounded-full" />
                </div>
                <h3 className="font-heading font-bold text-gray-900 text-lg">{user.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{user.email}</p>
                <span className="inline-block px-3 py-1 bg-white/50 rounded-full text-xs font-semibold text-[var(--color-primary-green)]">Premium Member</span>
              </div>
              
              <div className="p-4">
                <nav className="space-y-2">
                  <button 
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'profile' ? 'bg-[var(--color-soft-sage)]/20 text-[var(--color-primary-green)] font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <FiUser size={18} /> <span>Profile Details</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('orders')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'orders' ? 'bg-[var(--color-soft-sage)]/20 text-[var(--color-primary-green)] font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <FiPackage size={18} /> <span>Order History</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('favorites')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'favorites' ? 'bg-[var(--color-soft-sage)]/20 text-[var(--color-primary-green)] font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <FiHeart size={18} /> <span>Favorites</span>
                  </button>
                  <button 
                    onClick={() => setActiveTab('settings')}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'settings' ? 'bg-[var(--color-soft-sage)]/20 text-[var(--color-primary-green)] font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <FiSettings size={18} /> <span>Settings</span>
                  </button>
                  <div className="border-t border-gray-100 my-2"></div>
                  <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors">
                    <FiLogOut size={18} /> <span>Sign Out</span>
                  </button>
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            <AnimatePresence mode="wait">
              {renderContent()}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
