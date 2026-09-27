import React, { useState } from 'react';
import {
  Bot,
  CheckCircle2,
  Database,
  FileText,
  MessageSquare,
  Send,
  Sparkles,
  UserCheck
} from 'lucide-react';
import { askPjmakAssistant } from '../services/gemini';
import { ChatMessage, Project } from '../types';

interface AiAssistantViewProps {
  projects: Project[];
}

export const AiAssistantView: React.FC<AiAssistantViewProps> = ({ projects }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-init',
      sender: 'assistant',
      text: 'Hello. I am **Ask PJMAK**, your executive project controls intelligence assistant. I am scoped strictly to this enterprise PMIS dataset. You can ask me about cost variances, EVM metrics, contractor claims, source system sync status, or INA diagnostic findings across your capital assets.',
      timestamp: 'Just now'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const suggestedPrompts = [
    'Which project has the highest cost variance?',
    'What active contractor claims are filed against Project Nautilus-2?',
    'Explain the data freshness and sync status of Primavera P6 and SAP',
    'Summarize portfolio SPI, CPI, and active delivery risks',
    'Why is Decision Speed scored at 72/100 in the INA diagnostic?'
  ];

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputValue;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!queryText) setInputValue('');
    setIsLoading(true);

    try {
      const responseText = await askPjmakAssistant(textToSend);
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        text: 'I encountered an error querying the portfolio intelligence engine. Please retry your inquiry.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-xs uppercase font-mono font-bold tracking-wider text-emerald-400">
              Gemini 2.5 Flash Scoped Engine
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight font-sans">
            Ask PJMAK Executive Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-sans mt-0.5">
            Query your PMIS portfolio dataset with natural language, zero hallucination guardrails, and audit citations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            Grounding: 4 Projects • 5 Claims • 7 Constructs
          </span>
        </div>
      </div>

      {/* Suggested Prompts Chips */}
      <div>
        <div className="text-xs font-mono text-slate-400 mb-2">Suggested Executive Inquiries:</div>
        <div className="flex flex-wrap gap-2">
          {suggestedPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p)}
              disabled={isLoading}
              className="text-xs font-sans text-slate-300 bg-[#111A2E] hover:bg-[#182542] hover:text-white border border-slate-800 hover:border-emerald-500/50 rounded-lg px-3 py-1.5 transition-all text-left cursor-pointer disabled:opacity-50"
            >
              "{p}"
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Window */}
      <div className="bg-[#111A2E] border border-slate-800 rounded-xl overflow-hidden shadow-sm flex flex-col h-[520px]">
        
        {/* Messages Feed */}
        <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800/60 flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-2xl rounded-xl p-3.5 sm:p-4 text-xs sm:text-sm font-sans leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-none shadow-md'
                    : 'bg-[#0B1120] text-slate-200 border border-slate-800/90 rounded-bl-none'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
                <div
                  className={`text-[10px] font-mono mt-2 flex items-center gap-1 ${
                    msg.sender === 'user' ? 'text-emerald-200 justify-end' : 'text-slate-500'
                  }`}
                >
                  <span>{msg.timestamp}</span>
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 flex items-center justify-center shrink-0 mt-0.5 font-mono text-xs font-bold">
                  YOU
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-8 h-8 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800/60 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 animate-bounce" />
              </div>
              <div className="bg-[#0B1120] text-slate-400 border border-slate-800 px-4 py-2.5 rounded-xl text-xs font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Synthesizing portfolio dataset...</span>
              </div>
            </div>
          )}
        </div>

        {/* Chat Input Bar */}
        <div className="p-3 sm:p-4 border-t border-slate-800 bg-[#0B1120]">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask PJMAK about cost overruns, claims, SPI, or system lineage..."
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              disabled={isLoading}
              className="flex-1 bg-[#111A2E] border border-slate-700/80 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm font-sans text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-bold text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer disabled:cursor-not-allowed shadow-md"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
