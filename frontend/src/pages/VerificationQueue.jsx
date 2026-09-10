import React, { useState, useEffect } from 'react';
import { fetchVerificationQueue } from '../services/api';
import { Link } from 'react-router-dom';
import { Search, Filter, ShieldAlert, CheckCircle2, ArrowRight } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export default function VerificationQueue() {
  const { showToast } = useToast();
  const [queue, setQueue] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadQueue() {
      const res = await fetchVerificationQueue();
      if (Array.isArray(res)) {
        const mapped = res.map(item => ({
          id: item.caseId || item.id,
          bidder: item.bidderName || item.bidder || "Vendor Pvt Ltd",
          tenderName: item.tenderName || "IT Infrastructure Procurement",
          tenderValue: item.tenderValue || "₹ 4.50 Cr",
          compliance: item.overallCompliance || item.compliance || 100,
          risk: item.overallCompliance < 70 ? "HIGH" : (item.overallCompliance < 85 ? "MEDIUM" : "LOW"),
          status: item.statusLabel || item.status || "Verification in Progress",
          assignedOfficer: item.officerName || "Arjun Singh",
          submissionDate: "2024-05-12"
        }));
        setQueue(mapped);
      }
    }
    loadQueue();
  }, []);

  const filtered = queue.filter((item) => {
    const matchesFilter =
      filter === 'ALL' ||
      (filter === 'HIGH_RISK' && item.risk === 'HIGH') ||
      (filter === 'REVIEW' && item.status.includes('Review')) ||
      (filter === 'COMPLETED' && item.status === 'Completed');

    const matchesSearch =
      item.id.toLowerCase().includes(search.toLowerCase()) ||
      item.bidder.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-4 animate-fade-up">
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-base font-bold text-slate-900 uppercase tracking-wide">Verification Queue</h1>
          <p className="text-xs text-slate-500">All submitted bids awaiting forensic evidence checks</p>
        </div>

        {/* Search & Filters */}
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search Case ID or Bidder..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-1.5 border border-slate-300 rounded-md outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex bg-slate-100 p-1 rounded-md border border-slate-200 text-xs font-semibold shrink-0">
            {['ALL', 'HIGH_RISK', 'REVIEW', 'COMPLETED'].map((f) => (
              <button
                key={f}
                onClick={() => {
                  setFilter(f);
                  showToast(`Filtered queue by: ${f.replace('_', ' ')}`, 'info');
                }}
                className={`px-2.5 py-1 rounded transition-colors whitespace-nowrap ${
                  filter === f ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {f.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Responsive Table Container */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700 min-w-[900px] border-collapse">
          <thead className="bg-slate-100 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
            <tr>
              <th className="py-3 px-4 whitespace-nowrap">Case ID</th>
              <th className="py-3 px-4 whitespace-nowrap">Bidder Name</th>
              <th className="py-3 px-4 whitespace-nowrap">Tender Details</th>
              <th className="py-3 px-4 whitespace-nowrap">Value</th>
              <th className="py-3 px-4 whitespace-nowrap">Compliance %</th>
              <th className="py-3 px-4 whitespace-nowrap">Risk Level</th>
              <th className="py-3 px-4 whitespace-nowrap">Status</th>
              <th className="py-3 px-4 whitespace-nowrap text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 align-middle">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 font-medium transition-colors">
                <td className="py-3.5 px-4 font-mono font-bold text-blue-600 whitespace-nowrap">{item.id}</td>
                <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">{item.bidder}</td>
                <td className="py-3.5 px-4 text-slate-600 max-w-[220px] truncate">{item.tenderName}</td>
                <td className="py-3.5 px-4 font-semibold text-slate-900 whitespace-nowrap">{item.tenderValue}</td>
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <span className="font-black text-slate-900 min-w-[32px]">{item.compliance}%</span>
                    <div className="w-16 bg-slate-200 h-1.5 rounded-full overflow-hidden shrink-0">
                      <div className="bg-blue-600 h-full rounded-full" style={{ width: `${item.compliance}%` }}></div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold whitespace-nowrap ${
                    item.risk === 'HIGH' || item.risk === 'CRITICAL'
                      ? 'bg-rose-100 text-rose-800 border border-rose-300'
                      : item.risk === 'MEDIUM'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  }`}>
                    {item.risk} RISK
                  </span>
                </td>
                <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                  <span className="inline-block px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200">
                    {item.status}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right whitespace-nowrap">
                  <Link
                    to={`/verification?caseId=${encodeURIComponent(item.id)}`}
                    onClick={() => showToast(`Selected Case ${item.id} for Evidence Inspection`, 'info')}
                    className="inline-flex items-center justify-center space-x-1 py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded text-[11px] font-bold shadow-2xs transition-colors whitespace-nowrap"
                  >
                    <span>Inspect Evidence</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.2]" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
