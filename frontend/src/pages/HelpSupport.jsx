import React, { useState } from 'react';
import { HelpCircle, BookOpen, MessageSquare, PhoneCall, ExternalLink, ShieldCheck, FileText } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function HelpSupport() {
  const { showToast } = useToast();
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');

  const faqs = [
    {
      q: "How does the AI Clause Evidence Extraction work?",
      a: "Our PaddleOCR and FastAPI NLP engine parses uploaded PDF documents (financial statements, CA certificates, OEM authorizations), extracts numerical metrics and clauses, and calculates compliance variance against tender criteria."
    },
    {
      q: "Is the Procurement Officer's decision binding?",
      a: "Yes. The system employs human-in-the-loop decision-making. AI findings serve as advisory evidence; procurement officers confirm, override, or request clarification before generating official memos."
    },
    {
      q: "How do I export disqualification memos?",
      a: "Navigate to the Live Verification workspace or Reports page and click 'Generate Disqualification Memo'. The system renders an official OpenPDF government memo with recorded officer remarks."
    },
    {
      q: "Are audit trails immutable?",
      a: "Yes. Every officer action, decision, clause override, and email notification is logged chronologically in the Audit Trail with cryptographic verification IDs."
    }
  ];

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    if (!ticketSubject || !ticketMessage) {
      showToast('Please fill in both subject and message fields', 'warning');
      return;
    }
    showToast('Helpdesk ticket submitted successfully! Reference: #TKT-88492', 'success');
    setTicketSubject('');
    setTicketMessage('');
  };

  return (
    <div className="space-y-6 animate-fade-up">
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs flex items-center justify-between">
        <div>
          <h1 className="text-base font-bold text-slate-900 uppercase tracking-wide">GeM Portal Help & Technical Support</h1>
          <p className="text-xs text-slate-500">Official guidance, user documentation, and technical support desk for procurement officers</p>
        </div>
        <div className="flex items-center space-x-2 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-200">
          <PhoneCall className="w-3.5 h-3.5" />
          <span>Toll Free Helpline: 1800-419-3436</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: FAQs */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Frequently Asked Questions & Guidelines</span>
            </h2>

            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5">
                  <h3 className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
                    <span className="text-blue-600">Q{idx + 1}:</span>
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed pl-5">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Contact Support Form */}
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center space-x-2">
              <MessageSquare className="w-4 h-4 text-blue-600" />
              <span>Submit Officer Helpdesk Ticket</span>
            </h2>

            <form onSubmit={handleSubmitTicket} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Issue Subject</label>
                <input
                  type="text"
                  placeholder="e.g. OCR Parsing error on CA Certificate"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Detailed Description</label>
                <textarea
                  rows="4"
                  placeholder="Describe the issue, case ID, or system discrepancy..."
                  value={ticketMessage}
                  onChange={(e) => setTicketMessage(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs focus:outline-hidden focus:ring-1 focus:ring-blue-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded text-xs shadow-2xs transition-colors"
              >
                Submit Ticket
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
