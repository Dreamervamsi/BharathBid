package com.sih.gemforensic.dto;

public class DecisionRequestDTO {
    private String clauseId;
    private String decision;
    private String remarks;

    public DecisionRequestDTO() {}

    public String getClauseId() { return clauseId; }
    public void setClauseId(String clauseId) { this.clauseId = clauseId; }

    public String getDecision() { return decision; }
    public void setDecision(String decision) { this.decision = decision; }

    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }
}
