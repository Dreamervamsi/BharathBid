import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, HelpCircle, ChevronRight, Plus } from 'lucide-react';

export default function TenderClauses({ clauses = [], selectedClauseId, onSelectClause, onOpenUpload }) {
  const [filter, setFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClauses = clauses.filter((c) => {
    const matchesFilter =
      filter === 'ALL' ||
      (filter === 'ISSUE' && c.status === 'ISSUE') ||
      (filter === 'PASSED' && c.status === 'PASSED') ||
      (filter === 'REVIEW' && c.status === 'REVIEW') ||
      (filter === 'PENDING' && c.status === 'PENDING');

    const matchesSearch =
      (c.clauseNumber || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.requirement || '').toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const eligibilityClauses = filteredClauses.filter(c => c.category === 'Eligibility & Financial' || c.category === 'Eligibility & Statutory' || c.category === 'Financial');
  const technicalClauses = filteredClauses.filter(c => c.category === 'Technical' || c.category === 'Technical Eligibility');

  const renderStatusBadge = (status) => {
    if (status === 'ISSUE') {
      return (
        <span className="inline-flex items-center text-rose-600 space-x-1 text-[10px] font-semibold">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Issue</span>
        </span>
      );
    }
    if (status === 'PASSED') {
      return (
        <span className="inline-flex items-center text-emerald-600 space-x-1 text-[10px] font-semibold">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Passed</span>
        </span>
      );
    }
    if (status === 'REVIEW') {
      return (
        <span className="inline-flex items-center text-amber-600 space-x-1 text-[10px] font-semibold">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Review</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center text-slate-400 space-x-1 text-[10px] font-medium">
        <span className="w-3 h-3 rounded-full border border-slate-300 inline-block"></span>
        <span>Pending</span>
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-2xs flex flex-col h-full overflow-hidden">
      {/* Category Section Label */}
      <div className="px-3 py-2 bg-slate-50 border-b border-slate-100 flex items-center justify-between shrink-0">
        <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
          REQUIRED PROPERTIES
        </span>
        <button
          onClick={() => {
            setFilter('ALL');
            setSearchTerm('');
          }}
          className="text-[10px] text-blue-600 font-semibold hover:underline"
        >
          View All Clauses (34) →
        </button>
      </div>

      {/* Clause Categories & List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 font-sans">
        {/* Eligibility & Financial Category */}
        {eligibilityClauses.length > 0 && (
          <div className="space-y-1">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Financial
            </h3>
            {eligibilityClauses.map((clause) => {
              const isSelected = clause.id === selectedClauseId;
              return (
                <div
                  key={clause.id}
                  onClick={() => onSelectClause(clause)}
                  className={`p-2 rounded-md border text-xs cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/20 shadow-2xs'
                      : 'border-slate-100 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="space-y-0.5 pr-2 truncate">
                    <div className="font-semibold text-slate-900 text-[11px] truncate">{clause.title}</div>
                  </div>
                  <div className="shrink-0">
                    {renderStatusBadge(clause.status)}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Technical Category */}
        {technicalClauses.length > 0 && (
          <div className="space-y-1 pt-1">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Technical
            </h3>
            {technicalClauses.map((clause) => {
              const isSelected = clause.id === selectedClauseId;
              return (
                <div
                  key={clause.id}
                  onClick={() => onSelectClause(clause)}
                  className={`p-2 rounded-md border text-xs cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/20 shadow-2xs'
                      : 'border-slate-100 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="space-y-0.5 pr-2 truncate">
                    <div className="font-semibold text-slate-900 text-[11px] truncate">{clause.title}</div>
                  </div>
                  <div className="shrink-0">
                    {renderStatusBadge(clause.status)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
