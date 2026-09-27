import { GoogleGenAI } from '@google/genai';
import { CURRENT_PORTFOLIO, MOCK_AUDIT_LOGS, MOCK_PROJECTS, RESEARCH_BENCHMARKS } from '../data/mockPortfolio';

// Scoped dataset context for system prompt
const DATASET_CONTEXT = {
  portfolioSummary: {
    totalBAC: `$${CURRENT_PORTFOLIO.totalBAC}M`,
    totalEAC: `$${CURRENT_PORTFOLIO.totalEAC}M`,
    varianceTotal: `$${CURRENT_PORTFOLIO.varianceTotal}M (+${CURRENT_PORTFOLIO.variancePct}%)`,
    portfolioSPI: CURRENT_PORTFOLIO.portfolioSPI,
    portfolioCPI: CURRENT_PORTFOLIO.portfolioCPI,
    statusCounts: CURRENT_PORTFOLIO.projectCounts,
    headline: CURRENT_PORTFOLIO.aiHeadlineSentence,
    topAlert: CURRENT_PORTFOLIO.highestPriorityAlert
  },
  projects: MOCK_PROJECTS.map(p => ({
    id: p.id,
    code: p.code,
    name: p.name,
    sector: p.sector,
    bacM: `$${p.bacM}M`,
    eacM: `$${p.eacM}M`,
    varianceM: `$${p.eacM - p.bacM}M`,
    spi: p.spi,
    cpi: p.cpi,
    percentComplete: `${p.percentComplete}%`,
    status: p.status,
    riskLevel: p.riskLevel,
    note: p.narrativeNote,
    lastSync: p.lastDataSync,
    sourceSystems: p.sourceSystems.map(s => `${s.name} (${s.status}, sync: ${s.lastSync}, auto-reconciled: ${s.autoValidatedPct}%)`),
    topClaims: p.claimsExposure.map(c => `${c.contractor}: $${c.claimAmountM}M (${c.status}) - ${c.reason}`),
    topRisks: p.openRisks.map(r => `${r.title} (Severity: ${r.severity}, Impact: $${r.impactM}M)`)
  })),
  inaConstructs: Object.values(CURRENT_PORTFOLIO.constructs).map(c => ({
    name: c.label,
    score: `${c.score}/100`,
    benchmark: c.benchmarkNote,
    recommendation: c.recommendedFocus
  })),
  recentAudits: MOCK_AUDIT_LOGS.slice(0, 5)
};

const SYSTEM_INSTRUCTION = `You are "Ask PJMAK", the executive decision-support assistant embedded within the PJMAK Enterprise Data Integration & Project Control platform.
Your duty is to answer questions strictly from the provided portfolio dataset.
RULES:
1. Answer ONLY using the facts in the provided dataset context. Do NOT hallucinate external projects, companies, or figures.
2. Maintain an executive, concise, and professional tone suitable for a CEO, COO, or PMO Director.
3. Quantify answers with specific dollar amounts ($M), SPI/CPI numbers, and project codes whenever relevant.
4. If asked about recommendations, reference the specific PJMAK integration levers (e.g. automating P6-to-SAP reconciliations, dispute mitigation on variation registers).
5. If the user asks something completely outside the portfolio, politely clarify that your scope is limited to this enterprise portfolio dataset.`;

export async function askPjmakAssistant(userQuery: string): Promise<string> {
  const apiKey = (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) ||
                 (import.meta as any).env?.VITE_GEMINI_API_KEY ||
                 '';

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `System Dataset Context:\n${JSON.stringify(DATASET_CONTEXT, null, 2)}\n\nExecutive Question: ${userQuery}\n\nPlease provide a clear, concise executive answer based strictly on the dataset:`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.2
        }
      });

      if (response.text) {
        return response.text.trim();
      }
    } catch (err) {
      console.warn('[PJMAK Assistant] Live Gemini call failed, using dataset fallback:', err);
    }
  }

  // Graceful, intelligent dataset fallback simulation (instant, 100% grounded in mockPortfolio)
  return generateDatasetGroundedResponse(userQuery);
}

function generateDatasetGroundedResponse(query: string): string {
  const q = query.toLowerCase();

  if (q.includes('nautilus') || q.includes('ntl-02') || (q.includes('highest') && q.includes('variance'))) {
    const p = MOCK_PROJECTS.find(x => x.id === 'PRJ-001')!;
    return `**Project Nautilus-2 (NTL-02)** represents the primary cost exposure across the portfolio:\n\n` +
      `• **Financial Baseline:** BAC is **$${p.bacM}M** vs. projected EAC of **$${p.eacM}M** (+$${p.eacM - p.bacM}M / +12.3% cost overrun).\n` +
      `• **Performance Indices:** CPI is **${p.cpi}** (unfavorable) and SPI is **${p.spi}** (24 days critical path delay).\n` +
      `• **Primary Cost Drivers:** Subcontractor variation claims, notably **Heerema Marine Fabricators** ($34.8M disputed for riser metallurgy) and **Subsea7** ($18.2M standby time).\n` +
      `• **Recommended Action:** Automate P6-to-SAP line-item variation reconciliations to challenge uncertified contractor claims before Q3 fabrication window closure.`;
  }

  if (q.includes('spi') || q.includes('cpi') || q.includes('evm') || q.includes('performance') || q.includes('earned value')) {
    return `**Portfolio EVM Summary:**\n\n` +
      `• **Portfolio-wide SPI:** **${CURRENT_PORTFOLIO.portfolioSPI}** (Amber / Watch) — weighted across 6 assets; primary drag comes from North Sea Hydrogen Hub (SPI 0.88) and Nautilus-2 (SPI 0.91).\n` +
      `• **Portfolio-wide CPI:** **${CURRENT_PORTFOLIO.portfolioCPI}** (Healthy) — portfolio BAC of **$${CURRENT_PORTFOLIO.totalBAC}M** against EAC of **$${CURRENT_PORTFOLIO.totalEAC}M** (+$${CURRENT_PORTFOLIO.varianceTotal}M overall).\n` +
      `• **Best Performers:** Europoort Terminal (CPI 1.01, SPI 0.98, -$8M under budget) and Maasvlakte Tidal Defense (CPI 1.01, SPI 0.99, 10 days ahead).`;
  }

  if (q.includes('claim') || q.includes('dispute') || q.includes('contractor') || q.includes('exposure')) {
    const totalClaims = MOCK_PROJECTS.reduce((sum, p) => sum + p.claimsExposure.reduce((s, c) => s + c.claimAmountM, 0), 0);
    return `**Contractor Claims & Commercial Exposure:**\n\n` +
      `• **Total Active Claims:** **$${totalClaims.toFixed(1)}M** registered across active EPCIC contracts.\n` +
      `• **Largest Disputed Item:** Heerema Marine Fabricators ($34.8M on Nautilus-2) regarding deepwater riser spool metallurgy qualifications.\n` +
      `• **Under Review:** Siemens Energy Grid Consortium ($16.5M on North Sea Hydrogen Hub) and Subsea7 ($18.2M standby).\n` +
      `• **Resolved Success:** Van Oord ($2.1M on Maasvlakte Tidal Defense) successfully resolved with zero litigation through continuous sonar survey data.`;
  }

  if (q.includes('sap') || q.includes('p6') || q.includes('primavera') || q.includes('system') || q.includes('freshness') || q.includes('sync')) {
    return `**Connected Source Systems & Data Health:**\n\n` +
      `• **Primavera P6 EPPM:** 6 connected schedules, updated within 10–30 mins. 98.2% automated WBS mapping.\n` +
      `• **SAP S/4HANA (CO/PS):** Synchronized every 2–8 mins with 96.4% automatic line-item validation.\n` +
      `• **Oracle Aconex EDMS:** 1 delayed feed on Nautilus-2 (3 hours lag on document revisions), requiring priority pipeline refresh.\n` +
      `• **Auto-Reconciliation Rate:** Overall 91.8% of cross-system data points are verified autonomously without manual spreadsheet intervention.`;
  }

  if (q.includes('risk') || q.includes('critical') || q.includes('delay')) {
    return `**Key Portfolio Risks & Critical Path Review:**\n\n` +
      `• **High Severity:** TenneT Grid Interconnection Substation on North Sea Hydrogen Hub ($22.0M impact, 70% probability).\n` +
      `• **High Severity:** Subsea Riser Flange Fabrication on Nautilus-2 ($28.5M impact, 75% probability).\n` +
      `• **Overall Status:** 4 projects strictly on track, 2 at risk (Nautilus-2 and Hydrogen Hub), 0 in critical suspension.`;
  }

  if (q.includes('ina') || q.includes('construct') || q.includes('fragmentation') || q.includes('speed')) {
    return `**Integration Necessity Assessment (INA) Diagnostic Highlights:**\n\n` +
      `• **System Fragmentation (78/100):** High data silo friction between Primavera P6 and SAP financial ledgers.\n` +
      `• **Decision Speed (72/100):** Manual weekly spreadsheet reconciliation introduces 12 to 14 days latency in executive steering visibility.\n` +
      `• **Industry Context:** Research by Coveo & Gartner demonstrates engineering leaders lose ~12 hrs/week to cross-system data chasing, while integrated platforms reduce cost overruns to <1% (Pingo-Román et al., 2025).`;
  }

  // Default executive overview answer
  return `**Executive Summary for PJMAK Leadership:**\n\n` +
    `The enterprise portfolio encompasses **6 major capital assets** valued at **$${CURRENT_PORTFOLIO.totalBAC}M BAC** ($${CURRENT_PORTFOLIO.totalEAC}M projected EAC).\n\n` +
    `• **Overall Health:** Portfolio SPI is **${CURRENT_PORTFOLIO.portfolioSPI}** and CPI is **${CURRENT_PORTFOLIO.portfolioCPI}**.\n` +
    `• **Primary Concern:** ${CURRENT_PORTFOLIO.aiHeadlineSentence}\n` +
    `• **Immediate Action Item:** ${CURRENT_PORTFOLIO.highestPriorityAlert.message}.\n` +
    `\nYou can ask about specific projects (e.g. *Nautilus-2*, *Europoort*), EVM metrics, contractor claims, or data integration status.`;
}
