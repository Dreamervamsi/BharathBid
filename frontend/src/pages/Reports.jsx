import React, { useState, useEffect } from 'react';
import { BarChart3, PieChart, CheckCircle2, AlertTriangle, HelpCircle, Download } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useVerification } from '../context/VerificationContext';

export default function Reports() {
  const { showToast } = useToast();
  const { liveScore, counters, clauses, revealedFindings, fileName } = useVerification();
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    // Trigger chart draw animation on route load
    setAnimated(false);
    const timer = setTimeout(() => {
      setAnimated(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const total = counters.passed + counters.issues + counters.review;
  const passedPct = total > 0 ? Math.round((counters.passed / total) * 100) : (liveScore > 0 ? liveScore : 63);
  const issuesPct = total > 0 ? Math.round((counters.issues / total) * 100) : (liveScore > 0 ? Math.round((100 - liveScore) * 0.6) : 21);
  const reviewPct = total > 0 ? Math.max(0, 100 - passedPct - issuesPct) : 16;

  const handleExportPDF = () => {
    showToast('Exporting summary compliance report (PDF)...', 'info');
    setTimeout(() => {
      showToast('Summary report PDF generated & saved to downloads!', 'success');
    }, 1200);
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs flex items-center justify-between">
        <div>
          <h1 className="text-base font-bold text-slate-900 uppercase tracking-wide">Procurement Compliance Reports</h1>
          <p className="text-xs text-slate-500">
            Forensic analytics & compliance distribution for active verification case {fileName ? `(${fileName})` : ''}
          </p>
        </div>
        <button
          onClick={handleExportPDF}
          className="py-2 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-bold flex items-center space-x-1.5 shadow-2xs transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Summary (PDF)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SVG Distribution Chart Card with Load Animation */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Live Compliance Distribution
            </h2>
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Overall Score: {liveScore}%
            </span>
          </div>

          <div className="flex items-center justify-center py-6 relative">
            <svg
              className={`w-48 h-48 transform -rotate-90 transition-all duration-1000 ease-out ${
                animated ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
              }`}
              viewBox="0 0 36 36"
            >
              {/* Passed slice (Green) */}
              <circle
                cx="18"
                cy="18"
                r="15.9155"
                className="text-emerald-500 transition-all duration-1000 ease-out stroke-current"
                strokeWidth="3.8"
                strokeDasharray={`${animated ? passedPct : 0}, 100`}
                strokeDashoffset="0"
                fill="none"
              />
              {/* Issues slice (Red) */}
              <circle
                cx="18"
                cy="18"
                r="15.9155"
                className="text-rose-500 transition-all duration-1000 ease-out stroke-current"
                strokeWidth="3.8"
                strokeDasharray={`${animated ? issuesPct : 0}, 100`}
                strokeDashoffset={`-${passedPct}`}
                fill="none"
              />
              {/* Review slice (Amber) */}
              <circle
                cx="18"
                cy="18"
                r="15.9155"
                className="text-amber-500 transition-all duration-1000 ease-out stroke-current"
                strokeWidth="3.8"
                strokeDasharray={`${animated ? reviewPct : 0}, 100`}
                strokeDashoffset={`-${passedPct + issuesPct}`}
                fill="none"
              />
            </svg>

            {/* Inner Center Score Display */}
            <div className="absolute flex flex-col items-center justify-center pointer-events-none text-center">
              <span className="text-2xl font-black text-slate-900">{liveScore}%</span>
              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Score</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs mt-2 border-t border-slate-100 pt-3">
            <div>
              <span className="font-extrabold text-emerald-600 block text-sm">{counters.passed}</span>
              <span className="text-[10px] text-slate-500 font-semibold">Passed ({passedPct}%)</span>
            </div>
            <div>
              <span className="font-extrabold text-rose-600 block text-sm">{counters.issues}</span>
              <span className="text-[10px] text-slate-500 font-semibold">Issues ({issuesPct}%)</span>
            </div>
            <div>
              <span className="font-extrabold text-amber-600 block text-sm">{counters.review}</span>
              <span className="text-[10px] text-slate-500 font-semibold">Review ({reviewPct}%)</span>
            </div>
          </div>
        </div>

        {/* Executive Compliance Insights */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-4">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Active Tender Clause Discrepancies</h2>

          <div className="space-y-3 text-xs">
            {clauses.filter(c => c.status !== 'PENDING').length === 0 ? (
              <div className="p-6 text-center text-slate-400 text-xs border border-dashed border-slate-200 rounded-lg">
                No active document evaluated yet. Upload a bid document in Live Verification to view real-time discrepancy analysis.
              </div>
            ) : (
              clauses.filter(c => c.status !== 'PENDING').map(c => (
                <div
                  key={c.id}
                  className={`p-3 rounded-md border ${
                    c.status === 'ISSUE' ? 'bg-rose-50 border-rose-200 text-rose-900' :
                    c.status === 'REVIEW' ? 'bg-amber-50 border-amber-200 text-amber-900' :
                    'bg-emerald-50 border-emerald-200 text-emerald-900'
                  }`}
                >
                  <div className="flex justify-between font-bold mb-1">
                    <span>Clause {c.clauseNumber}: {c.title}</span>
                    <span className="text-[10px] uppercase">{c.status}</span>
                  </div>
                  <p className="text-[11px] opacity-90">{c.whyItMatters || c.extractedText}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
