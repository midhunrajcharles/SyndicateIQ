'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, AlertTriangle, XCircle, FileText, TrendingUp, Shield, Clock, DollarSign, Users, Building } from 'lucide-react';

interface VerificationItem {
  id: string;
  category: string;
  item: string;
  status: 'pass' | 'warning' | 'fail' | 'pending';
  details: string;
  priority: 'high' | 'medium' | 'low';
  lastChecked: string;
}

interface DueDiligenceSummary {
  overallScore: number;
  totalItems: number;
  passedItems: number;
  warningItems: number;
  failedItems: number;
  pendingItems: number;
  estimatedTimeToComplete: string;
  riskLevel: 'low' | 'medium' | 'high';
}

export default function DueDiligencePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const verificationData: VerificationItem[] = [
    // Financial Verification
    {
      id: 'fin-001',
      category: 'Financial',
      item: 'Financial Statements Verification',
      status: 'pass',
      details: 'Q3 2025 financial statements audited and verified. All metrics within acceptable ranges.',
      priority: 'high',
      lastChecked: '2026-01-08 14:30'
    },
    {
      id: 'fin-002',
      category: 'Financial',
      item: 'Cash Flow Analysis',
      status: 'pass',
      details: 'Operating cash flow increased 15% YoY. Debt service coverage ratio at 2.3x.',
      priority: 'high',
      lastChecked: '2026-01-08 14:45'
    },
    {
      id: 'fin-003',
      category: 'Financial',
      item: 'Debt Structure Review',
      status: 'warning',
      details: 'Total debt ratio at 3.8x, slightly above preferred 3.5x threshold.',
      priority: 'medium',
      lastChecked: '2026-01-08 15:00'
    },
    {
      id: 'fin-004',
      category: 'Financial',
      item: 'Revenue Recognition',
      status: 'pass',
      details: 'Revenue recognition policies compliant with IFRS 15. No irregularities detected.',
      priority: 'medium',
      lastChecked: '2026-01-08 15:15'
    },

    // Legal & Compliance
    {
      id: 'legal-001',
      category: 'Legal & Compliance',
      item: 'Corporate Documentation',
      status: 'pass',
      details: 'Articles of incorporation, bylaws, and board resolutions current and valid.',
      priority: 'high',
      lastChecked: '2026-01-08 16:00'
    },
    {
      id: 'legal-002',
      category: 'Legal & Compliance',
      item: 'Regulatory Licenses',
      status: 'pass',
      details: 'All required licenses and permits valid. No regulatory violations found.',
      priority: 'high',
      lastChecked: '2026-01-08 16:15'
    },
    {
      id: 'legal-003',
      category: 'Legal & Compliance',
      item: 'Pending Litigation Review',
      status: 'warning',
      details: 'Two minor commercial disputes ongoing. Estimated exposure under $50K.',
      priority: 'medium',
      lastChecked: '2026-01-08 16:30'
    },
    {
      id: 'legal-004',
      category: 'Legal & Compliance',
      item: 'Contract Compliance',
      status: 'fail',
      details: 'Three major contracts missing standard compliance clauses. Immediate action required.',
      priority: 'high',
      lastChecked: '2026-01-08 16:45'
    },

    // Operational
    {
      id: 'ops-001',
      category: 'Operational',
      item: 'Management Team Review',
      status: 'pass',
      details: 'Key management personnel experienced and qualified. Low turnover rate.',
      priority: 'high',
      lastChecked: '2026-01-08 17:00'
    },
    {
      id: 'ops-002',
      category: 'Operational',
      item: 'Supply Chain Analysis',
      status: 'pass',
      details: 'Diverse supplier base with good redundancy. No single points of failure.',
      priority: 'medium',
      lastChecked: '2026-01-08 17:15'
    },
    {
      id: 'ops-003',
      category: 'Operational',
      item: 'IT Systems Assessment',
      status: 'warning',
      details: 'Core systems operational but cybersecurity framework needs updates.',
      priority: 'high',
      lastChecked: '2026-01-08 17:30'
    },
    {
      id: 'ops-004',
      category: 'Operational',
      item: 'Quality Control Systems',
      status: 'pass',
      details: 'ISO 9001 certified. Quality metrics consistently above industry average.',
      priority: 'medium',
      lastChecked: '2026-01-08 17:45'
    },

    // ESG & Risk
    {
      id: 'esg-001',
      category: 'ESG & Risk',
      item: 'Environmental Compliance',
      status: 'pass',
      details: 'All environmental permits current. No violations in past 3 years.',
      priority: 'medium',
      lastChecked: '2026-01-08 18:00'
    },
    {
      id: 'esg-002',
      category: 'ESG & Risk',
      item: 'Social Impact Assessment',
      status: 'pass',
      details: 'Strong community engagement programs. Employee satisfaction at 87%.',
      priority: 'low',
      lastChecked: '2026-01-08 18:15'
    },
    {
      id: 'esg-003',
      category: 'ESG & Risk',
      item: 'Climate Risk Analysis',
      status: 'warning',
      details: 'Climate risk exposure moderate. Transition plan being developed.',
      priority: 'medium',
      lastChecked: '2026-01-08 18:30'
    },
    {
      id: 'esg-004',
      category: 'ESG & Risk',
      item: 'Governance Structure',
      status: 'pass',
      details: 'Board independence and oversight strong. ESG committee established.',
      priority: 'high',
      lastChecked: '2026-01-08 18:45'
    }
  ];

  const categories = ['all', 'Financial', 'Legal & Compliance', 'Operational', 'ESG & Risk'];

  const filteredData = selectedCategory === 'all' 
    ? verificationData 
    : verificationData.filter(item => item.category === selectedCategory);

  const summary: DueDiligenceSummary = {
    overallScore: 78,
    totalItems: verificationData.length,
    passedItems: verificationData.filter(item => item.status === 'pass').length,
    warningItems: verificationData.filter(item => item.status === 'warning').length,
    failedItems: verificationData.filter(item => item.status === 'fail').length,
    pendingItems: verificationData.filter(item => item.status === 'pending').length,
    estimatedTimeToComplete: '2-3 business days',
    riskLevel: 'medium'
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="text-green-600" size={20} />;
      case 'warning':
        return <AlertTriangle className="text-amber-600" size={20} />;
      case 'fail':
        return <XCircle className="text-red-600" size={20} />;
      default:
        return <Clock className="text-slate-400" size={20} />;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pass: 'bg-green-100 text-green-800 border-green-200',
      warning: 'bg-amber-100 text-amber-800 border-amber-200',
      fail: 'bg-red-100 text-red-800 border-red-200',
      pending: 'bg-slate-100 text-slate-800 border-slate-200'
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const styles = {
      high: 'bg-red-50 text-red-700 border-red-200',
      medium: 'bg-amber-50 text-amber-700 border-amber-200',
      low: 'bg-blue-50 text-blue-700 border-blue-200'
    };
    
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium border ${styles[priority as keyof typeof styles]}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-amber-600 bg-amber-50';
      case 'high': return 'text-red-600 bg-red-50';
      default: return 'text-slate-600 bg-slate-50';
    }
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
            <div className="p-3 bg-green-50 rounded-lg">
              <TrendingUp className="text-green-600" size={28} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-800">Due Diligence</h1>
              <p className="text-slate-600 mt-1">Accelerated trade settlement with automated compliance checks</p>
            </div>
          </div>
        </div>

        {/* Summary Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3 bg-white rounded-xl border border-slate-200 p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-slate-800">Due Diligence Summary</h2>
              <div className={`px-4 py-2 rounded-lg font-medium ${getRiskColor(summary.riskLevel)}`}>
                {summary.riskLevel.charAt(0).toUpperCase() + summary.riskLevel.slice(1)} Risk
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-800 mb-1">{summary.overallScore}</div>
                <div className="text-sm text-slate-600">Overall Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">{summary.passedItems}</div>
                <div className="text-sm text-slate-600">Passed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-600 mb-1">{summary.warningItems}</div>
                <div className="text-sm text-slate-600">Warnings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-1">{summary.failedItems}</div>
                <div className="text-sm text-slate-600">Failed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-600 mb-1">{summary.pendingItems}</div>
                <div className="text-sm text-slate-600">Pending</div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-700">Estimated Completion Time</p>
                  <p className="text-lg font-semibold text-slate-800">{summary.estimatedTimeToComplete}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-700">Progress</p>
                  <p className="text-lg font-semibold text-slate-800">
                    {Math.round((summary.passedItems / summary.totalItems) * 100)}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 text-white shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Impact Metrics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-green-100">Time Saved</span>
                <span className="font-medium">85%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-100">Cost Reduction</span>
                <span className="font-medium">$460K</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-100">Trades Completed</span>
                <span className="font-medium">23</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-green-100">Accuracy Rate</span>
                <span className="font-medium">98.5%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex gap-2 flex-wrap">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {category === 'all' ? 'All Items' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Verification Checklist */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-lg">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800">Verification Checklist</h2>
          </div>
          
          <div className="divide-y divide-slate-200">
            {filteredData.map((item) => (
              <div key={item.id} className="p-6 hover:bg-slate-50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    {getStatusIcon(item.status)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-slate-800 mb-1">{item.item}</h3>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm text-slate-600">{item.category}</span>
                          {getPriorityBadge(item.priority)}
                          {getStatusBadge(item.status)}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-500">Last checked</p>
                        <p className="text-sm text-slate-700">{item.lastChecked}</p>
                      </div>
                    </div>
                    
                    <p className="text-slate-600 leading-relaxed">{item.details}</p>
                    
                    {item.status === 'fail' && (
                      <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-800 font-medium">Action Required:</p>
                        <p className="text-sm text-red-700 mt-1">
                          Immediate attention needed. Contact legal team for contract remediation.
                        </p>
                      </div>
                    )}
                    
                    {item.status === 'warning' && (
                      <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                        <p className="text-sm text-amber-800 font-medium">Recommendation:</p>
                        <p className="text-sm text-amber-700 mt-1">
                          Monitor closely and implement corrective action plan within 30 days.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
