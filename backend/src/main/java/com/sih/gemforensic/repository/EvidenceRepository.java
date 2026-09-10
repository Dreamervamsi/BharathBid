package com.sih.gemforensic.repository;

import com.sih.gemforensic.model.Evidence;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EvidenceRepository extends JpaRepository<Evidence, Long> {
    Optional<Evidence> findByClauseId(String clauseId);
}
