const API_BASE = import.meta.env.VITE_API_URL || 'https://humble-goldfish-px4jp7jrvxjc66pv-8080.app.github.dev/api';
const AI_SERVICE_BASE = import.meta.env.VITE_AI_SERVICE_URL || 'https://humble-goldfish-px4jp7jrvxjc66pv-8000.app.github.dev';

export const isLiveBackendAvailable = async () => {
  try {
    const res = await fetch(`${API_BASE}/health`, { method: 'GET' });
    return res.ok;
  } catch (e) {
    return false;
  }
};

export const dispatchSmtpEmail = async (emailData) => {
  const recipient = emailData?.email || 'kvamsi.nellore@gmail.com';
  try {
    const res = await fetch(`${AI_SERVICE_BASE}/send-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: recipient,
        case_id: emailData?.caseId || 'GEM/2024/9/19102',
        bidder_name: emailData?.bidderName || 'ABC Infra Private Limited',
        overallCompliance: emailData?.overallCompliance || 68,
        passedCount: emailData?.passedCount || 12,
        issuesCount: emailData?.issuesCount || 4,
        reviewCount: emailData?.reviewCount || 3
      })
    });
    if (res.ok) {
      const data = await res.json();
      return { success: true, message: data.message || `Verification report sent successfully to ${recipient}` };
    } else {
      const errData = await res.json();
      throw new Error(errData.detail || 'SMTP Service failed to send email');
    }
  } catch (err) {
    console.error("SMTP Error:", err);
    throw err;
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
    }
  ]
};

export const fetchVerification = async (id = "GEM/2024/B/19102") => {
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
  } catch (e) {
    console.warn("Using fallback mock data for verification queue");
  }
  return [
    {
      caseId: "GEM/2024/B/19102",
      bidderName: "ABC Infra Private Limited",
      tenderName: "Construction & Civil Works",
      tenderValue: "₹ 5.00 Cr",
      overallCompliance: 68,
      statusLabel: "Verification in Progress",
      officerName: "Arjun Singh"
    },
    {
      caseId: "GEM/2024/B/18442",
      bidderName: "TechServe Global India",
      tenderName: "IT Hardware & Server Procurement",
      tenderValue: "₹ 2.80 Cr",
      overallCompliance: 92,
      statusLabel: "Completed",
      officerName: "Priya Sharma"
    },
    {
      caseId: "GEM/2024/B/17391",
      bidderName: "Apex Logistics Ltd",
      tenderName: "Supply Chain & Fleet Services",
      tenderValue: "₹ 12.10 Cr",
      overallCompliance: 45,
      statusLabel: "Requires Senior Review",
      officerName: "Rajesh Kumar"
    }
  ];
};

export const saveOfficerDecision = async (caseId, clauseId, decision, remarks) => {
  return { success: true, caseId, clauseId, decision, remarks, timestamp: new Date().toISOString() };
};

export const generateDisqualificationMemo = async (caseId) => {
  const mockContent = `%PDF-1.4 Mock Government Procurement Verification Memo for Case ${caseId}`;
  const blob = new Blob([mockContent], { type: 'application/pdf' });
  return { success: true, url: URL.createObjectURL(blob), isMock: true };
};

export const fetchAuditTrail = async (caseId = "GEM/2024/B/19102") => {
  try {
    const res = await fetch(`${API_BASE}/audit-logs/${caseId}`);
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn("Using fallback mock data for audit logs");
  }
  return [
    {
      id: "LOG-9081",
      timestamp: "12 May 2024, 10:42 AM",
      user: "Arjun Singh (Procurement Officer)",
      action: "OFFICER_DECISION_SUBMITTED",
      caseId: caseId,
      details: "Confirmed turnover non-compliance clause 3.2.1. Issued clarification request to bidder."
    },
    {
      id: "LOG-9078",
      timestamp: "12 May 2024, 10:30 AM",
      user: "SYSTEM_AI_ENGINE",
      action: "AI_EXTRACTION_COMPLETED",
      caseId: caseId,
      details: "Extracted turnover ₹ 3.53 Cr from Statement of Profit & Loss (page 14) with 92% confidence."
    },
    {
      id: "LOG-9072",
      timestamp: "12 May 2024, 09:15 AM",
      user: "ABC Infra Pvt Ltd (Bidder)",
      action: "BIDDER_DOCUMENT_UPLOADED",
      caseId: caseId,
      details: "Uploaded financial statements package (P&L, Balance Sheet, CA Certificate)."
    }
  ];
};

export const uploadDocument = async (caseId, file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('case_id', caseId);

    const res = await fetch(`${AI_SERVICE_BASE}/analyze-file`, {
      method: 'POST',
      body: formData
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (e) {
    console.warn("AI Service /analyze-file network note:", e);
  }
  return {
    documentId: "doc-" + Date.now(),
    fileName: file.name,
    status: "Uploaded",
    _isDemoMode: true
  };
};

export const analyzeFileApi = async (file, caseId = "GEM/2024/B/19102") => {
  return uploadDocument(caseId, file);
};
