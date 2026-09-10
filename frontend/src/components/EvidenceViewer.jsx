import React, { useState } from 'react';
import { ZoomIn, ZoomOut, Maximize2, FileText, CheckCircle, Sparkles } from 'lucide-react';

export default function EvidenceViewer({ clause }) {
  const [zoom, setZoom] = useState(150);
  const [showPopup, setShowPopup] = useState(true);

  if (!clause) {
    return (
      <div className="bg-white rounded-lg border border-slate-200 h-full flex items-center justify-center text-slate-400 text-xs">
        Select a clause to inspect document evidence
      </div>
    );
  }

  const isIssue = clause.status === 'ISSUE';

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-2xs flex flex-col h-full overflow-hidden">
      {/* Top Controls Bar */}
      <div className="px-4 py-2.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between shrink-0 text-xs">
        <div className="flex items-center space-x-2 truncate pr-2">
          <FileText className="w-4 h-4 text-blue-600 shrink-0" />
          <span className="font-bold text-slate-900 tracking-tight uppercase text-[11px]">DOCUMENT EVIDENCE VIEWER</span>
        </div>

        <div className="flex items-center space-x-4 shrink-0">
          <span className="text-slate-500 font-medium text-[11px]">
            Page <strong className="text-slate-900 font-bold">{clause.pageNumber || 14}</strong> of {clause.totalPages || 48}
          </span>

          <div className="flex items-center space-x-1 border border-slate-300 rounded bg-white px-1 py-0.5">
            <button
              onClick={() => setZoom(prev => Math.max(75, prev - 25))}
              className="p-1 hover:bg-slate-100 rounded text-slate-600"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1.5 font-bold text-slate-700 text-[11px] min-w-[40px] text-center">{zoom}%</span>
            <button
              onClick={() => setZoom(prev => Math.min(200, prev + 25))}
              className="p-1 hover:bg-slate-100 rounded text-slate-600"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button className="p-1.5 hover:bg-slate-200 rounded text-slate-600" title="Fullscreen">
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Document Viewer Canvas */}
      <div className="flex-1 bg-slate-200/80 p-4 overflow-auto flex items-start justify-center relative">
        <div className="flex gap-4 max-w-full">
          {/* Page Thumbnails sidebar preview */}
          <div className="hidden lg:flex flex-col space-y-2 shrink-0">
            {[12, 13, 14, 15, 16].map((pNum) => (
              <div
                key={pNum}
                className={`w-12 h-16 rounded border text-[9px] flex flex-col items-center justify-between p-1 bg-white cursor-pointer shadow-2xs ${
                  pNum === (clause.pageNumber || 14)
                    ? 'border-blue-600 ring-2 ring-blue-500/40 font-bold'
                    : 'border-slate-300 opacity-60 hover:opacity-100'
                }`}
              >
                <div className="w-full h-10 bg-slate-100 border border-slate-200 rounded-2xs flex flex-col p-0.5 space-y-0.5">
                  <div className="w-full h-1 bg-slate-300 rounded"></div>
                  <div className="w-3/4 h-1 bg-slate-300 rounded"></div>
                  {pNum === (clause.pageNumber || 14) && (
                    <div className="w-full h-2 bg-rose-200 border border-rose-400 rounded"></div>
                  )}
                </div>
                <span>{pNum}</span>
              </div>
            ))}
          </div>

          {/* Main Simulated Financial Document Page */}
          <div
            className="bg-white shadow-md border border-slate-300 rounded p-6 sm:p-8 text-slate-900 transition-all duration-200 select-text relative"
            style={{ width: `${(620 * zoom) / 100}px`, minHeight: '720px' }}
          >
            {/* Document Header */}
            <div className="text-center mb-6 border-b border-slate-200 pb-4">
              <h3 className="font-bold text-base tracking-wide uppercase text-slate-900">
                {clause.bidderName || "ABC Infra Private Limited"}
              </h3>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                {clause.documentName || "Statement of Profit and Loss for the year ended 31 March 2023"}
              </p>
              <div className="text-[10px] text-slate-400 text-right mt-2 italic">(Amount in INR)</div>
            </div>

            {/* Document Table Content */}
            <div className="text-xs space-y-2.5">
              <div className="grid grid-cols-12 font-bold text-slate-600 border-b border-slate-300 pb-1.5 uppercase text-[10px] tracking-wider">
                <div className="col-span-8">Particulars</div>
                <div className="col-span-4 text-right">FY 2022-23</div>
              </div>

              {/* Highlighted OCR Bounding Box Row (Translucent OCR evidence highlight) */}
              <div className="relative cursor-pointer" onClick={() => setShowPopup(!showPopup)}>
                <div
                  className={`grid grid-cols-12 py-2 px-2.5 rounded border transition-all ${
                    isIssue
                      ? 'bg-rose-100/70 border-rose-500 ring-2 ring-rose-500/40 font-black text-rose-950 shadow-2xs'
                      : 'bg-emerald-100/70 border-emerald-500 ring-2 ring-emerald-500/40 font-black text-emerald-950 shadow-2xs'
                  }`}
                >
                  <div className="col-span-8 flex items-center space-x-2">
                    <span className="text-slate-900">I. Revenue from Operations</span>
                  </div>
                  <div className="col-span-4 text-right font-black text-sm">
                    {clause.extractedText ? clause.extractedText.split('₹')[1] || "₹ 3,53,00,000" : "₹ 3,53,00,000"}
                  </div>
                </div>

                {/* Interactive Bounding Box Tag */}
                <div className="absolute -top-2.5 left-2 bg-rose-600 text-white text-[9px] font-extrabold px-1.5 py-0.2 rounded shadow-2xs uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>OCR BBox: [120, 340, 1020, 380]</span>
                </div>

                {/* AI Evidence Popup Overlay attached to bbox row */}
                {showPopup && (
                  <div className="mt-3 bg-white border border-rose-300 shadow-xl rounded-lg p-3 text-xs z-10 max-w-xs mx-auto md:ml-12 border-l-4 border-l-rose-500 animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 mb-2">
                      <div className="flex items-center space-x-1.5 text-rose-700 font-bold text-[11px]">
                        <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                        <span>AI Evidence Extracted</span>
                      </div>
                      <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-1.5 py-0.5 rounded border border-emerald-300">
                        {clause.confidenceScore || 92}% Confidence
                      </span>
                    </div>

                    <div className="space-y-1 text-slate-700 text-[11px]">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Extracted Value:</span>
                        <strong className="font-extrabold text-slate-900">{clause.foundValue || "₹ 3.53 Crore"}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Source:</span>
                        <span className="font-semibold text-slate-800">Page {clause.pageNumber || 14}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Document:</span>
                        <span className="font-semibold text-slate-800 truncate max-w-[140px]">{clause.documentCode || "P&L FY 22-23"}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Other standard rows */}
              <div className="grid grid-cols-12 py-1.5 px-2 text-slate-700">
                <div className="col-span-8">II. Other Income</div>
                <div className="col-span-4 text-right font-medium">₹ 20,00,000</div>
              </div>

              <div className="grid grid-cols-12 py-1.5 px-2 font-bold text-slate-900 border-t border-slate-200">
                <div className="col-span-8">III. Total Revenue</div>
                <div className="col-span-4 text-right">₹ 3,73,00,000</div>
              </div>

              <div className="grid grid-cols-12 py-1.5 px-2 text-slate-700 font-semibold pt-3">
                <div className="col-span-8">IV. Expenses</div>
              </div>

              <div className="pl-4 space-y-1 text-[11px] text-slate-600">
                <div className="grid grid-cols-12 py-0.5">
                  <div className="col-span-8">(i) Cost of Materials Consumed</div>
                  <div className="col-span-4 text-right">₹ 1,45,00,000</div>
                </div>
                <div className="grid grid-cols-12 py-0.5">
                  <div className="col-span-8">(ii) Employee Benefit Expenses</div>
                  <div className="col-span-4 text-right">₹ 85,00,000</div>
                </div>
                <div className="grid grid-cols-12 py-0.5">
                  <div className="col-span-8">(iii) Finance Costs</div>
                  <div className="col-span-4 text-right">₹ 12,00,000</div>
                </div>
                <div className="grid grid-cols-12 py-0.5">
                  <div className="col-span-8">(iv) Other Expenses</div>
                  <div className="col-span-4 text-right">₹ 38,00,000</div>
                </div>
              </div>

              <div className="grid grid-cols-12 py-2 px-2 font-bold text-slate-900 border-t border-b border-slate-300">
                <div className="col-span-8">V. Total Expenses</div>
                <div className="col-span-4 text-right">₹ 2,80,00,000</div>
              </div>

              <div className="grid grid-cols-12 py-2 px-2 font-extrabold text-slate-900">
                <div className="col-span-8">VI. Profit Before Tax</div>
                <div className="col-span-4 text-right">₹ 93,00,000</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Meta */}
      <div className="px-4 py-2 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-[11px] text-slate-500 shrink-0">
        <div className="flex items-center space-x-2">
          <FileText className="w-3.5 h-3.5 text-slate-400" />
          <span>Document: <strong className="text-slate-800">{clause.documentFileName || "Statement of Profit & Loss FY 2022-23.pdf"}</strong></span>
        </div>
        <div className="flex items-center space-x-3">
          <span>Pages: <strong>{clause.totalPages || 48}</strong></span>
          <span>Uploaded: <strong>12 May 2024, 10:42 AM</strong></span>
          <span className="flex items-center text-emerald-600 font-bold gap-1">
            <CheckCircle className="w-3 h-3" /> Verified
          </span>
        </div>
      </div>
    </div>
  );
}
