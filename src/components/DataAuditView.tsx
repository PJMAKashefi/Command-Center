import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  Database,
  History,
  RefreshCw,
  Search,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { MOCK_AUDIT_LOGS } from '../data/mockPortfolio';
import { Project, SourceSystem } from '../types';

interface DataAuditViewProps {
  projects: Project[];
}

export const DataAuditView: React.FC<DataAuditViewProps> = ({ projects }) => {
  const [searchFilter, setSearchFilter] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('ALL');

  // Aggregate systems across projects
  const systemMap = new Map<string, SourceSystem>();
  projects.forEach(p => {
    p.sourceSystems.forEach(s => {
      if (!systemMap.has(s.id)) {
        systemMap.set(s.id, s);
      }
    });
  });
  const sourceSystems = Array.from(systemMap.values());

  const filteredLogs = MOCK_AUDIT_LOGS.filter(a => {
    const matchesProject = selectedProjectId === 'ALL' || a.projectId === selectedProjectId;
    const matchesSearch =
      a.projectName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      a.user.toLowerCase().includes(searchFilter.toLowerCase()) ||
      a.action.toLowerCase().includes(searchFilter.toLowerCase()) ||
      a.fieldChanged.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesProject && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Title & Pipeline Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight font-sans">
            Data Lineage &amp; Automated Audit Ledger
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-sans mt-0.5">
            Immutable single source of truth reconciling Primavera P6 schedules, SAP commitments, and Aconex registers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300">Live Ingestion Active</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">0.4s Latency</span>
          </div>
        </div>
      </div>

      {/* Connected Source Systems Cards */}
      <div>
        <h2 className="text-sm font-bold text-white font-sans uppercase tracking-wider mb-3 flex items-center gap-2">
          <Database className="w-4 h-4 text-emerald-400" />
          <span>Connected Enterprise Source Feeds</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sourceSystems.map(s => (
            <div
              key={s.id}
              className="bg-[#111A2E] border border-slate-800 rounded-xl p-4 shadow-sm space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/60">
                  {s.category}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" />
                  Synced
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white font-sans">{s.name}</h3>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                  Last Sync: {s.lastSync}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-slate-500 text-[10px] block">Records</span>
                  <span className="text-slate-200 font-bold">{s.recordsCount.toLocaleString()}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 text-[10px] block">Auto-Validated</span>
                  <span className="text-emerald-400 font-bold">{s.autoValidatedPct}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Log Table Header & Search */}
      <div className="bg-[#111A2E] border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 sm:p-5 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-white font-sans flex items-center gap-2">
              <History className="w-4 h-4 text-teal-400" />
              <span>Immutable Field-Level Audit Ledger</span>
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Cryptographically timestamped reconciliation log of all automated and manual changes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-48 sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter audit entries..."
                value={searchFilter}
                onChange={e => setSearchFilter(e.target.value)}
                className="w-full bg-[#0B1120] border border-slate-700/80 rounded-lg pl-8 pr-2.5 py-1.5 text-xs font-sans text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <select
              value={selectedProjectId}
              onChange={e => setSelectedProjectId(e.target.value)}
              className="bg-[#0B1120] border border-slate-700/80 rounded-lg px-2.5 py-1.5 text-xs font-mono text-slate-300 focus:outline-none focus:border-emerald-500"
            >
              <option value="ALL">All Projects</option>
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.code}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#0B1120] text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Timestamp &amp; ID</th>
                <th className="px-4 py-3">Actor / Process</th>
                <th className="px-4 py-3">Action Description</th>
                <th className="px-4 py-3">Field Reconciled</th>
                <th className="px-4 py-3 text-center">Previous Value</th>
                <th className="px-4 py-3 text-center">Reconciled Value</th>
                <th className="px-4 py-3">Project</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3">
                    <div className="text-slate-200 font-bold">{log.timestamp}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{log.id}</div>
                  </td>
                  <td className="px-4 py-3 font-sans">
                    <div className="font-semibold text-white">{log.user}</div>
                    <div className="text-[10px] text-emerald-400 font-mono">{log.role}</div>
                  </td>
                  <td className="px-4 py-3 font-sans text-slate-300">
                    {log.action}
                  </td>
                  <td className="px-4 py-3 text-slate-200 font-semibold">
                    {log.fieldChanged}
                  </td>
                  <td className="px-4 py-3 text-center text-slate-500 line-through">
                    {log.oldValue}
                  </td>
                  <td className="px-4 py-3 text-center text-emerald-400 font-bold">
                    {log.newValue}
                  </td>
                  <td className="px-4 py-3 font-sans text-slate-300">
                    <div className="text-xs truncate max-w-xs">{log.projectName}</div>
                    <div className="text-[10px] font-mono text-slate-500">{log.projectId}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
