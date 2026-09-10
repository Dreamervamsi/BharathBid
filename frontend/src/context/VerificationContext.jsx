import React, { createContext, useContext, useState } from 'react';
import { useToast } from './ToastContext';

const VerificationContext = createContext();

export const INITIAL_CLAUSES = [
  {
    id: "3.2.1",
    clauseNumber: "3.2.1",
    title: "Net Worth",
    category: "Financial",
    requirement: "Positive Net Worth",
    status: "PENDING",
    statusLabel: "Positive",
    requiredValue: "Positive Net Worth",
    foundValue: "₹ 12.4 Crore (Positive)",
    variance: "Compliant",
    documentName: "Statement of Profit and Loss FY 2022-23",
    documentCode: "P&L FY 2022-23",
    documentFileName: "uploaded_doc.pdf",
    pageNumber: 12,
    totalPages: 48,
    confidenceScore: 98,
    extractedText: "Net Worth: ₹ 12,40,00,000",
    riskLevel: "LOW RISK",
    issueTitle: "NET WORTH VERIFIED",
    whyItMatters: "Vendor maintains positive net worth.",
    decision: null,
    remarks: ""
  },
  {
    id: "3.2.2",
    clauseNumber: "3.2.2",
    title: "Similar Experience",
    category: "Financial",
    requirement: "At least one similar work",
    status: "PENDING",
    statusLabel: "Under Review",
    requiredValue: "1 Similar Contract",
    foundValue: "1 Contract Found (₹ 1.85 Cr)",
    variance: "Under Review",
    documentName: "Past Experience Credentials",
    documentCode: "EXP-2023",
    pageNumber: 14,
    totalPages: 48,
    confidenceScore: 84,
    extractedText: "Supply order value: ₹ 1,85,00,000",
    riskLevel: "MEDIUM RISK",
    issueTitle: "EXPERIENCE UNDER REVIEW",
    whyItMatters: "Order value slightly below preferred benchmark.",
    decision: null,
    remarks: ""
  },
  {
    id: "3.2.3",
    clauseNumber: "3.2.3",
    title: "GST Registration",
    category: "Financial",
    requirement: "Valid GSTIN",
    status: "PENDING",
    statusLabel: "Valid GSTIN",
    requiredValue: "Valid GSTIN",
    foundValue: "GSTIN Active",
    variance: "Verified Active",
    documentName: "GST Certificate",
    documentCode: "GST-REG",
    pageNumber: 2,
    totalPages: 48,
    confidenceScore: 98,
    extractedText: "GSTIN 07AAAAA0000A1Z5 Status: ACTIVE",
    riskLevel: "LOW RISK",
    issueTitle: "GST REGISTRATION VERIFIED",
    whyItMatters: "Tax compliance verified on GST portal.",
    decision: null,
    remarks: ""
  },
  {
    id: "4.1",
    clauseNumber: "4.1",
    title: "OEM Authorization",
    category: "Technical",
    requirement: "Required",
    status: "PENDING",
    statusLabel: "Required",
    requiredValue: "OEM MAF Required",
    foundValue: "Not Found",
    variance: "Required Attachment Missing",
    documentName: "OEM Authorization Form",
    documentCode: "OEM-MAF",
    pageNumber: 15,
    totalPages: 48,
    confidenceScore: 0,
    extractedText: "OEM Authorization letter missing",
    riskLevel: "HIGH RISK",
    issueTitle: "OEM AUTHORIZATION MISSING",
    whyItMatters: "Vendor must present authorized seller certificate.",
    decision: null,
    remarks: ""
  },
  {
    id: "4.2",
    clauseNumber: "4.2",
    title: "Make in India Compliance",
    category: "Technical",
    requirement: "Certificate Submitted",
    status: "PENDING",
    statusLabel: "Certificate Submitted",
    requiredValue: "Local Content Certificate",
    foundValue: "Certificate Submitted",
    variance: "Compliant",
    documentName: "MII Self Declaration",
    documentCode: "MII-DECL",
    pageNumber: 16,
    totalPages: 48,
    confidenceScore: 91,
    extractedText: "Local content percentage declared: 62%",
    riskLevel: "LOW RISK",
    issueTitle: "MII COMPLIANCE VERIFIED",
    whyItMatters: "Public procurement indigenous manufacturing order.",
    decision: null,
    remarks: ""
  },
  {
    id: "4.3",
    clauseNumber: "4.3",
    title: "Past Performance",
    category: "Technical",
    requirement: "Satisfactory",
    status: "PENDING",
    statusLabel: "Satisfactory",
    requiredValue: "Satisfactory Performance",
    foundValue: "Satisfactory",
    variance: "Compliant",
    documentName: "Performance Certificate",
    documentCode: "PERF-CERT",
    pageNumber: 17,
    totalPages: 48,
    confidenceScore: 95,
    extractedText: "Performance reported as satisfactory",
    riskLevel: "LOW RISK",
    issueTitle: "PAST PERFORMANCE SATISFACTORY",
    whyItMatters: "Satisfactory client feedback.",
    decision: null,
    remarks: ""
  }
];

export const VerificationProvider = ({ children }) => {
  const { showToast } = useToast();
  const [activeSession, setActiveSession] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStage, setCurrentStage] = useState(2); // 2: Analysis
  const [uploadedFile, setUploadedFile] = useState(null);
  const [pdfObjectUrl, setPdfObjectUrl] = useState(null);
  const [fileName, setFileName] = useState("Statement of Profit and Loss FY 2022-23.pdf");
  const [fileSizeKb, setFileSizeKb] = useState("4.2");

  const [clauses, setClauses] = useState(INITIAL_CLAUSES);
  const [selectedClause, setSelectedClause] = useState(INITIAL_CLAUSES[0]);
  const [revealedFindings, setFindings] = useState([]);
  const [liveScore, setScore] = useState(0);
  const [counters, setCounters] = useState({ passed: 0, issues: 0, review: 0 });

  const [pipelineSteps, setPipelineSteps] = useState([
    { id: 1, label: "Document Collected", desc: "Document received and verified", status: "COMPLETED", time: "2s" },
    { id: 2, label: "Extracting Document Information", desc: "Company name, financial data, certificates...", status: "PROCESSING", time: "5s" },
    { id: 3, label: "Checking Financial Eligibility", desc: "Analyzing revenue and turnover...", status: "PENDING", time: "8s" },
    { id: 4, label: "Checking Certificate Requirements", desc: "Validating GST, PAN, Udyam, etc.", status: "PENDING" },
    { id: 5, label: "Cross-Validation", desc: "Matching data across sources", status: "PENDING" },
    { id: 6, label: "Generating Findings", desc: "Creating compliance report", status: "PENDING" }
  ]);

  const selectClause = (clauseOrId) => {
    if (!clauseOrId) return;
    const found = typeof clauseOrId === 'string' 
      ? clauses.find(c => c.id === clauseOrId) || clauses[0]
      : clauseOrId;
    setSelectedClause(found);
  };

  const startVerificationWorkflow = (file, apiResponseData = null) => {
    if (isProcessing) {
      showToast('A verification session is already in progress.', 'warning');
      return;
    }

    let fileObjUrl = null;
    let name = "Statement of Profit and Loss FY 2022-23.pdf";
    let size = "4.2";

    if (file) {
      setUploadedFile(file);
      fileObjUrl = URL.createObjectURL(file);
      setPdfObjectUrl(fileObjUrl);
      name = file.name;
      size = (file.size / (1024 * 1024)).toFixed(1);
      setFileName(name);
      setFileSizeKb(size);
    }

    setIsProcessing(true);
    setCurrentStage(2);
    setFindings([]);
    setScore(0);
    setCounters({ passed: 0, issues: 0, review: 0 });

    const resetClauses = INITIAL_CLAUSES.map(c => ({ ...c, status: "PENDING" }));
    setClauses(resetClauses);
    setSelectedClause(resetClauses[0]);

    setPipelineSteps([
      { id: 1, label: "Document Collected", desc: "Document received and verified", status: "COMPLETED", time: "2s" },
      { id: 2, label: "Extracting Document Information", desc: "Company name, financial data, certificates...", status: "PROCESSING", time: "5s" },
      { id: 3, label: "Checking Financial Eligibility", desc: "Analyzing revenue and turnover...", status: "PENDING", time: "8s" },
      { id: 4, label: "Checking Certificate Requirements", desc: "Validating GST, PAN, Udyam, etc.", status: "PENDING" },
      { id: 5, label: "Cross-Validation", desc: "Matching data across sources", status: "PENDING" },
      { id: 6, label: "Generating Findings", desc: "Creating compliance report", status: "PENDING" }
    ]);

    setActiveSession({ filename: name, fileSizeKb: size, pdfObjectUrl: fileObjUrl });
    showToast(`✓ Document Received: ${name}`, 'info');

    // Stage 1 -> Stage 2
    setTimeout(() => {
      setClauses(prev => prev.map(c => c.id === "3.2.1" ? { ...c, status: "PASSED" } : c));
      setFindings(prev => [...prev, {
        id: "F1", title: "GST Registration Verified", type: "PASSED", clause: "3.2.3", pageNumber: 12
      }]);
      setScore(15);
      setCounters({ passed: 1, issues: 0, review: 0 });
      setPipelineSteps(prev => prev.map(s => s.id === 2 ? { ...s, status: "COMPLETED" } : s.id === 3 ? { ...s, status: "PROCESSING" } : s));
    }, 1200);

    // Stage 2 -> Stage 3
    setTimeout(() => {
      setCurrentStage(3);
      setClauses(prev => prev.map(c => c.id === "3.2.2" ? { ...c, status: "REVIEW" } : c));
      setFindings(prev => [...prev, {
        id: "F2", title: "Missing CA Certificate", type: "WARNING", clause: "3.2.2", pageNumber: 14
      }]);
      setScore(28);
      setCounters({ passed: 1, issues: 0, review: 1 });
      setPipelineSteps(prev => prev.map(s => s.id === 3 ? { ...s, status: "COMPLETED" } : s.id === 4 ? { ...s, status: "PROCESSING" } : s));
    }, 2400);

    // Stage 3 -> Stage 4 (Red Flag)
    setTimeout(() => {
      setClauses(prev => prev.map(c => {
        if (c.id === "4.1") return { ...c, status: "ISSUE" };
        if (c.id === "4.2") return { ...c, status: "REVIEW" };
        if (c.id === "4.3") return { ...c, status: "PASSED" };
        return c;
      }));
      setFindings(prev => [...prev, {
        id: "F3", title: "Turnover Below Required", type: "RED_FLAG", clause: "4.1", pageNumber: 14
      }]);
      setScore(42);
      setCounters({ passed: 8, issues: 7, review: 4 });
      setPipelineSteps(prev => prev.map(s => s.id >= 4 ? { ...s, status: "COMPLETED" } : s));
      setCurrentStage(4);
      setIsProcessing(false);
      showToast('✓ Real-Time Verification Complete!', 'success');
    }, 3800);
  };

  return (
    <VerificationContext.Provider value={{
      activeSession,
      isProcessing,
      currentStage,
      uploadedFile,
      pdfObjectUrl,
      fileName,
      fileSizeKb,
      clauses,
      selectedClause,
      selectClause,
      revealedFindings,
      liveScore,
      counters,
      pipelineSteps,
      startVerificationWorkflow
    }}>
      {children}
    </VerificationContext.Provider>
  );
};

export const useVerification = () => {
  const context = useContext(VerificationContext);
  if (!context) {
    return {
      activeSession: null,
      isProcessing: false,
      currentStage: 2,
      uploadedFile: null,
      pdfObjectUrl: null,
      fileName: "Statement of Profit and Loss FY 2022-23.pdf",
      fileSizeKb: "4.2",
      clauses: INITIAL_CLAUSES,
      selectedClause: INITIAL_CLAUSES[0],
      selectClause: () => {},
      revealedFindings: [],
      liveScore: 42,
      counters: { passed: 8, issues: 7, review: 4 },
      pipelineSteps: [],
      startVerificationWorkflow: () => {}
    };
  }
  return context;
};
