package com.sih.gemforensic.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String fullName;

    private String role; // Procurement Officer, Senior Auditor, Admin
    private String department;
    private String employeeId;
    private LocalDateTime createdAt;

    public User() {
        this.createdAt = LocalDateTime.now();
    }

    public User(String email, String password, String fullName, String role, String department, String employeeId) {
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.role = role != null ? role : "Procurement Officer";
        this.department = department != null ? department : "Procurement & Audit Division";
        this.employeeId = employeeId != null ? employeeId : "GEM/OFF/" + (1000 + (int)(Math.random()*9000));
        this.createdAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getEmployeeId() { return employeeId; }
    public void setEmployeeId(String employeeId) { this.employeeId = employeeId; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
