import React from 'react';
import { 
  AlertTriangle, ShieldAlert, CheckCircle2, AlertOctagon, 
  Info, Ban, FileWarning, ShieldX, XCircle 
} from 'lucide-react';

export default function RightAuditPanel({ 
  metadata = {}, 
  auditFindings = [] 
}) {
  // Default findings if none provided
  const defaultFindings = [
    {
      id: 'FIND-101',
      title: 'Turnover Requirement Discrepancy',
      type: 'RED_FLAG',
      category: 'Financial Eligibility',
      clause: 'Clause 4.1',
      description: 'Quoted bidder turnover is ₹1.8 Cr against mandatory tender threshold of ₹2.5 Cr.',
      severity: 'CRITICAL',
      time: '10:41 AM'
    },
    {
      id: 'FIND-102',
      title: 'L1 Comparative Report Missing',
      type: 'WARNING',
      category: 'GeM GFR Policy',
      clause: 'Rule 149 (> ₹25k)',
      description: 'Procurement value is ₹6.5 Lakhs. Online Bidding / Reverse Auction report required.',
      severity: 'MEDIUM',
      time: '10:42 AM'
    },
    {
      id: 'FIND-103',
      title: 'CRAC Certificate Pending',
      type: 'WARNING',
      category: 'Post-Contract',
      clause: 'CRAC Acceptance',
      description: 'Consignee Receipt and Acceptance Certificate not signed within 10 days of delivery.',
      severity: 'HIGH',
      time: '10:42 AM'
    },
    {
      id: 'FIND-104',
      title: 'CFA Approval Verified',
      type: 'PASSED',
      category: 'Competent Authority',
      clause: 'Approval Order #882',
      description: 'CFA Financial Sanction order #882 verified via Public Finance Portal.',
      severity: 'LOW',
      time: '10:43 AM'
    }
  ];

  const findings = auditFindings.length > 0 ? auditFindings : defaultFindings;

  // Red Flag Logic & Rejection Protocol Trigger Calculation
  const redFlagsCount = findings.filter(f => f.type === 'RED_FLAG').length;
  const isL1ThresholdViolated = (metadata.estimatedValue > 25000) && (metadata.biddingType === 'Direct Purchase (≤ ₹25,000)');
  const isDisqualified = redFlagsCount >= 1 || isL1ThresholdViolated || metadata.cracStatus === 'FAILED';

  return (
    <div className="bg-white rounded-lg border border-slate-300 shadow-xs h-full flex flex-col overflow-hidden text-xs">
      {/* Header */}
      <div className="bg-[#0B2545] text-white p-3 border-b border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-2">
          <AlertOctagon className="w-4 h-4 text-rose-400 stroke-[2.5]" />
          <span className="font-extrabold uppercase tracking-wider text-[11px]">
            Dynamic Audit & Red Flag Stream
          </span>
        </div>
        <span className="bg-rose-600 text-white font-mono font-black text-[10px] px-2 py-0.5 rounded-full">
          {findings.length} Finding{findings.length === 1 ? '' : 's'}
        </span>
      </div>

      {/* DISQUALIFICATION / REJECTION BANNER (TRIGGERED ON CRITICAL FAILURES) */}
      {isDisqualified && (
        <div className="bg-[#DC2626] text-white p-3 shadow-md animate-pulse shrink-0 border-b-2 border-rose-900">
          <div className="flex items-center space-x-2">
            <ShieldX className="w-6 h-6 stroke-[2.5] text-white shrink-0" />
            <div>
              <h3 className="font-black text-xs uppercase tracking-widest text-white leading-tight">
                BID REJECTED / DISQUALIFIED
              </h3>
              <p className="text-[10px] font-bold text-rose-100 mt-0.5">
                {isL1ThresholdViolated 
                  ? "CRITICAL VIOLATION: Direct Purchase strategy invalid for value > ₹25,000!" 
                  : "Critical compliance discrepancy detected during forensic audit."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Sequential Pop-up Finding Stream */}
      <div className="p-3 space-y-3 overflow-y-auto flex-1 font-sans bg-slate-50">
        <div className="flex items-center justify-between text-[10px] text-slate-500 font-bold uppercase tracking-wider">
          <span>Real-time Audit Stream</span>
          <span>Stacking Top-to-Bottom</span>
        </div>

        {findings.map((item) => {
          if (item.type === 'RED_FLAG') {
            return (
              <div 
                key={item.id}
                className="bg-white rounded-lg border-2 border-[#DC2626] shadow-sm p-3 relative overflow-hidden transition-all hover:shadow-md"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#DC2626]"></div>
                <div className="pl-1 space-y-1.5">
                  <div className="flex items-start justify-between gap-1">
                    <div className="flex items-center space-x-1.5">
                      <XCircle className="w-4 h-4 text-[#DC2626] stroke-[2.5]" />
                      <span className="font-extrabold text-[#DC2626] text-xs uppercase tracking-tight">
                        {item.title}
                      </span>
                    </div>
                    <span className="bg-rose-100 text-[#DC2626] border border-rose-300 font-black text-[9px] px-1.5 py-0.5 rounded">
                      SEVERE RED FLAG
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-800 font-semibold leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-1 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span>{item.category} • {item.clause}</span>
                    <span>{item.time}</span>
                  </div>
                </div>
              </div>
            );
          }

          if (item.type === 'WARNING') {
            return (
              <div 
                key={item.id}
                className="bg-white rounded-lg border-2 border-[#D97706] shadow-sm p-3 relative overflow-hidden transition-all hover:shadow-md"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#D97706]"></div>
                <div className="pl-1 space-y-1.5">
                  <div className="flex items-start justify-between gap-1">
                    <div className="flex items-center space-x-1.5">
                      <AlertTriangle className="w-4 h-4 text-[#D97706] stroke-[2.5]" />
                      <span className="font-extrabold text-[#D97706] text-xs uppercase tracking-tight">
                        {item.title}
                      </span>
                    </div>
                    <span className="bg-amber-100 text-[#D97706] border border-amber-300 font-black text-[9px] px-1.5 py-0.5 rounded">
                      WARNING / REVIEW
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-800 font-medium leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-1 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span>{item.category} • {item.clause}</span>
                    <span>{item.time}</span>
                  </div>
                </div>
              </div>
            );
          }

          // PASSED CHECKS
          return (
            <div 
              key={item.id}
              className="bg-white rounded-lg border border-emerald-300 shadow-2xs p-3 relative overflow-hidden transition-all"
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#16A34A]"></div>
              <div className="pl-1 space-y-1">
                <div className="flex items-start justify-between gap-1">
                  <div className="flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-[#16A34A] stroke-[2.5]" />
                    <span className="font-bold text-[#16A34A] text-xs">
                      {item.title}
                    </span>
                  </div>
                  <span className="bg-emerald-100 text-[#16A34A] border border-emerald-300 font-extrabold text-[9px] px-1.5 py-0.5 rounded">
                    PASSED
                  </span>
                </div>

                <p className="text-[11px] text-slate-700 font-normal">
                  {item.description}
                </p>

                <div className="pt-1 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                  <span>{item.category}</span>
                  <span>{item.time}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
