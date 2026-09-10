import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Maximize2, FileText, CheckCircle, Sparkles, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useVerification } from '../context/VerificationContext';

export default function EvidenceViewer({ clause }) {
  const { showToast } = useToast();
  const { uploadedFile, pdfObjectUrl, fileName, fileSizeKb } = useVerification();
  const [zoom, setZoom] = useState(150);
  const [activePage, setActivePage] = useState(clause?.pageNumber || 14);

  React.useEffect(() => {
    if (clause?.pageNumber) {
      setActivePage(clause.pageNumber);
    }
  }, [clause]);

  if (!clause) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 h-full flex items-center justify-center text-slate-400 text-xs">
        Select a clause to inspect document evidence
      </div>
    );
  }

  const isIssue = clause.status === 'ISSUE';

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-2xs flex flex-col h-full overflow-hidden font-sans">
      {/* Top Controls Bar */}
      <div className="px-3.5 py-2 border-b border-slate-200 bg-white flex items-center justify-between shrink-0 text-xs">
        <div className="flex items-center space-x-2 truncate pr-2">
          <span className="font-semibold text-slate-900 truncate text-[11px] uppercase tracking-wide">
            DOCUMENT READER AND EVIDENCE
          </span>
          <span className="text-[10px] text-blue-600 font-mono bg-blue-50 px-2 py-0.5 rounded border border-blue-200 truncate">
            {clause.documentFileName || fileName}
          </span>
        </div>

        <div className="flex items-center space-x-3 shrink-0 text-[11px] text-slate-500">
          <div>
            Page <strong className="text-slate-900 font-semibold">{activePage}</strong> of {clause.totalPages || 48}
          </div>

          <div className="flex items-center space-x-1 border border-slate-200 rounded bg-slate-50 px-1 py-0.5">
            <button
              onClick={() => setZoom(prev => Math.max(60, prev - 20))}
              className="p-0.5 hover:bg-slate-200 rounded text-slate-600 font-bold"
            >
              -
            </button>
            <span className="px-1 font-medium text-slate-700 text-[10px] min-w-[32px] text-center">{zoom}%</span>
            <button
              onClick={() => setZoom(prev => Math.min(200, prev + 20))}
              className="p-0.5 hover:bg-slate-200 rounded text-slate-600 font-bold"
            >
              +
            </button>
          </div>

          <button
            onClick={() => showToast(`Expanded Document Evidence View`, 'info')}
            className="p-1 hover:bg-slate-100 rounded text-slate-600 transition-colors"
          >
            <Maximize2 className="w-3.5 h-3.5 stroke-[1.8]" />
          </button>
        </div>
      </div>

      {/* Main Document Viewer Canvas */}
      <div className="flex-1 bg-[#2C323B]/10 p-3 overflow-auto flex items-start justify-center relative">
        {pdfObjectUrl ? (
          <div className="w-full h-full min-h-[500px] flex flex-col items-center">
            <iframe
              src={`${pdfObjectUrl}#page=${activePage}`}
              title="Uploaded PDF Document"
              className="w-full h-full min-h-[520px] rounded border border-slate-300 shadow-md bg-white"
            />
          </div>
        ) : (
          <div className="flex gap-3 max-w-full">
            {/* Page Thumbnails sidebar preview */}
            <div className="hidden lg:flex flex-col space-y-2 shrink-0">
              {[1, 2, clause.pageNumber || 14, 15, 16].map((pNum) => (
                <div
                  key={pNum}
                  onClick={() => setActivePage(pNum)}
                  className={`w-12 h-16 rounded border text-[9px] flex flex-col items-center justify-between p-1 bg-white cursor-pointer shadow-2xs transition-all ${
                    pNum === activePage
                      ? 'border-blue-600 ring-2 ring-blue-500/40 font-semibold'
                      : 'border-slate-300 opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="w-full h-10 bg-slate-100 border border-slate-200 rounded-2xs flex flex-col p-0.5 space-y-0.5">
                    <div className="w-full h-1 bg-slate-300 rounded"></div>
                    <div className="w-3/4 h-1 bg-slate-300 rounded"></div>
                    {pNum === activePage && (
                      <div className="w-full h-2 bg-rose-200 border border-rose-400 rounded"></div>
                    )}
                  </div>
                  <span>{pNum}</span>
                </div>
              ))}
            </div>

            {/* Document Canvas Paper */}
            <div
              className="bg-white shadow-md border border-slate-300 rounded p-6 sm:p-7 text-slate-900 transition-all duration-200 select-text relative"
              style={{ width: `${(580 * zoom) / 100}px`, minHeight: '660px' }}
            >
              <div className="text-center mb-5 border-b border-slate-200 pb-3">
                <h3 className="font-semibold text-sm tracking-wide uppercase text-slate-900">
                  {clause.bidderName || "ABC Infra Private Limited"}
                </h3>
                <p className="text-[11px] text-slate-600 font-medium mt-0.5">
                  {clause.documentName || "Financial & Compliance Evidence Document"}
                </p>
                <div className="text-[9px] text-slate-400 text-right mt-1 italic">Extracted from Page {activePage}</div>
              </div>

              {/* Dynamic Extracted Evidence Highlight Box */}
              <div className="text-xs space-y-3">
                <div className="p-3 bg-blue-50/80 border border-blue-200 rounded-lg space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-blue-900 uppercase tracking-wider">
                      Clause {clause.clauseNumber}: {clause.title}
                    </span>
                    <span className="text-[10px] font-mono text-blue-700 bg-white px-2 py-0.5 rounded border border-blue-200">
                      Page {clause.pageNumber || activePage}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-900">
                    Requirement: <span className="text-slate-700">{clause.requirement}</span>
                  </div>
                  <div className="text-xs font-bold text-slate-900">
                    Found Value: <span className={isIssue ? "text-rose-600 font-black" : "text-emerald-700 font-black"}>{clause.foundValue}</span>
                  </div>
                  {clause.variance && (
                    <div className="text-[11px] font-semibold text-slate-600">
                      Variance: <span className="text-slate-800">{clause.variance}</span>
                    </div>
                  )}
                </div>

                <div className="relative p-3 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Raw Extracted Source Snippet
                  </div>
                  <p className="text-xs font-mono text-slate-800 bg-white p-2 rounded border border-slate-200 leading-relaxed">
                    "{clause.extractedText || "Source snippet extracted during PyPDF / OCR analysis."}"
                  </p>

                  <div className="flex items-center justify-between pt-1 text-[10px] text-slate-500 font-medium">
                    <span>Confidence Score: <strong className="text-slate-900">{clause.confidenceScore || 92}%</strong></span>
                    <span>Risk Severity: <strong className={isIssue ? "text-rose-600 font-bold" : "text-emerald-600 font-bold"}>{clause.riskLevel || "LOW"}</strong></span>
                  </div>
                </div>

                <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-lg text-xs space-y-1">
                  <div className="font-bold text-amber-900 uppercase text-[10px]">Evaluation Note</div>
                  <p className="text-slate-700">{clause.whyItMatters}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Pipeline Progress Bar */}
      <div className="p-3 bg-white border-t border-slate-200 space-y-2 shrink-0 text-xs">
        <div className="flex items-center space-x-2 text-blue-900 font-semibold text-[11px]">
          <div className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></div>
          <span>AI Extraction Status</span>
          <span className="text-[10px] text-slate-400 font-normal">Active document evaluation complete</span>
        </div>

        <div className="grid grid-cols-6 gap-2 text-center text-[9px]">
          <div className="space-y-1">
            <div className="w-4 h-4 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center font-bold">✓</div>
            <div className="text-slate-700 font-medium leading-tight">Document Collected</div>
            <div className="text-slate-400">1s</div>
          </div>
          <div className="space-y-1">
            <div className="w-4 h-4 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center font-bold">✓</div>
            <div className="text-slate-700 font-medium leading-tight">Text Extraction</div>
            <div className="text-slate-400">2s</div>
          </div>
          <div className="space-y-1">
            <div className="w-4 h-4 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center font-bold">✓</div>
            <div className="text-slate-700 font-medium leading-tight">Information Extraction</div>
            <div className="text-slate-400">3s</div>
          </div>
          <div className="space-y-1">
            <div className="w-4 h-4 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center font-bold">✓</div>
            <div className="text-slate-700 font-medium leading-tight">Compliance Checks</div>
            <div className="text-slate-400">4s</div>
          </div>
          <div className="space-y-1">
            <div className="w-4 h-4 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center font-bold">✓</div>
            <div className="text-slate-700 font-medium leading-tight">Evidence Validation</div>
            <div className="text-slate-400">5s</div>
          </div>
          <div className="space-y-1">
            <div className="w-4 h-4 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center font-bold">✓</div>
            <div className="text-slate-700 font-medium leading-tight">Final Analysis</div>
            <div className="text-slate-400">6s</div>
          </div>
        </div>
      </div>
    </div>
  );
}
