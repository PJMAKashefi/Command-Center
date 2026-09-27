import React, { useState } from 'react';
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Filter,
  Search,
  Shield,
  ShieldAlert
} from 'lucide-react';
import { Project, RiskSeverity } from '../types';

interface ClaimsRisksViewProps {
  projects: Project[];
}

export const ClaimsRisksView: React.FC<ClaimsRisksViewProps> = ({ projects }) => {
  const [activeSubTab, setActiveSubTab] = useState<'claims' | 'risks'>('claims');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');

  // Flattened claims
  const allClaims = projects.flatMap(p =>
    p.claimsExposure.map(c => ({
      ...c,
      projectName: p.name,
      projectCode: p.code,
      projectId: p.id
    }))
  );

  // Flattened risks
  const allRisks = projects.flatMap(p =>
    p.openRisks.map(r => ({
      ...r,
      projectName: p.name,
      projectCode: p.code,
      projectId: p.id
    }))
  );

  const filteredClaims = allClaims.filter(c => {
    const matchesSearch =
      c.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.contractor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.status.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = selectedSeverity === 'ALL' || c.exposureRisk === selectedSeverity;
    return matchesSearch && matchesSeverity;
  });

  const filteredRisks = allRisks.filter(r => {
    const matchesSearch =
      r.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.mitigation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeverity = selectedSeverity === 'ALL' || r.severity === selectedSeverity;
    return matchesSearch && matchesSeverity;
  });

  const totalClaimsExposure = allClaims.reduce((acc, c) => acc + c.claimAmountM, 0);
  const disputedClaims = allClaims.filter(c => c.status === 'Disputed');
  const disputedTotal = disputedClaims.reduce((acc, c) => acc + c.claimAmountM, 0);
  const totalRiskImpact = allRisks.reduce((acc, r) => acc + r.impactM, 0);

  const getSeverityBadge = (sev: RiskSeverity) => {
    switch (sev) {
      case 'Critical':
        return 'bg-rose-950 text-rose-300 border-rose-800/80';
      case 'High':
        return 'bg-rose-950/80 text-rose-400 border-rose-800/60';
      case 'Medium':
        return 'bg-amber-950 text-amber-300 border-amber-800/80';
      case 'Low':
        return 'bg-blue-950 text-blue-300 border-blue-800/80';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Title & Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight font-sans">
            Contractor Claims &amp; Risk Register
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-sans mt-0.5">
            Commercial dispute mitigation, contract change order reconciliation, and capital risk exposure.
          </p>
        </div>

        {/* Aggregates */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono">
            <span className="text-slate-400 mr-2">Claims Pool:</span>
            <span className="font-bold text-rose-400">${totalClaimsExposure.toFixed(1)}M</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono">
            <span className="text-slate-400 mr-2">Disputed Claims:</span>
            <span className="font-bold text-amber-400">${disputedTotal.toFixed(1)}M</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono">
            <span className="text-slate-400 mr-2">Total Risk Capital:</span>
            <span className="font-bold text-white">${totalRiskImpact.toFixed(1)}M</span>
          </div>
        </div>
      </div>

      {/* Toggle Sub-Tabs & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#111A2E] p-3 rounded-xl border border-slate-800">
        
        {/* Toggle between Claims and Risks */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab('claims')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
              activeSubTab === 'claims'
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            EPC Contractor Claims ({allClaims.length})
          </button>
          <button
            onClick={() => setActiveSubTab('risks')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
              activeSubTab === 'risks'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Open Risk Register ({allRisks.length})
          </button>
        </div>

        {/* Search & Severity Filter */}
        <div className="flex items-center gap-2">
          <div className="relative w-48 sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search claims or risks..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[#0B1120] border border-slate-700/80 rounded-lg pl-8 pr-2.5 py-1.5 text-xs font-sans text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <select
            value={selectedSeverity}
            onChange={e => setSelectedSeverity(e.target.value)}
            className="bg-[#0B1120] border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-300 focus:outline-none focus:border-emerald-500"
          >
            <option value="ALL">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

      </div>

      {/* Sub-Tab 1: Claims Pool Table */}
      {activeSubTab === 'claims' && (
        <div className="bg-[#111A2E] border border-slate-800 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#0B1120] text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">Claim ID &amp; Contractor</th>
                  <th className="px-4 py-3">Associated Project</th>
                  <th className="px-4 py-3 text-right">Claim Amount ($M)</th>
                  <th className="px-4 py-3 text-center">Status</th>
                  <th className="px-4 py-3 text-center">Exposure Risk</th>
                  <th className="px-4 py-3">Contractual Reason / Basis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {filteredClaims.map(c => (
                  <tr key={c.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3 font-sans">
                      <div className="font-bold text-white text-xs">{c.contractor}</div>
                      <div className="text-[10px] font-mono text-rose-400 font-semibold">{c.id}</div>
                    </td>
                    <td className="px-4 py-3 font-sans">
                      <div className="text-slate-200">{c.projectName}</div>
                      <div className="text-[10px] font-mono text-slate-500">{c.projectCode}</div>
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-rose-400 text-sm">
                      ${c.claimAmountM.toFixed(1)}M
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        c.status === 'Disputed'
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : c.status === 'Under Review'
                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                          : 'bg-blue-950 text-blue-300 border border-blue-800'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${getSeverityBadge(c.exposureRisk)}`}>
                        {c.exposureRisk}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-sans text-slate-300 max-w-xs truncate" title={c.reason}>
                      {c.reason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Sub-Tab 2: Open Risk Register Table */}
      {activeSubTab === 'risks' && (
        <div className="bg-[#111A2E] border border-slate-800 rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#0B1120] text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-4 py-3">Risk ID &amp; Title</th>
                  <th className="px-4 py-3">Project</th>
                  <th className="px-4 py-3 text-center">Severity</th>
                  <th className="px-4 py-3 text-center">Probability</th>
                  <th className="px-4 py-3 text-right">Potential Impact</th>
                  <th className="px-4 py-3">Mitigation Strategy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {filteredRisks.map(r => (
                  <tr key={r.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3 font-sans">
                      <div className="font-bold text-white text-xs">{r.title}</div>
                      <div className="text-[10px] font-mono text-amber-400 font-semibold">{r.id}</div>
                    </td>
                    <td className="px-4 py-3 font-sans">
                      <div className="text-slate-200">{r.projectName}</div>
                      <div className="text-[10px] font-mono text-slate-500">{r.projectCode}</div>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${getSeverityBadge(r.severity)}`}>
                        {r.severity}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-slate-300 font-bold">
                      {r.probability}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-rose-400">
                      ${r.impactM.toFixed(1)}M
                    </td>
                    <td className="px-4 py-3 font-sans text-slate-300 max-w-sm truncate" title={r.mitigation}>
                      {r.mitigation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};
