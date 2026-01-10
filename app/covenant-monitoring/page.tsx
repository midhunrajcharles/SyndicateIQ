'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, AlertTriangle, TrendingUp, TrendingDown, Minus, Eye, Filter } from 'lucide-react';
import { RiskGauge } from '@/components/syndicateiq/risk-gauge';
import { AlertBadge } from '@/components/syndicateiq/alert-badge';
import { sampleCovenantMonitoring } from '@/lib/data/sampleData';

export default function CovenantMonitoringPage() {
  const [selectedRiskLevel, setSelectedRiskLevel] = useState<string>('all');
  const [showDetails, setShowDetails] = useState<string[]>([]);

  const filteredData = selectedRiskLevel === 'all' 
    ? sampleCovenantMonitoring 
    : sampleCovenantMonitoring.filter(loan => {
        if (selectedRiskLevel === 'high') return loan.riskScore > 60;
        if (selectedRiskLevel === 'medium') return loan.riskScore >= 30 && loan.riskScore <= 60;
        if (selectedRiskLevel === 'low') return loan.riskScore < 30;
        return true;
      });

  const getRiskLevel = (score: number) => {
    if (score > 60) return 'high';
    if (score >= 30) return 'medium';
    return 'low';
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-slate-600 bg-slate-50 border-slate-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="text-green-600" size={16} />;
      case 'deteriorating': return <TrendingDown className="text-red-600" size={16} />;
      default: return <Minus className="text-slate-600" size={16} />;
    }
  };

  const getBreachProbabilityColor = (probability: number) => {
    if (probability > 60) return 'text-red-600';
    if (probability >= 30) return 'text-amber-600';
    return 'text-green-600';
  };

  const toggleDetails = (loanId: string) => {
    setShowDetails(prev => 
      prev.includes(loanId) 
        ? prev.filter(id => id !== loanId)
        : [...prev, loanId]
    );
  };

  const overallStats = {
    totalLoans: sampleCovenantMonitoring.length,
    highRisk: sampleCovenantMonitoring.filter(loan => loan.riskScore > 60).length,
    mediumRisk: sampleCovenantMonitoring.filter(loan => loan.riskScore >= 30 && loan.riskScore <= 60).length,
    lowRisk: sampleCovenantMonitoring.filter(loan => loan.riskScore < 30).length,
    avgRiskScore: Math.round(sampleCovenantMonitoring.reduce((sum, loan) => sum + loan.riskScore, 0) / sampleCovenantMonitoring.length),
    totalAlerts: sampleCovenantMonitoring.reduce((sum, loan) => sum + loan.alerts.length, 0)
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
            <div className="p-3 bg-amber-50 rounded-lg">
              <Shield className="text-amber-600" size={28} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-800">Covenant Guardian</h1>
              <p className="text-slate-600 mt-1">Real-time compliance tracking with predictive breach detection</p>
            </div>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-600">Total Loans</span>
              <Shield className="text-slate-400" size={20} />
            </div>
            <p className="text-3xl font-bold text-slate-800">{overallStats.totalLoans}</p>
            <p className="text-sm text-slate-500 mt-1">actively monitored</p>
          </div>

          <div className="bg-white rounded-xl border border-red-200 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-600">High Risk</span>
              <AlertTriangle className="text-red-500" size={20} />
            </div>
            <p className="text-3xl font-bold text-red-600">{overallStats.highRisk}</p>
            <p className="text-sm text-slate-500 mt-1">require attention</p>
          </div>

          <div className="bg-white rounded-xl border border-amber-200 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-600">Medium Risk</span>
              <Minus className="text-amber-500" size={20} />
            </div>
            <p className="text-3xl font-bold text-amber-600">{overallStats.mediumRisk}</p>
            <p className="text-sm text-slate-500 mt-1">monitor closely</p>
          </div>

          <div className="bg-white rounded-xl border border-green-200 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-600">Low Risk</span>
              <TrendingUp className="text-green-500" size={20} />
            </div>
            <p className="text-3xl font-bold text-green-600">{overallStats.lowRisk}</p>
            <p className="text-sm text-slate-500 mt-1">performing well</p>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-600">Active Alerts</span>
              <AlertTriangle className="text-slate-400" size={20} />
            </div>
            <p className="text-3xl font-bold text-slate-800">{overallStats.totalAlerts}</p>
            <p className="text-sm text-slate-500 mt-1">need action</p>
          </div>
        </div>

        {/* Risk Filter */}
        <div className="mb-6">
          <div className="flex items-center gap-4">
            <Filter className="text-slate-600" size={20} />
            <span className="text-sm font-medium text-slate-700">Filter by Risk Level:</span>
            <div className="flex gap-2">
              {['all', 'high', 'medium', 'low'].map(level => (
                <button
                  key={level}
                  onClick={() => setSelectedRiskLevel(level)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedRiskLevel === level
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {level === 'all' ? 'All Loans' : `${level.charAt(0).toUpperCase() + level.slice(1)} Risk`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {filteredData.map((loan) => (
            <div key={loan.loanId} className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">
              {/* Loan Header */}
              <div className={`p-6 border-b ${getRiskColor(getRiskLevel(loan.riskScore))}`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">{loan.borrowerName}</h3>
                    <p className="text-sm text-slate-600">Loan ID: {loan.loanId}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-lg font-medium border ${getRiskColor(getRiskLevel(loan.riskScore))}`}>
                    {getRiskLevel(loan.riskScore).toUpperCase()} RISK
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <RiskGauge score={loan.riskScore} label="Risk Score" size="sm" />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-1">
                      <span className={getBreachProbabilityColor(loan.breachProbability)}>
                        {loan.breachProbability}%
                      </span>
                    </div>
                    <div className="text-sm text-slate-600">Breach Probability</div>
                    <div className="text-xs text-slate-500">{loan.forecastPeriod} days forecast</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-slate-800 mb-1">
                      {loan.covenants.length}
                    </div>
                    <div className="text-sm text-slate-600">Covenants</div>
                    <div className="text-xs text-slate-500">actively tracked</div>
                  </div>
                </div>
              </div>

              {/* Covenant Details */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-slate-800">Covenant Ratios</h4>
                  <button
                    onClick={() => toggleDetails(loan.loanId)}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    <Eye size={16} />
                    {showDetails.includes(loan.loanId) ? 'Hide Details' : 'Show Details'}
                  </button>
                </div>

                <div className="space-y-3">
                  {loan.covenants.map((covenant, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        {getTrendIcon(covenant.trend)}
                        <div>
                          <p className="font-medium text-slate-800">{covenant.type}</p>
                          <p className="text-sm text-slate-600">Limit: {covenant.limit}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-800">{covenant.currentValue}x</p>
                        <p className="text-sm text-slate-600">{covenant.cushion}% cushion</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Expanded Details */}
                {showDetails.includes(loan.loanId) && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h5 className="font-medium text-blue-900 mb-2">Detailed Analysis</h5>
                    <div className="space-y-2 text-sm text-blue-800">
                      <p>• Risk assessment based on historical performance and market conditions</p>
                      <p>• Forecast period accounts for seasonal business variations</p>
                      <p>• Cushion calculated as percentage difference from covenant limit</p>
                      <p>• Trend analysis based on last 12 months of financial data</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Alerts Section */}
              {loan.alerts.length > 0 && (
                <div className="p-6 bg-slate-50 border-t border-slate-200">
                  <h4 className="font-semibold text-slate-800 mb-3">Active Alerts</h4>
                  <div className="space-y-2">
                    {loan.alerts.map((alert, index) => (
                      <AlertBadge
                        key={index}
                        severity={alert.severity}
                        message={alert.message}
                        timestamp={alert.triggeredDate}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Risk Distribution Summary */}
        <div className="bg-gradient-to-r from-amber-600 to-amber-700 rounded-xl p-8 text-white shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Portfolio Risk Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">{overallStats.avgRiskScore}</div>
              <div className="text-amber-100">Average Risk Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">
                {Math.round((overallStats.highRisk / overallStats.totalLoans) * 100)}%
              </div>
              <div className="text-amber-100">High Risk Concentration</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">90</div>
              <div className="text-amber-100">Day Forecast Period</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-amber-100">Monitoring Coverage</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
