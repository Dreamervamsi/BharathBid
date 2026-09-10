package com.sih.gemforensic.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "audit_logs")
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String verificationId;
    @Column(name = "username")
    private String user;
    private String action;
    private String details;
    private LocalDateTime timestamp;

    public AuditLog() {
        this.timestamp = LocalDateTime.now();
    }

    public AuditLog(String verificationId, String user, String action, String details) {
        this.verificationId = verificationId;
        this.user = user;
        this.action = action;
        this.details = details;
        this.timestamp = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public String getVerificationId() { return verificationId; }
    public void setVerificationId(String verificationId) { this.verificationId = verificationId; }

    public String getUser() { return user; }
    public void setUser(String user) { this.user = user; }

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
