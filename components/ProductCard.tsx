'use client';

import { Product } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';
import { useCartStore } from '@/store/cartStore';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success('Added to cart!');
  };

  return (
    <Link href={`/products/${product.id}`}>
      <div className="card group relative overflow-hidden">
        {/* Image Container */}
        <div className="relative h-80 overflow-hidden bg-luxury-50">
          <Image
            src={product.images[0] || '/placeholder-product.jpg'}
            alt={product.name}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Featured Badge */}
          {product.featured && (
            <div className="absolute top-4 left-4 luxury-badge animate-glow">
              ✦ Featured
            </div>
          )}

          {/* Stock Badge */}
          <div className="absolute top-4 right-4">
            {product.stock > 0 ? (
              <span className="px-3 py-1 bg-green-500/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider rounded-full">
                In Stock
              </span>
            ) : (
              <span className="px-3 py-1 bg-red-500/90 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider rounded-full">
                Sold Out
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-4 right-4 bg-white p-4 rounded-full shadow-luxury opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-gradient-to-r hover:from-amethyst-500 hover:to-ruby-500 hover:text-white transform translate-y-4 group-hover:translate-y-0 hover:scale-110 hover:shadow-jewel"
          >
            <FiShoppingCart className="w-5 h-5" />
          </button>

          {/* Quick View Hint */}
          <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
            <span className="text-white text-sm font-semibold uppercase tracking-wider flex items-center gap-2">
              View Details
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-6 bg-white">
          <div className="mb-3">
            <p className="text-xs text-amethyst-600 uppercase tracking-widest mb-2 font-bold">
              {product.category}
            </p>
            <h3 className="text-xl font-display font-bold text-slate-900 group-hover:text-amethyst-700 transition-colors leading-tight mb-2">
              {product.name}
            </h3>
          </div>

          <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Price and Action */}
          <div className="flex items-center justify-between pt-4 border-t border-luxury-100">
            <div>
              <span className="price-tag">
                ₹{product.price.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <FiHeart className="w-4 h-4 hover:text-rose-500 cursor-pointer transition-colors" />
            </div>
          </div>
        </div>

        {/* Decorative Corner */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-amethyst-400/10 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500" />
      </div>
    </Link>
  );
}
