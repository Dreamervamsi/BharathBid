import React from 'react';
import { 
  FileText, CheckCircle2, Loader2, AlertCircle, HelpCircle, AlertOctagon, Info, SearchCheck 
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useVerification } from '../context/VerificationContext';

export default function RightAuditPanel() {
  const { showToast } = useToast();
  const { 
    revealedFindings, 
    isProcessing, 
    pipelineSteps, 
    selectClause, 
    fileName, 
    fileSizeKb,
    pdfObjectUrl
  } = useVerification();

  const handleCardClick = (item) => {
    if (item.clause) {
      selectClause(item.clause);
    }
    showToast(`Inspecting Finding: ${item.title}`, 'info');
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-2xs h-full flex flex-col overflow-hidden text-xs font-sans">
      {/* Top Header Card: Uploaded Document Meta */}
      <div className="p-3 bg-white border-b border-slate-100 flex items-start space-x-2.5 shrink-0">
        <div className="p-2 bg-blue-50 text-blue-800 rounded border border-blue-100 shrink-0">
          <FileText className="w-5 h-5 stroke-[1.8]" />
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="font-semibold text-slate-900 text-xs truncate leading-tight">
            {fileName || "No Document Uploaded"}
          </h4>
          {pdfObjectUrl ? (
            <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200 inline-block mt-0.5">
              Uploaded
            </span>
          ) : (
            <span className="text-[10px] text-slate-500 font-medium bg-slate-100 px-1.5 py-0.2 rounded border border-slate-200 inline-block mt-0.5">
              Pending Upload
            </span>
          )}
          <p className="text-[10px] text-slate-400 mt-0.5 font-normal">
            {pdfObjectUrl ? `${fileSizeKb} MB • Active File` : "Upload a bid document to start verification"}
          </p>
        </div>
      </div>

      {/* REAL-TIME VERIFICATION PIPELINE PROGRESSION */}
      <div className="p-3 border-b border-slate-100 space-y-2 shrink-0">
        <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider flex items-center justify-between">
          <span className="flex items-center space-x-1">
            <FileText className="w-3.5 h-3.5 text-slate-600" />
            <span>REAL-TIME VERIFICATION</span>
          </span>
        </div>

        <div className="space-y-2">
          {pipelineSteps.map((step) => {
            const isDone = step.status === 'COMPLETED';
            const isCurrent = step.status === 'PROCESSING';

            return (
              <div key={step.id} className="flex items-start space-x-2.5">
                <div className="shrink-0 mt-0.5">
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 stroke-[2]" />
                  ) : isCurrent ? (
                    <div className="relative flex items-center justify-center">
                      <Loader2 className="w-4 h-4 text-blue-600 animate-spin stroke-[2]" />
                    </div>
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-300 bg-slate-50" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <h5 className={`text-xs font-semibold ${isDone ? 'text-slate-900' : isCurrent ? 'text-blue-900' : 'text-slate-400'}`}>
                      {step.label}
                    </h5>
                    {step.time && (
                      <span className="text-[10px] text-slate-400 font-mono">{step.time}</span>
                    )}
                  </div>
                  <p className={`text-[10px] ${isCurrent ? 'text-blue-700' : 'text-slate-400'}`}>
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* LIVE FINDINGS STREAM */}
      <div className="p-3 space-y-2 overflow-y-auto flex-1 bg-white flex flex-col">
        <div className="flex items-center justify-between text-[10px] font-semibold text-slate-500 uppercase tracking-wider pb-1 border-b border-slate-100 shrink-0">
          <span>LIVE FINDINGS</span>
          <span className="text-blue-600 text-[10px] font-normal cursor-pointer hover:underline">
            View All ({revealedFindings.length})
          </span>
        </div>

        {revealedFindings.length === 0 ? (
          /* Empty State matching ref2.png */
          <div className="my-auto py-8 px-4 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-2">
              <SearchCheck className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h5 className="font-bold text-slate-900 text-xs mb-1">No findings yet</h5>
            <p className="text-[10px] text-slate-400 max-w-[180px] leading-relaxed">
              Findings will appear here as the verification process progresses.
            </p>
          </div>
        ) : (
          revealedFindings.map((item, idx) => {
            if (item.type === 'RED_FLAG') {
              return (
                <div 
                  key={item.id || idx}
                  onClick={() => handleCardClick(item)}
                  className="bg-rose-50/70 border border-rose-200 rounded-md p-2.5 space-y-1 cursor-pointer hover:border-rose-400 transition-colors animate-fade-up"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-1.5">
                      <div className="w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center font-semibold text-[9px] shrink-0">
                        ✕
                      </div>
                      <h4 className="font-semibold text-rose-950 text-xs">{item.title}</h4>
                    </div>
                    <span className="text-[9px] font-semibold text-rose-600 uppercase tracking-wider">HIGH</span>
                  </div>
                  <p className="text-[10px] text-slate-600 font-mono">
                    {item.description || item.extractedValue}
                  </p>
                </div>
              );
            }

            if (item.type === 'WARNING') {
              return (
                <div 
                  key={item.id || idx}
                  onClick={() => handleCardClick(item)}
                  className="bg-[#FFF8E7] border border-[#FDE68A] rounded-md p-2.5 space-y-1 cursor-pointer hover:border-[#F59E0B] transition-colors animate-fade-up"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-1.5">
                      <div className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center font-semibold text-[9px] shrink-0">
                        !
                      </div>
                      <h4 className="font-semibold text-slate-900 text-xs">{item.title}</h4>
                    </div>
                    <span className="text-[9px] font-semibold text-amber-700 uppercase tracking-wider">MEDIUM</span>
                  </div>
                  <p className="text-[10px] text-slate-600 font-normal">
                    {item.description || "Required for eligibility • Not found"}
                  </p>
                </div>
              );
            }

            // PASSED CHECKS
            return (
              <div 
                key={item.id || idx}
                onClick={() => handleCardClick(item)}
                className="bg-emerald-50/60 border border-emerald-200 rounded-md p-2.5 space-y-1 cursor-pointer hover:border-emerald-400 transition-colors animate-fade-up"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 stroke-[2]" />
                    <h4 className="font-semibold text-emerald-950 text-xs">{item.title}</h4>
                  </div>
                  <span className="text-[9px] font-semibold text-emerald-700 uppercase tracking-wider">LOW</span>
                </div>
                <p className="text-[10px] text-slate-600 font-normal">
                  {item.description || "Requirement satisfied"}
                </p>
              </div>
            );
          })
        )}
      </div>

      {/* Footer Info Box */}
      <div className="p-2.5 bg-blue-50/50 border-t border-blue-100 flex items-start space-x-2 text-[10px] text-blue-900 shrink-0">
        <Info className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
        <p className="leading-tight font-normal">
          <strong>The final decision is for the procurement officer.</strong><br />
          This system provides verification support with evidence and recommendations.
        </p>
      </div>
    </div>
  );
}
