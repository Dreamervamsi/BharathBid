package com.sih.gemforensic.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "verifications")
public class Verification {

    @Id
    private String id; // e.g. GEM/2024/B/19102

    private String caseId;
    private String bidderName;
    private String status;
    private String statusLabel;
    private Integer overallCompliance;
    private Integer passedCount;
    private Integer issuesCount;
    private Integer reviewCount;
    private Integer currentStage;
    private String officerName;
    private String officerRole;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Verification() {}

    public Verification(String id, String bidderName, Integer overallCompliance) {
        this.id = id;
        this.caseId = id;
        this.bidderName = bidderName;
        this.status = "IN_PROGRESS";
        this.statusLabel = "Verification in Progress";
        this.overallCompliance = overallCompliance;
        this.passedCount = 12;
        this.issuesCount = 4;
        this.reviewCount = 3;
        this.currentStage = 3;
        this.officerName = "Arjun Singh";
        this.officerRole = "Procurement Officer";
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getCaseId() { return caseId; }
    public void setCaseId(String caseId) { this.caseId = caseId; }

    public String getBidderName() { return bidderName; }
    public void setBidderName(String bidderName) { this.bidderName = bidderName; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getStatusLabel() { return statusLabel; }
    public void setStatusLabel(String statusLabel) { this.statusLabel = statusLabel; }

    public Integer getOverallCompliance() { return overallCompliance; }
    public void setOverallCompliance(Integer overallCompliance) { this.overallCompliance = overallCompliance; }

    public Integer getPassedCount() { return passedCount; }
    public void setPassedCount(Integer passedCount) { this.passedCount = passedCount; }

    public Integer getIssuesCount() { return issuesCount; }
    public void setIssuesCount(Integer issuesCount) { this.issuesCount = issuesCount; }

    public Integer getReviewCount() { return reviewCount; }
    public void setReviewCount(Integer reviewCount) { this.reviewCount = reviewCount; }

    public Integer getCurrentStage() { return currentStage; }
    public void setCurrentStage(Integer currentStage) { this.currentStage = currentStage; }

    public String getOfficerName() { return officerName; }
    public void setOfficerName(String officerName) { this.officerName = officerName; }

    public String getOfficerRole() { return officerRole; }
    public void setOfficerRole(String officerRole) { this.officerRole = officerRole; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
