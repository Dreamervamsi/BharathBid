package com.sih.gemforensic.model;

import jakarta.persistence.*;

@Entity
@Table(name = "evidences")
public class Evidence {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String clauseId; // e.g. 3.2.1
    private String documentId;
    private Integer pageNumber;
    private String field; // annual_turnover
    private Double extractedValue; // 3.53
    private Double requiredValue; // 5.00
    private String unit; // CRORE
    private Integer confidenceScore; // 92
    private String sourceText; // Revenue from Operations ₹ 3,53,00,000

    private String bboxJson; // [120, 340, 1020, 380]
    private String status; // ISSUE, PASSED, REVIEW

    public Evidence() {}

    public Long getId() { return id; }
    public String getClauseId() { return clauseId; }
    public void setClauseId(String clauseId) { this.clauseId = clauseId; }

    public String getDocumentId() { return documentId; }
    public void setDocumentId(String documentId) { this.documentId = documentId; }

    public Integer getPageNumber() { return pageNumber; }
    public void setPageNumber(Integer pageNumber) { this.pageNumber = pageNumber; }

    public String getField() { return field; }
    public void setField(String field) { this.field = field; }

    public Double getExtractedValue() { return extractedValue; }
    public void setExtractedValue(Double extractedValue) { this.extractedValue = extractedValue; }

    public Double getRequiredValue() { return requiredValue; }
    public void setRequiredValue(Double requiredValue) { this.requiredValue = requiredValue; }

    public String getUnit() { return unit; }
    public void setUnit(String unit) { this.unit = unit; }

    public Integer getConfidenceScore() { return confidenceScore; }
    public void setConfidenceScore(Integer confidenceScore) { this.confidenceScore = confidenceScore; }

    public String getSourceText() { return sourceText; }
    public void setSourceText(String sourceText) { this.sourceText = sourceText; }

    public String getBboxJson() { return bboxJson; }
    public void setBboxJson(String bboxJson) { this.bboxJson = bboxJson; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
