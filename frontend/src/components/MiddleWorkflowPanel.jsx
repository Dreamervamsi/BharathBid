import React, { useState } from 'react';
import { 
  Mail, Send, CheckCircle2, AlertCircle, Loader2 
} from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { useVerification } from '../context/VerificationContext';
import { dispatchSmtpEmail } from '../services/api';

export default function MiddleWorkflowPanel({ onTriggerSmtp }) {
  const { showToast } = useToast();
  const { liveScore, counters } = useVerification();
  const [smtpEmail, setSmtpEmail] = useState('kvamsi.nellore@gmail.com');
  const [smtpStatus, setSmtpStatus] = useState(''); // '', 'SENDING', 'SENT', 'ERROR'

  const handleSendSmtp = async (e) => {
    e.preventDefault();
    if (!smtpEmail) return;

    setSmtpStatus('SENDING');
    showToast(`Initiating SMTP mailer connection to ${smtpEmail}...`, 'info');

    try {
      const res = await dispatchSmtpEmail({
        email: smtpEmail,
        caseId: "GEM/2024/9/19102",
        bidderName: "ABC Infra Private Limited",
        overallCompliance: liveScore || 68,
        passedCount: counters?.passed || 12,
        issuesCount: counters?.issues || 4,
        reviewCount: counters?.review || 3
      });

      setSmtpStatus('SENT');
      showToast(res.message || `Verification report sent successfully to ${smtpEmail}`, 'success');
      setTimeout(() => setSmtpStatus(''), 5000);
    } catch (err) {
      setSmtpStatus('ERROR');
      showToast(`SMTP Dispatch Failed: ${err.message || 'Check connection or credentials'}`, 'error');
      setTimeout(() => setSmtpStatus(''), 5000);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-slate-300 shadow-xs h-full flex flex-col overflow-hidden text-xs font-sans">
      {/* DIRECT SMTP EMAIL DISPATCH TOOLBAR */}
      <div className="bg-[#0B2545] text-white p-2.5 px-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex items-center space-x-2">
          <Mail className="w-4 h-4 text-blue-400 stroke-[2]" />
          <span className="font-semibold uppercase tracking-wide text-[11px] text-white">
            SMTP Email Dispatch System
          </span>
        </div>

        <form onSubmit={handleSendSmtp} className="flex items-center space-x-2">
          <input
            type="email"
            required
            value={smtpEmail}
            onChange={(e) => setSmtpEmail(e.target.value)}
            placeholder="kvamsi.nellore@gmail.com"
            className="bg-[#1D2A44] border border-slate-600 rounded px-2.5 py-1 text-xs text-white placeholder-slate-400 outline-none focus:border-blue-400 w-52 font-mono font-normal"
          />
          <button
            type="submit"
            disabled={smtpStatus === 'SENDING'}
            className="py-1 px-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded text-[11px] flex items-center space-x-1.5 shadow-sm transition-all"
          >
            {smtpStatus === 'SENDING' ? (
              <span className="flex items-center gap-1">
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> Dispatching...
              </span>
            ) : smtpStatus === 'SENT' ? (
              <span className="text-emerald-300 flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" /> Sent Email
              </span>
            ) : smtpStatus === 'ERROR' ? (
              <span className="text-rose-300 flex items-center gap-1 font-semibold">
                <AlertCircle className="w-3.5 h-3.5" /> Retry
              </span>
            ) : (
              <>
                <Send className="w-3 h-3" />
                <span>Send via SMTP</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* 11 Step GeM Workflow Process */}
      <div className="flex-1 overflow-y-auto bg-slate-100 p-3 space-y-2">
        <div className="bg-white p-2.5 rounded-lg border border-slate-300 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide block">Active Routing Rule</span>
            <span className="text-xs font-semibold text-blue-900">GFR Rule 149 • Reverse Auction Strategy</span>
          </div>
          <span className="bg-blue-50 text-blue-900 border border-blue-200 text-[10px] font-semibold px-2 py-1 rounded">
            Online Bidding / Reverse Auction
          </span>
        </div>

        <div className="space-y-1.5 text-[11px]">
          {[
            { id: 1, name: "Financial Approval", status: "APPROVED", detail: "Approved by Competent Financial Authority (CFA)" },
            { id: 2, name: "Portal Availability Check", status: "AVAILABLE", detail: "Verified connection on www.gem.gov.in" },
            { id: 3, name: "Item Search & Availability", status: "FOUND", detail: "Matched in GeM Master Catalog" },
            { id: 4, name: "Value Threshold Routing Engine", status: "ROUTED", detail: "Routed under Reverse Auction (> ₹5L)" },
            { id: 5, name: "Add to Cart Logic", status: "COMPLETED", detail: "Locked in GeM Cart with price freeze" },
            { id: 6, name: "CFA Registration Verification", status: "VERIFIED", detail: "Verified in Public Procurement Portal" },
            { id: 7, name: "Contract / Order Generation", status: "GENERATED", detail: "Draft Order #GEM-ORD-2024-88102 compiled" },
            { id: 8, name: "Physical Item Receipt Verification", status: "IN_INSPECTION", detail: "Consignee inspection active" },
            { id: 9, name: "Tax Invoice Extraction & Verification", status: "PARSED", detail: "Tax Invoice GSTIN & HSN Code matched" },
            { id: 10, name: "CRAC Certificate Generation", status: "READY", detail: "CRAC status verified" },
            { id: 11, name: "Payment Process Initiation", status: "INITIATED", detail: "PFMS Disbursement pipeline clear" }
          ].map((step) => (
            <div key={step.id} className="p-2 bg-white rounded border border-slate-200 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-emerald-600 text-white font-semibold text-[9px] flex items-center justify-center">
                  {step.id}
                </div>
                <div>
                  <h5 className="font-semibold text-slate-900 text-xs">{step.name}</h5>
                  <p className="text-[10px] text-slate-500 font-normal">{step.detail}</p>
                </div>
              </div>
              <span className="bg-emerald-100 text-emerald-800 text-[9px] font-semibold px-1.5 py-0.5 rounded border border-emerald-300 uppercase">
                {step.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
