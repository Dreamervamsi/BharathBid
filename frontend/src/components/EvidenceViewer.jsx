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
      {/* Top Controls Bar matching reference image ref.png */}
      <div className="px-3.5 py-2 border-b border-slate-200 bg-white flex items-center justify-between shrink-0 text-xs">
        <div className="flex items-center space-x-2 truncate pr-2">
          <span className="font-semibold text-slate-900 truncate text-[11px] uppercase tracking-wide">
            DOCUMENT READER AND EVIDENCE
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

      {/* Main Document Viewer Canvas matching reference ref.png */}
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
              {[12, 14, 15, 16, 17].map((pNum) => (
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
                  Statement of Profit and Loss for the year ended 31 March 2023
                </p>
                <div className="text-[9px] text-slate-400 text-right mt-1 italic">(Amount in INR)</div>
              </div>

              {/* Document Financial Table Content matching ref.png */}
              <div className="text-xs space-y-2">
                <div className="grid grid-cols-12 font-semibold text-slate-600 border-b border-slate-300 pb-1.5 uppercase text-[10px]">
                  <div className="col-span-8">Particulars</div>
                  <div className="col-span-4 text-right">FY 2022-23</div>
                </div>

                {/* Highlighted Bounding Box Row */}
                <div className="relative">
                  <div className="grid grid-cols-12 py-1.5 px-2 rounded border bg-rose-50 border-rose-300 text-slate-900 font-semibold">
                    <div className="col-span-8">I. Revenue from Operations</div>
                    <div className="col-span-4 text-right font-bold text-slate-900">
                      ₹ 35,30,000
                    </div>
                  </div>

                  {/* AI Extracted Floating Tag matching ref.png */}
                  <div className="absolute top-1 right-20 bg-rose-50 border border-rose-300 shadow-md rounded-md p-2 text-[10px] text-slate-800 z-10 w-44">
                    <div className="font-semibold text-rose-700 mb-0.5 text-[9px]">AI Extracted</div>
                    <div className="text-slate-600">Revenue from Operations</div>
                    <div className="font-bold text-slate-900">₹ 35,30,000</div>
                    <div className="text-[8px] text-slate-400 mt-0.5">Page 14 • 92% confidence</div>
                  </div>
                </div>

                <div className="grid grid-cols-12 py-1.5 px-2 text-slate-700">
                  <div className="col-span-8">II. Other Income</div>
                  <div className="col-span-4 text-right font-medium">₹ 20,00,000</div>
                </div>

                <div className="grid grid-cols-12 py-1.5 px-2 font-semibold text-slate-900 border-t border-slate-200">
                  <div className="col-span-8">III. Total Revenue</div>
                  <div className="col-span-4 text-right font-bold">₹ 55,30,000</div>
                </div>

                <div className="grid grid-cols-12 py-1.5 px-2 text-slate-700 font-medium pt-2">
                  <div className="col-span-8">IV. Expenses</div>
                </div>

                <div className="pl-3 space-y-1 text-[11px] text-slate-600">
                  <div className="grid grid-cols-12 py-0.5">
                    <div className="col-span-8">(i) Cost of Materials Consumed</div>
                    <div className="col-span-4 text-right">₹ 14,50,000</div>
                  </div>
                  <div className="grid grid-cols-12 py-0.5">
                    <div className="col-span-8">(ii) Employee Benefit Expenses</div>
                    <div className="col-span-4 text-right">₹ 8,50,000</div>
                  </div>
                  <div className="grid grid-cols-12 py-0.5">
                    <div className="col-span-8">(iii) Finance Costs</div>
                    <div className="col-span-4 text-right">₹ 12,00,000</div>
                  </div>
                  <div className="grid grid-cols-12 py-0.5">
                    <div className="col-span-8">(iv) Other Expenses</div>
                    <div className="col-span-4 text-right">₹ 3,80,000</div>
                  </div>
                </div>

                <div className="grid grid-cols-12 py-1.5 px-2 font-semibold text-slate-900 border-t border-b border-slate-300">
                  <div className="col-span-8">V. Total Expenses</div>
                  <div className="col-span-4 text-right">₹ 28,00,000</div>
                </div>

                <div className="grid grid-cols-12 py-1.5 px-2 font-bold text-slate-900">
                  <div className="col-span-8">VI. Profit Before Tax</div>
                  <div className="col-span-4 text-right">₹ 73,00,000</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom AI Extraction Progress Bar matching ref.png */}
      <div className="p-3 bg-white border-t border-slate-200 space-y-2 shrink-0 text-xs">
        <div className="flex items-center space-x-2 text-blue-900 font-semibold text-[11px]">
          <div className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></div>
          <span>AI Extraction Progress</span>
          <span className="text-[10px] text-slate-400 font-normal">Extracting information from document...</span>
        </div>

        {/* 6 Stage Timeline Dots matching ref.png */}
        <div className="grid grid-cols-6 gap-2 text-center text-[9px]">
          <div className="space-y-1">
            <div className="w-4 h-4 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center font-bold">✓</div>
            <div className="text-slate-700 font-medium leading-tight">Document Collected</div>
            <div className="text-slate-400">2s</div>
          </div>
          <div className="space-y-1">
            <div className="w-4 h-4 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center font-bold">✓</div>
            <div className="text-slate-700 font-medium leading-tight">Text Extraction</div>
            <div className="text-slate-400">5s</div>
          </div>
          <div className="space-y-1">
            <div className="w-4 h-4 rounded-full bg-blue-600 text-white mx-auto flex items-center justify-center font-bold">?</div>
            <div className="text-blue-900 font-semibold leading-tight">Information Extraction</div>
            <div className="text-slate-400">8s</div>
          </div>
          <div className="space-y-1 opacity-50">
            <div className="w-4 h-4 rounded-full bg-slate-200 text-slate-500 mx-auto flex items-center justify-center">4</div>
            <div className="text-slate-600 leading-tight">Compliance Checks</div>
            <div className="text-slate-400">12s</div>
          </div>
          <div className="space-y-1 opacity-50">
            <div className="w-4 h-4 rounded-full bg-slate-200 text-slate-500 mx-auto flex items-center justify-center">5</div>
            <div className="text-slate-600 leading-tight">Evidence Validation</div>
            <div className="text-slate-400">16s</div>
          </div>
          <div className="space-y-1 opacity-50">
            <div className="w-4 h-4 rounded-full bg-slate-200 text-slate-500 mx-auto flex items-center justify-center">6</div>
            <div className="text-slate-600 leading-tight">Final Analysis</div>
            <div className="text-slate-400">20s</div>
          </div>
        </div>
      </div>
    </div>
  );
}
