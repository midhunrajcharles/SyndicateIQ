"use client";

import { motion } from "framer-motion";

const bars = [65, 80, 45, 90, 72, 60];

export default function GlassCharts() {
  return (
    <section className="relative z-10 px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 shadow-2xl"
      >
        <h2 className="text-3xl font-semibold text-white mb-8">
          Portfolio Risk Analytics
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Bar Chart */}
          <div>
            <p className="mb-4 text-white/60">Risk Distribution</p>
            <div className="flex items-end gap-4 h-48">
              {bars.map((value, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${value}%` }}
                  transition={{ delay: i * 0.1 }}
                  className="w-full rounded-lg bg-gradient-to-t from-cyan-500 to-blue-400 shadow-lg"
                />
              ))}
            </div>
          </div>

          {/* KPI Panel */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "ESG Score", value: "96%" },
              { label: "Default Risk", value: "Low" },
              { label: "Settlement Speed", value: "+28%" },
              { label: "Green Loans", value: "142" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-5 text-center"
              >
                <p className="text-sm text-white/50">{item.label}</p>
                <p className="mt-2 text-2xl font-bold text-white">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
