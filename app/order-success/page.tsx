'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FiCheckCircle, FiMessageCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams?.get('orderId');

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="card p-12">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheckCircle className="w-12 h-12 text-green-600" />
            </div>

            <h1 className="text-4xl font-display font-bold mb-4">Order Placed Successfully!</h1>

            {orderId && (
              <p className="text-gray-600 mb-6">
                Order ID: <span className="font-mono font-semibold">#{orderId}</span>
              </p>
            )}

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
              <div className="flex items-start space-x-4">
                <FiMessageCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div className="text-left">
                  <h3 className="font-semibold text-green-900 mb-2">
                    WhatsApp Confirmation
                  </h3>
                  <p className="text-sm text-green-800">
                    Your order details have been sent to our WhatsApp. We'll contact you shortly to confirm your order and discuss payment and shipping details.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg mb-4">What's Next?</h3>
              <div className="text-left space-y-3 text-gray-600">
                <p className="flex items-start">
                  <span className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-semibold text-sm mr-3 flex-shrink-0">
                    1
                  </span>
                  <span>We'll review your order and contact you on WhatsApp</span>
                </p>
                <p className="flex items-start">
                  <span className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-semibold text-sm mr-3 flex-shrink-0">
                    2
                  </span>
                  <span>Confirm your order details and payment method</span>
                  </p>
                <p className="flex items-start">
                  <span className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 font-semibold text-sm mr-3 flex-shrink-0">
                    3
                  </span>
                  <span>We'll process and ship your jewelry with care</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="/products" className="btn-primary">
                Continue Shopping
              </Link>
              <Link href="/" className="btn-secondary">
                Back to Home
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Suspense fallback={
        <div className="pt-24 pb-20 container mx-auto px-4">
          <div className="text-center">Loading...</div>
        </div>
      }>
        <OrderSuccessContent />
      </Suspense>
    </main>
  );
}
