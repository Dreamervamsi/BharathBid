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
          <AlertCircle className="w-4 h-4 fill-rose-100" />
        </span>
      );
    }
    if (status === 'PASSED') {
      return (
        <span className="inline-flex items-center justify-center text-emerald-600">
          <CheckCircle2 className="w-4 h-4" />
        </span>
      );
    }
    return (
      <span className="inline-flex items-center justify-center text-amber-600">
        <HelpCircle className="w-4 h-4" />
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-2xs flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-3 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-2">
          <FileSpreadsheet className="w-4 h-4 text-slate-600" />
          <h2 className="text-xs font-bold text-slate-900 tracking-wider uppercase">Tender Clauses</h2>
        </div>
        <button
          onClick={onOpenUpload}
          className="p-1 text-blue-600 hover:bg-blue-50 rounded border border-blue-200 flex items-center space-x-1 text-[10px] font-bold"
          title="Upload Document"
        >
          <Plus className="w-3 h-3" />
          <span>Upload</span>
        </button>
      </div>

      {/* Search & Filter Controls */}
      <div className="p-2 border-b border-slate-200 bg-slate-50/30 space-y-1.5 shrink-0">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2" />
          <input
            type="text"
            placeholder="Search clause number or title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-[11px] pl-7 pr-2 py-1 border border-slate-300 rounded outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-1 text-[10px] font-bold">
          {['ALL', 'ISSUE', 'PASSED', 'REVIEW'].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`flex-1 py-0.5 rounded transition-colors text-center ${
                filter === st ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Clause Categories & List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* Eligibility & Financial Category */}
        {eligibilityClauses.length > 0 && (
          <div>
            <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              Eligibility & Financial
            </h3>
            <div className="space-y-1.5">
              {eligibilityClauses.map((clause) => {
                const isSelected = clause.id === selectedClauseId;
                return (
                  <div
                    key={clause.id}
                    onClick={() => onSelectClause(clause)}
                    className={`p-2.5 rounded-md border text-xs cursor-pointer transition-all flex items-start justify-between ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/40 shadow-2xs ring-1 ring-blue-500'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="space-y-0.5 pr-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-900">{clause.clauseNumber}</span>
                        <span className="font-semibold text-slate-800">{clause.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-500">{clause.requirement}</p>
                    </div>
                    <div className="shrink-0 mt-0.5">
                      {renderStatusBadge(clause.status)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Technical Category */}
        {technicalClauses.length > 0 && (
          <div>
            <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
              Technical
            </h3>
            <div className="space-y-1.5">
              {technicalClauses.map((clause) => {
                const isSelected = clause.id === selectedClauseId;
                return (
                  <div
                    key={clause.id}
                    onClick={() => onSelectClause(clause)}
                    className={`p-2.5 rounded-md border text-xs cursor-pointer transition-all flex items-start justify-between ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50/40 shadow-2xs ring-1 ring-blue-500'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="space-y-0.5 pr-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-slate-900">{clause.clauseNumber}</span>
                        <span className="font-semibold text-slate-800">{clause.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-500">{clause.requirement}</p>
                    </div>
                    <div className="shrink-0 mt-0.5">
                      {renderStatusBadge(clause.status)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Bottom view all button */}
      <div className="p-2.5 border-t border-slate-200 bg-slate-50 shrink-0">
        <button className="w-full py-1.5 px-3 bg-white hover:bg-slate-100 border border-slate-300 rounded text-xs font-semibold text-slate-700 flex items-center justify-center space-x-1 transition-colors">
          <span>View All Clauses (34)</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
