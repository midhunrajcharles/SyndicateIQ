'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { TrendingUp, Shield, AlertTriangle, DollarSign } from 'lucide-react';
import { GlassCard } from './ui/glass-card';

interface StatCard {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  color: string;
  targetValue: number;
}

const stats: StatCard[] = [
  {
    title: 'Portfolio Health',
    value: '92%',
    subtitle: 'Overall risk score',
    icon: TrendingUp,
    color: 'text-emerald-400',
    targetValue: 92
  },
  {
    title: 'ESG Compliance',
    value: '98%',
    subtitle: 'Regulatory adherence',
    icon: Shield,
    color: 'text-cyan-400',
    targetValue: 98
  },
  {
    title: 'Active Risks',
    value: '12',
    subtitle: 'Require attention',
    icon: AlertTriangle,
    color: 'text-amber-400',
    targetValue: 12
  },
  {
    title: 'Capital Efficiency',
    value: '+18%',
    subtitle: 'vs last quarter',
    icon: DollarSign,
    color: 'text-blue-400',
    targetValue: 18
  }
];

function AnimatedCounter({ value, targetValue }: { value: string; targetValue: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = targetValue / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= targetValue) {
          current = targetValue;
          clearInterval(timer);
        }
        setCount(current);
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, targetValue]);

  return (
    <span ref={ref}>
      {typeof targetValue === 'number' && value.includes('%')
        ? `${Math.round(count)}%`
        : value.includes('+')
        ? `+${Math.round(count)}%`
        : Math.round(count).toString()
      }
    </span>
  );
}

export function FloatingStats() {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-2xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full blur-2xl" />
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
              Real-Time Performance Metrics
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Monitor your portfolio health with AI-driven insights and predictive analytics
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <GlassCard className="p-8 text-center group">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                  className={`w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-r from-white/10 to-white/5 flex items-center justify-center ${stat.color}`}
                >
                  <stat.icon size={32} />
                </motion.div>

                {/* Value */}
                <div className="mb-4">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    <AnimatedCounter value={stat.value} targetValue={stat.targetValue} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-1">{stat.title}</h3>
                  <p className="text-slate-400">{stat.subtitle}</p>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${stat.targetValue}%` }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"
                  />
                </div>

                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
