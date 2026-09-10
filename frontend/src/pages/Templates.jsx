import React from 'react';
import { FileText, Copy, Plus, Download, CheckCircle2 } from 'lucide-react';

export default function Templates() {
  const templates = [
    { id: 1, title: "Turnover Disqualification Memo Template", code: "MEMO-TMPL-01", category: "Financial Discrepancy", lastModified: "2024-04-10" },
    { id: 2, title: "Vendor Clarification Request Notice", code: "CLAR-TMPL-04", category: "Communication", lastModified: "2024-04-12" },
    { id: 3, title: "OEM Authorization Discrepancy Notice", code: "OEM-TMPL-02", category: "Technical Eligibility", lastModified: "2024-05-01" },
    { id: 4, title: "Make in India Local Content Audit Sheet", code: "MII-TMPL-09", category: "Compliance Evaluation", lastModified: "2024-05-05" }
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs flex items-center justify-between">
        <div>
          <h1 className="text-base font-bold text-slate-900 uppercase tracking-wide">Procurement Notice Templates</h1>
          <p className="text-xs text-slate-500">Standardized official government memos, disqualification letters, and clarification notices</p>
        </div>
        <button className="py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-bold flex items-center space-x-1.5 shadow-2xs">
          <Plus className="w-3.5 h-3.5" />
          <span>Create New Template</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templates.map((t) => (
          <div key={t.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-slate-100 rounded text-slate-800 border border-slate-200">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-slate-900">{t.title}</h2>
                  <span className="text-[10px] text-slate-500 font-semibold">{t.code} • {t.category}</span>
                </div>
              </div>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded font-bold">
                Active
              </span>
            </div>

            <p className="text-[11px] text-slate-600 leading-relaxed">
              Standardized legal language for issuing formal notices under GeM GTC clause 3.2. Formatted with official Ministry header and digital signature placeholder.
            </p>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[10px] text-slate-400">Updated: {t.lastModified}</span>
              <div className="flex items-center space-x-2">
                <button className="py-1 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-[11px] font-bold flex items-center space-x-1">
                  <Copy className="w-3 h-3" />
                  <span>Duplicate</span>
                </button>
                <button className="py-1 px-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-[11px] font-bold flex items-center space-x-1">
                  <Download className="w-3 h-3" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
