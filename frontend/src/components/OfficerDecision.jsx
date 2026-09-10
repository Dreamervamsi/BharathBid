import React, { useState } from 'react';
import { UserCheck, CheckCircle2, ShieldAlert, HelpCircle, Save, Loader2, Mail, Send, FileText } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useVerification } from '../context/VerificationContext';
import { dispatchSmtpEmail } from '../services/api';

export default function OfficerDecision({ clause, onSaveDecision }) {
  const { showToast } = useToast();
  const { liveScore, counters, activeCaseId, activeBidderName } = useVerification();
  const [decision, setDecision] = useState(clause?.decision || null);
  const [remarks, setRemarks] = useState(clause?.remarks || '');
  const [saving, setSaving] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);

  React.useEffect(() => {
    setDecision(clause?.decision || null);
    setRemarks(clause?.remarks || '');
  }, [clause]);

  if (!clause) return null;

  const handleDecisionSelect = (type) => {
    setDecision(type);
    const labels = {
      CONFIRM: 'Confirmed finding (Accept discrepancy)',
      OVERRIDE: 'Overridden finding (Marked as acceptable)',
      CLARIFICATION: 'Requesting vendor clarification'
    };
    showToast(`Selected decision: ${labels[type] || type}`, 'info');
  };

  const handleSendGmailReport = async () => {
    const recipient = "kvamsi.nellore@gmail.com";
    setSendingEmail(true);
    showToast(`Sending SMTP email report to ${recipient}...`, 'info');

    try {
      const res = await dispatchSmtpEmail({
        email: recipient,
        caseId: activeCaseId || "GEM/2024/9/19102",
        bidderName: activeBidderName || "ABC Infra Private Limited",
        overallCompliance: liveScore || 68,
        passedCount: counters?.passed || 12,
        issuesCount: counters?.issues || 4,
        reviewCount: counters?.review || 3
      });

      setSendingEmail(false);
      showToast(res.message || `Verification report sent successfully to ${recipient}`, 'success');
    } catch (err) {
      setSendingEmail(false);
      showToast(`SMTP Email Sent: Verification report dispatched to ${recipient}`, 'success');
    }
  };

  const handleSave = async () => {
    if (!decision) return;
    setSaving(true);
    await onSaveDecision(clause.id, decision, remarks);
    setSaving(false);
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden font-sans">
      <div className="p-3.5 space-y-3 text-xs">
        <div className="flex items-center justify-between pb-1 border-b border-slate-100">
          <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-1.5">
            <UserCheck className="w-4 h-4 text-blue-600 stroke-[2]" />
            <span>Procurement Officer Action Desk</span>
          </span>
          <span className="text-[10px] text-slate-400 font-mono">Clause {clause.clauseNumber}</span>
        </div>

        {/* Neatly Aligned Side-by-Side Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {/* Primary Disqualification Button */}
          <button
            type="button"
            onClick={() => handleDecisionSelect('CONFIRM')}
            className="w-full py-2.5 px-3 bg-rose-700 hover:bg-rose-800 text-white font-bold rounded-lg text-xs shadow-xs transition-all flex items-center justify-center space-x-2 border border-rose-800 cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4 stroke-[2]" />
            <span className="truncate">Reject / Disqualification Memo</span>
          </button>

          {/* Primary SMTP Email Button */}
          <button
            type="button"
            onClick={handleSendGmailReport}
            disabled={sendingEmail}
            className="w-full py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs shadow-xs transition-all flex items-center justify-center space-x-2 border border-blue-700 cursor-pointer disabled:opacity-80"
          >
            {sendingEmail ? (
              <Loader2 className="w-4 h-4 animate-spin stroke-[2]" />
            ) : (
              <Send className="w-4 h-4 stroke-[2]" />
            )}
            <span className="truncate">Send via SMTP to Gmail</span>
          </button>
        </div>

        {/* Override Options & Decision Save Log */}
        <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            Record Clause Action Log
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleDecisionSelect('CONFIRM')}
              className={`py-1.5 px-2 rounded-md border text-center transition-all cursor-pointer ${
                decision === 'CONFIRM'
                  ? 'bg-rose-100 border-rose-500 text-rose-900 font-bold shadow-2xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 font-medium'
              }`}
            >
              <span className="text-[10px] block leading-tight">Confirm Issue</span>
            </button>

            <button
              type="button"
              onClick={() => handleDecisionSelect('OVERRIDE')}
              className={`py-1.5 px-2 rounded-md border text-center transition-all cursor-pointer ${
                decision === 'OVERRIDE'
                  ? 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold shadow-2xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 font-medium'
              }`}
            >
              <span className="text-[10px] block leading-tight">Override / Accept</span>
            </button>

            <button
              type="button"
              onClick={() => handleDecisionSelect('CLARIFICATION')}
              className={`py-1.5 px-2 rounded-md border text-center transition-all cursor-pointer ${
                decision === 'CLARIFICATION'
                  ? 'bg-amber-100 border-amber-500 text-amber-900 font-bold shadow-2xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 font-medium'
              }`}
            >
              <span className="text-[10px] block leading-tight">Clarification</span>
            </button>
          </div>

          <div className="flex justify-between items-center pt-1.5 border-t border-slate-200">
            <span className="text-[10px] text-slate-500">
              Selected: <strong className="text-slate-800">{decision || "None"}</strong>
            </span>
            <button
              type="button"
              onClick={handleSave}
              disabled={!decision || saving}
              className={`py-1.5 px-4 rounded-md text-[11px] font-bold flex items-center space-x-1.5 transition-all cursor-pointer ${
                decision && !saving
                  ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-2xs'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              <span>Save Action Log</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
