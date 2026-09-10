import React, { useState } from 'react';
import { UserCheck, CheckCircle2, ShieldAlert, HelpCircle, Save, Loader2, Mail, Send } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useVerification } from '../context/VerificationContext';
import { dispatchSmtpEmail } from '../services/api';

export default function OfficerDecision({ clause, onSaveDecision }) {
  const { showToast } = useToast();
  const { liveScore, counters } = useVerification();
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
    showToast(`Sending SMTP email to ${recipient}...`, 'info');

    try {
      const res = await dispatchSmtpEmail({
        email: recipient,
        caseId: "GEM/2024/9/19102",
        bidderName: "ABC Infra Private Limited",
        overallCompliance: liveScore || 68,
        passedCount: counters?.passed || 12,
        issuesCount: counters?.issues || 4,
        reviewCount: counters?.review || 3
      });

      setSendingEmail(false);
      showToast(res.message || `Verification report sent successfully to ${recipient}`, 'success');
    } catch (err) {
      setSendingEmail(false);
      showToast(`SMTP Email Failed: ${err.message || 'Check network or credentials'}`, 'error');
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
      <div className="p-3 space-y-2 text-xs">
        <div className="text-[11px] font-semibold text-slate-800 uppercase tracking-wider mb-1">
          Procurement Officer Actions
        </div>

        {/* Primary Reject Button */}
        <button
          type="button"
          onClick={() => handleDecisionSelect('CONFIRM')}
          className="w-full py-1.5 px-3 bg-[#B91C1C] hover:bg-rose-800 text-white font-medium rounded text-xs shadow-2xs transition-colors flex items-center justify-center space-x-2"
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Reject / Disqualification Memo</span>
        </button>

        {/* SMTP Direct Send Button */}
        <button
          type="button"
          onClick={handleSendGmailReport}
          disabled={sendingEmail}
          className="w-full py-1.5 px-3 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded text-xs shadow-2xs transition-colors flex items-center justify-center space-x-2"
        >
          {sendingEmail ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Send className="w-3.5 h-3.5" />
          )}
          <span>Send via SMTP to Personal Gmail</span>
        </button>

        {/* Override Grid */}
        <div className="grid grid-cols-3 gap-1 pt-0.5">
          <button
            type="button"
            onClick={() => handleDecisionSelect('CONFIRM')}
            className={`p-1 rounded border text-center transition-all ${
              decision === 'CONFIRM'
                ? 'bg-emerald-100 border-emerald-500 text-emerald-900 font-semibold'
                : 'bg-emerald-50/50 border-emerald-200 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            <span className="text-[9px] font-medium block leading-tight">Confirm</span>
          </button>

          <button
            type="button"
            onClick={() => handleDecisionSelect('OVERRIDE')}
            className={`p-1 rounded border text-center transition-all ${
              decision === 'OVERRIDE'
                ? 'bg-slate-200 border-slate-600 text-slate-900 font-semibold'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span className="text-[9px] font-medium block leading-tight">Override</span>
          </button>

          <button
            type="button"
            onClick={() => handleDecisionSelect('CLARIFICATION')}
            className={`p-1 rounded border text-center transition-all ${
              decision === 'CLARIFICATION'
                ? 'bg-[#FFF8E7] border-[#F59E0B] text-slate-900 font-semibold'
                : 'bg-[#FFF8E7]/60 border-[#FDE68A] text-slate-800 hover:bg-[#FFF8E7]'
            }`}
          >
            <span className="text-[9px] font-medium block leading-tight">Clarify</span>
          </button>
        </div>

        {/* Save Decision */}
        <div className="flex justify-between items-center pt-1 border-t border-slate-100">
          <span className="text-[9px] text-slate-400 font-normal">Save decision log</span>
          <button
            onClick={handleSave}
            disabled={!decision || saving}
            className={`py-1 px-3 rounded text-[10px] font-medium flex items-center space-x-1 transition-all ${
              decision && !saving
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
            <span>Save Log</span>
          </button>
        </div>
      </div>
    </div>
  );
}
