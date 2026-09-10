import React, { useState, useEffect } from 'react';
import TenderClauses from '../components/TenderClauses';
import EvidenceViewer from '../components/EvidenceViewer';
import RightAuditPanel from '../components/RightAuditPanel';
import WorkflowStepper from '../components/WorkflowStepper';
import DocumentUploadModal from '../components/DocumentUploadModal';
import ClarificationModal from '../components/ClarificationModal';
import OfficerDecision from '../components/OfficerDecision';
import { fetchVerification, saveOfficerDecision } from '../services/api';
import { useToast } from '../context/ToastContext';
import { useVerification } from '../context/VerificationContext';

export default function Verification() {
  const { showToast } = useToast();
  const { 
    clauses, 
    selectedClause, 
    selectClause, 
    liveScore, 
    counters, 
    currentStage, 
    isProcessing 
  } = useVerification();

  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [isClarificationOpen, setIsClarificationOpen] = useState(false);

  const handleSaveDecision = async (clauseId, decision, remarks) => {
    if (decision === 'CLARIFICATION') {
      setIsClarificationOpen(true);
      return;
    }
    await saveOfficerDecision("GEM/2024/9/19102", clauseId, decision, remarks);
    showToast(`Officer decision saved for Clause ${clauseId}`, 'success');
  };

  return (
    <div className="space-y-3 font-sans animate-fade-up select-none">
      {/* Top Stepper & Compliance Metrics Bar */}
      <WorkflowStepper
        currentStage={currentStage}
        compliance={liveScore}
        passed={counters.passed}
        issues={counters.issues}
        review={counters.review}
      />

      {/* Main 3-Column Verification Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 min-h-[640px] items-stretch">
        {/* Left Column: Required Properties Checklist (3 Cols) */}
        <div className="lg:col-span-3 h-[640px]">
          <TenderClauses
            clauses={clauses}
            selectedClauseId={selectedClause?.id}
            onSelectClause={(c) => selectClause(c)}
            onOpenUpload={() => setIsUploadOpen(true)}
          />
        </div>

        {/* Center Column: Actual PDF Document Canvas & Extraction Timeline (6 Cols) */}
        <div className="lg:col-span-6 h-[640px]">
          <EvidenceViewer clause={selectedClause} />
        </div>

        {/* Right Column: Real-Time Verification Pipeline & Live Findings (3 Cols) */}
        <div className="lg:col-span-3 h-[640px]">
          <RightAuditPanel />
        </div>
      </div>

      {/* Bottom Officer Action Bar */}
      <div className="bg-white rounded-lg border border-slate-200 p-3 shadow-2xs">
        <OfficerDecision clause={selectedClause} onSaveDecision={handleSaveDecision} />
      </div>

      {/* Modals */}
      <DocumentUploadModal
        caseId="GEM/2024/9/19102"
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
      />

      <ClarificationModal
        isOpen={isClarificationOpen}
        onClose={() => setIsClarificationOpen(false)}
        clause={selectedClause}
        bidderName="ABC Infra Private Limited"
      />
    </div>
  );
}
