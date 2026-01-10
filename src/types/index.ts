// Core Loan Document Types
export interface LoanDocument {
  id: string;
  fileName: string;
  uploadDate: Date;
  processingTime: number;
  status: 'processing' | 'complete' | 'error';
  
  basicDetails: {
    borrower: string;
    amount: number;
    currency: string;
    interestRate: string;
    maturityDate: string;
    facilityType: string;
  };
  
  covenants: {
    financial: FinancialCovenant[];
    reporting: ReportingObligation[];
  };
  
  esgObligations: {
    targets: string[];
    reportingFrequency: string;
    verificationRequired: boolean;
  };
  
  parties: {
    lenders: string[];
    agent: string;
    trustee?: string;
  };
}

export interface FinancialCovenant {
  type: string;
  limit: string;
  currentValue?: string;
  frequency: string;
}

export interface ReportingObligation {
  type: string;
  frequency: string;
  deadline: string;
}

// Due Diligence Types
export interface DueDiligenceCheck {
  checkName: string;
  status: 'pending' | 'processing' | 'complete' | 'failed';
  result?: 'pass' | 'fail' | 'warning';
  details: string;
  timestamp: Date;
}

export interface DueDiligenceReport {
  tradeId: string;
  loanId: string;
  initiatedBy: string;
  initiatedDate: Date;
  completionTime: number;
  checks: DueDiligenceCheck[];
  summary: {
    overallRisk: 'low' | 'medium' | 'high';
    recommendation: string;
    totalCostSaved: number;
    timeSaved: string;
  };
}

// Covenant Monitoring Types
export interface CovenantMonitoring {
  loanId: string;
  borrowerName: string;
  covenants: CovenantStatus[];
  riskScore: number;
  breachProbability: number;
  forecastPeriod: number;
  alerts: Alert[];
}

export interface CovenantStatus {
  type: string;
  currentValue: number;
  limit: number;
  cushion: number;
  trend: 'improving' | 'stable' | 'deteriorating';
}

export interface Alert {
  severity: 'info' | 'warning' | 'critical';
  message: string;
  triggeredDate: Date;
  resolved: boolean;
}

// ESG Types
export interface ESGMetrics {
  loanId: string;
  borrowerName: string;
  greenLoanStatus: boolean;
  emissions: {
    reported: number;
    verified: number;
    verificationDate?: Date;
    baselineYear: number;
    targetReduction: number;
    currentReduction: number;
  };
  reporting: {
    frequency: string;
    lastSubmitted?: Date;
    missedReports: number;
    completeness: number;
  };
  greenwashingRisk: {
    riskLevel: 'low' | 'medium' | 'high';
    transparencyScore: number;
    flags: string[];
  };
  lmaCompliance: {
    greenLoanPrinciples: boolean;
    sustainabilityCoordinator: boolean;
    reportingAligned: boolean;
  };
}

// Portfolio Types
export interface PortfolioSummary {
  totalLoans: number;
  totalValue: number;
  averageRisk: number;
  activeAlerts: number;
  portfolioHealth: number;
}
