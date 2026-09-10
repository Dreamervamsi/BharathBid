package com.sih.gemforensic.repository;

import com.sih.gemforensic.model.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
    List<AuditLog> findByVerificationIdOrderByTimestampDesc(String verificationId);
}
