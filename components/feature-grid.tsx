'use client';

import { motion } from 'framer-motion';
import { FileText, Shield, Leaf, TrendingUp, ArrowRight } from 'lucide-react';
import { GlassCard } from './ui/glass-card';

const features = [
  {
    icon: FileText,
    title: 'AI Document Intelligence',
    description: 'Process loan agreements 99% faster with automated extraction and verification',
    highlights: ['99% faster processing', 'AI-powered extraction', 'Real-time verification'],
    color: 'from-cyan-500 to-blue-600',
    delay: 0
  },
  {
    icon: Shield,
    title: 'Covenant Monitoring',
    description: 'Real-time compliance tracking with predictive breach detection',
    highlights: ['Predictive analytics', 'Automated alerts', '70% time reduction'],
    color: 'from-emerald-500 to-cyan-600',
    delay: 0.2
  },
  {
    icon: Leaf,
    title: 'ESG Compliance Engine',
    description: 'Track ESG metrics and detect greenwashing risks with 96% faster reporting',
    highlights: ['Greenwashing detection', 'LMA compliance', 'Automated reporting'],
    color: 'from-green-500 to-emerald-600',
    delay: 0.4
  },
  {
    icon: TrendingUp,
    title: 'Settlement Acceleration',
    description: 'Complete due diligence 85% faster with automated compliance checks',
    highlights: ['85% faster settlement', '$460K cost saved', '23 trades completed'],
    color: 'from-blue-500 to-purple-600',
    delay: 0.6
  }
];

export function FeatureGrid() {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-emerald-200 bg-clip-text text-transparent">
              Comprehensive Platform Capabilities
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            End-to-end solution for modern syndicated lending operations
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: feature.delay }}
            >
              <GlassCard className="p-8 group cursor-pointer">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center`}
                  >
                    <feature.icon size={32} className="text-white" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="p-2 rounded-full bg-white/10"
                  >
                    <ArrowRight size={20} className="text-white group-hover:translate-x-1 transition-transform" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{feature.description}</p>
                </div>

                {/* Highlights */}
                <div className="space-y-3">
                  {feature.highlights.map((highlight, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: feature.delay + 0.8 + idx * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10"
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.color}`} />
                      <span className="text-slate-300">{highlight}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Hover Effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10`} />
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
