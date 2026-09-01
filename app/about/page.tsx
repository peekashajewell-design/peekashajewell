'use client';

import { motion } from 'framer-motion';
import { FiAward, FiHeart, FiShield, FiStar, FiUsers, FiTrendingUp } from 'react-icons/fi';
import Link from 'next/link';

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

const stats = [
  { icon: FiUsers, value: '1000+', label: 'Happy Customers' },
  { icon: FiStar, value: '500+', label: 'Unique Designs' },
  { icon: FiTrendingUp, value: '5+', label: 'Years Experience' },
];

const values = [
  {
    title: 'Our Craftsmanship',
    description: 'We take pride in our meticulous attention to detail. Every piece of jewelry that leaves our workshop has been carefully inspected to ensure it meets our exacting standards of quality and beauty.',
  },
  {
    title: 'Our Promise',
    description: "When you choose Peekasha Jewell, you're not just buying jewelry—you're investing in a piece of art that will be treasured for generations. We stand behind every piece we create.",
  },
  {
    title: 'Our Vision',
    description: "To become India's most trusted name in handcrafted jewelry, where traditional artistry meets contemporary design, and every piece tells a story worth celebrating.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      {/* Hero Section */}
      <section className="bg-luxury-gradient py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amethyst-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose-400/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="inline-flex items-center px-4 py-2 bg-amethyst-100 text-amethyst-800 text-xs font-bold uppercase tracking-widest rounded-full mb-6">
              ✦ Our Story ✦
            </span>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-slate-900 mb-6">
              About Peekasha Jewell
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Crafting timeless pieces that celebrate life's precious moments since our inception.
              Each piece tells a story of artistry, passion, and dedication to excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-amethyst-400 to-amethyst-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-4xl font-bold text-amethyst-600 mb-2">{stat.value}</h3>
                <p className="text-slate-600 font-semibold uppercase tracking-wider text-sm">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gradient-to-br from-white via-luxury-50 to-white relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amethyst-400/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-400/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6 leading-tight">
                Crafting Timeless
                <span className="block text-amethyst-600 mt-2">Masterpieces</span>
              </h2>

              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                At Peekasha Jewell, we believe jewelry is more than just an accessory—it's a form of self-expression, a celebration of life's precious moments, and a testament to timeless beauty.
              </p>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                Located in the heart of Kanpur, our collection features handcrafted pieces that blend traditional artistry with contemporary design, ensuring each item tells its own unique story.
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
                    <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-amethyst-400 to-amethyst-600 rounded-2xl flex items-center justify-center shadow-gold group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amethyst-700 transition-colors">
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
              <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-elegant group">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=2187')",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                <div className="absolute inset-4 border-2 border-white/20 rounded-3xl pointer-events-none" />
              </div>
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-amethyst-400/20 rounded-full blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="section-title">Our Values</h2>
            <p className="section-subtitle">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card hover:shadow-gold transition-all duration-300"
              >
                <div className="w-12 h-1 bg-gradient-to-r from-amethyst-400 to-amethyst-600 mb-6" />
                <h3 className="text-2xl font-display font-bold text-slate-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-amethyst-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-500 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Ready to Find Your Perfect Piece?
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Explore our exquisite collection of handcrafted jewelry
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products" className="btn-primary">
                View Collection
              </Link>
              <Link href="/contact" className="btn-secondary">
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-12 bg-luxury-50">
        <div className="container mx-auto px-4">
          <div className="text-center text-slate-600">
            <p className="mb-2">
              <span className="font-bold text-slate-900">Address:</span> E-400 KDA Colony Daheli Sujanpur, Kanpur 208015
            </p>
            <p>
              <span className="font-bold text-slate-900">GST Number:</span> 09AWIPJ6552E1ZE
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
