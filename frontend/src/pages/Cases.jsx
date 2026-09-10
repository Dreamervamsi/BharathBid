import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Search, Filter, CheckCircle2, ShieldAlert, ArrowRight, UserCheck } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function Cases() {
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  const cases = [
    {
      caseId: "GEM/2024/B/19102",
      bidder: "ABC Infra Private Limited",
      tender: "Construction & Civil Works Package IV",
      department: "Ministry of Road Transport & Highways",
      value: "₹ 5.00 Cr",
      submittedDate: "2024-05-10",
      complianceScore: 68,
      status: "IN_REVIEW",
      officer: "Arjun Singh"
    },
    {
      caseId: "GEM/2024/B/18442",
      bidder: "TechServe Global India",
      tender: "IT Hardware & Server Procurement",
      department: "Ministry of Electronics & IT",
      value: "₹ 2.80 Cr",
      submittedDate: "2024-05-08",
      complianceScore: 92,
      status: "APPROVED",
      officer: "Priya Sharma"
    },
    {
      caseId: "GEM/2024/B/17391",
      bidder: "Apex Logistics Ltd",
      tender: "Supply Chain & Fleet Services",
      department: "Department of Commerce",
      value: "₹ 12.10 Cr",
      submittedDate: "2024-05-02",
      complianceScore: 45,
      status: "FLAGGED",
      officer: "Rajesh Kumar"
    },
    {
      caseId: "GEM/2024/B/16200",
      bidder: "Hindustan Medical Equipment Pvt Ltd",
      tender: "Diagnostic Equipment Supply",
      department: "Ministry of Health & Family Welfare",
      value: "₹ 8.50 Cr",
      submittedDate: "2024-04-28",
      complianceScore: 88,
      status: "APPROVED",
      officer: "Arjun Singh"
    }
  ];

  const filtered = cases.filter(c => {
    const matchesSearch = c.caseId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.bidder.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.tender.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4 animate-fade-up">
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs flex items-center justify-between">
        <div>
          <h1 className="text-base font-bold text-slate-900 uppercase tracking-wide">Procurement Verification Cases</h1>
          <p className="text-xs text-slate-500">All registered procurement cases and forensic evaluation files</p>
        </div>
        <div className="text-xs text-slate-600 font-medium">
          Total Active Cases: <span className="font-extrabold text-slate-900">{cases.length}</span>
        </div>
      </div>

      <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs flex flex-wrap gap-3 items-center justify-between">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by Case ID, Bidder, or Tender name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded text-xs focus:outline-hidden focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-500" />
          <span className="font-semibold text-slate-600">Status Filter:</span>
          {['ALL', 'IN_REVIEW', 'APPROVED', 'FLAGGED'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors ${
                filterStatus === status
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div key={item.caseId} className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs space-y-3 hover:border-blue-300 transition-all">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {item.caseId}
                </span>
                <h2 className="text-sm font-bold text-slate-900 mt-1">{item.bidder}</h2>
                <p className="text-xs text-slate-500">{item.tender}</p>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                item.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' :
                item.status === 'FLAGGED' ? 'bg-rose-100 text-rose-800' :
                'bg-amber-100 text-amber-800'
              }`}>
                {item.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 py-2 border-y border-slate-100 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Department</span>
                <span className="font-medium text-slate-800">{item.department}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Tender Value</span>
                <span className="font-bold text-slate-900">{item.value}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Compliance Score</span>
                <span className={`font-black ${item.complianceScore < 70 ? 'text-rose-600' : 'text-emerald-600'}`}>
                  {item.complianceScore}%
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Assigned Officer</span>
                <span className="font-medium text-slate-800">{item.officer}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] text-slate-400">Submitted: {item.submittedDate}</span>
              <Link
                to={`/verification?caseId=${encodeURIComponent(item.caseId)}`}
                onClick={() => showToast(`Opened Case ${item.caseId} in Live Verification`, 'info')}
                className="py-1 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs font-bold flex items-center space-x-1 transition-colors"
              >
                <span>Evaluate Workspace</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
