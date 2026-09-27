export type ProjectStatus = 'on_track' | 'at_risk' | 'critical';
export type RiskSeverity = 'Low' | 'Medium' | 'High' | 'Critical';
export type Sector = 'Offshore Energy' | 'Maritime Infrastructure' | 'Renewable Industrial' | 'Industrial Corporate' | 'Municipal Infrastructure' | 'Regulated Institution';

export type InaConstructKey =
  | 'systemFragmentation'
  | 'decisionSpeed'
  | 'portfolioComplexity'
  | 'dataReliability'
  | 'compliancePressure'
  | 'financialExposure'
  | 'leadershipVisibility';

export interface SourceSystem {
  id: string;
  name: string; // e.g. "Primavera P6", "SAP S/4HANA", "Jira Software", "Aconex EDMS"
  category: 'Schedule & WBS' | 'ERP & Cost' | 'Issues & Engineering' | 'Document Control';
  status: 'connected' | 'syncing' | 'delayed';
  lastSync: string;
  recordsCount: number;
  autoValidatedPct: number;
}

export interface MilestoneHealth {
  total: number;
  completed: number;
  nextMilestone: string;
  targetDate: string;
  daysVariance: number; // negative is ahead, positive is delay
}

export interface PortfolioComplexityMetrics {
  subcontractorTiers: number;
  jurisdictions: number;
  concurrentWorkstreams: number;
  criticalPathVarianceDays: number;
}

export interface OpenRisk {
  id: string;
  title: string;
  severity: RiskSeverity;
  probability: string;
  impactM: number; // in $M
  mitigation: string;
}

export interface ClaimExposure {
  id: string;
  contractor: string;
  claimAmountM: number;
  status: 'Under Review' | 'Disputed' | 'Settlement Negotiation' | 'Resolved';
  exposureRisk: RiskSeverity;
  reason: string;
}

export interface Project {
  id: string;
  code: string;
  name: string;
  sector: Sector;
  location: string;
  bacM: number; // Budget at Completion ($M)
  eacM: number; // Estimate at Completion ($M)
  spi: number;  // Schedule Performance Index
  cpi: number;  // Cost Performance Index
  percentComplete: number;
  status: ProjectStatus;
  riskLevel: RiskSeverity;
  narrativeNote: string;
  lastDataSync: string;
  sourceSystems: SourceSystem[];
  milestoneHealth: MilestoneHealth;
  complexity: PortfolioComplexityMetrics;
  openRisks: OpenRisk[];
  claimsExposure: ClaimExposure[];
  constructs: Record<InaConstructKey, number>;
}

export interface InaConstructInfo {
  key: InaConstructKey;
  label: string;
  score: number;
  benchmarkNote: string;
  drivingFactors: string[];
  recommendedFocus: string;
  researchCitation: {
    source: string;
    text: string;
  };
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  fieldChanged: string;
  oldValue: string;
  newValue: string;
  projectId: string;
  projectName: string;
}

export interface AlertBanner {
  id: string;
  projectId: string;
  projectName: string;
  message: string;
  severity: 'red' | 'amber' | 'blue';
  recommendation: string;
}

export interface PortfolioRollup {
  totalBAC: number;
  totalEAC: number;
  varianceTotal: number;
  variancePct: number;
  isOverBudget: boolean;
  portfolioSPI: number;
  portfolioCPI: number;
  projectCounts: {
    total: number;
    onTrack: number;
    atRisk: number;
    critical: number;
  };
  highestPriorityAlert: AlertBanner;
  aiHeadlineSentence: string;
  constructs: Record<InaConstructKey, InaConstructInfo>;
}

export type PillarId = 'schedule' | 'cost' | 'risk' | 'data';

export type DashboardTab =
  | 'overview'
  | 'projects'
  | 'diagnostic'
  | 'claims'
  | 'systems'
  | 'assistant';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}
