package com.sih.gemforensic.controller;

import com.sih.gemforensic.dto.DecisionRequestDTO;
import com.sih.gemforensic.model.AuditLog;
import com.sih.gemforensic.model.TenderClause;
import com.sih.gemforensic.model.Verification;
import com.sih.gemforensic.service.VerificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class VerificationController {

    @Autowired
    private VerificationService verificationService;

    private String decodeId(String id) {
        if (id == null) return "";
        try {
            return URLDecoder.decode(id, StandardCharsets.UTF_8.name());
        } catch (Exception e) {
            return id;
        }
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        Map<String, String> res = new HashMap<>();
        res.put("status", "UP");
        res.put("service", "GeM Forensic Verification API");
        return ResponseEntity.ok(res);
    }

    @GetMapping("/verifications")
    public ResponseEntity<List<Verification>> getAllVerifications() {
        return ResponseEntity.ok(verificationService.getAllVerifications());
    }

    @GetMapping("/verifications/details")
    public ResponseEntity<Map<String, Object>> getVerificationByParam(@RequestParam("id") String id) {
        String decodedId = decodeId(id);
        Verification verification = verificationService.getVerificationById(decodedId)
                .orElseThrow(() -> new RuntimeException("Verification not found: " + decodedId));
        List<TenderClause> clauses = verificationService.getClausesByVerification(decodedId);

        Map<String, Object> response = new HashMap<>();
        response.put("id", verification.getId());
        response.put("caseId", verification.getCaseId());
        response.put("bidderName", verification.getBidderName());
        response.put("status", verification.getStatus());
        response.put("statusLabel", verification.getStatusLabel());
        response.put("overallCompliance", verification.getOverallCompliance());
        response.put("passedCount", verification.getPassedCount());
        response.put("issuesCount", verification.getIssuesCount());
        response.put("reviewCount", verification.getReviewCount());
        response.put("currentStage", verification.getCurrentStage());
        response.put("officerName", verification.getOfficerName());
        response.put("officerRole", verification.getOfficerRole());
        response.put("clauses", clauses);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/verifications/clauses")
    public ResponseEntity<List<TenderClause>> getClauses(@RequestParam("id") String id) {
        return ResponseEntity.ok(verificationService.getClausesByVerification(decodeId(id)));
    }

    @GetMapping("/verifications/evidence")
    public ResponseEntity<List<Map<String, Object>>> getEvidence(@RequestParam("id") String id) {
        return ResponseEntity.ok(verificationService.getEvidenceList(decodeId(id)));
    }

    @GetMapping("/verifications/findings")
    public ResponseEntity<List<Map<String, Object>>> getFindings(@RequestParam("id") String id) {
        return ResponseEntity.ok(verificationService.getFindingsList(decodeId(id)));
    }

    @GetMapping("/verifications/audit")
    public ResponseEntity<List<AuditLog>> getAuditLogs(@RequestParam("id") String id) {
        return ResponseEntity.ok(verificationService.getAuditLogs(decodeId(id)));
    }

    @PostMapping("/verifications/analyze")
    public ResponseEntity<Map<String, String>> analyzeVerification(@RequestParam("id") String id) {
        return ResponseEntity.ok(verificationService.analyzeVerification(decodeId(id)));
    }

    @PostMapping("/verifications")
    public ResponseEntity<Verification> createVerification(@RequestBody Map<String, String> body) {
        String caseId = body.getOrDefault("caseId", "GEM/2024/B/" + (10000 + (int)(Math.random()*90000)));
        String bidder = body.getOrDefault("bidderName", "New Vendor Pvt Ltd");
        return ResponseEntity.ok(verificationService.createVerification(caseId, bidder));
    }

    @PostMapping("/verifications/decision")
    public ResponseEntity<TenderClause> saveDecision(@RequestParam("id") String id, @RequestBody DecisionRequestDTO dto) {
        return ResponseEntity.ok(verificationService.saveDecision(decodeId(id), dto));
    }

    @PostMapping("/verifications/memo")
    public ResponseEntity<byte[]> generateMemo(@RequestParam("id") String id) {
        String decodedId = decodeId(id);
        byte[] pdf = verificationService.generateMemo(decodedId);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=Disqualification_Memo_" + decodedId.replace("/", "_") + ".pdf")
                .contentType(MediaType.APPLICATION_PDF)
                .body(pdf);
    }

    @PostMapping("/verifications/documents")
    public ResponseEntity<Map<String, String>> uploadDocument(
            @RequestParam("id") String id,
            @RequestParam("file") MultipartFile file) {
        Map<String, String> res = new HashMap<>();
        res.put("documentId", "doc-" + System.currentTimeMillis());
        res.put("fileName", file.getOriginalFilename());
        res.put("status", "Uploaded and Queued for OCR Analysis");
        return ResponseEntity.ok(res);
    }
}
