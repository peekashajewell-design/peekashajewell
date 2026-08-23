'use client';

import { motion } from 'framer-motion';
import { FiAward, FiHeart, FiShield } from 'react-icons/fi';

const features = [
  {
    icon: FiAward,
    title: 'Premium Quality',
    description: 'Each piece is crafted with the finest materials and attention to detail',
  },
  {
    icon: FiHeart,
    title: 'Handcrafted with Love',
    description: 'Every jewelry piece is carefully handmade by skilled artisans',
  },
  {
    icon: FiShield,
    title: 'Authenticity Guaranteed',
    description: 'We guarantee the authenticity of all our jewelry pieces',
  },
];

export default function About() {
  return (
    <section className="py-32 bg-gradient-to-br from-white via-luxury-50 to-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-400/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block mb-6"
            >
              <span className="inline-flex items-center px-4 py-2 bg-gold-100 text-gold-800 text-xs font-bold uppercase tracking-widest rounded-full">
                ✦ Our Story ✦
              </span>
            </motion.span>

            <h2 className="text-5xl md:text-6xl font-display font-bold text-slate-900 mb-6 leading-tight">
              Crafting Timeless
              <span className="block text-gold-600 mt-2">Masterpieces</span>
            </h2>

            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              At Peekasha Jewell, we believe jewelry is more than just an accessory—it's a form of self-expression, a celebration of life's precious moments, and a testament to timeless beauty.
            </p>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              Our collection features handcrafted pieces that blend traditional artistry with contemporary design, ensuring each item tells its own unique story.
            </p>
            <div className="space-y-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start space-x-5 group"
                >
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-gold-400 to-gold-600 rounded-2xl flex items-center justify-center shadow-gold group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-gold-700 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Main Image */}
            <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-elegant group">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: "url('https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2187')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />

              {/* Decorative Border */}
              <div className="absolute inset-4 border-2 border-white/20 rounded-3xl pointer-events-none" />
            </div>

            {/* Floating Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-elegant p-8"
            >
              <div className="text-center">
                <p className="text-5xl font-bold text-gold-600 mb-2">1000+</p>
                <p className="text-slate-600 font-semibold uppercase tracking-wider text-sm">Happy Customers</p>
              </div>
            </motion.div>

            {/* Decorative Circle */}
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-gold-400/20 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
