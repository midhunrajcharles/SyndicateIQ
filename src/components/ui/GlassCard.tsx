"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  title: string;
  value?: string;
  subtitle?: string;
  icon?: ReactNode;
  children?: ReactNode;
}

export default function GlassCard({
  title,
  value,
  subtitle,
  icon,
  children,
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 180, damping: 14 }}
      className="relative group rounded-2xl overflow-hidden"
    >
      {/* Glow Border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/40 via-blue-500/20 to-emerald-400/40 opacity-40 blur-xl group-hover:opacity-80 transition" />

      {/* Glass Surface */}
      <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 shadow-xl">
        {/* Shine */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white/60">{title}</p>
            {value && (
              <h3 className="mt-1 text-3xl font-semibold text-white">
                {value}
              </h3>
            )}
            {subtitle && (
              <p className="mt-1 text-xs text-white/40">{subtitle}</p>
            )}
          </div>

          {icon && (
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white">
              {icon}
            </div>
          )}
        </div>

        {/* Custom Content */}
        {children && <div className="mt-4">{children}</div>}
      </div>
    </motion.div>
  );
}
