import React, { useState } from 'react';
import { Mail, HelpCircle, Send, X, CheckCircle2 } from 'lucide-react';

export default function ClarificationModal({ isOpen, onClose, clause, bidderName = "ABC Infra Private Limited", onSendClarification }) {
  const [subject, setSubject] = useState(`Clarification Notice regarding Tender Clause ${clause?.clauseNumber || ''}`);
  const [message, setMessage] = useState(
    `Dear ${bidderName},\n\nDuring forensic evaluation of your bid submission for Tender Clause ${clause?.clauseNumber} (${clause?.title}), an annual turnover shortfall of ${clause?.variance || ''} was identified on Page ${clause?.pageNumber || ''} of your financial statements.\n\nPlease submit an official clarification or supplementary CA certificate within 5 working days.`
  );
  const [sent, setSent] = useState(false);

  if (!isOpen || !clause) return null;

  const handleSend = () => {
    setSent(true);
    setTimeout(() => {
      onSendClarification(clause.id, message);
      setSent(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center p-4">
      <div className="bg-white rounded-lg border border-slate-200 shadow-xl w-full max-w-lg overflow-hidden animate-fadeIn">
        <div className="p-4 border-b border-slate-200 bg-amber-50 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-amber-900 font-bold text-xs uppercase tracking-wide">
            <HelpCircle className="w-4 h-4 text-amber-600" />
            <span>Issue Vendor Clarification Notice</span>
          </div>
          <button onClick={onClose} className="p-1 text-amber-700 hover:text-amber-900 rounded">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 space-y-3 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">To Bidder</label>
            <input
              type="text"
              readOnly
              value={`${bidderName} (Registered Vendor Email)`}
              className="w-full p-2 bg-slate-100 border border-slate-200 rounded text-slate-700 font-semibold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Notice Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-amber-500 font-semibold"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Official Clarification Letter Body</label>
            <textarea
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-amber-500 font-sans text-slate-800"
            />
          </div>

          {sent && (
            <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded text-emerald-800 font-bold flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Clarification notice dispatched to bidder via GeM portal!</span>
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-bold"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSend}
              disabled={sent}
              className="py-1.5 px-4 bg-amber-600 hover:bg-amber-700 text-white rounded text-xs font-bold shadow-2xs flex items-center space-x-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Dispatch Notice</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
