from pydantic import BaseModel
from typing import Optional, List, Any

class ClauseModel(BaseModel):
    id: str
    clauseNumber: str
    title: str
    category: str
    requirement: str
    requirementValue: float
    requirementUnit: str
    operator: str # GREATER_THAN_OR_EQUAL, POSITIVE, EQUAL, etc.
    period: Optional[str] = "LAST_3_FINANCIAL_YEARS"
    severity: str # HIGH, MEDIUM, LOW

class BoundingBox(BaseModel):
    x: float
    y: float
    width: float
    height: float

class OCRWord(BaseModel):
    text: str
    page: int
    bbox: List[float] # [x1, y1, x2, y2]
    confidence: float

class ExtractionRequest(BaseModel):
    document_name: str
    clause_id: str
    required_value: float = 5.0

class ClauseExtractionRequest(BaseModel):
    tender_text: str

class MatchRequest(BaseModel):
    clause: ClauseModel
    extracted_value: float
    document_name: str
    page_number: int = 14

class MatchResponse(BaseModel):
    clause_id: str
    document_name: str
    page_number: int
    field: str
    extracted_value: float
    required_value: float
    variance: float
    percentage_below: float
    unit: str
    confidence: float
    status: str # ISSUE, PASSED, REVIEW
    finding: str
    risk_level: str # HIGH, MEDIUM, LOW, CRITICAL
    why_it_matters: str
    source_text: str
    bbox: List[float] # [120, 340, 1020, 380]
