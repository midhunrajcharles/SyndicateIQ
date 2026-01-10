import Navigation from "@/components/ui/Navigation";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center max-w-5xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-white via-cyan-200 to-emerald-200 bg-clip-text text-transparent">
              SyndicateIQ
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-emerald-300 bg-clip-text text-transparent">
              AI Operating System
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Transforming syndicated loan operations with AI-powered automation across all 5 LMA categories.
          </motion.p>
        </motion.div>
      </section>
    </main>
  );
}
