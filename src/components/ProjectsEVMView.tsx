import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock,
  Database,
  ExternalLink,
  Layers,
  Network,
  RefreshCw,
  Search,
  ShieldAlert
} from 'lucide-react';
import { Project, Sector } from '../types';

interface ProjectsEVMViewProps {
  projects: Project[];
  selectedProjectId?: string;
  onSelectProject?: (id: string) => void;
}

export const ProjectsEVMView: React.FC<ProjectsEVMViewProps> = ({
  projects,
  selectedProjectId,
  onSelectProject
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('ALL');
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(selectedProjectId || null);

  const sectors = ['ALL', 'Offshore Energy', 'Maritime Infrastructure', 'Renewable Industrial', 'Industrial Corporate'];

  const filteredProjects = projects.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSector = selectedSector === 'ALL' || p.sector === selectedSector;
    return matchesSearch && matchesSector;
  });

  const totalBAC = projects.reduce((acc, p) => acc + p.bacM, 0);
  const totalEAC = projects.reduce((acc, p) => acc + p.eacM, 0);
  const totalVAC = totalBAC - totalEAC;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Title & Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight font-sans">
            Capital Projects &amp; EVM Performance
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-sans mt-0.5">
            Real-time Earned Value Management baseline tracking across active capital investments.
          </p>
        </div>

        {/* Aggregate KPI chips */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono">
            <span className="text-slate-400 mr-2">Portfolio BAC:</span>
            <span className="font-bold text-white">${totalBAC.toFixed(1)}M</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono">
            <span className="text-slate-400 mr-2">Forecast EAC:</span>
            <span className="font-bold text-white">${totalEAC.toFixed(1)}M</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-mono">
            <span className="text-slate-400 mr-2">Net Variance:</span>
            <span className={`font-bold ${totalVAC < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {totalVAC < 0 ? `-$${Math.abs(totalVAC).toFixed(1)}M` : `+$${totalVAC.toFixed(1)}M`}
            </span>
          </div>
        </div>
      </div>

      {/* Filter & Search Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#111A2E] p-3 rounded-xl border border-slate-800">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by project name, code (PRJ-001), location..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-[#0B1120] border border-slate-700/80 rounded-lg pl-9 pr-3 py-2 text-xs font-sans text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-xs font-mono text-slate-400 mr-1 hidden lg:inline">Sector:</span>
          {sectors.map(sec => (
            <button
              key={sec}
              onClick={() => setSelectedSector(sec)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer whitespace-nowrap ${
                selectedSector === sec
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>
      </div>

      {/* EVM Project Table */}
      <div className="bg-[#111A2E] border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#0B1120] text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Project Details</th>
                <th className="px-4 py-3">Sector &amp; Location</th>
                <th className="px-4 py-3 text-right">BAC ($M)</th>
                <th className="px-4 py-3 text-right">EAC ($M)</th>
                <th className="px-4 py-3 text-right">Variance (VAC)</th>
                <th className="px-4 py-3 text-center">SPI</th>
                <th className="px-4 py-3 text-center">CPI</th>
                <th className="px-4 py-3 text-center">Completion</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-right">Expand</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {filteredProjects.map(p => {
                const variance = p.bacM - p.eacM;
                const isOver = variance < 0;
                const isExpanded = expandedProjectId === p.id;

                return (
                  <React.Fragment key={p.id}>
                    <tr
                      onClick={() => setExpandedProjectId(isExpanded ? null : p.id)}
                      className={`hover:bg-slate-800/40 transition-colors cursor-pointer ${
                        isExpanded ? 'bg-slate-800/50' : ''
                      }`}
                    >
                      <td className="px-4 py-3 font-sans">
                        <div className="font-bold text-white text-xs flex items-center gap-1.5">
                          <span>{p.name}</span>
                          {p.status === 'critical' && (
                            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                          )}
                        </div>
                        <div className="text-[10px] font-mono text-emerald-400 font-semibold">{p.code}</div>
                      </td>
                      <td className="px-4 py-3 font-sans text-slate-300">
                        <div>{p.sector}</div>
                        <div className="text-[10px] font-mono text-slate-500">{p.location}</div>
                      </td>
                      <td className="px-4 py-3 text-right text-slate-200">
                        ${p.bacM.toFixed(1)}
                      </td>
                      <td className="px-4 py-3 text-right text-slate-200">
                        ${p.eacM.toFixed(1)}
                      </td>
                      <td className={`px-4 py-3 text-right font-bold ${isOver ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {isOver ? `-$${Math.abs(variance).toFixed(1)}M` : `+$${variance.toFixed(1)}M`}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-1.5 py-0.5 rounded font-bold text-[11px] ${
                          p.spi >= 0.95 ? 'bg-emerald-950 text-emerald-400' : p.spi >= 0.85 ? 'bg-amber-950 text-amber-400' : 'bg-rose-950 text-rose-400'
                        }`}>
                          {p.spi.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-1.5 py-0.5 rounded font-bold text-[11px] ${
                          p.cpi >= 0.95 ? 'bg-emerald-950 text-emerald-400' : p.cpi >= 0.85 ? 'bg-amber-950 text-amber-400' : 'bg-rose-950 text-rose-400'
                        }`}>
                          {p.cpi.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <div className="w-16 mx-auto bg-slate-800 rounded-full h-1.5 overflow-hidden mb-1">
                          <div
                            className={`h-full rounded-full ${p.status === 'critical' ? 'bg-rose-500' : p.status === 'at_risk' ? 'bg-amber-500' : 'bg-emerald-500'}`}
                            style={{ width: `${p.percentComplete}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-slate-400">{p.percentComplete}%</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                          p.status === 'critical'
                            ? 'bg-rose-950 text-rose-300 border border-rose-800/80'
                            : p.status === 'at_risk'
                            ? 'bg-amber-950 text-amber-300 border border-amber-800/80'
                            : 'bg-emerald-950 text-emerald-300 border border-emerald-800/80'
                        }`}>
                          {p.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button className="text-slate-400 hover:text-white p-1">
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </td>
                    </tr>

                    {/* EXPANDED PROJECT DIAGNOSTIC TRAY */}
                    {isExpanded && (
                      <tr className="bg-[#0D1527] border-b border-slate-800">
                        <td colSpan={10} className="p-4 sm:p-5">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans text-xs">
                            
                            {/* Milestone & Critical Path */}
                            <div className="bg-[#111A2E] p-3.5 rounded-lg border border-slate-800 space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-white flex items-center gap-1.5 font-sans">
                                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                                  Milestone Schedule
                                </span>
                                <span className="text-[10px] font-mono text-slate-400">
                                  {p.milestoneHealth.completed} of {p.milestoneHealth.total} Delivered
                                </span>
                              </div>
                              <p className="text-slate-300 text-xs">
                                <span className="text-slate-500 font-mono">Next Target:</span> {p.milestoneHealth.nextMilestone}
                              </p>
                              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-800">
                                <span>Due Date: {p.milestoneHealth.targetDate}</span>
                                <span className={p.milestoneHealth.daysVariance > 0 ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                                  {p.milestoneHealth.daysVariance > 0 ? `+${p.milestoneHealth.daysVariance}d Delay` : 'On Schedule'}
                                </span>
                              </div>
                            </div>

                            {/* Organizational Complexity */}
                            <div className="bg-[#111A2E] p-3.5 rounded-lg border border-slate-800 space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-white flex items-center gap-1.5 font-sans">
                                  <Network className="w-3.5 h-3.5 text-teal-400" />
                                  Delivery Interface Complexity
                                </span>
                              </div>
                              <div className="grid grid-cols-3 gap-2 text-center pt-1 font-mono">
                                <div className="bg-slate-900/60 p-1.5 rounded border border-slate-800">
                                  <div className="text-[10px] text-slate-500">Sub-Tiers</div>
                                  <div className="font-bold text-white">{p.complexity.subcontractorTiers}</div>
                                </div>
                                <div className="bg-slate-900/60 p-1.5 rounded border border-slate-800">
                                  <div className="text-[10px] text-slate-500">Jurisdictions</div>
                                  <div className="font-bold text-white">{p.complexity.jurisdictions}</div>
                                </div>
                                <div className="bg-slate-900/60 p-1.5 rounded border border-slate-800">
                                  <div className="text-[10px] text-slate-500">Workstreams</div>
                                  <div className="font-bold text-white">{p.complexity.concurrentWorkstreams}</div>
                                </div>
                              </div>
                            </div>

                            {/* Connected Source Systems */}
                            <div className="bg-[#111A2E] p-3.5 rounded-lg border border-slate-800 space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-white flex items-center gap-1.5 font-sans">
                                  <Database className="w-3.5 h-3.5 text-emerald-400" />
                                  Connected Source Systems
                                </span>
                              </div>
                              <div className="space-y-1.5">
                                {p.sourceSystems.map(s => (
                                  <div key={s.id} className="flex items-center justify-between text-[11px] font-mono">
                                    <span className="text-slate-300">{s.name}</span>
                                    <div className="flex items-center gap-2">
                                      <span className="text-slate-500">{s.recordsCount} recs</span>
                                      <span className="text-emerald-400 font-bold">{s.autoValidatedPct}%</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                          </div>

                          {/* Executive Narrative */}
                          <div className="mt-3 p-3 bg-slate-900/60 rounded-lg border border-slate-800/80 text-xs text-slate-300 font-sans flex items-start gap-2">
                            <span className="font-bold text-emerald-400 font-mono uppercase text-[10px] shrink-0 mt-0.5">
                              Status Log:
                            </span>
                            <span>{p.narrativeNote}</span>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
