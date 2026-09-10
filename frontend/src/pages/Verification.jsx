import React, { useState, useEffect } from 'react';
import TenderClauses from '../components/TenderClauses';
import EvidenceViewer from '../components/EvidenceViewer';
import FindingsPanel from '../components/FindingsPanel';
import OfficerDecision from '../components/OfficerDecision';
import FinalAction from '../components/FinalAction';
import WorkflowStepper from '../components/WorkflowStepper';
import DocumentUploadModal from '../components/DocumentUploadModal';
import ClarificationModal from '../components/ClarificationModal';
import { fetchVerification, saveOfficerDecision, generateDisqualificationMemo } from '../services/api';

export default function Verification() {
  const [data, setData] = useState(null);
  const [selectedClause, setSelectedClause] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isClarificationOpen, setIsClarificationOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const res = await fetchVerification("GEM/2024/B/19102");
      setData(res);
      if (res?.clauses?.length > 0) {
        const issueClause = res.clauses.find(c => c.status === 'ISSUE') || res.clauses[0];
        setSelectedClause(issueClause);
      }
      setLoading(false);
    }
    loadData();
  }, []);

  const handleSaveDecision = async (clauseId, decision, remarks) => {
    if (decision === 'CLARIFICATION') {
      setIsClarificationOpen(true);
    }
    const res = await saveOfficerDecision(data.caseId, clauseId, decision, remarks);
    if (res) {
      setData(prev => {
        const updatedClauses = prev.clauses.map(c => {
          if (c.id === clauseId) {
            return { ...c, decision, remarks };
          }
          return c;
        });
        return { ...prev, clauses: updatedClauses };
      });
      if (selectedClause?.id === clauseId) {
        setSelectedClause(prev => ({ ...prev, decision, remarks }));
      }
    }
  };

  const handleDocumentUploaded = (docResult) => {
    // Dynamically refresh verification list
    fetchVerification("GEM/2024/B/19102").then(res => {
      setData(res);
    });
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-500 text-xs font-semibold">
        Loading procurement verification record...
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Workflow Stepper Bar */}
      <div className="flex items-center justify-between">
        {data?._isDemoMode && (
          <div className="bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-bold px-3 py-1 rounded flex items-center gap-1.5 w-full">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping"></span>
            <span>DEMO MODE ACTIVE — Backend offline or disconnected. Using resilient SIH demonstration dataset.</span>
          </div>
        )}
      </div>

      <WorkflowStepper
        currentStage={data?.currentStage || 3}
        compliance={data?.overallCompliance || 68}
        passed={data?.passedCount || 12}
        issues={data?.issuesCount || 4}
        review={data?.reviewCount || 3}
      />

      {/* Main Three Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch min-h-[580px]">
        {/* Left Panel: Tender Clauses (3 Columns) */}
        <div className="lg:col-span-3 h-[580px]">
          <TenderClauses
            clauses={data?.clauses || []}
            selectedClauseId={selectedClause?.id}
            onSelectClause={(c) => setSelectedClause(c)}
            onOpenUpload={() => setIsUploadOpen(true)}
          />
        </div>

        {/* Center Panel: Document Evidence Viewer (6 Columns) */}
        <div className="lg:col-span-6 h-[580px]">
          <EvidenceViewer clause={selectedClause} />
        </div>

        {/* Right Panel: Findings & Officer Decision (3 Columns) */}
        <div className="lg:col-span-3 h-[580px] flex flex-col space-y-3">
          <div className="flex-1 min-h-0 overflow-y-auto">
            <FindingsPanel clause={selectedClause} />
          </div>
          <div className="shrink-0">
            <OfficerDecision
              clause={selectedClause}
              onSaveDecision={handleSaveDecision}
            />
          </div>
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="pt-2">
        <FinalAction
          caseId={data?.caseId}
          onGenerateMemo={generateDisqualificationMemo}
        />
      </div>

      {/* Modals */}
      <DocumentUploadModal
        caseId={data?.caseId}
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUploadComplete={handleDocumentUploaded}
      />

      <ClarificationModal
        isOpen={isClarificationOpen}
        onClose={() => setIsClarificationOpen(false)}
        clause={selectedClause}
        bidderName={data?.bidderName}
        onSendClarification={(clauseId, msg) => {
          console.log('Clarification dispatched:', clauseId, msg);
        }}
      />
    </div>
  );
}
