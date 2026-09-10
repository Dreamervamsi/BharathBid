import os
import time
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from app.extraction_service import ExtractionService
from app.clause_service import LLMService
from app.compliance_engine import ComplianceEngine
from app.email_service import EmailService
from app.models import ExtractionRequest, ClauseModel, MatchRequest, MatchResponse, ClauseExtractionRequest
from typing import List, Dict, Any, Optional

app = FastAPI(
    title="GeM Forensic Verification AI Service",
    description="OCR, Tender Clause Extraction & Evidence Matching Rule Engine",
    version="1.0.0"
)

# Load .env variables if present
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

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

VERIFICATION_SESSIONS: Dict[str, Dict[str, Any]] = {}

@app.get("/")
@app.get("/health")
def health_check():
    return {
        "status": "UP",
        "service": "GeM Forensic AI Service",
        "smtp_configured": bool(os.environ.get("SMTP_USER") and os.environ.get("SMTP_PASSWORD")),
        "ocr_engine": "PaddleOCR / PyPDF Adapter"
    }

@app.post("/send-email")
async def send_email_report(payload: Dict[str, Any] = Body(...)):
    recipient = payload.get("email", "kvamsi.nellore@gmail.com")
    case_id = payload.get("case_id", "GEM/2024/9/19102")
    bidder_name = payload.get("bidder_name", "ABC Infra Private Limited")
    
    try:
        res = EmailService.send_smtp_report(
            recipient=recipient,
            case_id=case_id,
            bidder_name=bidder_name,
            compliance_score=payload.get("overallCompliance", 68),
            passed_count=payload.get("passedCount", 12),
            issues_count=payload.get("issuesCount", 4),
            review_count=payload.get("reviewCount", 3)
        )
        return res
    except Exception as e:
        print("SMTP Dispatch error:", e)
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analyze-file")
async def analyze_file(file: UploadFile = File(...), case_id: str = Form("GEM/2024/9/19102")):
    content = await file.read()
    pages_text = []
    try:
        import pypdf
        import io
        reader = pypdf.PdfReader(io.BytesIO(content))
        pages_text = [page.extract_text() or "" for page in reader.pages]
    except Exception as e:
        print("PyPDF extraction note:", e)

    analysis_res = ComplianceEngine.analyze_pages(
        pages_text=pages_text,
        filename=file.filename or "uploaded_bid.pdf"
    )

    session_id = f"sess-{int(time.time()*1000)}"
    VERIFICATION_SESSIONS[session_id] = {
        "session_id": session_id,
        "case_id": case_id,
        "filename": file.filename,
        "file_size_kb": round(len(content)/1024, 1),
        "created_at": time.time(),
        "analysis": analysis_res
    }

    return {
        "session_id": session_id,
        "filename": file.filename,
        "file_size_kb": round(len(content)/1024, 1),
        "status": "Document Uploaded",
        "analysis": analysis_res
    }

@app.get("/verification/{session_id}")
def get_verification_session(session_id: str):
    if session_id not in VERIFICATION_SESSIONS:
        raise HTTPException(status_code=404, detail="Verification session not found")
    return VERIFICATION_SESSIONS[session_id]

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port)
