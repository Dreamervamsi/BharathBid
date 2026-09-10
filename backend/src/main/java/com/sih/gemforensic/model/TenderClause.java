package com.sih.gemforensic.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tender_clauses")
public class TenderClause {

    @Id
    private String id; // e.g. 3.2.1

    private String verificationId;
    private String clauseNumber;
    private String title;
    private String category;
    private String requirement;
    private String status; // ISSUE, PASSED, REVIEW

    private String requiredValue;
    private String foundValue;
    private String variance;
    private String percentageBelow;

    private String documentName;
    private String documentCode;
    private String documentFileName;
    private Integer pageNumber;
    private Integer totalPages;
    private Integer confidenceScore;

    @Column(length = 1000)
    private String extractedText;

    private String riskLevel;
    private String issueTitle;

    @Column(length = 2000)
    private String whyItMatters;

    private String decision; // CONFIRM, OVERRIDE, CLARIFICATION
    
    @Column(length = 1000)
    private String remarks;

    public TenderClause() {}

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getVerificationId() { return verificationId; }
    public void setVerificationId(String verificationId) { this.verificationId = verificationId; }

    public String getClauseNumber() { return clauseNumber; }
    public void setClauseNumber(String clauseNumber) { this.clauseNumber = clauseNumber; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getRequirement() { return requirement; }
    public void setRequirement(String requirement) { this.requirement = requirement; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getRequiredValue() { return requiredValue; }
    public void setRequiredValue(String requiredValue) { this.requiredValue = requiredValue; }

    public String getFoundValue() { return foundValue; }
    public void setFoundValue(String foundValue) { this.foundValue = foundValue; }

    public String getVariance() { return variance; }
    public void setVariance(String variance) { this.variance = variance; }

    public String getPercentageBelow() { return percentageBelow; }
    public void setPercentageBelow(String percentageBelow) { this.percentageBelow = percentageBelow; }

    public String getDocumentName() { return documentName; }
    public void setDocumentName(String documentName) { this.documentName = documentName; }

    public String getDocumentCode() { return documentCode; }
    public void setDocumentCode(String documentCode) { this.documentCode = documentCode; }

    public String getDocumentFileName() { return documentFileName; }
    public void setDocumentFileName(String documentFileName) { this.documentFileName = documentFileName; }

    public Integer getPageNumber() { return pageNumber; }
    public void setPageNumber(Integer pageNumber) { this.pageNumber = pageNumber; }

    public Integer getTotalPages() { return totalPages; }
    public void setTotalPages(Integer totalPages) { this.totalPages = totalPages; }

    public Integer getConfidenceScore() { return confidenceScore; }
    public void setConfidenceScore(Integer confidenceScore) { this.confidenceScore = confidenceScore; }

    public String getExtractedText() { return extractedText; }
    public void setExtractedText(String extractedText) { this.extractedText = extractedText; }

    public String getRiskLevel() { return riskLevel; }
    public void setRiskLevel(String riskLevel) { this.riskLevel = riskLevel; }

    public String getIssueTitle() { return issueTitle; }
    public void setIssueTitle(String issueTitle) { this.issueTitle = issueTitle; }

    public String getWhyItMatters() { return whyItMatters; }
    public void setWhyItMatters(String whyItMatters) { this.whyItMatters = whyItMatters; }

    public String getDecision() { return decision; }
    public void setDecision(String decision) { this.decision = decision; }

    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }
}
