"use client";

import { motion } from "framer-motion";

const systems = [
  { name: "Risk Engine", status: "Operational" },
  { name: "ESG Validator", status: "Operational" },
  { name: "Settlement AI", status: "Degraded" },
  { name: "Data Ingestion", status: "Operational" },
];

export default function SystemStatus() {
  return (
    <section className="py-24 px-12">
      <h2 className="text-3xl font-semibold text-white mb-10">
        Platform Health
      </h2>

      <div className="grid md:grid-cols-4 gap-6">
        {systems.map((sys, i) => (
          <motion.div
            key={sys.name}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2 + i, repeat: Infinity }}
            className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-6"
          >
            <p className="text-white/60">{sys.name}</p>
            <p
              className={`mt-2 font-semibold ${
                sys.status === "Operational"
                  ? "text-emerald-400"
                  : "text-yellow-400"
              }`}
            >
              {sys.status}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
