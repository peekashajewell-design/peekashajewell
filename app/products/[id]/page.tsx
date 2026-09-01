'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Product } from '@/types';
import Image from 'next/image';
import { FiShoppingCart, FiArrowLeft } from 'react-icons/fi';
import { useCartStore } from '@/store/cartStore';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const addToCart = useCartStore((state) => state.addItem);

  useEffect(() => {
    if (params?.id) {
      fetchProduct(params.id as string);
    }
  }, [params]);

  const fetchProduct = async (id: string) => {
    try {
      const response = await fetch(`/api/products/${id}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Product not found');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast.success('Added to cart!');
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen">
        <div className="pt-24 pb-20 container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-lg mb-8" />
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen">
        <div className="pt-24 pb-20 container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <button onClick={() => router.push('/products')} className="btn-primary">
            Back to Products
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">

      <div className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <button
            onClick={() => router.back()}
            className="flex items-center space-x-2 text-gray-600 hover:text-amethyst-600 mb-8 transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Images */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative h-96 md:h-[500px] rounded-xl overflow-hidden mb-4">
                <Image
                  src={product.images[selectedImage] || '/placeholder-product.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative h-24 rounded-lg overflow-hidden ${
                        selectedImage === index
                          ? 'ring-2 ring-amethyst-600'
                          : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <Image src={image} alt={`View ${index + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
                {product.category}
              </p>
              <h1 className="text-4xl font-display font-bold mb-4">{product.name}</h1>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-4xl font-bold text-amethyst-600">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.stock > 0 ? (
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    In Stock
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                    Out of Stock
                  </span>
                )}
              </div>

              <div className="prose prose-gray mb-8">
                <p className="text-gray-600 text-lg">{product.description}</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium capitalize">{product.category}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b">
                  <span className="text-gray-600">Availability</span>
                  <span className="font-medium">{product.stock} pieces</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <FiShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

    </main>
  );
}
