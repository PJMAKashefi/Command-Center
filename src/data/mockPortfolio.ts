import {
  AuditLogEntry,
  ClaimExposure,
  InaConstructInfo,
  InaConstructKey,
  PortfolioRollup,
  Project,
} from '../types';

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'PRJ-001',
    code: 'NTL-02',
    name: 'Project Nautilus-2',
    sector: 'Offshore Energy',
    location: 'North Sea Block 14 (NL/UK EEZ)',
    bacM: 680,
    eacM: 764,
    spi: 0.91,
    cpi: 0.89,
    percentComplete: 68,
    status: 'at_risk',
    riskLevel: 'High',
    narrativeNote:
      'Subcontractor variation orders and riser fabrication interface disputes driving +$84M cost variance; critical path fabrication window closing in Q3.',
    lastDataSync: '4 mins ago',
    sourceSystems: [
      { id: 'sys-p6', name: 'Primavera P6 EPPM', category: 'Schedule & WBS', status: 'connected', lastSync: '12m ago', recordsCount: 14200, autoValidatedPct: 98.4 },
      { id: 'sys-sap', name: 'SAP S/4HANA (CO/PS)', category: 'ERP & Cost', status: 'connected', lastSync: '4m ago', recordsCount: 38400, autoValidatedPct: 94.1 },
      { id: 'sys-aconex', name: 'Oracle Aconex EDMS', category: 'Document Control', status: 'delayed', lastSync: '3h ago', recordsCount: 8900, autoValidatedPct: 86.5 },
      { id: 'sys-jira', name: 'Jira Enterprise', category: 'Issues & Engineering', status: 'connected', lastSync: '22m ago', recordsCount: 4120, autoValidatedPct: 99.1 }
    ],
    milestoneHealth: {
      total: 32,
      completed: 21,
      nextMilestone: 'Subsea Manifold Integration Test',
      targetDate: '2026-11-15',
      daysVariance: 24 // 24 days delayed
    },
    complexity: {
      subcontractorTiers: 4,
      jurisdictions: 3,
      concurrentWorkstreams: 9,
      criticalPathVarianceDays: 24
    },
    openRisks: [
      { id: 'RSK-101', title: 'Subsea Riser Flange Fabrication Tolerances', severity: 'High', probability: '75%', impactM: 28.5, mitigation: 'Third-party ultrasonic re-scan scheduled with DNV GL' },
      { id: 'RSK-102', title: 'Heavy Lift Vessel Availability Window Slippage', severity: 'High', probability: '60%', impactM: 35.0, mitigation: 'Secondary charter agreement locked under conditional LOI' },
      { id: 'RSK-103', title: 'EPC Contractor Variation Claim for Pipe Metallurgy', severity: 'Medium', probability: '45%', impactM: 14.2, mitigation: 'PJMAK automated line-item change register comparison' }
    ],
    claimsExposure: [
      { id: 'CLM-01', contractor: 'Heerema Marine Fabricators', claimAmountM: 34.8, status: 'Disputed', exposureRisk: 'High', reason: 'Unforeseen metallurgical weld qualifications on deepwater riser spool' },
      { id: 'CLM-02', contractor: 'Subsea7 Offshore BV', claimAmountM: 18.2, status: 'Under Review', exposureRisk: 'Medium', reason: 'Vessel standby time due to uncertified port customs clearance' }
    ],
    constructs: {
      systemFragmentation: 82,
      decisionSpeed: 76,
      portfolioComplexity: 88,
      dataReliability: 62,
      compliancePressure: 84,
      financialExposure: 89,
      leadershipVisibility: 91
    }
  },
  {
    id: 'PRJ-002',
    code: 'EUP-01',
    name: 'Europoort Terminal Expansion',
    sector: 'Maritime Infrastructure',
    location: 'Port of Rotterdam, Netherlands',
    bacM: 540,
    eacM: 532,
    spi: 0.98,
    cpi: 1.01,
    percentComplete: 84,
    status: 'on_track',
    riskLevel: 'Low',
    narrativeNote:
      'Cryogenic storage tank hydrostatic testing concluded ahead of schedule; automated procurement reconciliations keeping EAC -$8M under BAC.',
    lastDataSync: '2 mins ago',
    sourceSystems: [
      { id: 'sys-p6', name: 'Primavera P6 EPPM', category: 'Schedule & WBS', status: 'connected', lastSync: '10m ago', recordsCount: 19800, autoValidatedPct: 99.5 },
      { id: 'sys-sap', name: 'SAP S/4HANA (CO/PS)', category: 'ERP & Cost', status: 'connected', lastSync: '2m ago', recordsCount: 42100, autoValidatedPct: 98.7 },
      { id: 'sys-aconex', name: 'Oracle Aconex EDMS', category: 'Document Control', status: 'connected', lastSync: '15m ago', recordsCount: 14600, autoValidatedPct: 97.2 },
      { id: 'sys-jira', name: 'Jira Enterprise', category: 'Issues & Engineering', status: 'connected', lastSync: '8m ago', recordsCount: 6500, autoValidatedPct: 99.8 }
    ],
    milestoneHealth: {
      total: 40,
      completed: 34,
      nextMilestone: 'Terminal Cold Commissioning Gas-In',
      targetDate: '2026-10-01',
      daysVariance: -6 // 6 days ahead
    },
    complexity: {
      subcontractorTiers: 3,
      jurisdictions: 1,
      concurrentWorkstreams: 6,
      criticalPathVarianceDays: -6
    },
    openRisks: [
      { id: 'RSK-201', title: 'Port Authority Environmental Nitrogen Cap Permit', severity: 'Medium', probability: '30%', impactM: 6.5, mitigation: 'Continuous catalytic reduction scrubber installed' },
      { id: 'RSK-202', title: 'BOG Compressor Commissioning Calibration Delay', severity: 'Low', probability: '20%', impactM: 2.8, mitigation: 'OEM remote telemetry monitoring engaged' }
    ],
    claimsExposure: [
      { id: 'CLM-03', contractor: 'Boskalis Dredging Marine', claimAmountM: 4.6, status: 'Settlement Negotiation', exposureRisk: 'Low', reason: 'Minor siltation variance in outer berthing pocket' }
    ],
    constructs: {
      systemFragmentation: 38,
      decisionSpeed: 34,
      portfolioComplexity: 58,
      dataReliability: 92,
      compliancePressure: 64,
      financialExposure: 29,
      leadershipVisibility: 48
    }
  },
  {
    id: 'PRJ-003',
    code: 'NSH-04',
    name: 'North Sea Green Hydrogen Hub',
    sector: 'Renewable Industrial',
    location: 'Eemshaven / North Sea Cluster',
    bacM: 420,
    eacM: 448,
    spi: 0.88,
    cpi: 0.94,
    percentComplete: 47,
    status: 'at_risk',
    riskLevel: 'Medium',
    narrativeNote:
      'High-voltage offshore HVDC transformer substation delivery delayed by supplier; balance-of-plant works re-sequenced to preserve commissioning date.',
    lastDataSync: '8 mins ago',
    sourceSystems: [
      { id: 'sys-p6', name: 'Primavera P6 EPPM', category: 'Schedule & WBS', status: 'connected', lastSync: '30m ago', recordsCount: 11400, autoValidatedPct: 95.8 },
      { id: 'sys-sap', name: 'SAP S/4HANA (CO/PS)', category: 'ERP & Cost', status: 'connected', lastSync: '8m ago', recordsCount: 22400, autoValidatedPct: 91.3 },
      { id: 'sys-aconex', name: 'Oracle Aconex EDMS', category: 'Document Control', status: 'connected', lastSync: '45m ago', recordsCount: 7100, autoValidatedPct: 89.0 },
      { id: 'sys-jira', name: 'Jira Enterprise', category: 'Issues & Engineering', status: 'connected', lastSync: '14m ago', recordsCount: 3900, autoValidatedPct: 97.4 }
    ],
    milestoneHealth: {
      total: 28,
      completed: 13,
      nextMilestone: 'Electrolyzer Stack Module 3 Delivery',
      targetDate: '2026-12-20',
      daysVariance: 32 // 32 days delay
    },
    complexity: {
      subcontractorTiers: 4,
      jurisdictions: 2,
      concurrentWorkstreams: 8,
      criticalPathVarianceDays: 32
    },
    openRisks: [
      { id: 'RSK-301', title: 'TenneT Grid Interconnection Substation Delivery', severity: 'High', probability: '70%', impactM: 22.0, mitigation: 'Weekly joint PMO committee with TenneT transmission' },
      { id: 'RSK-302', title: 'Proton Exchange Membrane Membrane Degradation in Test', severity: 'Medium', probability: '40%', impactM: 9.5, mitigation: 'Redundant stack cells ordered under warranty pool' }
    ],
    claimsExposure: [
      { id: 'CLM-04', contractor: 'Siemens Energy Grid Consortium', claimAmountM: 16.5, status: 'Under Review', exposureRisk: 'Medium', reason: 'Extended engineering review cycle on converter station harmonics' }
    ],
    constructs: {
      systemFragmentation: 68,
      decisionSpeed: 74,
      portfolioComplexity: 82,
      dataReliability: 70,
      compliancePressure: 78,
      financialExposure: 74,
      leadershipVisibility: 80
    }
  },
  {
    id: 'PRJ-004',
    code: 'DLT-03',
    name: 'Delta-Field Compression Module',
    sector: 'Industrial Corporate',
    location: 'Moerdijk Industrial Complex',
    bacM: 310,
    eacM: 332,
    spi: 0.92,
    cpi: 0.93,
    percentComplete: 72,
    status: 'on_track',
    riskLevel: 'Medium',
    narrativeNote:
      'Brownfield tie-in integration ongoing. High subcontractor interface density; early warning on piping spool fabrication backlog mitigated via expedited second-tier shop.',
    lastDataSync: '6 mins ago',
    sourceSystems: [
      { id: 'sys-p6', name: 'Primavera P6 EPPM', category: 'Schedule & WBS', status: 'connected', lastSync: '18m ago', recordsCount: 9600, autoValidatedPct: 96.5 },
      { id: 'sys-sap', name: 'SAP S/4HANA (CO/PS)', category: 'ERP & Cost', status: 'connected', lastSync: '6m ago', recordsCount: 18900, autoValidatedPct: 93.8 },
      { id: 'sys-aconex', name: 'Oracle Aconex EDMS', category: 'Document Control', status: 'connected', lastSync: '1h ago', recordsCount: 6200, autoValidatedPct: 92.4 },
      { id: 'sys-jira', name: 'Jira Enterprise', category: 'Issues & Engineering', status: 'connected', lastSync: '15m ago', recordsCount: 2800, autoValidatedPct: 98.6 }
    ],
    milestoneHealth: {
      total: 26,
      completed: 18,
      nextMilestone: 'Centrifugal Compressor Train Pre-commissioning',
      targetDate: '2026-11-05',
      daysVariance: 14 // 14 days delay
    },
    complexity: {
      subcontractorTiers: 3,
      jurisdictions: 1,
      concurrentWorkstreams: 7,
      criticalPathVarianceDays: 14
    },
    openRisks: [
      { id: 'RSK-401', title: 'Brownfield Hot-Work Permitting Window Restrictions', severity: 'Medium', probability: '50%', impactM: 11.2, mitigation: 'Night-shift cold bolting protocols approved' },
      { id: 'RSK-402', title: 'Instrumentation Cable Tray Congestion at Unit 4', severity: 'Low', probability: '35%', impactM: 4.0, mitigation: 'Laser 3D scanning verification completed' }
    ],
    claimsExposure: [
      { id: 'CLM-05', contractor: 'Stork Technical Services', claimAmountM: 8.4, status: 'Settlement Negotiation', exposureRisk: 'Medium', reason: 'Piping spool rework due to revised P&ID revision 06' }
    ],
    constructs: {
      systemFragmentation: 62,
      decisionSpeed: 59,
      portfolioComplexity: 71,
      dataReliability: 77,
      compliancePressure: 72,
      financialExposure: 66,
      leadershipVisibility: 69
    }
  },
  {
    id: 'PRJ-005',
    code: 'MSV-01',
    name: 'Maasvlakte Tidal Defense & Quay',
    sector: 'Municipal Infrastructure',
    location: 'Maasvlakte 2, Rotterdam Harbor',
    bacM: 490,
    eacM: 485,
    spi: 0.99,
    cpi: 1.01,
    percentComplete: 91,
    status: 'on_track',
    riskLevel: 'Low',
    narrativeNote:
      'Caisson immersion sequence completed 10 days ahead of schedule. Rigorous automated quality reconciliation across municipal BIM standards maintaining zero non-conformances.',
    lastDataSync: '3 mins ago',
    sourceSystems: [
      { id: 'sys-p6', name: 'Primavera P6 EPPM', category: 'Schedule & WBS', status: 'connected', lastSync: '15m ago', recordsCount: 16800, autoValidatedPct: 99.8 },
      { id: 'sys-sap', name: 'SAP S/4HANA (CO/PS)', category: 'ERP & Cost', status: 'connected', lastSync: '3m ago', recordsCount: 31200, autoValidatedPct: 99.2 },
      { id: 'sys-aconex', name: 'Oracle Aconex EDMS', category: 'Document Control', status: 'connected', lastSync: '25m ago', recordsCount: 12800, autoValidatedPct: 98.6 },
      { id: 'sys-jira', name: 'Jira Enterprise', category: 'Issues & Engineering', status: 'connected', lastSync: '10m ago', recordsCount: 5100, autoValidatedPct: 99.9 }
    ],
    milestoneHealth: {
      total: 36,
      completed: 33,
      nextMilestone: 'Heavy Berthing Bollard Pull Proof Testing',
      targetDate: '2026-09-30',
      daysVariance: -10 // 10 days ahead
    },
    complexity: {
      subcontractorTiers: 2,
      jurisdictions: 1,
      concurrentWorkstreams: 4,
      criticalPathVarianceDays: -10
    },
    openRisks: [
      { id: 'RSK-501', title: 'Tidal Current Scour Protection Displacement', severity: 'Low', probability: '15%', impactM: 3.5, mitigation: 'Automated multibeam sonar bathymetry scanning' }
    ],
    claimsExposure: [
      { id: 'CLM-06', contractor: 'Van Oord Maritime Dredging', claimAmountM: 2.1, status: 'Resolved', exposureRisk: 'Low', reason: 'Rock armour density verification variance resolved via joint survey' }
    ],
    constructs: {
      systemFragmentation: 26,
      decisionSpeed: 28,
      portfolioComplexity: 45,
      dataReliability: 96,
      compliancePressure: 55,
      financialExposure: 20,
      leadershipVisibility: 38
    }
  },
  {
    id: 'PRJ-006',
    code: 'ZHD-05',
    name: 'Zuid-Holland District Heating Grid',
    sector: 'Regulated Institution',
    location: 'The Hague & Delft Corridor',
    bacM: 280,
    eacM: 279,
    spi: 0.96,
    cpi: 1.00,
    percentComplete: 62,
    status: 'on_track',
    riskLevel: 'Low',
    narrativeNote:
      'Subsurface horizontal directional drilling under highway A13 concluded smoothly; multi-utility clash detection integrated seamlessly through GIS/BIM pipeline.',
    lastDataSync: '5 mins ago',
    sourceSystems: [
      { id: 'sys-p6', name: 'Primavera P6 EPPM', category: 'Schedule & WBS', status: 'connected', lastSync: '22m ago', recordsCount: 8400, autoValidatedPct: 97.2 },
      { id: 'sys-sap', name: 'SAP S/4HANA (CO/PS)', category: 'ERP & Cost', status: 'connected', lastSync: '5m ago', recordsCount: 16400, autoValidatedPct: 96.8 },
      { id: 'sys-aconex', name: 'Oracle Aconex EDMS', category: 'Document Control', status: 'connected', lastSync: '30m ago', recordsCount: 5400, autoValidatedPct: 94.0 },
      { id: 'sys-jira', name: 'Jira Enterprise', category: 'Issues & Engineering', status: 'connected', lastSync: '12m ago', recordsCount: 3200, autoValidatedPct: 98.8 }
    ],
    milestoneHealth: {
      total: 24,
      completed: 15,
      nextMilestone: 'Delft Substation Pumping Station Mechanical Enclosure',
      targetDate: '2026-11-30',
      daysVariance: 4 // 4 days delay
    },
    complexity: {
      subcontractorTiers: 3,
      jurisdictions: 2,
      concurrentWorkstreams: 5,
      criticalPathVarianceDays: 4
    },
    openRisks: [
      { id: 'RSK-601', title: 'Municipal Subsurface Utility Clash at Rijksweg A13', severity: 'Low', probability: '25%', impactM: 2.2, mitigation: 'Ground penetrating radar & vacuum excavation executed' }
    ],
    claimsExposure: [
      { id: 'CLM-07', contractor: 'BAM Infra Civiel BV', claimAmountM: 3.2, status: 'Under Review', exposureRisk: 'Low', reason: 'Municipal traffic diversion detour permitting delay' }
    ],
    constructs: {
      systemFragmentation: 44,
      decisionSpeed: 42,
      portfolioComplexity: 52,
      dataReliability: 88,
      compliancePressure: 61,
      financialExposure: 32,
      leadershipVisibility: 46
    }
  }
];

// RESEARCH BENCHMARKS & PARAPHRASED CITATIONS
export const RESEARCH_BENCHMARKS = {
  systemFragmentation: {
    source: 'MuleSoft Connectivity Benchmark / IDC',
    text: 'Enterprises operate ~897 disconnected software applications, with only ~29% natively communicating. Unintegrated data silos cost organizations an estimated $7.8M annually in lost engineering and commercial productivity.'
  },
  decisionSpeed: {
    source: 'Coveo & Gartner Research',
    text: 'Cross-functional engineering and project management professionals lose ~12 hours per week to manual spreadsheet reconciliation and cross-system status verification before critical commercial reviews.'
  },
  performanceExposure: {
    source: 'McKinsey & Co. / Flyvbjerg et al. (Oxford University)',
    text: 'Over 80% of heavy industrial and infrastructure megaprojects exceed budgeted capital, and ~50% encounter significant schedule slippage. Statistically, only 8.5% of major projects achieve both cost and schedule targets concurrently.'
  },
  integrationPayoff: {
    source: 'Pingo-Román et al. (2025 Study)',
    text: 'Enterprises implementing unified, integrated project management and information systems observed average cost overruns decrease from ~9% to under 1%, while schedule delays dropped from ~16% to ~7%.'
  },
  compliancePressure: {
    source: 'Gartner (2026 Enterprise Infrastructure)',
    text: 'Escalating GDPR, BIM-mandates, and stringent sovereign data governance requirements are compelling leading industrial operators toward private on-premise local AI models over multi-tenant public clouds.'
  }
};

// AUDIT TRAIL DATA (12 ENTRIES FOR LAYER 3)
export const MOCK_AUDIT_LOGS: AuditLogEntry[] = [
  { id: 'AUD-8921', timestamp: '2026-09-07 10:14:22 CET', user: 'L. van der Meer', role: 'Lead PMO Controller', action: 'Approved Variation Register', fieldChanged: 'Subcontractor EAC Baseline', oldValue: '€742.0M', newValue: '€764.0M', projectId: 'PRJ-001', projectName: 'Project Nautilus-2' },
  { id: 'AUD-8920', timestamp: '2026-09-07 09:48:10 CET', user: 'J. Hendricks', role: 'Commercial Lead', action: 'Flagged Disputed Claim', fieldChanged: 'Claim CLM-01 Exposure', oldValue: 'Pending Review', newValue: 'Disputed ($34.8M)', projectId: 'PRJ-001', projectName: 'Project Nautilus-2' },
  { id: 'AUD-8919', timestamp: '2026-09-07 09:02:44 CET', user: 'Automated Pipeline (PJMAK)', role: 'System Daemon', action: 'P6/SAP Reconciliation', fieldChanged: 'SPI Recalculation', oldValue: '0.90', newValue: '0.91', projectId: 'PRJ-001', projectName: 'Project Nautilus-2' },
  { id: 'AUD-8918', timestamp: '2026-09-06 18:30:15 CET', user: 'W. Bakker', role: 'Project Director', action: 'Milestone Completion Sign-off', fieldChanged: 'Cryogenic Tank Hydro-test', oldValue: 'In Progress (92%)', newValue: 'Completed (100%)', projectId: 'PRJ-002', projectName: 'Europoort Terminal Expansion' },
  { id: 'AUD-8917', timestamp: '2026-09-06 16:15:02 CET', user: 'Automated Pipeline (PJMAK)', role: 'System Daemon', action: 'ERP Ledger Validation', fieldChanged: 'Commitment Ledger Balance', oldValue: '€498.2M', newValue: '€501.4M', projectId: 'PRJ-002', projectName: 'Europoort Terminal Expansion' },
  { id: 'AUD-8916', timestamp: '2026-09-06 14:22:18 CET', user: 'M. de Jong', role: 'Technical Risk Manager', action: 'Escalated Critical Risk', fieldChanged: 'Risk RSK-301 Severity', oldValue: 'Medium', newValue: 'High (Impact $22.0M)', projectId: 'PRJ-003', projectName: 'North Sea Green Hydrogen Hub' },
  { id: 'AUD-8915', timestamp: '2026-09-06 11:05:39 CET', user: 'H. van Dijk', role: 'Cost Engineer', action: 'Updated Forecast Model', fieldChanged: 'EAC Projection Q4', oldValue: '€439.0M', newValue: '€448.0M', projectId: 'PRJ-003', projectName: 'North Sea Green Hydrogen Hub' },
  { id: 'AUD-8914', timestamp: '2026-09-05 17:40:50 CET', user: 'S. Albers', role: 'Site Manager', action: 'Shift Permit Execution', fieldChanged: 'Brownfield Hot-Work Permitting', oldValue: 'Standard Protocol', newValue: 'Night-shift Cold Bolting', projectId: 'PRJ-004', projectName: 'Delta-Field Compression Module' },
  { id: 'AUD-8913', timestamp: '2026-09-05 15:12:08 CET', user: 'Automated Pipeline (PJMAK)', role: 'System Daemon', action: 'Data Integrity Hash Check', fieldChanged: 'SHA-256 Ledger Seal', oldValue: 'Verified', newValue: 'Verified (0 Anomalies)', projectId: 'PRJ-004', projectName: 'Delta-Field Compression Module' },
  { id: 'AUD-8912', timestamp: '2026-09-05 10:25:31 CET', user: 'K. Vermeer', role: 'Quality Director', action: 'BIM Compliance Certification', fieldChanged: 'RWS Dutch Norm 4022', oldValue: 'Pending Survey', newValue: 'Fully Certified', projectId: 'PRJ-005', projectName: 'Maasvlakte Tidal Defense & Quay' },
  { id: 'AUD-8911', timestamp: '2026-09-04 16:50:12 CET', user: 'R. Zwart', role: 'Legal Counsel', action: 'Claim Resolved Settlement', fieldChanged: 'Claim CLM-06 Status', oldValue: 'Settlement Negotiation', newValue: 'Resolved ($2.1M)', projectId: 'PRJ-005', projectName: 'Maasvlakte Tidal Defense & Quay' },
  { id: 'AUD-8910', timestamp: '2026-09-04 11:15:00 CET', user: 'T. Scholten', role: 'Utility Coordinator', action: 'Subsurface Clearance Sign-off', fieldChanged: 'Highway A13 Crossing Status', oldValue: 'Drilling Active', newValue: 'Crossing Complete', projectId: 'PRJ-006', projectName: 'Zuid-Holland District Heating Grid' }
];

// DYNAMIC COMPUTATION OF PORTFOLIO ROLLUP
export function computePortfolioRollup(projects: Project[]): PortfolioRollup {
  const totalBAC = projects.reduce((acc, p) => acc + p.bacM, 0);
  const totalEAC = projects.reduce((acc, p) => acc + p.eacM, 0);
  const varianceTotal = totalEAC - totalBAC;
  const variancePct = Math.round((varianceTotal / totalBAC) * 1000) / 10;
  const isOverBudget = varianceTotal > 0;

  // Weighted SPI and CPI by project BAC
  const weightedSPI = projects.reduce((acc, p) => acc + p.spi * p.bacM, 0) / totalBAC;
  const weightedCPI = projects.reduce((acc, p) => acc + p.cpi * p.bacM, 0) / totalBAC;

  const onTrack = projects.filter(p => p.status === 'on_track').length;
  const atRisk = projects.filter(p => p.status === 'at_risk').length;
  const critical = projects.filter(p => p.status === 'critical').length;

  // 7 Renamed INA Constructs rollups
  const avgConstruct = (key: InaConstructKey): number => {
    return Math.round(projects.reduce((acc, p) => acc + p.constructs[key], 0) / projects.length);
  };

  const constructs: Record<InaConstructKey, InaConstructInfo> = {
    systemFragmentation: {
      key: 'systemFragmentation',
      label: 'System Fragmentation',
      score: avgConstruct('systemFragmentation'),
      benchmarkNote: 'Elevated across offshore EPCIC assets with 4 disconnected ERP and schedule systems.',
      drivingFactors: [
        'Primavera P6 schedule updates require manual re-keying into SAP CO/PS cost ledgers',
        'Subcontractor variation registers maintained in isolated Excel workbooks',
        'Engineering technical queries (Jira) disconnected from commercial claims ledger'
      ],
      recommendedFocus: 'Prioritize automated two-way P6-to-SAP reconciliation on Nautilus-2 before next commercial audit.',
      researchCitation: RESEARCH_BENCHMARKS.systemFragmentation
    },
    decisionSpeed: {
      key: 'decisionSpeed',
      label: 'Decision Speed',
      score: avgConstruct('decisionSpeed'),
      benchmarkNote: 'Average time-to-escalation is 14 days between field variance detection and steering committee visibility.',
      drivingFactors: [
        'Monthly manual consolidation cycles delay cost variance detection by 3 to 4 weeks',
        'Multiple inconsistent versions of truth between commercial and engineering teams',
        'Lengthy dispute reviews on subcontractor claim registers'
      ],
      recommendedFocus: 'Implement real-time continuous data ingestion to compress executive decision cycles from 30 days to 24 hours.',
      researchCitation: RESEARCH_BENCHMARKS.decisionSpeed
    },
    portfolioComplexity: {
      key: 'portfolioComplexity',
      label: 'Portfolio Complexity',
      score: avgConstruct('portfolioComplexity'),
      benchmarkNote: 'High technical and multi-jurisdictional density spanning 4 subcontractor tiers.',
      drivingFactors: [
        'Complex cross-border maritime regulations across North Sea and Port of Rotterdam',
        'Deepwater subsea fabrication with specialized metallurgical qualifications',
        'Multiple concurrent critical paths across 6 major industrial capital assets'
      ],
      recommendedFocus: 'Establish automated multi-tier critical path dependency mapping across EPCIC contractors.',
      researchCitation: RESEARCH_BENCHMARKS.performanceExposure
    },
    dataReliability: {
      key: 'dataReliability',
      label: 'Data Reliability',
      score: avgConstruct('dataReliability'),
      benchmarkNote: '84% of portfolio data points now auto-validated; manual reconciliation remaining on 2 assets.',
      drivingFactors: [
        'Aconex EDMS document register lagging behind actual shop fabrication status',
        'Discrepancies in contractor timesheets vs. physical progress surveys',
        'Varying cost breakdown structures (CBS) between owners and general contractors'
      ],
      recommendedFocus: 'Enable immutable data verification and daily hash reconciliation across all source systems.',
      researchCitation: RESEARCH_BENCHMARKS.integrationPayoff
    },
    compliancePressure: {
      key: 'compliancePressure',
      label: 'Compliance Pressure',
      score: avgConstruct('compliancePressure'),
      benchmarkNote: 'High regulatory scrutiny from Dutch port authorities, TenneT grid codes, and EU carbon mandates.',
      drivingFactors: [
        'Stringent Dutch nitrogen deposition (PAS/stikstof) permit thresholds',
        'BIM Dutch Norm 4022 compliance required on municipal maritime defense assets',
        'Strict GDPR and data residency standards forbidding public cloud exposure for critical infrastructure'
      ],
      recommendedFocus: 'Deploy 100% on-premise, air-gapped analytics keeping sensitive drawings and financials sovereign.',
      researchCitation: RESEARCH_BENCHMARKS.compliancePressure
    },
    financialExposure: {
      key: 'financialExposure',
      label: 'Financial Exposure',
      score: avgConstruct('financialExposure'),
      benchmarkNote: 'Total unmitigated commercial claims exposure of $84.3M across active EPC contracts.',
      drivingFactors: [
        'Riser fabrication and heavy lift vessel claims concentrated on Project Nautilus-2',
        'HVDC substation delay liquidated damages risk on North Sea Hydrogen Hub',
        'Subcontractor cost escalation without verified line-item productivity proof'
      ],
      recommendedFocus: 'Utilize automated claims audit trails to dispute unsubstantiated delay claims with factual timesheets.',
      researchCitation: RESEARCH_BENCHMARKS.performanceExposure
    },
    leadershipVisibility: {
      key: 'leadershipVisibility',
      label: 'Leadership Visibility Need',
      score: avgConstruct('leadershipVisibility'),
      benchmarkNote: 'Critical demand for single-screen portfolio transparency at Board and C-suite levels.',
      drivingFactors: [
        'Executive committee currently receives static 90-page monthly slide decks with obsolete figures',
        'Lack of drill-down capability from portfolio-level SPI/CPI to specific contractor claims',
        'Need for defensible, audit-ready data before approaching institutional project financiers'
      ],
      recommendedFocus: 'Maintain clean progressive disclosure hierarchy: 10-second high-level view down to raw audit proof.',
      researchCitation: RESEARCH_BENCHMARKS.decisionSpeed
    }
  };

  return {
    totalBAC,
    totalEAC,
    varianceTotal,
    variancePct,
    isOverBudget,
    portfolioSPI: Math.round(weightedSPI * 100) / 100,
    portfolioCPI: Math.round(weightedCPI * 100) / 100,
    projectCounts: {
      total: projects.length,
      onTrack,
      atRisk,
      critical
    },
    highestPriorityAlert: {
      id: 'ALT-01',
      projectId: 'PRJ-001',
      projectName: 'Project Nautilus-2',
      message: 'Project Nautilus-2: cost variance exceeds 12% — review recommended',
      severity: 'red',
      recommendation: 'Inspect subcontractor variation orders in Cost & Financials pillar.'
    },
    aiHeadlineSentence:
      'Two projects are trending toward budget overrun; the primary driver is subcontractor variation orders, not schedule delay.',
    constructs
  };
}

export const CURRENT_PORTFOLIO = computePortfolioRollup(MOCK_PROJECTS);
