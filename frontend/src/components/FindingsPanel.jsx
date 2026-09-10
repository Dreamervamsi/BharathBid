import React from 'react';
import { AlertTriangle, Scale, HelpCircle, ShieldAlert } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function FindingsPanel({ clause }) {
  const { showToast } = useToast();

  if (!clause) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 h-full p-4 flex items-center justify-center text-slate-400 text-xs">
        Select a clause to view findings
      </div>
    );
  }

  const isIssue = clause.status === 'ISSUE';

  return (
    <div className="space-y-3 h-full overflow-y-auto pr-1">
      {/* WHAT WE FOUND CARD */}
      <div
        onClick={() => showToast(`Finding Details for Clause ${clause.clauseNumber}: ${clause.issueTitle || 'Extracted Evidence'}`, 'info')}
        className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden cursor-pointer hover:border-slate-400 transition-colors"
      >
        <div className="px-3.5 py-2.5 border-b border-slate-200 bg-slate-50 flex items-center space-x-2">
          <AlertTriangle className={`w-4 h-4 ${isIssue ? 'text-rose-600' : 'text-emerald-600'}`} />
          <h2 className="text-xs font-bold text-slate-900 tracking-wider uppercase">WHAT WE FOUND</h2>
        </div>

        <div className="p-3.5 space-y-3">
          {/* Risk Level Header Badge */}
          <div className="flex items-center space-x-2">
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                isIssue
                  ? 'bg-rose-100 text-rose-800 border border-rose-300'
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              }`}
            >
              {clause.riskLevel || (isIssue ? 'HIGH RISK' : 'LOW RISK')}
            </span>
          </div>

          {/* Discrepancy Title */}
          <h3 className={`text-sm font-black tracking-tight ${isIssue ? 'text-rose-700' : 'text-emerald-700'}`}>
            {clause.issueTitle || (isIssue ? 'TURNOVER BELOW REQUIRED' : 'COMPLIANCE CONFIRMED')}
          </h3>

          {/* Comparison Cards Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-slate-50 rounded-md border border-slate-200">
              <span className="text-[10px] text-slate-400 font-semibold block uppercase">REQUIRED (Per Tender)</span>
              <span className="text-xs font-extrabold text-slate-900 mt-1 block">
                {clause.requiredValue || "₹ 5.00 Crore"}
              </span>
            </div>

            <div className={`p-2.5 rounded-md border ${isIssue ? 'bg-rose-50/70 border-rose-200 text-rose-950' : 'bg-emerald-50/70 border-emerald-200 text-emerald-950'}`}>
              <span className="text-[10px] text-slate-500 font-semibold block uppercase">FOUND (In Document)</span>
              <span className="text-xs font-black mt-1 block">
                {clause.foundValue || "₹ 3.53 Crore"}
              </span>
            </div>
          </div>

          {/* Variance Highlight Box */}
          {clause.variance && (
            <div className={`p-2.5 rounded-md border text-center ${isIssue ? 'bg-rose-100/60 border-rose-300 text-rose-900' : 'bg-emerald-100/60 border-emerald-300 text-emerald-900'}`}>
              <span className="text-[10px] font-bold uppercase tracking-wider block text-slate-600">VARIANCE</span>
              <span className="text-xs font-extrabold mt-0.5 block">
                {clause.variance}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* WHY IT MATTERS CARD */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        <div className="px-3.5 py-2.5 border-b border-slate-200 bg-slate-50 flex items-center space-x-2">
          <Scale className="w-4 h-4 text-slate-700" />
          <h2 className="text-xs font-bold text-slate-900 tracking-wider uppercase">WHY IT MATTERS</h2>
        </div>

        <div className="p-3.5 space-y-3 text-xs">
          <p className="text-slate-700 leading-relaxed font-medium">
            {clause.whyItMatters || `Tender Clause ${clause.clauseNumber} evaluation rule.`}
          </p>

          {/* Metadata Table */}
          <div className="bg-slate-50 rounded-md border border-slate-200 p-2.5 grid grid-cols-4 gap-1 text-[11px] text-center">
            <div>
              <span className="text-slate-400 block text-[9px] uppercase font-semibold">Clause</span>
              <strong className="text-slate-800">{clause.clauseNumber}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[9px] uppercase font-semibold">Source</span>
              <strong className="text-slate-800 truncate block">{clause.documentCode || "P&L FY 22-23"}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[9px] uppercase font-semibold">Page</span>
              <strong className="text-slate-800">{clause.pageNumber || 14}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[9px] uppercase font-semibold">Confidence</span>
              <strong className="text-emerald-700 font-extrabold">{clause.confidenceScore || 92}%</strong>
            </div>
          </div>
        </div>
      </div>

      {/* TRANSPARENT RISK SCORE EXPLANATION CARD */}
      <div className="bg-slate-900 text-white rounded-lg p-3 text-xs space-y-1.5 shadow-2xs">
        <div className="flex justify-between items-center text-[10px] font-bold text-slate-300 uppercase tracking-wider">
          <span>How Risk Score is Calculated</span>
          <span className="text-rose-400 font-extrabold">+30 Risk Points</span>
        </div>
        <p className="text-[10px] text-slate-300 leading-normal">
          High severity financial eligibility discrepancy (+30 pts). Normalized overall compliance = 68% (High Risk classification).
        </p>
      </div>
    </div>
  );
}
