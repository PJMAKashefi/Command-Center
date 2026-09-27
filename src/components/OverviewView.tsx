import React, { useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Clock,
  Database,
  ExternalLink,
  Layers,
  Scale,
  ShieldAlert,
  Sparkles,
  TrendingDown,
  TrendingUp,
  X
} from 'lucide-react';
import { DashboardTab, PortfolioRollup, Project } from '../types';

interface OverviewViewProps {
  portfolio: PortfolioRollup;
  projects: Project[];
  onSelectTab: (tab: DashboardTab) => void;
  onSelectProject?: (projectId: string) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  portfolio,
  projects,
  onSelectTab,
  onSelectProject
}) => {
  const [alertDismissed, setAlertDismissed] = useState(false);

  const getIndexColor = (val: number) => {
    if (val >= 0.95) return 'text-emerald-400 bg-emerald-950/40 border-emerald-500/40';
    if (val >= 0.85) return 'text-amber-400 bg-amber-950/40 border-amber-500/40';
    return 'text-rose-400 bg-rose-950/40 border-rose-500/40';
  };

  const getIndexBadge = (val: number) => {
    if (val >= 0.95) return { label: 'On Target', bg: 'bg-emerald-900/60 text-emerald-300' };
    if (val >= 0.85) return { label: 'Watchlist', bg: 'bg-amber-900/60 text-amber-300' };
    return { label: 'Critical Variance', bg: 'bg-rose-900/60 text-rose-300' };
  };

  const spiBadge = getIndexBadge(portfolio.portfolioSPI);
  const cpiBadge = getIndexBadge(portfolio.portfolioCPI);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* 1. DISMISSIBLE EXECUTIVE ALERT BANNER */}
      {!alertDismissed && (
        <div className="bg-rose-950/80 border border-rose-700/80 rounded-xl px-4 py-3.5 shadow-lg shadow-rose-950/30 flex items-center justify-between gap-4 text-rose-100 transition-all">
          <div className="flex items-center gap-3 min-w-0">
            <span className="p-1.5 rounded-lg bg-rose-900/80 text-rose-300 shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </span>
            <div className="text-xs sm:text-sm font-sans font-medium truncate">
              <span className="font-bold text-white uppercase font-mono mr-2 bg-rose-900 px-1.5 py-0.5 rounded text-[11px]">
                Critical Alert
              </span>
              {portfolio.highestPriorityAlert.message}
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onSelectTab('claims')}
              className="text-xs font-mono font-semibold text-rose-200 hover:text-white underline underline-offset-4 cursor-pointer"
            >
              Investigate Claims &rarr;
            </button>
            <button
              onClick={() => setAlertDismissed(true)}
              className="p-1 text-rose-400 hover:text-white rounded-md hover:bg-rose-900/50 cursor-pointer"
              title="Dismiss alert"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 2. AI-GENERATED STRATEGIC HEADLINE */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-4 sm:p-5 flex items-start sm:items-center gap-3.5 shadow-sm">
        <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-emerald-400">
              Executive AI Synthesis
            </span>
            <span className="text-slate-600 text-xs">•</span>
            <span className="text-[11px] text-slate-400 font-mono">Live Portfolio Correlation (Primavera P6 + SAP S/4HANA)</span>
          </div>
          <p className="text-sm sm:text-base font-sans font-medium text-slate-200 tracking-tight leading-relaxed">
            {portfolio.aiHeadlineSentence}
          </p>
        </div>
        <button
          onClick={() => onSelectTab('assistant')}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-700/50 transition-colors shrink-0 cursor-pointer"
        >
          <span>Ask PJMAK AI</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {/* 3. EXECUTIVE VITAL SIGNS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* SPI Tile */}
        <div className="bg-[#111A2E] border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Schedule (SPI)
            </span>
            <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${spiBadge.bg}`}>
              {spiBadge.label}
            </span>
          </div>
          <div className="my-1 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
              {portfolio.portfolioSPI.toFixed(2)}
            </span>
            <span className="text-xs font-mono text-slate-400">target ≥ 1.00</span>
          </div>
          <div className="text-[11px] text-slate-400 font-mono mt-2 flex items-center justify-between pt-2 border-t border-slate-800/80">
            <span>2 Critical Paths Delayed</span>
            <button
              onClick={() => onSelectTab('projects')}
              className="text-emerald-400 hover:text-emerald-300 cursor-pointer"
            >
              View EVM &rarr;
            </button>
          </div>
        </div>

        {/* CPI Tile */}
        <div className="bg-[#111A2E] border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Cost Efficiency (CPI)
            </span>
            <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${cpiBadge.bg}`}>
              {cpiBadge.label}
            </span>
          </div>
          <div className="my-1 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold font-mono text-rose-400 tracking-tight">
              {portfolio.portfolioCPI.toFixed(2)}
            </span>
            <span className="text-xs font-mono text-slate-400">target ≥ 1.00</span>
          </div>
          <div className="text-[11px] text-slate-400 font-mono mt-2 flex items-center justify-between pt-2 border-t border-slate-800/80">
            <span>Burn rate exceeding EV</span>
            <button
              onClick={() => onSelectTab('projects')}
              className="text-emerald-400 hover:text-emerald-300 cursor-pointer"
            >
              Analysis &rarr;
            </button>
          </div>
        </div>

        {/* Total EAC Overrun */}
        <div className="bg-[#111A2E] border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Projected Overrun
            </span>
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-rose-900/60 text-rose-300">
              VAC -{Math.abs(portfolio.variancePct)}%
            </span>
          </div>
          <div className="my-1 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold font-mono text-rose-400 tracking-tight">
              +${Math.abs(portfolio.varianceTotal).toFixed(1)}M
            </span>
            <span className="text-xs font-mono text-slate-400">variance</span>
          </div>
          <div className="text-[11px] text-slate-400 font-mono mt-2 flex items-center justify-between pt-2 border-t border-slate-800/80">
            <span>EAC ${portfolio.totalEAC.toFixed(1)}M / BAC ${portfolio.totalBAC.toFixed(1)}M</span>
          </div>
        </div>

        {/* Data & System Health */}
        <div className="bg-[#111A2E] border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Data &amp; Systems
            </span>
            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-900/60 text-emerald-300">
              100% Synced
            </span>
          </div>
          <div className="my-1 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold font-mono text-emerald-400 tracking-tight">
              0 Drift
            </span>
            <span className="text-xs font-mono text-slate-400">P6 / SAP / Jira</span>
          </div>
          <div className="text-[11px] text-slate-400 font-mono mt-2 flex items-center justify-between pt-2 border-t border-slate-800/80">
            <span>5 Pipelines Connected</span>
            <button
              onClick={() => onSelectTab('systems')}
              className="text-emerald-400 hover:text-emerald-300 cursor-pointer"
            >
              Lineage &rarr;
            </button>
          </div>
        </div>

      </div>

      {/* 4. THE 4 PILLARS COMMAND CARDS */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-white font-sans flex items-center gap-2">
            <span>Enterprise Portfolio Pillars</span>
            <span className="text-xs font-mono font-normal text-slate-500">• Direct Access</span>
          </h2>
          <span className="text-xs font-mono text-slate-400">Click card for detailed module</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Schedule Pillar */}
          <div
            onClick={() => onSelectTab('projects')}
            className="group bg-[#111A2E]/80 hover:bg-[#152038] border border-slate-800 hover:border-emerald-500/50 rounded-xl p-4 transition-all cursor-pointer flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/60">
                  SPI 0.91
                </span>
              </div>
              <h3 className="text-sm font-bold text-white font-sans group-hover:text-emerald-400 transition-colors">
                Schedule &amp; Milestones
              </h3>
              <p className="text-xs text-slate-400 font-sans mt-1 leading-relaxed">
                Tracks critical-path pacing and milestone delivery variance across all capital assets.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>134 / 186 Done (72%)</span>
              <span className="text-emerald-400 group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </div>

          {/* Cost Pillar */}
          <div
            onClick={() => onSelectTab('projects')}
            className="group bg-[#111A2E]/80 hover:bg-[#152038] border border-slate-800 hover:border-emerald-500/50 rounded-xl p-4 transition-all cursor-pointer flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  <TrendingDown className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800/60">
                  CPI 0.88
                </span>
              </div>
              <h3 className="text-sm font-bold text-white font-sans group-hover:text-emerald-400 transition-colors">
                Cost &amp; Financials
              </h3>
              <p className="text-xs text-slate-400 font-sans mt-1 leading-relaxed">
                Earned Value Management (EVM), BAC baselines, and active contractor variation exposure.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="text-rose-400">+$278.5M Overrun</span>
              <span className="text-emerald-400 group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </div>

          {/* Risk Pillar */}
          <div
            onClick={() => onSelectTab('claims')}
            className="group bg-[#111A2E]/80 hover:bg-[#152038] border border-slate-800 hover:border-emerald-500/50 rounded-xl p-4 transition-all cursor-pointer flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800/60">
                  5 Claims Pool
                </span>
              </div>
              <h3 className="text-sm font-bold text-white font-sans group-hover:text-emerald-400 transition-colors">
                Claims &amp; Risks Register
              </h3>
              <p className="text-xs text-slate-400 font-sans mt-1 leading-relaxed">
                EPC contractor variation claims, disputed exposure, and project risk mitigations.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="text-amber-400">$84.3M Disputed</span>
              <span className="text-emerald-400 group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </div>

          {/* Diagnostic Pillar */}
          <div
            onClick={() => onSelectTab('diagnostic')}
            className="group bg-[#111A2E]/80 hover:bg-[#152038] border border-slate-800 hover:border-emerald-500/50 rounded-xl p-4 transition-all cursor-pointer flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  <Scale className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800/60">
                  7 Constructs
                </span>
              </div>
              <h3 className="text-sm font-bold text-white font-sans group-hover:text-emerald-400 transition-colors">
                INA Diagnostic Engine
              </h3>
              <p className="text-xs text-slate-400 font-sans mt-1 leading-relaxed">
                Organizational delivery health, Flyvbjerg megaproject benchmarks, and research citations.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Decision Speed 72/100</span>
              <span className="text-emerald-400 group-hover:translate-x-1 transition-transform">&rarr;</span>
            </div>
          </div>

        </div>
      </div>

      {/* 5. ACTIVE CAPITAL ASSETS SUMMARY TABLE */}
      <div className="bg-[#111A2E] border border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 sm:p-5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-base font-bold text-white font-sans">
              Active Capital Projects Overview
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              4 Mega-assets under active governance • $4,120M Total Portfolio Baseline
            </p>
          </div>
          <button
            onClick={() => onSelectTab('projects')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900 border border-emerald-700/50 transition-colors cursor-pointer"
          >
            <span>Full EVM Ledger</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#0B1120] text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="px-4 py-3">Code &amp; Name</th>
                <th className="px-4 py-3">Sector</th>
                <th className="px-4 py-3 text-right">BAC ($M)</th>
                <th className="px-4 py-3 text-right">EAC ($M)</th>
                <th className="px-4 py-3 text-right">Variance</th>
                <th className="px-4 py-3 text-center">SPI</th>
                <th className="px-4 py-3 text-center">CPI</th>
                <th className="px-4 py-3 text-center">Progress</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {projects.map(p => {
                const variance = p.bacM - p.eacM;
                const isOver = variance < 0;
                return (
                  <tr key={p.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="px-4 py-3 font-sans">
                      <div className="font-bold text-white text-xs">{p.name}</div>
                      <div className="text-[10px] font-mono text-slate-400">{p.code} • {p.location}</div>
                    </td>
                    <td className="px-4 py-3 font-sans text-slate-300">
                      {p.sector}
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
                      <button
                        onClick={() => {
                          if (onSelectProject) onSelectProject(p.id);
                          onSelectTab('projects');
                        }}
                        className="text-xs text-emerald-400 hover:text-emerald-300 font-sans cursor-pointer underline underline-offset-2"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
