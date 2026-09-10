package com.sih.gemforensic.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "documents")
public class Document {

    @Id
    private String id; // doc-1

    private String verificationId;
    private String fileName;
    private String documentType; // FINANCIAL, GST, EXPERIENCE, OEM
    private String filePath;
    private Integer pages;
    private String status; // UPLOADED, PROCESSING, COMPLETED, FAILED
    private LocalDateTime uploadedAt;

    public Document() {
        this.uploadedAt = LocalDateTime.now();
    }

    public Document(String id, String verificationId, String fileName, String documentType, String filePath, Integer pages) {
        this.id = id;
        this.verificationId = verificationId;
        this.fileName = fileName;
        this.documentType = documentType;
        this.filePath = filePath;
        this.pages = pages;
        this.status = "COMPLETED";
        this.uploadedAt = LocalDateTime.now();
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getVerificationId() { return verificationId; }
    public void setVerificationId(String verificationId) { this.verificationId = verificationId; }

    public String getFileName() { return fileName; }
    public void setFileName(String fileName) { this.fileName = fileName; }

    public String getDocumentType() { return documentType; }
    public void setDocumentType(String documentType) { this.documentType = documentType; }

    public String getFilePath() { return filePath; }
    public void setFilePath(String filePath) { this.filePath = filePath; }

    public Integer getPages() { return pages; }
    public void setPages(Integer pages) { this.pages = pages; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getUploadedAt() { return uploadedAt; }
    public void setUploadedAt(LocalDateTime uploadedAt) { this.uploadedAt = uploadedAt; }
}
