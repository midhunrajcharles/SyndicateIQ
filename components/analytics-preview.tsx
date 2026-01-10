'use client';

import { motion } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { GlassCard } from './ui/glass-card';

const portfolioData = [
  { month: 'Jan', value: 4500, risk: 65 },
  { month: 'Feb', value: 5200, risk: 62 },
  { month: 'Mar', value: 4800, risk: 68 },
  { month: 'Apr', value: 5800, risk: 58 },
  { month: 'May', value: 6200, risk: 55 },
  { month: 'Jun', value: 7100, risk: 52 }
];

const riskData = [
  { name: 'Low Risk', value: 35, color: '#10b981' },
  { name: 'Medium Risk', value: 45, color: '#f59e0b' },
  { name: 'High Risk', value: 20, color: '#ef4444' }
];

const esgData = [
  { category: 'Environmental', score: 85 },
  { category: 'Social', score: 78 },
  { category: 'Governance', score: 92 }
];

export function AnalyticsPreview() {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-slate-900/40" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-emerald-200 bg-clip-text text-transparent">
              Advanced Analytics Dashboard
            </span>
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Real-time insights powered by machine learning algorithms
          </p>
        </motion.div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Portfolio Performance Chart */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <GlassCard className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Portfolio Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={portfolioData}>
                  <defs>
                    <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: '1px solid rgba(6, 182, 212, 0.5)',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#06b6d4" 
                    strokeWidth={3}
                    fill="url(#portfolioGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </GlassCard>
          </motion.div>

          {/* Risk Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <GlassCard className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Risk Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={riskData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {riskData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              
              {/* Legend */}
              <div className="flex justify-center gap-6 mt-6">
                {riskData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-slate-300">{item.name}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* ESG Risk Heatmap */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <GlassCard className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6">ESG Risk Heatmap</h3>
              <div className="grid grid-cols-3 gap-4">
                {esgData.map((item, index) => (
                  <motion.div
                    key={item.category}
                    whileHover={{ scale: 1.05 }}
                    className="text-center p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10"
                  >
                    <div className="text-3xl font-bold text-white mb-2">{item.score}%</div>
                    <div className="text-sm text-slate-300">{item.category}</div>
                    <div className="mt-3 w-full bg-white/10 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.score}%` }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className={`h-full rounded-full ${
                          item.score >= 85 ? 'bg-emerald-500' : 
                          item.score >= 70 ? 'bg-amber-500' : 'bg-red-500'
                        }`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>

          {/* Loan Distribution */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <GlassCard className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Portfolio Allocation</h3>
              <div className="space-y-4">
                {[
                  { sector: 'Technology', allocation: 35, trend: '+12%' },
                  { sector: 'Healthcare', allocation: 25, trend: '+8%' },
                  { sector: 'Finance', allocation: 20, trend: '+5%' },
                  { sector: 'Energy', allocation: 12, trend: '-3%' },
                  { sector: 'Real Estate', allocation: 8, trend: '+2%' }
                ].map((item, index) => (
                  <motion.div
                    key={item.sector}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <span className="text-white font-medium">{item.sector}</span>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-white font-bold">{item.allocation}%</div>
                        <div className={`text-sm ${item.trend.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                          {item.trend}
                        </div>
                      </div>
                      <div className="w-20 bg-white/10 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.allocation}%` }}
                          transition={{ duration: 1, delay: 1 }}
                          className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
