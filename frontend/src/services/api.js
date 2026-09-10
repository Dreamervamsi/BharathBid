const API_BASE = import.meta.env.VITE_API_URL || '/api';

export const isLiveBackendAvailable = async () => {
  try {
    const res = await fetch(`${API_BASE}/health`, { method: 'GET' });
    return res.ok;
  } catch (e) {
    return false;
  }
};

// Comprehensive mock data fallback for SIH demo resilience
export const MOCK_VERIFICATION = {
  id: "GEM/2024/B/19102",
  caseId: "GEM/2024/B/19102",
  bidderName: "ABC Infra Private Limited",
  status: "IN_PROGRESS",
  statusLabel: "Verification in Progress",
  overallCompliance: 68,
  passedCount: 12,
  issuesCount: 4,
  reviewCount: 3,
  currentStage: 3,
  officerName: "Arjun Singh",
  officerRole: "Procurement Officer",
  lastUpdated: "12 May 2024, 10:42 AM",
  clauses: [
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
      percentageBelow: "29.4%",
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
      percentageBelow: null,
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
      decision: "CONFIRMED",
      remarks: "Verified against audited balance sheet reserves."
    },
    {
      id: "3.2.3",
      clauseNumber: "3.2.3",
      title: "Similar Experience",
      category: "Eligibility & Financial",
      requirement: "At least one similar work",
      status: "PASSED",
      requiredValue: "1 Work Order > ₹ 3 Cr",
      foundValue: "2 Completed Work Orders",
      variance: "Compliant",
      percentageBelow: null,
      documentName: "Work Completion Certificates",
      documentCode: "WCC-2023",
      documentFileName: "Work_Completion_Certificates.pdf",
      pageNumber: 3,
      totalPages: 12,
      confidenceScore: 95,
      extractedText: "Completion Certificate: Highway Expansion Project ₹ 4.10 Cr",
      riskLevel: "LOW RISK",
      issueTitle: "EXPERIENCE VERIFIED",
      whyItMatters: "Provided valid client completion certificates from NHAI.",
      decision: "CONFIRMED",
      remarks: "Valid completion certificate attached."
    },
    {
      id: "3.2.4",
      clauseNumber: "3.2.4",
      title: "GST Registration",
      category: "Eligibility & Financial",
      requirement: "Valid GSTIN",
      status: "PASSED",
      requiredValue: "Active GSTIN Certificate",
      foundValue: "07AAAAA0000A1Z5 (Active)",
      variance: "Compliant",
      percentageBelow: null,
      documentName: "GST Registration Certificate",
      documentCode: "GST-REG06",
      documentFileName: "GST_Registration.pdf",
      pageNumber: 1,
      totalPages: 2,
      confidenceScore: 99,
      extractedText: "GSTIN Status: ACTIVE | Registration Date: 01/07/2017",
      riskLevel: "LOW RISK",
      issueTitle: "GST VALIDATED",
      whyItMatters: "GST portal verification matched active registration status.",
      decision: "CONFIRMED",
      remarks: "Active status verified."
    },
    {
      id: "4.1",
      clauseNumber: "4.1",
      title: "OEM Authorization",
      category: "Technical",
      requirement: "Required",
      status: "PASSED",
      requiredValue: "MAF from Principal",
      foundValue: "Valid MAF Attached",
      variance: "Compliant",
      percentageBelow: null,
      documentName: "Manufacturer Authorization Form",
      documentCode: "MAF-2024",
      documentFileName: "OEM_MAF_Letter.pdf",
      pageNumber: 1,
      totalPages: 1,
      confidenceScore: 91,
      extractedText: "We hereby authorize ABC Infra Pvt Ltd to quote our products.",
      riskLevel: "LOW RISK",
      issueTitle: "OEM AUTHORIZED",
      whyItMatters: "Original Equipment Manufacturer letter verified.",
      decision: "CONFIRMED",
      remarks: ""
    },
    {
      id: "4.2",
      clauseNumber: "4.2",
      title: "Make in India Compliance",
      category: "Technical",
      requirement: "Certificate submitted",
      status: "PASSED",
      requiredValue: "Class 1 / Class 2 Local Supplier Certificate",
      foundValue: "Class 1 (62% Local Content)",
      variance: "Compliant",
      percentageBelow: null,
      documentName: "MII Local Content Self Certification",
      documentCode: "MII-CERT",
      documentFileName: "Make_In_India_Declaration.pdf",
      pageNumber: 2,
      totalPages: 2,
      confidenceScore: 94,
      extractedText: "Local content is 62% certified by Statutory Auditor",
      riskLevel: "LOW RISK",
      issueTitle: "LOCAL CONTENT COMPLIANT",
      whyItMatters: "Exceeds minimum 50% threshold for Class 1 supplier status.",
      decision: "CONFIRMED",
      remarks: ""
    },
    {
      id: "4.3",
      clauseNumber: "4.3",
      title: "Past Performance",
      category: "Technical",
      requirement: "Satisfactory",
      status: "REVIEW",
      requiredValue: "Performance Report from prior GeM orders",
      foundValue: "1 Adverse Feedback Flagged",
      variance: "Requires Verification",
      percentageBelow: null,
      documentName: "Past Performance Assessment Sheet",
      documentCode: "PERF-2023",
      documentFileName: "Past_Performance.pdf",
      pageNumber: 5,
      totalPages: 10,
      confidenceScore: 78,
      extractedText: "Order #88219 had 12 days delivery delay with liquidated damages applied",
      riskLevel: "MEDIUM RISK",
      issueTitle: "DELIVERY DELAY RECORDED",
      whyItMatters: "Vendor has a past delayed delivery record on GeM order #88219. Officer needs to review if LD was condoned.",
      decision: null,
      remarks: ""
    }
  ],
  documents: [
    { id: "doc-1", name: "Statement of Profit and Loss FY 2022-23", fileName: "Statement of Profit & Loss FY 2022-23.pdf", pages: 48, uploadedAt: "12 May 2024, 10:42 AM", status: "Verified" },
    { id: "doc-2", name: "Audited Balance Sheet FY 2022-23", fileName: "Audited_Balance_Sheet_2023.pdf", pages: 32, uploadedAt: "12 May 2024, 10:40 AM", status: "Verified" },
    { id: "doc-3", name: "GST Registration Certificate", fileName: "GST_Registration.pdf", pages: 2, uploadedAt: "12 May 2024, 10:38 AM", status: "Verified" }
  ]
};

export const MOCK_QUEUE = [
  {
    id: "GEM/2024/B/19102",
    bidder: "ABC Infra Private Limited",
    tenderName: "Supply & Installation of IT Infrastructure",
    tenderValue: "₹ 4.50 Cr",
    compliance: 68,
    risk: "HIGH",
    status: "Verification in Progress",
    assignedOfficer: "Arjun Singh",
    submissionDate: "2024-05-12"
  },
  {
    id: "GEM/2024/B/18992",
    bidder: "TechGov Solutions Ltd",
    tenderName: "Smart Classroom Equipment Procurement",
    tenderValue: "₹ 12.00 Cr",
    compliance: 94,
    risk: "LOW",
    status: "Pending Decision",
    assignedOfficer: "Arjun Singh",
    submissionDate: "2024-05-11"
  },
  {
    id: "GEM/2024/B/18840",
    bidder: "Bharat Solar Power Corp",
    tenderName: "Solar Rooftop Installation Project",
    tenderValue: "₹ 8.20 Cr",
    compliance: 45,
    risk: "HIGH",
    status: "Clarification Requested",
    assignedOfficer: "Priya Sharma",
    submissionDate: "2024-05-10"
  },
  {
    id: "GEM/2024/B/18711",
    bidder: "National Logistics Hubs Inc",
    tenderName: "Automated Warehousing Fleet",
    tenderValue: "₹ 18.50 Cr",
    compliance: 82,
    risk: "MEDIUM",
    status: "Completed",
    assignedOfficer: "Arjun Singh",
    submissionDate: "2024-05-08"
  },
  {
    id: "GEM/2024/B/18650",
    bidder: "Hindustan Defense Systems Pvt Ltd",
    tenderName: "Border Security Surveillance Radar Systems",
    tenderValue: "₹ 45.00 Cr",
    compliance: 91,
    risk: "LOW",
    status: "Under Technical Review",
    assignedOfficer: "Arjun Singh",
    submissionDate: "2024-05-07"
  },
  {
    id: "GEM/2024/B/18520",
    bidder: "Kaveri Water Networks Corp",
    tenderName: "Urban Water Pipeline SCADA Integration",
    tenderValue: "₹ 14.80 Cr",
    compliance: 58,
    risk: "HIGH",
    status: "Discrepancy Discovered",
    assignedOfficer: "Rajesh Kumar",
    submissionDate: "2024-05-06"
  },
  {
    id: "GEM/2024/B/18410",
    bidder: "Apex Medical Devices India",
    tenderName: "Hospital ICU Ventilator & Monitor Supply",
    tenderValue: "₹ 22.30 Cr",
    compliance: 76,
    risk: "MEDIUM",
    status: "Verification in Progress",
    assignedOfficer: "Arjun Singh",
    submissionDate: "2024-05-05"
  },
  {
    id: "GEM/2024/B/18305",
    bidder: "GreenGrid Energy Pvt Ltd",
    tenderName: "EV Charging Infrastructure Network",
    tenderValue: "₹ 9.60 Cr",
    compliance: 38,
    risk: "CRITICAL",
    status: "Notice Issued",
    assignedOfficer: "Priya Sharma",
    submissionDate: "2024-05-04"
  }
];

export const MOCK_AUDIT_TRAIL = [
  { id: 1, timestamp: "2024-05-12 10:42:15", user: "System AI", action: "Document Uploaded", caseId: "GEM/2024/B/19102", details: "Statement of Profit & Loss FY 2022-23.pdf uploaded successfully" },
  { id: 2, timestamp: "2024-05-12 10:42:20", user: "System AI", action: "AI Analysis Started", caseId: "GEM/2024/B/19102", details: "OCR & Clause extraction pipeline initiated" },
  { id: 3, timestamp: "2024-05-12 10:42:38", user: "System AI", action: "AI Analysis Completed", caseId: "GEM/2024/B/19102", details: "7 clauses analyzed. 1 High Risk discrepancy identified." },
  { id: 4, timestamp: "2024-05-12 10:42:40", user: "System AI", action: "Finding Generated", caseId: "GEM/2024/B/19102", details: "Clause 3.2.1 Annual Turnover shortfall ₹1.47 Cr (29.4% below requirement)" },
  { id: 5, timestamp: "2024-05-12 10:45:02", user: "Arjun Singh (Officer)", action: "Officer Opened Evidence", caseId: "GEM/2024/B/19102", details: "Inspected Page 14 of Statement of Profit & Loss FY 2022-23" }
];

export const fetchVerification = async (id = "GEM/2024/B/19102") => {
  try {
    const url = `${API_BASE}/verifications/details?id=${encodeURIComponent(id)}`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      data._isLiveApi = true;
      return data;
    }
  } catch (err) {
    console.warn("Backend unavailable, using fallback verification data:", err.message);
  }
  const fallback = { ...MOCK_VERIFICATION };
  fallback._isDemoMode = true;
  return fallback;
};

export const fetchVerificationQueue = async () => {
  try {
    const res = await fetch(`${API_BASE}/verifications`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("Backend unavailable, using fallback queue data:", err.message);
  }
  return MOCK_QUEUE;
};

export const fetchAuditTrail = async (caseId = "GEM/2024/B/19102") => {
  try {
    const res = await fetch(`${API_BASE}/verifications/audit?id=${encodeURIComponent(caseId)}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("Backend unavailable, using fallback audit data:", err.message);
  }
  return MOCK_AUDIT_TRAIL;
};

export const saveOfficerDecision = async (caseId, clauseId, decision, remarks) => {
  try {
    const res = await fetch(`${API_BASE}/verifications/decision?id=${encodeURIComponent(caseId)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ clauseId, decision, remarks })
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn("Backend decision save offline, using fallback UI update:", err.message);
  }
  return { success: true, caseId, clauseId, decision, remarks, timestamp: new Date().toISOString() };
};

export const generateDisqualificationMemo = async (caseId) => {
  try {
    const res = await fetch(`${API_BASE}/verifications/memo?id=${encodeURIComponent(caseId)}`, {
      method: 'POST'
    });
    if (res.ok) {
      const blob = await res.blob();
      return { success: true, url: URL.createObjectURL(blob), isLiveApi: true };
    }
  } catch (err) {
    console.warn("Backend memo generation offline, returning mock blob:", err.message);
  }
  const mockContent = `%PDF-1.4 Mock Government Procurement Verification Memo for Case ${caseId}`;
  const blob = new Blob([mockContent], { type: 'application/pdf' });
  return { success: true, url: URL.createObjectURL(blob), isMock: true };
};

export const uploadDocument = async (caseId, file) => {
  const formData = new FormData();
  formData.append('file', file);
  try {
    const res = await fetch(`${API_BASE}/verifications/documents?id=${encodeURIComponent(caseId)}`, {
      method: 'POST',
      body: formData
    });
    if (res.ok) {
      const data = await res.json();
      data._isLiveApi = true;
      return data;
    }
  } catch (err) {
    console.warn("Backend upload offline, simulating mock upload:", err.message);
  }
  return {
    documentId: "doc-" + Date.now(),
    fileName: file.name,
    status: "Uploaded (Demo Mode)",
    _isDemoMode: true
  };
};
