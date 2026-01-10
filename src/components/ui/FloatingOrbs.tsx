"use client";

import { motion } from "framer-motion";

export default function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Orb 1 */}
      <motion.div
        animate={{ x: [0, 80, -40, 0], y: [0, -60, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[-120px] top-[-120px] h-[420px] w-[420px] rounded-full bg-cyan-500/30 blur-[140px]"
      />

      {/* Orb 2 */}
      <motion.div
        animate={{ x: [0, -100, 60, 0], y: [0, 80, -40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[-140px] top-[20%] h-[480px] w-[480px] rounded-full bg-indigo-500/30 blur-[160px]"
      />

      {/* Orb 3 */}
      <motion.div
        animate={{ x: [0, 60, -20, 0], y: [0, -100, 50, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[30%] bottom-[-180px] h-[520px] w-[520px] rounded-full bg-emerald-500/20 blur-[180px]"
      />
    </div>
  );
}
