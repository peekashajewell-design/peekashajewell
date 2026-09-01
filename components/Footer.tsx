'use client';

import Link from 'next/link';
import { FiMail, FiPhone, FiMapPin, FiInstagram, FiFacebook, FiTwitter } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-display font-bold mb-4 bg-gradient-to-r from-amethyst-400 via-ruby-400 to-sapphire-400 bg-clip-text text-transparent">
              Peekasha Jewell
            </h3>
            <p className="text-gray-400 mb-4">
              Crafting timeless jewelry pieces that celebrate your unique story.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-amethyst-500 hover:to-ruby-500 transition-colors"
              >
                <FiInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-amethyst-500 hover:to-ruby-500 transition-colors"
              >
                <FiFacebook className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-r hover:from-amethyst-500 hover:to-ruby-500 transition-colors"
              >
                <FiTwitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-amethyst-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-amethyst-400 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-amethyst-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-amethyst-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=rings" className="text-gray-400 hover:text-amethyst-400 transition-colors">
                  Rings
                </Link>
              </li>
              <li>
                <Link href="/products?category=necklaces" className="text-gray-400 hover:text-amethyst-400 transition-colors">
                  Necklaces
                </Link>
              </li>
              <li>
                <Link href="/products?category=earrings" className="text-gray-400 hover:text-amethyst-400 transition-colors">
                  Earrings
                </Link>
              </li>
              <li>
                <Link href="/products?category=bracelets" className="text-gray-400 hover:text-amethyst-400 transition-colors">
                  Bracelets
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FiPhone className="w-5 h-5 text-amethyst-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">+91 81153 31054</span>
              </li>
              <li className="flex items-start space-x-3">
                <FiMail className="w-5 h-5 text-amethyst-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">peekashajewell@gmail.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <FiMapPin className="w-5 h-5 text-amethyst-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  E-400 KDA Colony Daheli Sujanpur, Kanpur 208015
                </span>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-800">
              <p className="text-xs text-gray-500">
                <span className="font-semibold text-gray-400">GST:</span> 09AWIPJ6552E1ZE
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Peekasha Jewell. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
