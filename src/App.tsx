import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Header } from './components/Header';
import { OverviewView } from './components/OverviewView';
import { ProjectsEVMView } from './components/ProjectsEVMView';
import { DiagnosticsView } from './components/DiagnosticsView';
import { ClaimsRisksView } from './components/ClaimsRisksView';
import { DataAuditView } from './components/DataAuditView';
import { AiAssistantView } from './components/AiAssistantView';
import { CURRENT_PORTFOLIO, MOCK_PROJECTS } from './data/mockPortfolio';
import { DashboardTab } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [selectedProjectId, setSelectedProjectId] = useState<string | undefined>(undefined);

  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    setActiveTab('projects');
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 font-sans flex flex-col antialiased selection:bg-emerald-500 selection:text-white">
      {/* DIRECT TABS NAVIGATION HEADER */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        syncTimestamp="09:15 CET"
      />

      {/* MAIN VIEW CONTENT CONTAINER */}
      <main className="flex-1 flex flex-col justify-start">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="view-overview"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="flex-1"
            >
              <OverviewView
                portfolio={CURRENT_PORTFOLIO}
                projects={MOCK_PROJECTS}
                onSelectTab={setActiveTab}
                onSelectProject={handleSelectProject}
              />
            </motion.div>
          )}

          {activeTab === 'projects' && (
            <motion.div
              key="view-projects"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="flex-1"
            >
              <ProjectsEVMView
                projects={MOCK_PROJECTS}
                selectedProjectId={selectedProjectId}
                onSelectProject={setSelectedProjectId}
              />
            </motion.div>
          )}

          {activeTab === 'diagnostic' && (
            <motion.div
              key="view-diagnostic"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="flex-1"
            >
              <DiagnosticsView
                portfolio={CURRENT_PORTFOLIO}
                projects={MOCK_PROJECTS}
              />
            </motion.div>
          )}

          {activeTab === 'claims' && (
            <motion.div
              key="view-claims"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="flex-1"
            >
              <ClaimsRisksView projects={MOCK_PROJECTS} />
            </motion.div>
          )}

          {activeTab === 'systems' && (
            <motion.div
              key="view-systems"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="flex-1"
            >
              <DataAuditView projects={MOCK_PROJECTS} />
            </motion.div>
          )}

          {activeTab === 'assistant' && (
            <motion.div
              key="view-assistant"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="flex-1"
            >
              <AiAssistantView projects={MOCK_PROJECTS} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 bg-[#080D18] py-3 text-center text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>PJMAK Enterprise Data Integration &amp; Project Control • Command Center</span>
          <span>Unified PMIS Architecture • Clean Room Demo</span>
        </div>
      </footer>
    </div>
  );
}
