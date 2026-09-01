'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiShoppingCart, FiMenu, FiX, FiUser } from 'react-icons/fi';
import { useCartStore } from '@/store/cartStore';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItems = useCartStore((state) => state.items);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-lg shadow-elegant py-4 border-b border-luxury-100'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all duration-300 ${
              isScrolled ? 'border-amethyst-400 shadow-jewel' : 'border-white/40 shadow-lg'
            }`}>
              <img
                src="/logo.png"
                alt="Peekasha Jewell Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className={`text-2xl md:text-3xl font-display font-bold transition-colors ${
              isScrolled ? 'text-slate-900' : 'text-white'
            }`}>
              Peekasha Jewell
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`font-semibold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 ${
                isScrolled ? 'text-slate-700 hover:text-amethyst-600' : 'text-white hover:text-amethyst-300'
              }`}
            >
              Home
            </Link>
            <Link
              href="/products"
              className={`font-semibold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 ${
                isScrolled ? 'text-slate-700 hover:text-amethyst-600' : 'text-white hover:text-amethyst-300'
              }`}
            >
              Collection
            </Link>
            <Link
              href="/about"
              className={`font-semibold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 ${
                isScrolled ? 'text-slate-700 hover:text-amethyst-600' : 'text-white hover:text-amethyst-300'
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`font-semibold uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 ${
                isScrolled ? 'text-slate-700 hover:text-amethyst-600' : 'text-white hover:text-amethyst-300'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            <Link
              href="/admin"
              className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                isScrolled ? 'text-slate-700 hover:bg-amethyst-100' : 'text-white hover:bg-white/20'
              }`}
              title="Admin"
            >
              <FiUser className="w-5 h-5" />
            </Link>

            <Link
              href="/cart"
              className={`relative p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                isScrolled ? 'text-slate-700 hover:bg-amethyst-100' : 'text-white hover:bg-white/20'
              }`}
              title="Shopping Cart"
            >
              <FiShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-rose-500 to-rose-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-full transition-colors ${
                isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'
              }`}
            >
              {isMobileMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-lg">
            <Link
              href="/"
              className="block px-4 py-2 text-gray-700 hover:bg-amethyst-50 hover:text-amethyst-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="block px-4 py-2 text-gray-700 hover:bg-amethyst-50 hover:text-amethyst-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/about"
              className="block px-4 py-2 text-gray-700 hover:bg-amethyst-50 hover:text-amethyst-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block px-4 py-2 text-gray-700 hover:bg-amethyst-50 hover:text-amethyst-600 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
