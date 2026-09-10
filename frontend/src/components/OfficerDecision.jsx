import React, { useState, useEffect } from 'react';
import { UserCheck, CheckCircle2, ShieldAlert, HelpCircle, Save, Loader2 } from 'lucide-react';

export default function OfficerDecision({ clause, onSaveDecision }) {
  const [decision, setDecision] = useState(clause?.decision || null);
  const [remarks, setRemarks] = useState(clause?.remarks || '');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setDecision(clause?.decision || null);
    setRemarks(clause?.remarks || '');
  }, [clause]);

  if (!clause) return null;

  const handleDecisionSelect = (type) => {
    setDecision(type);
  };

  const handleSave = async () => {
    if (!decision) return;
    setSaving(true);
    await onSaveDecision(clause.id, decision, remarks);
    setSaving(false);
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
      <div className="px-3.5 py-2.5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <UserCheck className="w-4 h-4 text-blue-600" />
          <h2 className="text-xs font-bold text-slate-900 tracking-wider uppercase">OFFICER DECISION</h2>
        </div>
        {clause.decision && (
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Recorded
          </span>
        )}
      </div>

      <div className="p-3.5 space-y-3 text-xs">
        {/* Three Action Buttons */}
        <div className="grid grid-cols-3 gap-2">
          {/* Confirm Finding */}
          <button
            type="button"
            onClick={() => handleDecisionSelect('CONFIRM')}
            className={`p-2 rounded-md border flex flex-col items-center text-center transition-all ${
              decision === 'CONFIRM'
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs ring-2 ring-emerald-500/30'
                : 'bg-emerald-50/60 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 mb-1" />
            <span className="font-bold text-[11px] leading-tight">Confirm Finding</span>
            <span className={`text-[9px] mt-0.5 ${decision === 'CONFIRM' ? 'text-emerald-100' : 'text-emerald-600'}`}>
              Accept discrepancy
            </span>
          </button>

          {/* Override */}
          <button
            type="button"
            onClick={() => handleDecisionSelect('OVERRIDE')}
            className={`p-2 rounded-md border flex flex-col items-center text-center transition-all ${
              decision === 'OVERRIDE'
                ? 'bg-slate-900 text-white border-slate-950 shadow-xs ring-2 ring-slate-800/30'
                : 'bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200'
            }`}
          >
            <ShieldAlert className="w-4 h-4 mb-1" />
            <span className="font-bold text-[11px] leading-tight">Override</span>
            <span className={`text-[9px] mt-0.5 ${decision === 'OVERRIDE' ? 'text-slate-300' : 'text-slate-500'}`}>
              Mark as acceptable
            </span>
          </button>

          {/* Request Clarification */}
          <button
            type="button"
            onClick={() => handleDecisionSelect('CLARIFICATION')}
            className={`p-2 rounded-md border flex flex-col items-center text-center transition-all ${
              decision === 'CLARIFICATION'
                ? 'bg-amber-600 text-white border-amber-700 shadow-xs ring-2 ring-amber-500/30'
                : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
            }`}
          >
            <HelpCircle className="w-4 h-4 mb-1" />
            <span className="font-bold text-[11px] leading-tight">Request Clarification</span>
            <span className={`text-[9px] mt-0.5 ${decision === 'CLARIFICATION' ? 'text-amber-100' : 'text-amber-700'}`}>
              Ask vendor
            </span>
          </button>
        </div>

        {/* Remarks Textarea */}
        <div>
          <label className="block text-[11px] font-bold text-slate-700 mb-1">
            Add remarks (optional)
          </label>
          <textarea
            rows={2}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Type your official remarks here..."
            className="w-full text-xs p-2.5 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none text-slate-800 placeholder-slate-400"
            maxLength={250}
          />
          <div className="flex justify-between items-center mt-1">
            <span className="text-[10px] text-slate-400">{remarks.length}/250</span>
            <button
              onClick={handleSave}
              disabled={!decision || saving}
              className={`py-1 px-3 rounded text-[11px] font-bold flex items-center space-x-1.5 transition-all ${
                decision && !saving
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-2xs'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
              <span>Save Decision</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
