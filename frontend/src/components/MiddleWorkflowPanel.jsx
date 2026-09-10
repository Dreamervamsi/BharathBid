import React, { useState } from 'react';
import { 
  ZoomIn, ZoomOut, RotateCcw, Search, 
  Mail, Send, CheckCircle2, AlertTriangle, XCircle, 
  FileText, ExternalLink, ShieldCheck, ArrowRight, Play, RefreshCw
} from 'lucide-react';

export default function MiddleWorkflowPanel({ 
  metadata = {}, 
  onTriggerSmtp, 
  auditLogs = [] 
}) {
  const [activeTab, setActiveTab] = useState('WORKFLOW'); // 'WORKFLOW' or 'DOCUMENT'
  const [zoomLevel, setZoomLevel] = useState(100);
  const [searchQuery, setSearchQuery] = useState('');
  const [smtpEmail, setSmtpEmail] = useState('officer.audit@gov.in');
  const [smtpStatus, setSmtpStatus] = useState(''); // '', 'SENDING', 'SENT'
  const [highlightTerms, setHighlightTerms] = useState(true);

  // 11-Step GeM Procurement Flow Calculation based on metadata
  const value = metadata.estimatedValue || 650000;
  
  const steps = [
    { 
      id: 1, 
      name: "Financial Approval", 
      status: metadata.cfaStatus === 'APPROVED' ? 'APPROVED' : 'PENDING',
      detail: metadata.cfaStatus === 'APPROVED' ? "Approved by Competent Financial Authority (CFA)" : "Awaiting CFA Sign-off"
    },
    { 
      id: 2, 
      name: "Portal Availability Check", 
      status: 'AVAILABLE',
      detail: "Verified active connection on www.gem.gov.in"
    },
    { 
      id: 3, 
      name: "Item Search & Availability", 
      status: 'FOUND',
      detail: "Item category & specification matched in GeM Master Catalog"
    },
    { 
      id: 4, 
      name: "Value Threshold Routing Engine", 
      status: 'ROUTED',
      detail: value <= 25000 
        ? "Direct Purchase (≤ ₹25,000) — Any GeM Supplier" 
        : value <= 500000 
          ? "L1 Comparative Report (> ₹25k & ≤ ₹5L) Auto-Selection" 
          : "Online Bidding / Reverse Auction (RA) (> ₹5L)"
    },
    { 
      id: 5, 
      name: "Add to Cart Logic", 
      status: 'COMPLETED',
      detail: "Item locked in GeM Cart with price freeze & quantity verification"
    },
    { 
      id: 6, 
      name: "CFA Registration Verification", 
      status: metadata.cfaStatus === 'APPROVED' ? 'VERIFIED' : 'FAILED',
      detail: "CFA registration code verified in Public Procurement Portal"
    },
    { 
      id: 7, 
      name: "Contract / Order Generation", 
      status: 'GENERATED',
      detail: "Draft Order #GEM-ORD-2024-88102 compiled with legal terms"
    },
    { 
      id: 8, 
      name: "Physical Item Receipt Verification", 
      status: 'IN_INSPECTION',
      detail: "Consignee physical inspection & serial verification"
    },
    { 
      id: 9, 
      name: "Tax Invoice Extraction & Verification", 
      status: 'PARSED',
      detail: "Tax Invoice GSTIN & HSN Code matched with GeM Contract"
    },
    { 
      id: 10, 
      name: "CRAC Certificate Generation", 
      status: metadata.cracStatus === 'READY' ? 'GENERATED' : 'WARNING',
      detail: "Consignee Receipt and Acceptance Certificate (CRAC) status"
    },
    { 
      id: 11, 
      name: "Payment Process Initiation", 
      status: metadata.cracStatus === 'READY' ? 'INITIATED' : 'BLOCKED',
      detail: "PFMS / Treasury Disbursement clearance pipeline"
    }
  ];

  const handleSendSmtp = (e) => {
    e.preventDefault();
    setSmtpStatus('SENDING');
    setTimeout(() => {
      setSmtpStatus('SENT');
      if (onTriggerSmtp) onTriggerSmtp(smtpEmail);
      setTimeout(() => setSmtpStatus(''), 4000);
    }, 1200);
  };

  return (
    <div className="bg-white rounded-lg border border-slate-300 shadow-xs h-full flex flex-col overflow-hidden text-xs">
      {/* 4. DIRECT SMTP EMAIL DISPATCH TOOLBAR */}
      <div className="bg-[#0B2545] text-white p-2.5 px-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex items-center space-x-2">
          <Mail className="w-4 h-4 text-amber-400 stroke-[2.5]" />
          <span className="font-extrabold uppercase tracking-wide text-[11px] text-white">
            SMTP Email Dispatch System
          </span>
        </div>

        <form onSubmit={handleSendSmtp} className="flex items-center space-x-2">
          <input
            type="email"
            required
            value={smtpEmail}
            onChange={(e) => setSmtpEmail(e.target.value)}
            placeholder="officer@gov.in"
            className="bg-[#1D2A44] border border-slate-600 rounded px-2.5 py-1 text-xs text-white placeholder-slate-400 outline-none focus:border-amber-400 w-48 font-mono"
          />
          <button
            type="submit"
            disabled={smtpStatus === 'SENDING'}
            className="py-1 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded text-[11px] flex items-center space-x-1.5 shadow-sm transition-all"
          >
            {smtpStatus === 'SENDING' ? (
              <span>Dispatching...</span>
            ) : smtpStatus === 'SENT' ? (
              <span className="text-emerald-950 flex items-center gap-1 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Sent PDF
              </span>
            ) : (
              <>
                <Send className="w-3 h-3" />
                <span>Dispatch Report</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Primary Navigation Tabs & Viewer Toolbar */}
      <div className="bg-slate-100 border-b border-slate-300 px-3 py-1.5 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setActiveTab('WORKFLOW')}
            className={`py-1 px-3 rounded font-black text-xs transition-all ${
              activeTab === 'WORKFLOW'
                ? 'bg-[#0B2545] text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            11-Step GeM Workflow Engine
          </button>
          <button
            onClick={() => setActiveTab('DOCUMENT')}
            className={`py-1 px-3 rounded font-black text-xs transition-all ${
              activeTab === 'DOCUMENT'
                ? 'bg-[#0B2545] text-white shadow-xs'
                : 'text-slate-700 hover:bg-slate-200'
            }`}
          >
            High-Res Document Canvas
          </button>
        </div>

        {activeTab === 'DOCUMENT' && (
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-white border border-slate-300 rounded px-1.5 py-0.5">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search canvas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-24 text-[10px] outline-none font-medium"
              />
            </div>
            <div className="flex items-center space-x-1 bg-white border border-slate-300 rounded px-1 py-0.5">
              <button onClick={() => setZoomLevel(prev => Math.max(prev - 10, 50))} className="p-0.5 hover:bg-slate-100 rounded">
                <ZoomOut className="w-3.5 h-3.5 text-slate-700" />
              </button>
              <span className="text-[10px] font-mono font-bold w-9 text-center">{zoomLevel}%</span>
              <button onClick={() => setZoomLevel(prev => Math.min(prev + 10, 150))} className="p-0.5 hover:bg-slate-100 rounded">
                <ZoomIn className="w-3.5 h-3.5 text-slate-700" />
              </button>
              <button onClick={() => setZoomLevel(100)} className="p-0.5 hover:bg-slate-100 rounded">
                <RotateCcw className="w-3.5 h-3.5 text-slate-700" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Middle Viewport Body */}
      <div className="flex-1 overflow-y-auto bg-slate-200/60 p-4">
        {activeTab === 'WORKFLOW' ? (
          <div className="space-y-3 max-w-2xl mx-auto">
            <div className="bg-white p-3 rounded-lg border border-slate-300 shadow-2xs flex items-center justify-between">
              <div>
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-wide block">Active Routing Logic</span>
                <span className="text-xs font-black text-blue-900">
                  GFR Rule 149 • Value: ₹{value.toLocaleString('en-IN')}
                </span>
              </div>
              <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-black px-2.5 py-1 rounded">
                {value <= 25000 ? 'Direct Purchase' : value <= 500000 ? 'L1 Comparative Auto-Selection' : 'Online Bidding / Reverse Auction'}
              </span>
            </div>

            {/* 11 Steps Interactive List */}
            <div className="space-y-2">
              {steps.map((step) => {
                const isPassed = ['APPROVED', 'AVAILABLE', 'FOUND', 'ROUTED', 'COMPLETED', 'VERIFIED', 'GENERATED', 'PARSED', 'INITIATED'].includes(step.status);
                const isWarning = step.status === 'WARNING' || step.status === 'IN_INSPECTION';
                
                return (
                  <div 
                    key={step.id}
                    className={`p-3 rounded-lg border transition-all ${
                      isPassed 
                        ? 'bg-white border-slate-300 hover:border-emerald-500' 
                        : isWarning 
                          ? 'bg-amber-50/80 border-amber-300' 
                          : 'bg-rose-50/80 border-rose-300'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start space-x-2.5">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center font-black text-[10px] shrink-0 mt-0.5 ${
                          isPassed ? 'bg-emerald-600 text-white' : isWarning ? 'bg-amber-500 text-white' : 'bg-rose-600 text-white'
                        }`}>
                          {step.id}
                        </div>
                        <div>
                          <h4 className="font-extrabold text-slate-900 text-xs">{step.name}</h4>
                          <p className="text-[11px] text-slate-600 mt-0.5">{step.detail}</p>
                        </div>
                      </div>

                      <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider shrink-0 ${
                        isPassed 
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' 
                          : isWarning 
                            ? 'bg-amber-100 text-amber-800 border border-amber-300' 
                            : 'bg-rose-100 text-rose-800 border border-rose-300'
                      }`}>
                        {step.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* HIGH-RES INTERACTIVE A4 / LETTER CANVAS VIEWPORT */
          <div className="flex justify-center transition-all">
            <div 
              style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
              className="bg-white border border-slate-400 shadow-xl rounded-sm w-[680px] min-h-[880px] p-8 space-y-6 text-slate-800 font-serif leading-relaxed relative"
            >
              {/* Document Letterhead */}
              <div className="border-b-2 border-slate-800 pb-4 text-center space-y-1">
                <div className="flex justify-center mb-1">
                  <img src="/src/assets/emblem.svg" alt="Emblem" className="w-10 h-12 object-contain" />
                </div>
                <h2 className="font-sans text-sm font-extrabold uppercase tracking-widest text-slate-900">
                  Government e-Marketplace (GeM) Audit Document
                </h2>
                <p className="font-sans text-[10px] text-slate-600">
                  Procurement Reference: {metadata.tenderId || 'GEM/2024/B/19102'} • Ministry of Defence
                </p>
              </div>

              {/* Document Clause Content */}
              <div className="space-y-4 text-xs font-serif">
                <div className="bg-slate-50 p-3 rounded border border-slate-200 font-sans text-[11px] space-y-1">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>TENDER EVALUATION SUMMARY</span>
                    <span>GFR RULE 149</span>
                  </div>
                  <p>Estimated Value: <strong>₹{(metadata.estimatedValue || 650000).toLocaleString('en-IN')}</strong></p>
                  <p>Buyer Dept: <strong>{metadata.buyerOrg || 'Ordnance Supply Board'}</strong></p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-sans font-bold text-slate-900 border-b border-slate-300 pb-1 uppercase text-[11px]">
                    Section I: Mandatory Qualification Clauses
                  </h3>
                  <p className="p-2 rounded bg-amber-50/80 border-l-4 border-amber-500 font-sans text-[11px]">
                    <strong>Clause 3.2 (Past Performance):</strong> The bidder must have supplied at least 50 units of high-grade IT servers to any Central/State Govt Entity in the last 3 financial years.
                  </p>
                  <p className="p-2 rounded bg-rose-50/80 border-l-4 border-rose-500 font-sans text-[11px]">
                    <strong>Clause 4.1 (Turnover Discrepancy Alert):</strong> Annual turnover requirement is ₹2.5 Crores. Submitted balance sheet shows ₹1.8 Crores — <em>Discrepancy detected during forensic OCR scan.</em>
                  </p>
                </div>

                <div className="space-y-2 pt-2">
                  <h3 className="font-sans font-bold text-slate-900 border-b border-slate-300 pb-1 uppercase text-[11px]">
                    Section II: GeM L1 Comparative Matrix
                  </h3>
                  <table className="w-full text-left font-sans text-[10px] border border-slate-300">
                    <thead className="bg-slate-100 font-bold border-b border-slate-300">
                      <tr>
                        <th className="p-2 border-r">Bidder Name</th>
                        <th className="p-2 border-r">Quoted Amount (₹)</th>
                        <th className="p-2 border-r">GeM Rank</th>
                        <th className="p-2">Compliance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 font-medium">
                      <tr className="bg-emerald-50/60">
                        <td className="p-2 border-r font-bold">ABC Infra Private Limited</td>
                        <td className="p-2 border-r font-mono">₹6,45,000</td>
                        <td className="p-2 border-r font-bold text-emerald-800">L1 (Lowest)</td>
                        <td className="p-2 text-emerald-800 font-bold">Passed Tech</td>
                      </tr>
                      <tr>
                        <td className="p-2 border-r">TechGov Solutions Ltd</td>
                        <td className="p-2 border-r font-mono">₹6,80,000</td>
                        <td className="p-2 border-r font-bold text-slate-600">L2</td>
                        <td className="p-2 text-slate-600">Passed Tech</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="pt-4 border-t border-slate-300 text-[10px] font-sans text-slate-500 flex justify-between">
                  <span>Digitally Audited by GeM Engine</span>
                  <span>Page 1 of 1</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
