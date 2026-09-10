package com.sih.gemforensic.repository;

import com.sih.gemforensic.model.TenderClause;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TenderClauseRepository extends JpaRepository<TenderClause, String> {
    List<TenderClause> findByVerificationId(String verificationId);
}
