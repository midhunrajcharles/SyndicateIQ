"use client";

import { motion } from "framer-motion";

const metrics = [
  { title: "Settlement Speed", value: "+32%" },
  { title: "ESG Accuracy", value: "98.9%" },
  { title: "Risk Reduction", value: "-41%" },
  { title: "Capital Efficiency", value: "+19%" },
];

export default function MetricsTimeline() {
  return (
    <section className="py-28 overflow-x-auto">
      <div className="flex gap-8 px-12 min-w-max">
        {metrics.map((m, i) => (
          <motion.div
            key={m.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className="w-72 shrink-0 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
          >
            <p className="text-white/50">{m.title}</p>
            <p className="mt-4 text-4xl font-bold text-cyan-400">
              {m.value}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
