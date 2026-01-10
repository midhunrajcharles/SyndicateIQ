'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Leaf, AlertTriangle, CheckCircle, XCircle, TrendingUp, TrendingDown, BarChart3, PieChart, Activity } from 'lucide-react';
import { AlertBadge } from '@/components/syndicateiq/alert-badge';
import { sampleESGData } from '@/lib/data/sampleData';
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

export default function ESGMonitoringPage() {
  const [selectedLoan, setSelectedLoan] = useState<string>(sampleESGData[0].loanId);
  const [activeTab, setActiveTab] = useState<'overview' | 'emissions' | 'compliance'>('overview');

  const currentLoan = sampleESGData.find(loan => loan.loanId === selectedLoan) || sampleESGData[0];

  // Mock historical data for charts
  const emissionsTrendData = [
    { month: 'Jan', reported: 15, verified: 14, target: 12 },
    { month: 'Feb', reported: 14, verified: 13, target: 12 },
    { month: 'Mar', reported: 13, verified: 12, target: 11 },
    { month: 'Apr', reported: 12, verified: 11, target: 10 },
    { month: 'May', reported: 11, verified: 10, target: 9 },
    { month: 'Jun', reported: 10, verified: 9, target: 8 }
  ];

  const complianceData = [
    { category: 'Environmental', score: 85, max: 100 },
    { category: 'Social', score: 78, max: 100 },
    { category: 'Governance', score: 92, max: 100 },
    { category: 'Climate Risk', score: 70, max: 100 },
    { category: 'Sustainability', score: 88, max: 100 }
  ];

  const portfolioDistribution = [
    { name: 'Green Loans', value: 47, color: '#10b981' },
    { name: 'Regular Loans', value: 200, color: '#6b7280' },
    { name: 'Transition Loans', value: 23, color: '#3b82f6' }
  ];

  const radarData = [
    { subject: 'Emissions', A: currentLoan.emissions.verified, fullMark: 20 },
    { subject: 'Reporting', A: currentLoan.reporting.completeness, fullMark: 100 },
    { subject: 'Transparency', A: currentLoan.greenwashingRisk.transparencyScore, fullMark: 100 },
    { subject: 'Compliance', A: currentLoan.lmaCompliance.reportingAligned ? 90 : 40, fullMark: 100 },
    { subject: 'Verification', A: currentLoan.emissions.verificationDate ? 95 : 30, fullMark: 100 }
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const overallStats = {
    totalLoans: sampleESGData.length,
    greenLoans: sampleESGData.filter(loan => loan.greenLoanStatus).length,
    highRiskFlags: sampleESGData.filter(loan => loan.greenwashingRisk.riskLevel === 'high').length,
    avgTransparency: Math.round(
      sampleESGData.reduce((sum, loan) => sum + loan.greenwashingRisk.transparencyScore, 0) / sampleESGData.length
    )
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-green-600 hover:text-green-800 mb-6">
            <ArrowLeft size={20} />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <Leaf className="text-green-600" size={28} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-800">ESG Veritas</h1>
              <p className="text-slate-600 mt-1">Green loan compliance and greenwashing risk detection</p>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-600">Total Loans</span>
              <Leaf className="text-slate-400" size={20} />
            </div>
            <p className="text-3xl font-bold text-slate-800">{overallStats.totalLoans}</p>
            <p className="text-sm text-slate-500 mt-1">ESG tracked</p>
          </div>

          <div className="bg-white rounded-xl border border-green-200 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-600">Green Loans</span>
              <CheckCircle className="text-green-500" size={20} />
            </div>
            <p className="text-3xl font-bold text-green-600">{overallStats.greenLoans}</p>
            <p className="text-sm text-slate-500 mt-1">certified</p>
          </div>

          <div className="bg-white rounded-xl border border-red-200 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-600">High Risk Flags</span>
              <AlertTriangle className="text-red-500" size={20} />
            </div>
            <p className="text-3xl font-bold text-red-600">{overallStats.highRiskFlags}</p>
            <p className="text-sm text-slate-500 mt-1">need review</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-600">Avg Transparency</span>
              <BarChart3 className="text-slate-400" size={20} />
            </div>
            <p className="text-3xl font-bold text-slate-800">{overallStats.avgTransparency}%</p>
            <p className="text-sm text-slate-500 mt-1">portfolio score</p>
          </div>
        </div>

        {/* Loan Selector and Tabs */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Select Loan:</label>
              <select
                value={selectedLoan}
                onChange={(e) => setSelectedLoan(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                {sampleESGData.map(loan => (
                  <option key={loan.loanId} value={loan.loanId}>
                    {loan.borrowerName} ({loan.loanId})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-2">
              {[
                { id: 'overview', label: 'Overview', icon: Activity },
                { id: 'emissions', label: 'Emissions', icon: TrendingUp },
                { id: 'compliance', label: 'Compliance', icon: CheckCircle }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-green-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Current Loan Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg font-medium border ${
                currentLoan.greenLoanStatus ? 'bg-green-50 text-green-800 border-green-200' : 'bg-slate-50 text-slate-800 border-slate-200'
              }`}>
                {currentLoan.greenLoanStatus ? <CheckCircle size={16} /> : <XCircle size={16} />}
                {currentLoan.greenLoanStatus ? 'Green Loan' : 'Regular Loan'}
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-600">Greenwashing Risk</p>
              <p className={`text-lg font-bold ${getRiskColor(currentLoan.greenwashingRisk.riskLevel)}`}>
                {currentLoan.greenwashingRisk.riskLevel.toUpperCase()}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-600">Transparency Score</p>
              <p className={`text-lg font-bold ${getScoreColor(currentLoan.greenwashingRisk.transparencyScore)}`}>
                {currentLoan.greenwashingRisk.transparencyScore}%
              </p>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Emissions Performance Chart */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Emissions Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={emissionsTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="reported" stroke="#3b82f6" name="Reported" />
                  <Line type="monotone" dataKey="verified" stroke="#10b981" name="Verified" />
                  <Line type="monotone" dataKey="target" stroke="#f59e0b" name="Target" strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* ESG Radar Chart */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">ESG Performance Radar</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Score" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'emissions' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Emissions Trend */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Emissions Reduction Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">Current Reduction</span>
                    <span className={`font-bold ${getScoreColor(currentLoan.emissions.currentReduction)}`}>
                      {currentLoan.emissions.currentReduction}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.max(0, currentLoan.emissions.currentReduction)}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">Target Reduction</span>
                    <span className="font-bold text-slate-800">{currentLoan.emissions.targetReduction}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${currentLoan.emissions.targetReduction}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-700">Reported Emissions</p>
                    <p className="text-2xl font-bold text-green-800">{currentLoan.emissions.reported}</p>
                    <p className="text-xs text-green-600">tons CO2e</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">Verified Emissions</p>
                    <p className="text-2xl font-bold text-blue-800">{currentLoan.emissions.verified}</p>
                    <p className="text-xs text-blue-600">tons CO2e</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Status */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Verification Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-800">Third-Party Verification</p>
                    <p className="text-sm text-slate-600">
                      {currentLoan.emissions.verificationDate 
                        ? `Verified on ${currentLoan.emissions.verificationDate.toLocaleDateString()}`
                        : 'Not verified'
                      }
                    </p>
                  </div>
                  {currentLoan.emissions.verificationDate ? (
                    <CheckCircle className="text-green-600" size={24} />
                  ) : (
                    <XCircle className="text-red-600" size={24} />
                  )}
                </div>

                <div className="p-4 bg-amber-50 rounded-lg">
                  <p className="font-medium text-amber-800 mb-2">Data Discrepancy</p>
                  <p className="text-sm text-amber-700">
                    {Math.abs(currentLoan.emissions.reported - currentLoan.emissions.verified)}% difference 
                    between reported and verified emissions
                  </p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="font-medium text-blue-800 mb-2">Baseline Year</p>
                  <p className="text-2xl font-bold text-blue-800">{currentLoan.emissions.baselineYear}</p>
                  <p className="text-sm text-blue-600">Emissions baseline established</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'compliance' && (
          <div className="space-y-8">
            {/* Compliance Checklist */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">LMA Compliance Checklist</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium text-slate-700">Green Loan Principles</h4>
                  <div className="flex items-center gap-2">
                    {currentLoan.lmaCompliance.greenLoanPrinciples ? (
                      <CheckCircle className="text-green-600" size={20} />
                    ) : (
                      <XCircle className="text-red-600" size={20} />
                    )}
                    <span className="text-slate-700">
                      {currentLoan.lmaCompliance.greenLoanPrinciples ? 'Compliant' : 'Non-Compliant'}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-slate-700">Sustainability Coordinator</h4>
                  <div className="flex items-center gap-2">
                    {currentLoan.lmaCompliance.sustainabilityCoordinator ? (
                      <CheckCircle className="text-green-600" size={20} />
                    ) : (
                      <XCircle className="text-red-600" size={20} />
                    )}
                    <span className="text-slate-700">
                      {currentLoan.lmaCompliance.sustainabilityCoordinator ? 'Appointed' : 'Not Appointed'}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-slate-700">Reporting Alignment</h4>
                  <div className="flex items-center gap-2">
                    {currentLoan.lmaCompliance.reportingAligned ? (
                      <CheckCircle className="text-green-600" size={20} />
                    ) : (
                      <XCircle className="text-red-600" size={20} />
                    )}
                    <span className="text-slate-700">
                      {currentLoan.lmaCompliance.reportingAligned ? 'Aligned' : 'Not Aligned'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reporting Compliance */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Reporting Compliance</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-sm text-slate-600 mb-2">Reporting Frequency</p>
                  <p className="text-lg font-bold text-slate-800">{currentLoan.reporting.frequency}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-slate-600 mb-2">Last Submitted</p>
                  <p className="text-lg font-bold text-slate-800">
                    {currentLoan.reporting.lastSubmitted 
                      ? currentLoan.reporting.lastSubmitted.toLocaleDateString()
                      : 'Never'
                    }
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-slate-600 mb-2">Missed Reports</p>
                  <p className={`text-lg font-bold ${currentLoan.reporting.missedReports > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {currentLoan.reporting.missedReports}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-slate-600 mb-2">Completeness</p>
                  <p className={`text-lg font-bold ${getScoreColor(currentLoan.reporting.completeness)}`}>
                    {currentLoan.reporting.completeness}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Greenwashing Risk Alerts */}
        {currentLoan.greenwashingRisk.flags.length > 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg mb-8">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Greenwashing Risk Flags</h3>
            <div className="space-y-3">
              {currentLoan.greenwashingRisk.flags.map((flag, index) => (
                <AlertBadge
                  key={index}
                  severity={currentLoan.greenwashingRisk.riskLevel === 'high' ? 'critical' : 'warning'}
                  message={flag}
                />
              ))}
            </div>
          </div>
        )}

        {/* Portfolio Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Portfolio ESG Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RePieChart>
                <Pie
                  data={portfolioDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {portfolioDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Compliance Scores</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={complianceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
