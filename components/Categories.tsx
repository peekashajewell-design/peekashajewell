'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const categories = [
  {
    id: 'rings',
    name: 'Rings',
    description: 'Elegant rings for every occasion',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=2070',
    count: 0,
  },
  {
    id: 'necklaces',
    name: 'Necklaces',
    description: 'Stunning necklaces to enhance your beauty',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=2187',
    count: 0,
  },
  {
    id: 'earrings',
    name: 'Earrings',
    description: 'Beautiful earrings for the perfect look',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=2187',
    count: 0,
  },
  {
    id: 'bracelets',
    name: 'Bracelets',
    description: 'Graceful bracelets for your wrist',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=2070',
    count: 0,
  },
  {
    id: 'anklets',
    name: 'Anklets',
    description: 'Delicate anklets for an elegant touch',
    image: 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?q=80&w=2187',
    count: 0,
  },
  {
    id: 'sets',
    name: 'Jewelry Sets',
    description: 'Complete sets for special occasions',
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343a?q=80&w=2187',
    count: 0,
  },
];

export default function Categories() {
  return (
    <section id="categories" className="py-32 bg-luxury-gradient relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-400/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className="inline-flex items-center px-4 py-2 bg-gold-100 text-gold-800 text-xs font-bold uppercase tracking-widest rounded-full">
              ✦ Our Collections ✦
            </span>
          </motion.span>
          <h2 className="section-title">Discover Your Perfect Piece</h2>
          <p className="section-subtitle">
            Explore our exquisite collections, each piece carefully crafted to celebrate life's precious moments
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/products?category=${category.id}`}>
                <div className="category-card h-96 group">
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-end p-8 text-center">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 + 0.3 }}
                        className="transform group-hover:-translate-y-2 transition-transform duration-500"
                      >
                        <div className="w-12 h-0.5 bg-gold-400 mx-auto mb-4" />
                        <h3 className="text-3xl font-display font-bold text-white mb-3 tracking-wide">
                          {category.name}
                        </h3>
                        <p className="text-sm text-slate-200 font-light leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          {category.description}
                        </p>
                        <span className="inline-flex items-center text-gold-400 text-sm font-semibold uppercase tracking-wider group-hover:text-gold-300 transition-colors">
                          Explore Collection
                          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </motion.div>
                    </div>

                    {/* Shine Effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
