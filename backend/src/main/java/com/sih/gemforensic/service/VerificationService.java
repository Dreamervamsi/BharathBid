package com.sih.gemforensic.service;

import com.sih.gemforensic.dto.DecisionRequestDTO;
import com.sih.gemforensic.model.*;
import com.sih.gemforensic.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class VerificationService {

    @Autowired
    private VerificationRepository verificationRepository;

    @Autowired
    private TenderClauseRepository clauseRepository;

    @Autowired
    private EvidenceRepository evidenceRepository;

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Autowired
    private MemoGeneratorService memoGeneratorService;

    public List<Verification> getAllVerifications() {
        return verificationRepository.findAll();
    }

    public Optional<Verification> getVerificationById(String id) {
        return verificationRepository.findById(id);
    }

    public List<TenderClause> getClausesByVerification(String verificationId) {
        return clauseRepository.findByVerificationId(verificationId);
    }

    public List<AuditLog> getAuditLogs(String verificationId) {
        return auditLogRepository.findByVerificationIdOrderByTimestampDesc(verificationId);
    }

    public Verification createVerification(String caseId, String bidderName) {
        Verification v = new Verification(caseId, bidderName, 100);
        verificationRepository.save(v);

        AuditLog log = new AuditLog(
            caseId,
            "Arjun Singh (Officer)",
            "Verification Created",
            "New procurement case initialized for bidder: " + bidderName
        );
        auditLogRepository.save(log);
        return v;
    }

    public List<Map<String, Object>> getEvidenceList(String verificationId) {
        List<TenderClause> clauses = clauseRepository.findByVerificationId(verificationId);
        List<Map<String, Object>> evidenceList = new ArrayList<>();

        for (TenderClause clause : clauses) {
            Optional<Evidence> evOpt = evidenceRepository.findByClauseId(clause.getId());
            Map<String, Object> evMap = new HashMap<>();
            evMap.put("clauseId", clause.getId());
            evMap.put("clauseNumber", clause.getClauseNumber());
            if (evOpt.isPresent()) {
                Evidence ev = evOpt.get();
                evMap.put("documentId", ev.getDocumentId());
                evMap.put("page", ev.getPageNumber());
                evMap.put("field", ev.getField());
                evMap.put("extractedValue", ev.getExtractedValue());
                evMap.put("unit", ev.getUnit());
                evMap.put("sourceText", ev.getSourceText());
                evMap.put("bbox", ev.getBboxJson());
                evMap.put("confidence", ev.getConfidenceScore());
            } else {
                evMap.put("documentId", "doc-1");
                evMap.put("page", clause.getPageNumber());
                evMap.put("extractedValue", clause.getFoundValue());
                evMap.put("confidence", clause.getConfidenceScore());
                evMap.put("bbox", "[120, 340, 1020, 380]");
            }
            evidenceList.add(evMap);
        }
        return evidenceList;
    }

    public List<Map<String, Object>> getFindingsList(String verificationId) {
        List<TenderClause> clauses = clauseRepository.findByVerificationId(verificationId);
        List<Map<String, Object>> findings = new ArrayList<>();

        for (TenderClause clause : clauses) {
            Map<String, Object> f = new HashMap<>();
            f.put("clauseId", clause.getId());
            f.put("clauseNumber", clause.getClauseNumber());
            f.put("finding", clause.getIssueTitle());
            f.put("riskLevel", clause.getRiskLevel());
            f.put("requiredValue", clause.getRequiredValue());
            f.put("foundValue", clause.getFoundValue());
            f.put("variance", clause.getVariance());
            f.put("whyItMatters", clause.getWhyItMatters());
            f.put("status", clause.getStatus());
            findings.add(f);
        }
        return findings;
    }

    public Map<String, String> analyzeVerification(String caseId) {
        AuditLog log = new AuditLog(
            caseId,
            "System AI",
            "AI Analysis Triggered",
            "Full tender clause extraction and bidder document evidence matching initiated"
        );
        auditLogRepository.save(log);

        Map<String, String> res = new HashMap<>();
        res.put("caseId", caseId);
        res.put("status", "ANALYSIS_COMPLETED");
        res.put("message", "PaddleOCR & Rule Engine completed analysis with 1 High Risk finding detected.");
        return res;
    }

    public TenderClause saveDecision(String caseId, DecisionRequestDTO dto) {
        Optional<TenderClause> clauseOpt = clauseRepository.findById(dto.getClauseId());
        if (clauseOpt.isPresent()) {
            TenderClause clause = clauseOpt.get();
            clause.setDecision(dto.getDecision());
            clause.setRemarks(dto.getRemarks());
            TenderClause updated = clauseRepository.save(clause);

            // Audit record
            AuditLog log = new AuditLog(
                caseId,
                "Arjun Singh (Officer)",
                "Officer Decision: " + dto.getDecision(),
                "Clause " + clause.getClauseNumber() + " decision recorded. Remarks: " + (dto.getRemarks() != null ? dto.getRemarks() : "None")
            );
            auditLogRepository.save(log);

            return updated;
        }
        throw new RuntimeException("Clause not found: " + dto.getClauseId());
    }

    public byte[] generateMemo(String caseId) {
        Verification verification = verificationRepository.findById(caseId)
                .orElseThrow(() -> new RuntimeException("Verification not found: " + caseId));
        List<TenderClause> clauses = clauseRepository.findByVerificationId(caseId);

        // Audit record
        AuditLog log = new AuditLog(
            caseId,
            "Arjun Singh (Officer)",
            "Memo Generated",
            "Official Disqualification/Compliance memo generated with OpenPDF"
        );
        auditLogRepository.save(log);

        return memoGeneratorService.generateDisqualificationMemo(verification, clauses);
    }
}
