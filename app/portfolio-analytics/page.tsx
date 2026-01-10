'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BarChart3, TrendingUp, TrendingDown, Activity, PieChart, Filter, Download } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

export default function PortfolioAnalyticsPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('12m');
  const [selectedMetric, setSelectedMetric] = useState<string>('all');

  // Mock portfolio data
  const portfolioPerformance = [
    { month: 'Jan', totalValue: 10500, riskScore: 72, returns: 2.1 },
    { month: 'Feb', totalValue: 10800, riskScore: 70, returns: 2.8 },
    { month: 'Mar', totalValue: 11200, riskScore: 68, returns: 3.7 },
    { month: 'Apr', totalValue: 10900, riskScore: 75, returns: -2.7 },
    { month: 'May', totalValue: 11500, riskScore: 71, returns: 5.5 },
    { month: 'Jun', totalValue: 12000, riskScore: 69, returns: 4.3 }
  ];

  const riskDistribution = [
    { name: 'Low Risk', value: 35, color: '#10b981' },
    { name: 'Medium Risk', value: 45, color: '#f59e0b' },
    { name: 'High Risk', value: 20, color: '#ef4444' }
  ];

  const sectorAllocation = [
    { sector: 'Technology', allocation: 25, performance: 8.2 },
    { sector: 'Healthcare', allocation: 20, performance: 5.1 },
    { sector: 'Energy', allocation: 18, performance: -2.3 },
    { sector: 'Finance', allocation: 22, performance: 3.7 },
    { sector: 'Real Estate', allocation: 15, performance: 1.9 }
  ];

  const scenarioAnalysis = [
    { scenario: 'Base Case', projectedValue: 12500, probability: 60 },
    { scenario: 'Optimistic', projectedValue: 14200, probability: 20 },
    { scenario: 'Pessimistic', projectedValue: 10800, probability: 20 }
  ];

  const keyMetrics = {
    totalValue: 12000,
    monthlyReturn: 4.3,
    ytdReturn: 14.3,
    riskScore: 69,
    sharpeRatio: 1.8,
    maxDrawdown: -8.2
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6">
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <BarChart3 className="text-blue-600" size={28} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-800">Portfolio Analytics</h1>
              <p className="text-slate-600 mt-1">Advanced risk modeling and scenario analysis</p>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-600">Total Value</span>
              <BarChart3 className="text-slate-400" size={20} />
            </div>
            <p className="text-2xl font-bold text-slate-800">${(keyMetrics.totalValue / 1000).toFixed(1)}B</p>
            <p className="text-sm text-green-600 mt-1">+14.3% YTD</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-600">Monthly Return</span>
              <TrendingUp className="text-green-500" size={20} />
            </div>
            <p className="text-2xl font-bold text-green-600">{keyMetrics.monthlyReturn}%</p>
            <p className="text-sm text-slate-500 mt-1">last 30 days</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-600">Risk Score</span>
              <Activity className="text-amber-500" size={20} />
            </div>
            <p className="text-2xl font-bold text-amber-600">{keyMetrics.riskScore}</p>
            <p className="text-sm text-slate-500 mt-1">moderate risk</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-600">Sharpe Ratio</span>
              <TrendingUp className="text-blue-500" size={20} />
            </div>
            <p className="text-2xl font-bold text-blue-600">{keyMetrics.sharpeRatio}</p>
            <p className="text-sm text-slate-500 mt-1">risk-adjusted</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-600">Max Drawdown</span>
              <TrendingDown className="text-red-500" size={20} />
            </div>
            <p className="text-2xl font-bold text-red-600">{keyMetrics.maxDrawdown}%</p>
            <p className="text-sm text-slate-500 mt-1">12 month period</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-600">Active Models</span>
              <Activity className="text-slate-400" size={20} />
            </div>
            <p className="text-2xl font-bold text-slate-800">12</p>
            <p className="text-sm text-slate-500 mt-1">risk models</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Filter className="text-slate-600" size={20} />
              <span className="text-sm font-medium text-slate-700">Timeframe:</span>
              <div className="flex gap-2">
                {['1m', '3m', '6m', '12m', '24m'].map(period => (
                  <button
                    key={period}
                    onClick={() => setSelectedTimeframe(period)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                      selectedTimeframe === period
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
              <Download size={16} />
              Export Report
            </button>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Portfolio Performance */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Portfolio Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={portfolioPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="totalValue" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} name="Portfolio Value ($M)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Risk Score Trend */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Risk Score Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={portfolioPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="riskScore" stroke="#f59e0b" strokeWidth={2} name="Risk Score" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Risk Distribution */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Risk Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RePieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
          </div>

          {/* Sector Performance */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Sector Performance</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={sectorAllocation}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="sector" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="performance" fill="#10b981" name="Performance %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Scenario Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Scenario Analysis</h3>
            <div className="space-y-4">
              {scenarioAnalysis.map((scenario, index) => (
                <div key={index} className="p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-slate-800">{scenario.scenario}</h4>
                    <span className="text-sm text-slate-600">{scenario.probability}% probability</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Projected Value</span>
                    <span className="text-lg font-bold text-slate-800">
                      ${(scenario.projectedValue / 1000).toFixed(1)}B
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${scenario.probability}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Metrics Summary */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Risk Model Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-blue-100">Value at Risk (95%)</span>
                <span className="font-medium">$480M</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-100">Expected Shortfall</span>
                <span className="font-medium">$620M</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-100">Beta Coefficient</span>
                <span className="font-medium">0.85</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-100">Correlation to Market</span>
                <span className="font-medium">0.72</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-100">Stress Test Pass Rate</span>
                <span className="font-medium">94.2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
