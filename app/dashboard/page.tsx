import Link from 'next/link';
import { LayoutDashboard, FileText, TrendingUp, Shield, Leaf, ArrowRight, BarChart3 } from 'lucide-react';
import { MetricCard } from '@/components/syndicateiq/metric-card';
import { AlertBadge } from '@/components/syndicateiq/alert-badge';
import { sampleLoans, sampleCovenantMonitoring, sampleESGData } from '@/lib/data/sampleData';

export default function DashboardPage() {
  const portfolioHealth = 85;
  const totalLoans = 247;
  const activeAlerts = 12;
  const highRiskLoans = sampleCovenantMonitoring.filter(loan => loan.riskScore > 60);
  const esgFlags = sampleESGData.filter(loan => loan.greenwashingRisk.riskLevel === 'high');
  const processedDocuments = sampleLoans.filter(loan => loan.status === 'complete').length;
  const portfolioValue = sampleLoans.reduce((sum, loan) => sum + loan.basicDetails.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                SyndicateIQ
              </h1>
              <p className="text-xl text-slate-600 mt-2">
                Portfolio Intelligence Hub
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-500">Last Updated</p>
              <p className="text-lg font-semibold text-slate-700">
                {new Date().toLocaleString()}
              </p>
            </div>
          </div>
          <p className="text-slate-600 max-w-3xl">
            Real-time insights across your syndicated loan portfolio with AI-powered risk assessment and compliance monitoring.
          </p>
        </div>

        {/* Top Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <MetricCard 
            title="Portfolio Health" 
            value={`${portfolioHealth}/100`} 
            subtitle="Overall risk score" 
            color="green" 
            trend={{ value: '+3%', positive: true }}
          />
          <MetricCard 
            title="Total Loans" 
            value={totalLoans} 
            subtitle="actively monitored" 
            icon={LayoutDashboard} 
            color="blue" 
          />
          <MetricCard 
            title="Portfolio Value" 
            value={`$${(portfolioValue / 1000000000).toFixed(1)}B`} 
            subtitle="total facility value" 
            color="slate" 
          />
          <MetricCard 
            title="Active Alerts" 
            value={activeAlerts} 
            subtitle="require attention" 
            icon={Shield} 
            color="amber" 
          />
        </div>

        {/* Module Cards */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Core Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                href: '/document-processing', 
                icon: FileText, 
                color: 'blue', 
                title: 'Document Intelligence', 
                subtitle: 'AI-powered document analysis',
                description: 'Process loan agreements 99% faster with automated extraction and verification',
                stat1: `${processedDocuments} documents processed`,
                stat2: '156 days saved this month'
              },
              { 
                href: '/due-diligence', 
                icon: TrendingUp, 
                color: 'green', 
                title: 'Due Diligence', 
                subtitle: 'Accelerated trade settlement',
                description: 'Complete due diligence 85% faster with automated compliance checks',
                stat1: '23 trades completed',
                stat2: '$460K cost saved'
              },
              { 
                href: '/covenant-monitoring', 
                icon: Shield, 
                color: 'amber', 
                title: 'Covenant Guardian', 
                subtitle: 'Real-time compliance tracking',
                description: 'Monitor covenants with predictive breach detection and automated alerts',
                stat1: `${highRiskLoans.length} high-risk loans`,
                stat2: '5 predicted breaches'
              },
              { 
                href: '/esg-monitoring', 
                icon: Leaf, 
                color: 'green', 
                title: 'ESG Veritas', 
                subtitle: 'Green loan compliance',
                description: 'Track ESG metrics and detect greenwashing risks with 96% faster reporting',
                stat1: '47 green loans tracked',
                stat2: `${esgFlags.length} high-risk flags`
              },
              { 
                href: '/portfolio-analytics', 
                icon: BarChart3, 
                color: 'blue', 
                title: 'Portfolio Analytics', 
                subtitle: 'Advanced risk modeling',
                description: 'Comprehensive portfolio analytics with scenario modeling and stress testing',
                stat1: '12 risk models active',
                stat2: 'Real-time monitoring'
              }
            ].map((module, idx) => (
              <Link 
                key={idx} 
                href={module.href} 
                className="group bg-white rounded-xl border border-slate-200 p-6 hover:border-blue-500 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 bg-${module.color}-50 rounded-lg group-hover:scale-110 transition-transform`}>
                      <module.icon className={`text-${module.color}-600`} size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">{module.title}</h3>
                      <p className="text-sm text-slate-600">{module.subtitle}</p>
                    </div>
                  </div>
                  <ArrowRight className="text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" size={20} />
                </div>
                <p className="text-sm text-slate-600 mb-4 line-clamp-2">{module.description}</p>
                <div className="space-y-1 text-sm border-t pt-3">
                  <p className="text-slate-700">→ {module.stat1}</p>
                  <p className="text-slate-700">→ {module.stat2}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800">Recent Alerts & Actions Required</h2>
              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                {activeAlerts} Active
              </span>
            </div>
            <div className="space-y-3">
              {highRiskLoans.slice(0, 2).map((loan) => 
                loan.alerts.map((alert, idx) => (
                  <AlertBadge 
                    key={`${loan.loanId}-${idx}`} 
                    severity={alert.severity} 
                    message={`${loan.borrowerName}: ${alert.message}`} 
                    timestamp={alert.triggeredDate} 
                  />
                ))
              )}
              {esgFlags.slice(0, 1).map((loan) => (
                <AlertBadge 
                  key={loan.loanId} 
                  severity="warning" 
                  message={`${loan.borrowerName}: ${loan.greenwashingRisk.flags[0]}`} 
                />
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 text-white shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Risk Score Trend</span>
                <span className="text-green-400 font-medium">↓ Improving</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Compliance Rate</span>
                <span className="text-blue-400 font-medium">94.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">ESG Coverage</span>
                <span className="text-green-400 font-medium">67%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Avg Processing Time</span>
                <span className="text-amber-400 font-medium">92 sec</span>
              </div>
            </div>
          </div>
        </div>

        {/* ROI Summary */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-xl p-8 text-white shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Annual Impact Summary</h2>
            <span className="px-4 py-2 bg-white/20 rounded-lg text-sm font-medium backdrop-blur">
              FY 2026
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Time Savings', value: '1,850', unit: 'days annually', icon: '⏱️' },
              { label: 'Cost Reduction', value: '$3.2M', unit: 'per year', icon: '💰' },
              { label: 'Loss Prevention', value: '$15M+', unit: 'avoided defaults', icon: '🛡️' },
              { label: 'Efficiency Gain', value: '85%', unit: 'average improvement', icon: '📈' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <p className="text-blue-200 text-sm mb-1">{stat.label}</p>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-blue-200 text-sm">{stat.unit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
