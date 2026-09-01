'use client';

import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import { FiTrash2, FiPlus, FiMinus, FiShoppingBag } from 'react-icons/fi';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeItem, getTotalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-gray-50">
        <div className="pt-24 pb-20 container mx-auto px-4">
          <div className="max-w-md mx-auto text-center py-20">
            <FiShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-display font-bold mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link href="/products" className="btn-primary inline-block">
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">

      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-display font-bold mb-8">Shopping Cart</h1>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="card p-6"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="relative w-24 h-24 flex-shrink-0">
                        <Image
                          src={item.images[0] || '/placeholder-product.jpg'}
                          alt={item.name}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>

                      <div className="flex-grow">
                        <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-500 uppercase mb-2">
                          {item.category}
                        </p>
                        <p className="text-amethyst-600 font-bold">
                          ₹{item.price.toLocaleString()}
                        </p>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                          >
                            <FiMinus className="w-4 h-4" />
                          </button>
                          <span className="w-12 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.stock}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
                          >
                            <FiPlus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t flex justify-between items-center">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-bold text-lg">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="card p-6 sticky top-24"
                >
                  <h2 className="text-2xl font-display font-bold mb-6">Order Summary</h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">₹{getTotalPrice().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">Calculated at checkout</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-2xl font-bold text-amethyst-600">
                        ₹{getTotalPrice().toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => router.push('/checkout')}
                    className="w-full btn-primary mb-4"
                  >
                    Proceed to Checkout
                  </button>

                  <Link
                    href="/products"
                    className="block text-center text-amethyst-600 hover:text-amethyst-700 font-medium"
                  >
                    Continue Shopping
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
