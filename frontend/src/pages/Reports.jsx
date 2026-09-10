import React from 'react';
import { BarChart3, PieChart, CheckCircle2, AlertTriangle, HelpCircle, Download } from 'lucide-react';

export default function Reports() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs flex items-center justify-between">
        <div>
          <h1 className="text-base font-bold text-slate-900 uppercase tracking-wide">Procurement Compliance Reports</h1>
          <p className="text-xs text-slate-500">Forensic analytics & compliance distribution for procurement auditing</p>
        </div>
        <button className="py-2 px-3 bg-slate-900 text-white rounded text-xs font-bold flex items-center space-x-1.5">
          <Download className="w-3.5 h-3.5" />
          <span>Export Summary (PDF)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SVG Distribution Chart Card */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4">
            Compliance Distribution (Current Tender Batch)
          </h2>

          <div className="flex items-center justify-center py-6">
            <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 36 36">
              {/* Passed slice (63% green) */}
              <path
                className="text-emerald-500"
                strokeWidth="3.8"
                strokeDasharray="63, 100"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              {/* Issues slice (21% red) */}
              <path
                className="text-rose-500"
                strokeWidth="3.8"
                strokeDashoffset="-63"
                strokeDasharray="21, 100"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              {/* Review slice (16% amber) */}
              <path
                className="text-amber-500"
                strokeWidth="3.8"
                strokeDashoffset="-84"
                strokeDasharray="16, 100"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs mt-2 border-t border-slate-100 pt-3">
            <div>
              <span className="font-extrabold text-emerald-600 block text-sm">63%</span>
              <span className="text-[10px] text-slate-500 font-semibold">Passed (12)</span>
            </div>
            <div>
              <span className="font-extrabold text-rose-600 block text-sm">21%</span>
              <span className="text-[10px] text-slate-500 font-semibold">Issues (4)</span>
            </div>
            <div>
              <span className="font-extrabold text-amber-600 block text-sm">16%</span>
              <span className="text-[10px] text-slate-500 font-semibold">Review (3)</span>
            </div>
          </div>
        </div>

        {/* Executive Compliance Insights */}
        <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-2xs space-y-4">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Key Discrepancy Breakdown</h2>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-md">
              <div className="flex justify-between font-bold text-rose-900 mb-1">
                <span>Annual Turnover Shortfall</span>
                <span>4 Bidders</span>
              </div>
              <p className="text-[11px] text-rose-700">Financial turnover declarations below 5.00 Cr requirement.</p>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
              <div className="flex justify-between font-bold text-amber-900 mb-1">
                <span>OEM Authorization Verification</span>
                <span>3 Bidders</span>
              </div>
              <p className="text-[11px] text-amber-700">Pending secondary confirmation from OEM registrar portal.</p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-md">
              <div className="flex justify-between font-bold text-slate-800 mb-1">
                <span>GSTIN Active Status</span>
                <span>100% Compliant</span>
              </div>
              <p className="text-[11px] text-slate-600">All submitted GSTIN certificates verified via API.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
