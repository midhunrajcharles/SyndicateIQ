"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";

export default function CommandCenter() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-50, 50], [10, -10]);
  const rotateY = useTransform(x, [-50, 50], [-10, 10]);

  return (
    <section className="relative py-32 flex justify-center">
      <motion.div
        style={{ rotateX, rotateY }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          x.set(e.clientX - rect.left - rect.width / 2);
          y.set(e.clientY - rect.top - rect.height / 2);
        }}
        className="relative w-[900px] max-w-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10 shadow-2xl"
      >
        <h3 className="text-xl font-semibold mb-6 text-white">
          AI Command Center
        </h3>

        <div className="grid grid-cols-3 gap-6">
          {["Risk", "ESG", "Liquidity"].map((item) => (
            <div
              key={item}
              className="rounded-xl bg-black/40 p-6 border border-white/10 text-center"
            >
              <p className="text-white/50">{item}</p>
              <p className="mt-3 text-3xl font-bold text-cyan-400">
                {Math.floor(Math.random() * 100)}%
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
