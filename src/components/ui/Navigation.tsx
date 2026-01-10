"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  FileText, 
  TrendingUp, 
  Shield, 
  Leaf, 
  BarChart3,
  ArrowRight,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

const navItems = [
  {
    href: "/",
    icon: BarChart3,
    title: "Dashboard",
    description: "Portfolio overview"
  },
  {
    href: "/document-processing",
    icon: FileText,
    title: "Document Processing",
    description: "99% faster"
  },
  {
    href: "/due-diligence",
    icon: TrendingUp,
    title: "Due Diligence",
    description: "85% faster"
  },
  {
    href: "/covenant-monitoring",
    icon: Shield,
    title: "Covenant Monitoring",
    description: "70% reduction"
  },
  {
    href: "/esg-monitoring",
    icon: Leaf,
    title: "ESG Monitoring",
    description: "96% faster"
  }
];

export default function Navigation() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl transition-all duration-300"
        style={{ width: isExpanded ? '280px' : '80px' }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-white">
              SyndicateIQ
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-3 px-4 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  <item.icon size={18} />
                  <div className="hidden lg:block">
                    <p className="font-medium text-sm">{item.title}</p>
                    <p className="text-xs text-white/60">{item.description}</p>
                  </div>
                  <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="md:hidden p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300"
            >
              {isExpanded ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          className="fixed top-16 left-0 right-0 z-40 bg-black/95 backdrop-blur-xl md:hidden"
        >
          <div className="px-6 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-4 px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 mb-2"
              >
                <item.icon size={20} />
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-white/60">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
}
