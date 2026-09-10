import React, { useState } from 'react';
import { FileText, Eye, Download, CheckCircle, Loader2 } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function FinalAction({ caseId = "GEM/2024/B/19102", onGenerateMemo }) {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [memoUrl, setMemoUrl] = useState(null);

  const handleGenerate = async () => {
    setLoading(true);
    showToast('Compiling official disqualification memo PDF...', 'info');
    const result = await onGenerateMemo(caseId);
    setLoading(false);
    if (result?.url) {
      setMemoUrl(result.url);
      showToast('Official Disqualification Memo generated successfully!', 'success');
      window.open(result.url, '_blank');
    }
  };

  const handlePreview = () => {
    if (memoUrl) {
      showToast('Opening generated disqualification memo...', 'info');
      window.open(memoUrl, '_blank');
    } else {
      handleGenerate();
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div className="flex items-center space-x-3">
        <div className="p-3 bg-slate-100 rounded-lg text-slate-800 border border-slate-200 shrink-0">
          <FileText className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            FINAL GOVERNMENT ACTION
            <span className="text-[10px] text-slate-500 font-normal lowercase">(After confirmation)</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Generate official document for procurement decision and records.
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3 shrink-0 w-full md:w-auto">
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="flex-1 md:flex-initial py-2.5 px-5 bg-[#0f172a] hover:bg-slate-800 text-white rounded-md text-xs font-bold shadow-sm flex items-center justify-center space-x-2 transition-all"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
          ) : (
            <FileText className="w-4 h-4 text-blue-400" />
          )}
          <span>Generate Disqualification Memo</span>
        </button>

        <button
          onClick={handlePreview}
          className="py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-md text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors"
        >
          <Eye className="w-4 h-4 text-slate-500" />
          <span>Preview Memo</span>
        </button>
      </div>
    </div>
  );
}
