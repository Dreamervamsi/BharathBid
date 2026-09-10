import React, { useState, useEffect } from 'react';
import { fetchVerificationQueue } from '../services/api';
import { Link } from 'react-router-dom';
import { Search, Filter, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function VerificationQueue() {
  const [queue, setQueue] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadQueue() {
      const res = await fetchVerificationQueue();
      // Handle array or Spring Boot JPA list response
      if (Array.isArray(res)) {
        // Map database entities or mock objects to consistent table shape
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
    <div className="space-y-4">
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

          <div className="flex bg-slate-100 p-1 rounded-md border border-slate-200 text-xs font-semibold">
            {['ALL', 'HIGH_RISK', 'REVIEW', 'COMPLETED'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-2.5 py-1 rounded transition-colors ${
                  filter === f ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {f.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-100 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Case ID</th>
              <th className="py-3 px-4">Bidder Name</th>
              <th className="py-3 px-4">Tender Details</th>
              <th className="py-3 px-4">Value</th>
              <th className="py-3 px-4">Compliance %</th>
              <th className="py-3 px-4">Risk Level</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 font-medium">
                <td className="py-3 px-4 font-bold text-slate-900">{item.id}</td>
                <td className="py-3 px-4 font-bold text-slate-800">{item.bidder}</td>
                <td className="py-3 px-4 text-slate-600">{item.tenderName}</td>
                <td className="py-3 px-4 font-semibold text-slate-900">{item.tenderValue}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-extrabold">{item.compliance}%</span>
                    <div className="w-12 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full" style={{ width: `${item.compliance}%` }}></div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                    item.risk === 'HIGH' || item.risk === 'CRITICAL' ? 'bg-rose-100 text-rose-800 border border-rose-300' : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  }`}>
                    {item.risk} RISK
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-600">{item.status}</td>
                <td className="py-3 px-4 text-right">
                  <Link
                    to="/verification"
                    className="py-1 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded text-[11px] font-bold shadow-2xs"
                  >
                    Inspect Evidence
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
