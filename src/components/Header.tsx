import React from 'react';
import {
  Activity,
  BarChart3,
  Bot,
  Database,
  FileSpreadsheet,
  Layers,
  Scale,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import { DashboardTab } from '../types';

interface HeaderProps {
  activeTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  syncTimestamp?: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  syncTimestamp = '09:15 CET'
}) => {
  const tabs: { id: DashboardTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'overview', label: 'Executive Overview', icon: <Activity className="w-3.5 h-3.5" /> },
    { id: 'projects', label: 'Projects & EVM', icon: <BarChart3 className="w-3.5 h-3.5" />, badge: '4 Active' },
    { id: 'diagnostic', label: 'INA Diagnostics', icon: <Scale className="w-3.5 h-3.5" /> },
    { id: 'claims', label: 'Claims & Risks', icon: <ShieldAlert className="w-3.5 h-3.5" />, badge: '5 Open' },
    { id: 'systems', label: 'Data & Systems', icon: <Database className="w-3.5 h-3.5" /> },
    { id: 'assistant', label: 'Ask PJMAK (AI)', icon: <Bot className="w-3.5 h-3.5 text-emerald-400" /> }
  ];

  return (
    <header className="border-b border-slate-800/80 bg-[#0B1120]/95 backdrop-blur-md sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Brand & Status Row */}
        <div className="py-3 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/50">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectTab('overview')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
              title="Return to Executive Overview"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white font-black text-sm shadow-md shadow-emerald-950/40 border border-emerald-400/30 group-hover:scale-105 transition-transform">
                PJ
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-base tracking-tight text-white font-sans group-hover:text-emerald-400 transition-colors">
                    PJMAK
                  </span>
                  <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-1.5 py-0.5 rounded bg-slate-800 text-emerald-400 border border-slate-700/60">
                    Command Center
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono hidden sm:block">
                  Enterprise Project Management Information System
                </p>
              </div>
            </button>
          </div>

          {/* Right Status Controls */}
          <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-300">Continuous Sync</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">{syncTimestamp}</span>
            </div>
          </div>
        </div>

        {/* Direct Navigation Tabs Bar */}
        <nav className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none">
          {tabs.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850 border border-transparent'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                      isActive
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

      </div>
    </header>
  );
};

