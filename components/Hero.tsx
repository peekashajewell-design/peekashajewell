'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiArrowRight } from 'react-icons/fi';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=2070')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-amethyst-950/85 via-sapphire-950/70 to-ruby-950/80" />

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-amethyst-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-ruby-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-sapphire-500/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Luxury Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="inline-block"
          >
            <span className="inline-flex items-center px-6 py-2 bg-white/10 backdrop-blur-sm border border-amethyst-300/40 text-amethyst-200 text-sm font-semibold uppercase tracking-widest rounded-full">
              ✦ Luxury Jewelry Collection ✦
            </span>
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-display font-bold text-white mb-6 tracking-tight leading-tight">
            Timeless
            <span className="block mt-2 bg-gradient-to-r from-amethyst-300 via-ruby-300 to-sapphire-300 bg-clip-text text-transparent">Elegance</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-200 mb-12 max-w-3xl mx-auto leading-relaxed font-light">
            Discover exquisite handcrafted jewelry pieces that tell your unique story.
            <span className="block mt-2 text-ruby-200">Where luxury meets artistry.</span>
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link href="/products" className="btn-primary group">
              Explore Collection
              <FiArrowRight className="ml-2 inline-block group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="#categories" className="btn-secondary">
              View Categories
            </Link>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap justify-center gap-8 mt-16 text-white/80"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-amethyst-400 to-ruby-400 rounded-full" />
              <span className="text-sm uppercase tracking-wider">Handcrafted</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-amethyst-400 to-ruby-400 rounded-full" />
              <span className="text-sm uppercase tracking-wider">Premium Quality</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-amethyst-400 to-ruby-400 rounded-full" />
              <span className="text-sm uppercase tracking-wider">Authentic Designs</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/60 text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-amethyst-300 rounded-full mt-2"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
