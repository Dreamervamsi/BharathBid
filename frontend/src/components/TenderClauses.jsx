import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, HelpCircle, ChevronRight, FileSpreadsheet, Search, Plus } from 'lucide-react';

export default function TenderClauses({ clauses = [], selectedClauseId, onSelectClause, onOpenUpload }) {
  const [filter, setFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClauses = clauses.filter((c) => {
    const matchesFilter =
      filter === 'ALL' ||
      (filter === 'ISSUE' && c.status === 'ISSUE') ||
      (filter === 'PASSED' && c.status === 'PASSED') ||
      (filter === 'REVIEW' && c.status === 'REVIEW');

    const matchesSearch =
      c.clauseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.requirement.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const eligibilityClauses = filteredClauses.filter(c => c.category === 'Eligibility & Financial');
  const technicalClauses = filteredClauses.filter(c => c.category === 'Technical');

  const renderStatusBadge = (status) => {
    if (status === 'ISSUE') {
      return (
        <span className="inline-flex items-center justify-center text-rose-600 bg-rose-50 rounded-full p-0.5">
          <AlertCircle className="w-3.5 h-3.5" />
        </span>
      );
    }
    if (status === 'PASSED') {
      return (
        <span className="inline-flex items-center justify-center text-emerald-600">
          <CheckCircle2 className="w-3.5 h-3.5" />
        </span>
      );
    }
    return (
      <span className="inline-flex items-center justify-center text-amber-600">
        <HelpCircle className="w-3.5 h-3.5" />
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-2xs flex flex-col h-full overflow-hidden">
      {/* Header Button */}
      <div className="p-3 border-b border-slate-100 shrink-0">
        <button
          onClick={onOpenUpload}
          className="w-full py-2 px-3 bg-[#071328] hover:bg-slate-800 text-white rounded-md text-xs font-medium uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Upload Documents</span>
        </button>
      </div>

      {/* Category Section Label */}
      <div className="px-3 py-1 bg-slate-50 border-b border-slate-100 text-[10px] font-semibold text-slate-500 uppercase tracking-wider shrink-0">
        Required Properties
      </div>

      {/* Clause Categories & List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 font-sans">
        {/* Eligibility & Financial Category */}
        {eligibilityClauses.length > 0 && (
          <div className="space-y-1">
            <h3 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Financial
            </h3>
            {eligibilityClauses.map((clause) => {
              const isSelected = clause.id === selectedClauseId;
              return (
                <div
                  key={clause.id}
                  onClick={() => onSelectClause(clause)}
                  className={`p-2 rounded-md border text-xs cursor-pointer transition-all flex items-start justify-between ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/20 shadow-2xs'
                      : 'border-slate-100 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="space-y-0.5 pr-2">
                    <div className="flex items-center space-x-1.5">
                      <span className="font-semibold text-slate-900 text-[11px]">{clause.clauseNumber}</span>
                      <span className="font-medium text-slate-800 text-[11px]">{clause.title}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-normal">{clause.requirement}</p>
                  </div>
                  <div className="shrink-0 mt-0.5">
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
            <h3 className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Technical
            </h3>
            {technicalClauses.map((clause) => {
              const isSelected = clause.id === selectedClauseId;
              return (
                <div
                  key={clause.id}
                  onClick={() => onSelectClause(clause)}
                  className={`p-2 rounded-md border text-xs cursor-pointer transition-all flex items-start justify-between ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/20 shadow-2xs'
                      : 'border-slate-100 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="space-y-0.5 pr-2">
                    <div className="flex items-center space-x-1.5">
                      <span className="font-semibold text-slate-800 text-[11px]">{clause.title}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-normal">{clause.requirement}</p>
                  </div>
                  <div className="shrink-0 mt-0.5">
                    {renderStatusBadge(clause.status)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom view all button */}
      <div className="p-2.5 border-t border-slate-100 bg-slate-50 shrink-0">
        <button
          onClick={() => {
            setFilter('ALL');
            setSearchTerm('');
          }}
          className="w-full py-1.5 px-3 bg-white hover:bg-slate-100 border border-slate-200 rounded text-xs font-medium text-slate-700 flex items-center justify-center space-x-1 transition-colors"
        >
          <span>View All Clauses (34)</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
