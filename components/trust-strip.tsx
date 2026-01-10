'use client';

import { motion } from 'framer-motion';
import { Shield, CheckCircle, Award, Lock } from 'lucide-react';

const trustItems = [
  {
    icon: Shield,
    text: 'LMA Standards Compliant',
    description: 'Built for Loan Market Association standards'
  },
  {
    icon: Lock,
    text: 'ISO 27001 Security',
    description: 'Enterprise-grade security certification'
  },
  {
    icon: CheckCircle,
    text: 'Regulatory Audit Trails',
    description: 'Complete transaction logging and compliance'
  },
  {
    icon: Award,
    text: 'SOC 2 Type II',
    description: 'Independent security and compliance verification'
  }
];

export function TrustStrip() {
  return (
    <section className="relative py-16 px-6 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-emerald-200 bg-clip-text text-transparent">
              Trusted by Leading Financial Institutions
            </span>
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Built for LMA standards, ISO security and regulatory-grade audit trails.
          </p>
        </motion.div>

        {/* Trust Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustItems.map((item, index) => (
            <motion.div
              key={item.text}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 flex items-center justify-center"
              >
                <item.icon size={32} className="text-cyan-400" />
              </motion.div>
              <h3 className="text-lg font-semibold text-white mb-2">{item.text}</h3>
              <p className="text-sm text-slate-400">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Logos Row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-white/10"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {['JPMorgan', 'Goldman Sachs', 'Bank of America', 'Citigroup', 'Morgan Stanley'].map((logo, index) => (
              <motion.div
                key={logo}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="text-slate-500 text-lg font-medium hover:text-white transition-colors duration-300"
              >
                {logo}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
