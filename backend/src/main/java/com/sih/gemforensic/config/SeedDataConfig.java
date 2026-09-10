package com.sih.gemforensic.config;

import com.sih.gemforensic.model.*;
import com.sih.gemforensic.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SeedDataConfig {

    @Bean
    CommandLineRunner initDatabase(
            VerificationRepository verificationRepository,
            TenderClauseRepository clauseRepository,
            DocumentRepository documentRepository,
            EvidenceRepository evidenceRepository,
            AuditLogRepository auditLogRepository,
            UserRepository userRepository) {
        return args -> {
            // Seed Default Officer User if empty
            if (userRepository.count() == 0) {
                User defaultOfficer = new User(
                    "arjun.singh@gov.in",
                    "admin123",
                    "Arjun Singh",
                    "Procurement Officer",
                    "Ministry of Finance",
                    "GEM/OFF/1910"
                );
                userRepository.save(defaultOfficer);
            }

            if (verificationRepository.count() == 0) {
                // Cases
                Verification v1 = new Verification("GEM/2024/B/19102", "ABC Infra Private Limited", 68);
                Verification v2 = new Verification("GEM/2024/B/18992", "TechGov Solutions Ltd", 94);
                Verification v3 = new Verification("GEM/2024/B/18840", "Bharat Solar Power Corp", 45);
                Verification v4 = new Verification("GEM/2024/B/18711", "National Logistics Hubs Inc", 82);
                Verification v5 = new Verification("GEM/2024/B/18650", "Hindustan Defense Systems Pvt Ltd", 91);
                Verification v6 = new Verification("GEM/2024/B/18520", "Kaveri Water Networks Corp", 58);
                Verification v7 = new Verification("GEM/2024/B/18410", "Apex Medical Devices India", 76);
                Verification v8 = new Verification("GEM/2024/B/18305", "GreenGrid Energy Pvt Ltd", 38);

                verificationRepository.save(v1);
                verificationRepository.save(v2);
                verificationRepository.save(v3);
                verificationRepository.save(v4);
                verificationRepository.save(v5);
                verificationRepository.save(v6);
                verificationRepository.save(v7);
                verificationRepository.save(v8);

                // Documents for GEM/2024/B/19102
                Document d1 = new Document("doc-1", "GEM/2024/B/19102", "Statement of Profit & Loss FY 2022-23.pdf", "FINANCIAL", "/uploads/Statement_P&L_2023.pdf", 48);
                Document d2 = new Document("doc-2", "GEM/2024/B/19102", "Audited_Balance_Sheet_2023.pdf", "FINANCIAL", "/uploads/Balance_Sheet_2023.pdf", 32);
                Document d3 = new Document("doc-3", "GEM/2024/B/19102", "GST_Registration.pdf", "GST", "/uploads/GST_Registration.pdf", 2);
                documentRepository.save(d1);
                documentRepository.save(d2);
                documentRepository.save(d3);

                // Clause 3.2.1
                TenderClause c1 = new TenderClause();
                c1.setId("3.2.1");
                c1.setVerificationId("GEM/2024/B/19102");
                c1.setClauseNumber("3.2.1");
                c1.setTitle("Average Annual Turnover");
                c1.setCategory("Eligibility & Financial");
                c1.setRequirement("Min. ₹ 5.00 Crore");
                c1.setStatus("ISSUE");
                c1.setRequiredValue("₹ 5.00 Crore");
                c1.setFoundValue("₹ 3.53 Crore");
                c1.setVariance("₹ 1.47 Crore (29.4% below requirement)");
                c1.setPercentageBelow("29.4%");
                c1.setDocumentName("Statement of Profit and Loss FY 2022-23");
                c1.setDocumentCode("P&L FY 2022-23");
                c1.setDocumentFileName("Statement of Profit & Loss FY 2022-23.pdf");
                c1.setPageNumber(14);
                c1.setTotalPages(48);
                c1.setConfidenceScore(92);
                c1.setExtractedText("Revenue from Operations ₹ 3,53,00,000");
                c1.setRiskLevel("HIGH RISK");
                c1.setIssueTitle("TURNOVER BELOW REQUIRED");
                c1.setWhyItMatters("Tender Clause 3.2.1 requires minimum average annual turnover of ₹5.00 Cr for the last 3 financial years. The vendor has declared ₹3.53 Cr in FY 2022-23.");
                clauseRepository.save(c1);

                // Clause 3.2.2
                TenderClause c2 = new TenderClause();
                c2.setId("3.2.2");
                c2.setVerificationId("GEM/2024/B/19102");
                c2.setClauseNumber("3.2.2");
                c2.setTitle("Net Worth");
                c2.setCategory("Eligibility & Financial");
                c2.setRequirement("Positive Net Worth");
                c2.setStatus("PASSED");
                c2.setRequiredValue("Positive (> ₹ 0)");
                c2.setFoundValue("₹ 12.40 Crore");
                c2.setVariance("Compliant (+₹ 12.40 Cr)");
                c2.setDocumentName("Audited Balance Sheet FY 2022-23");
                c2.setDocumentCode("BS FY 2022-23");
                c2.setDocumentFileName("Audited_Balance_Sheet_2023.pdf");
                c2.setPageNumber(8);
                c2.setTotalPages(32);
                c2.setConfidenceScore(98);
                c2.setExtractedText("Shareholders Equity & Capital reserves: ₹ 12,40,00,000");
                c2.setRiskLevel("LOW RISK");
                c2.setIssueTitle("NET WORTH COMPLIANT");
                c2.setWhyItMatters("Vendor maintains a healthy positive net worth of ₹ 12.40 Crore satisfying clause 3.2.2.");
                clauseRepository.save(c2);

                // Evidence 3.2.1
                Evidence e1 = new Evidence();
                e1.setClauseId("3.2.1");
                e1.setDocumentId("doc-1");
                e1.setPageNumber(14);
                e1.setField("annual_turnover");
                e1.setExtractedValue(3.53);
                e1.setRequiredValue(5.00);
                e1.setUnit("CRORE");
                e1.setConfidenceScore(92);
                e1.setSourceText("Revenue from Operations ₹ 3,53,00,000");
                e1.setBboxJson("[120, 340, 1020, 380]");
                e1.setStatus("ISSUE");
                evidenceRepository.save(e1);

                // Audit Logs
                auditLogRepository.save(new AuditLog("GEM/2024/B/19102", "System AI", "Document Uploaded", "Statement of Profit & Loss FY 2022-23.pdf uploaded"));
                auditLogRepository.save(new AuditLog("GEM/2024/B/19102", "System AI", "PaddleOCR Completed", "Page 14 OCR text and bounding box extracted with 92% confidence"));
                auditLogRepository.save(new AuditLog("GEM/2024/B/19102", "System AI", "Rule Engine Evaluation", "Turnover comparison failed: 3.53 Cr < 5.00 Cr (Shortfall 29.4%)"));
            }
        };
    }
}
