'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  delay?: number;
}

export function GlassCard({ children, className = '', hover = true, glow = true, delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.23, 1, 0.32, 1] }}
      whileHover={hover ? {
        y: -5,
        scale: 1.02,
        transition: { duration: 0.3 }
      } : undefined}
      className={`
        relative backdrop-blur-xl bg-white/5 
        border border-white/10 rounded-2xl
        shadow-2xl shadow-black/20
        ${glow ? 'before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-r before:from-cyan-500/20 before:via-blue-500/20 before:to-emerald-500/20 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100' : ''}
        after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-br after:from-white/10 after:to-transparent after:opacity-50
        ${className}
      `}
    >
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
