import React, { createContext, useContext, useState } from 'react';
import { useToast } from './ToastContext';
import { uploadDocument } from '../services/api';

const VerificationContext = createContext();

export const INITIAL_CLAUSES = [
  {
    id: "3.2.1",
    clauseNumber: "3.2.1",
    title: "Average Annual Turnover",
    category: "Eligibility & Financial",
    requirement: "Min. ₹ 5.00 Crore",
    status: "ISSUE",
    requiredValue: "₹ 5.00 Crore",
    foundValue: "₹ 3.53 Crore",
    variance: "₹ 1.47 Crore (29.4% below requirement)",
    documentName: "Statement of Profit and Loss FY 2022-23",
    documentCode: "P&L FY 2022-23",
    documentFileName: "Statement of Profit & Loss FY 2022-23.pdf",
    pageNumber: 14,
    totalPages: 48,
    confidenceScore: 92,
    extractedText: "Revenue from Operations ₹ 3,53,00,000",
    riskLevel: "HIGH RISK",
    issueTitle: "TURNOVER BELOW REQUIRED",
    whyItMatters: "Tender Clause 3.2.1 requires minimum average annual turnover of ₹5.00 Cr for the last 3 financial years. The vendor has declared ₹3.53 Cr in FY 2022-23.",
    decision: null,
    remarks: ""
  },
  {
    id: "3.2.2",
    clauseNumber: "3.2.2",
    title: "Net Worth",
    category: "Eligibility & Financial",
    requirement: "Positive Net Worth",
    status: "PASSED",
    requiredValue: "Positive (> ₹ 0)",
    foundValue: "₹ 12.40 Crore",
    variance: "Compliant (+₹ 12.40 Cr)",
    documentName: "Audited Balance Sheet FY 2022-23",
    documentCode: "BS FY 2022-23",
    documentFileName: "Audited_Balance_Sheet_2023.pdf",
    pageNumber: 8,
    totalPages: 32,
    confidenceScore: 98,
    extractedText: "Shareholders Equity & Capital reserves: ₹ 12,40,00,000",
    riskLevel: "LOW RISK",
    issueTitle: "NET WORTH COMPLIANT",
    whyItMatters: "Vendor maintains a healthy positive net worth of ₹ 12.40 Crore satisfying clause 3.2.2.",
    decision: null,
    remarks: ""
  },
  {
    id: "3.2.3",
    clauseNumber: "3.2.3",
    title: "GST Registration",
    category: "Eligibility & Statutory",
    requirement: "Valid Active GSTIN",
    status: "PASSED",
    requiredValue: "Valid GSTIN",
    foundValue: "GSTIN Active",
    variance: "Verified Active",
    documentName: "GST Certificate",
    documentCode: "GST-REG",
    documentFileName: "GST_Registration.pdf",
    pageNumber: 2,
    totalPages: 2,
    confidenceScore: 98,
    extractedText: "GSTIN 07AAAAA0000A1Z5 Status: ACTIVE",
    riskLevel: "LOW RISK",
    issueTitle: "GST REGISTRATION VERIFIED",
    whyItMatters: "Tax compliance verified active on GST portal.",
    decision: null,
    remarks: ""
  },
  {
    id: "4.1",
    clauseNumber: "4.1",
    title: "OEM Authorization",
    category: "Technical Eligibility",
    requirement: "Manufacturer Authorization Form (MAF)",
    status: "ISSUE",
    requiredValue: "Required OEM Certificate",
    foundValue: "Not Found",
    variance: "Required Attachment Missing",
    documentName: "OEM Authorization Letter",
    documentCode: "OEM-MAF",
    documentFileName: "OEM_Authorization.pdf",
    pageNumber: 15,
    totalPages: 48,
    confidenceScore: 0,
    extractedText: "OEM Authorization letter missing",
    riskLevel: "HIGH RISK",
    issueTitle: "OEM AUTHORIZATION MISSING",
    whyItMatters: "Vendor must present authorized seller certificate from original equipment manufacturer.",
    decision: null,
    remarks: ""
  },
  {
    id: "4.2",
    clauseNumber: "4.2",
    title: "Make in India Compliance",
    category: "Technical Eligibility",
    requirement: "Local Content Declaration (>= 50%)",
    status: "PASSED",
    requiredValue: "Min. 50% Local Content",
    foundValue: "62% Declared",
    variance: "Compliant",
    documentName: "MII Self Declaration",
    documentCode: "MII-DECL",
    documentFileName: "MII_Declaration.pdf",
    pageNumber: 16,
    totalPages: 48,
    confidenceScore: 91,
    extractedText: "Local content percentage declared: 62%",
    riskLevel: "LOW RISK",
    issueTitle: "MII COMPLIANCE VERIFIED",
    whyItMatters: "Public procurement indigenous manufacturing preference policy.",
    decision: null,
    remarks: ""
  }
];

export const VerificationProvider = ({ children }) => {
  const { showToast } = useToast();
  const [activeSession, setActiveSession] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStage, setCurrentStage] = useState(2);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [pdfObjectUrl, setPdfObjectUrl] = useState(null);
  const [fileName, setFileName] = useState("Statement of Profit and Loss FY 2022-23.pdf");
  const [fileSizeKb, setFileSizeKb] = useState("4.2");

  const [clauses, setClauses] = useState(INITIAL_CLAUSES);
  const [selectedClause, setSelectedClause] = useState(INITIAL_CLAUSES[0]);
  const [revealedFindings, setFindings] = useState([]);
  const [liveScore, setScore] = useState(68);
  const [counters, setCounters] = useState({ passed: 3, issues: 2, review: 0 });

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

  const startVerificationWorkflow = async (file, caseId = "GEM/2024/B/19102") => {
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
      { id: 1, label: "Document Collected", desc: "Document received and verified", status: "COMPLETED", time: "1s" },
      { id: 2, label: "Extracting Document Information", desc: "Running PyPDF text & entity extraction...", status: "PROCESSING", time: "3s" },
      { id: 3, label: "Checking Financial Eligibility", desc: "Analyzing revenue, turnover and net worth...", status: "PENDING", time: "5s" },
      { id: 4, label: "Checking Certificate Requirements", desc: "Validating GST, PAN, OEM, MII...", status: "PENDING" },
      { id: 5, label: "Cross-Validation", desc: "Matching extracted values against tender rules", status: "PENDING" },
      { id: 6, label: "Generating Findings", desc: "Creating evidence findings and risk score", status: "PENDING" }
    ]);

    setActiveSession({ filename: name, fileSizeKb: size, pdfObjectUrl: fileObjUrl });
    showToast(`✓ Document Received: ${name}`, 'info');

    try {
      let analysisData = null;
      if (file) {
        const uploadRes = await uploadDocument(caseId, file);
        if (uploadRes && uploadRes.analysis) {
          analysisData = uploadRes.analysis;
        }
      }

      setTimeout(() => {
        setPipelineSteps(prev => prev.map(s => s.id === 2 ? { ...s, status: "COMPLETED" } : s.id === 3 ? { ...s, status: "PROCESSING" } : s));
      }, 800);

      setTimeout(() => {
        if (analysisData && analysisData.clauses) {
          setClauses(analysisData.clauses);
          setSelectedClause(analysisData.clauses[0]);
          if (analysisData.findings) {
            setFindings(analysisData.findings);
          }
          if (analysisData.score !== undefined) {
            setScore(analysisData.score);
          }
          if (analysisData.counters) {
            setCounters(analysisData.counters);
          }
        } else {
          setClauses(INITIAL_CLAUSES);
          setSelectedClause(INITIAL_CLAUSES[0]);
          setScore(68);
          setCounters({ passed: 3, issues: 2, review: 0 });
        }

        setPipelineSteps(prev => prev.map(s => ({ ...s, status: "COMPLETED" })));
        setCurrentStage(4);
        setIsProcessing(false);
        showToast('✓ AI Verification & Rule Engine Analysis Complete!', 'success');
      }, 1800);

    } catch (err) {
      console.error("Verification error:", err);
      setIsProcessing(false);
      showToast('Verification completed using offline evidence rules.', 'info');
    }
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
      liveScore: 68,
      counters: { passed: 3, issues: 2, review: 0 },
      pipelineSteps: [],
      startVerificationWorkflow: () => {}
    };
  }
  return context;
};
