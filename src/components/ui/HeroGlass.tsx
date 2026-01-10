"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroGlass() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 max-w-4xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-12 shadow-2xl text-center"
      >
        <p className="text-xs tracking-widest text-cyan-300 uppercase mb-3">
          AI Banking Intelligence Platform
        </p>

        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
          Real-Time Intelligence for <br />
          <span className="text-cyan-400">Smarter Lending</span>
        </h1>

        <p className="mt-6 text-white/60 max-w-xl mx-auto">
          Monitor ESG compliance, optimize portfolio risk, and accelerate
          institutional lending decisions with AI-powered analytics.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link 
            href="/dashboard"
            className="rounded-full bg-cyan-500 px-8 py-3 text-black font-semibold hover:bg-cyan-400 transition"
          >
            Launch Platform
          </Link>

          <Link 
            href="/dashboard"
            className="rounded-full border border-white/20 px-8 py-3 text-white hover:bg-white/10 transition"
          >
            View Demo
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
