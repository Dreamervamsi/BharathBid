package com.sih.gemforensic.repository;

import com.sih.gemforensic.model.Verification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VerificationRepository extends JpaRepository<Verification, String> {
}
