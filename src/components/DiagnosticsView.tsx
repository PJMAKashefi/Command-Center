import React, { useState } from 'react';
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Database,
  ExternalLink,
  Layers,
  Lightbulb,
  Scale,
  ShieldAlert,
  Sparkles,
  TrendingDown,
  TrendingUp
} from 'lucide-react';
import { RESEARCH_BENCHMARKS } from '../data/mockPortfolio';
import { InaConstructKey, PortfolioRollup, Project } from '../types';

interface DiagnosticsViewProps {
  portfolio: PortfolioRollup;
  projects: Project[];
}

export const DiagnosticsView: React.FC<DiagnosticsViewProps> = ({ portfolio, projects }) => {
  const [selectedConstructKey, setSelectedConstructKey] = useState<InaConstructKey>('systemFragmentation');
  const [selectedProjectId, setSelectedProjectId] = useState<string>('ALL');

  const allConstructs: { key: InaConstructKey; label: string }[] = [
    { key: 'systemFragmentation', label: 'System Fragmentation' },
    { key: 'decisionSpeed', label: 'Decision Speed' },
    { key: 'portfolioComplexity', label: 'Portfolio Complexity' },
    { key: 'dataReliability', label: 'Data Reliability' },
    { key: 'compliancePressure', label: 'Compliance Pressure' },
    { key: 'financialExposure', label: 'Financial Exposure' },
    { key: 'leadershipVisibility', label: 'Leadership Visibility' }
  ];

  const constructInfo = portfolio.constructs[selectedConstructKey];
  const selectedProject = selectedProjectId !== 'ALL' ? projects.find(p => p.id === selectedProjectId) : null;
  const activeScore = selectedProject ? selectedProject.constructs[selectedConstructKey] : constructInfo.score;

  const getScoreColor = (score: number) => {
    if (score >= 80) return { stroke: '#EF4444', text: 'text-rose-400', label: 'Severe Exposure', bg: 'bg-rose-950/80 text-rose-300 border-rose-800/60' };
    if (score >= 60) return { stroke: '#F59E0B', text: 'text-amber-400', label: 'High Priority', bg: 'bg-amber-950/80 text-amber-300 border-amber-800/60' };
    if (score >= 40) return { stroke: '#3B82F6', text: 'text-blue-400', label: 'Moderate Exposure', bg: 'bg-blue-950/80 text-blue-300 border-blue-800/60' };
    return { stroke: '#10B981', text: 'text-emerald-400', label: 'Controlled', bg: 'bg-emerald-950/80 text-emerald-300 border-emerald-800/60' };
  };

  const scoreMeta = getScoreColor(activeScore);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight font-sans">
            INA Organizational Diagnostic Framework
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-sans mt-0.5">
            Empirical organizational delivery health evaluated against global capital project research benchmarks.
          </p>
        </div>

        {/* Project Context Filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">Context Scope:</span>
          <select
            value={selectedProjectId}
            onChange={e => setSelectedProjectId(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-slate-200 text-xs font-mono rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-500"
          >
            <option value="ALL">Entire Portfolio Average</option>
            {projects.map(p => (
              <option key={p.id} value={p.id}>{p.name} ({p.code})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Construct Buttons Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {allConstructs.map(c => {
          const isSelected = selectedConstructKey === c.key;
          const score = selectedProject ? selectedProject.constructs[c.key] : portfolio.constructs[c.key].score;
          const color = getScoreColor(score);
          return (
            <button
              key={c.key}
              onClick={() => setSelectedConstructKey(c.key)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                isSelected
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'bg-[#111A2E] text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span>{c.label}</span>
              <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${color.bg}`}>
                {score}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Diagnostic Detail Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Gauge & Driving Factors */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Construct Score Card */}
          <div className="bg-[#111A2E] border border-slate-800 rounded-xl p-5 shadow-sm space-y-4">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-emerald-400">
                  Diagnostic Construct
                </span>
                <h2 className="text-xl font-bold text-white font-sans mt-0.5">
                  {constructInfo.label}
                </h2>
              </div>
              <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border ${scoreMeta.bg}`}>
                {scoreMeta.label}
              </span>
            </div>

            {/* Score & Benchmark Bar */}
            <div className="bg-[#0B1120] p-4 rounded-xl border border-slate-800/80 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-mono text-slate-400">Calculated Friction Score</div>
                <div className="text-4xl font-extrabold font-mono text-white tracking-tight mt-1">
                  {activeScore} <span className="text-sm font-normal text-slate-500">/ 100</span>
                </div>
              </div>
              <div className="flex-1 max-w-xs space-y-1">
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>Exposure Meter</span>
                  <span className={scoreMeta.text}>{scoreMeta.label}</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${activeScore}%`,
                      backgroundColor: scoreMeta.stroke
                    }}
                  />
                </div>
                <div className="flex justify-between text-[9px] font-mono text-slate-600">
                  <span>0 (Low Risk)</span>
                  <span>50 (Moderate)</span>
                  <span>100 (Severe)</span>
                </div>
              </div>
            </div>

            {/* Benchmark Note */}
            <div className="text-xs text-slate-300 font-sans leading-relaxed">
              <span className="font-bold text-slate-200 font-mono mr-1">Industry Benchmark:</span>
              {constructInfo.benchmarkNote}
            </div>

            {/* Driving Factors Checklist */}
            <div className="pt-3 border-t border-slate-800">
              <h3 className="text-xs font-bold text-slate-200 uppercase font-mono tracking-wider mb-2.5">
                Active Contributing Factors
              </h3>
              <ul className="space-y-2">
                {constructInfo.drivingFactors.map((factor, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 font-sans">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Prescriptive Recommendation */}
          <div className="bg-[#111A2E] border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Lightbulb className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white font-sans">
                Prescriptive Control Action
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              {constructInfo.recommendedFocus}
            </p>
          </div>

        </div>

        {/* Right Column: Empirical Research Citations & Comparison */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Research Benchmark Citation */}
          <div className="bg-[#111A2E] border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white font-sans">
                Empirical Research Grounding
              </h3>
            </div>
            
            <div className="bg-[#0B1120] p-3.5 rounded-lg border border-slate-800 text-xs font-sans text-slate-300 leading-relaxed italic">
              "{constructInfo.researchCitation.text}"
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
              <span>Source:</span>
              <span className="text-emerald-400 font-semibold">{constructInfo.researchCitation.source}</span>
            </div>
          </div>

          {/* Project-by-Project Score Breakdown */}
          <div className="bg-[#111A2E] border border-slate-800 rounded-xl p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-white font-sans">
              Cross-Project Diagnostic Variance
            </h3>
            <div className="space-y-2.5">
              {projects.map(p => {
                const pScore = p.constructs[selectedConstructKey];
                const pMeta = getScoreColor(pScore);
                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedProjectId(p.id)}
                    className={`p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                      selectedProjectId === p.id
                        ? 'bg-emerald-950/40 border-emerald-500/50'
                        : 'bg-[#0B1120] border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white truncate">{p.name}</div>
                      <div className="text-[10px] font-mono text-slate-500">{p.code} • {p.sector}</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-mono font-bold text-white">{pScore}/100</span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${pMeta.bg}`}>
                        {pMeta.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
