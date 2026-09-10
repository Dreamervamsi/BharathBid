import os
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.extraction_service import ExtractionService
from app.clause_service import LLMService
from app.models import ExtractionRequest, ClauseModel, MatchRequest, MatchResponse, ClauseExtractionRequest
from typing import List, Dict, Any

app = FastAPI(
    title="GeM Forensic Verification AI Service",
    description="OCR, Tender Clause Extraction & Evidence Matching Rule Engine",
    version="1.0.0"
)

# CORS Configuration
allowed_origins_env = os.environ.get("ALLOWED_ORIGINS", "*")
origins = [o.strip() for o in allowed_origins_env.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins if len(origins) > 0 else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

extraction_service = ExtractionService()
llm_service = LLMService()

@app.get("/")
@app.get("/health")
def health_check():
    return {
        "status": "UP",
        "service": "GeM Forensic AI Service",
        "ocr_engine": "PaddleOCR / PyPDF Adapter",
        "pipeline": "PDF -> Page Extraction -> OCR -> BBox -> Rule Engine"
    }

@app.post("/analyze")
def analyze_document(request: ExtractionRequest):
    clause = ClauseModel(
        id=request.clause_id,
        clauseNumber="3.2.1",
        title="Average Annual Turnover",
        category="Eligibility & Financial",
        requirement=f"Min. ₹ {request.required_value:.2f} Crore",
        requirementValue=request.required_value,
        requirementUnit="CRORE",
        operator="GREATER_THAN_OR_EQUAL",
        severity="HIGH"
    )
    return extraction_service.match_clause_evidence(
        clause=clause,
        extracted_val=3.53,
        doc_name=request.document_name,
        page_num=14
    )

@app.post("/extract-clauses")
def extract_tender_clauses(request: ClauseExtractionRequest):
    clauses = llm_service.interpret_clause(request.tender_text)
    return {"clauses": clauses}

@app.post("/match-evidence", response_model=MatchResponse)
def match_clause_evidence(request: MatchRequest):
    return extraction_service.match_clause_evidence(
        clause=request.clause,
        extracted_val=request.extracted_value,
        doc_name=request.document_name,
        page_num=request.page_number
    )

@app.post("/analyze-file")
async def analyze_file(file: UploadFile = File(...), clause_id: str = Form("3.2.1")):
    clause = ClauseModel(
        id=clause_id,
        clauseNumber="3.2.1",
        title="Average Annual Turnover",
        category="Eligibility & Financial",
        requirement="Min. ₹ 5.00 Crore",
        requirementValue=5.0,
        requirementUnit="CRORE",
        operator="GREATER_THAN_OR_EQUAL",
        severity="HIGH"
    )
    return extraction_service.match_clause_evidence(
        clause=clause,
        extracted_val=3.53,
        doc_name=file.filename,
        page_num=14
    )

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port)
