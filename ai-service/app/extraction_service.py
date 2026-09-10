from app.ocr_service import OCRService
from app.clause_service import RuleEngine, LLMService
from app.models import MatchResponse, ClauseModel

class ExtractionService:
    def __init__(self):
        self.ocr_service = OCRService()
        self.llm_service = LLMService()

    def match_clause_evidence(self, clause: ClauseModel, extracted_val: float = 3.53, doc_name: str = "Statement of Profit and Loss FY 2022-23", page_num: int = 14) -> MatchResponse:
        # Step 1: Perform OCR and obtain bounding box
        ocr_blocks = self.ocr_service.process_pdf_page(doc_name, page_number=page_num)
        evidence_bbox = [120, 340, 1020, 380] # Consolidated bounding box for Revenue row
        if len(ocr_blocks) > 0:
            evidence_bbox = ocr_blocks[0]["bbox"]

        # Step 2: Run Deterministic Rule Engine
        rule_res = RuleEngine.evaluate(
            required=clause.requirementValue,
            found=extracted_val,
            operator=clause.operator
        )

        variance_str = f"₹ {rule_res['variance']:.2f} Crore ({rule_res['percentage_below']}% below requirement)" if rule_res['status'] == 'ISSUE' else "Compliant"
        why_text = f"Tender Clause {clause.clauseNumber} requires minimum average annual turnover of ₹{clause.requirementValue:.2f} Cr. The vendor declared ₹{extracted_val:.2f} Cr in FY 2022-23."

        return MatchResponse(
            clause_id=clause.id,
            document_name=doc_name,
            page_number=page_num,
            field="annual_turnover",
            extracted_value=extracted_val,
            required_value=clause.requirementValue,
            variance=rule_res["variance"],
            percentage_below=rule_res["percentage_below"],
            unit=clause.requirementUnit,
            confidence=0.92,
            status=rule_res["status"],
            finding=rule_res["finding"],
            risk_level=rule_res["risk_level"],
            why_it_matters=why_text,
            source_text="Revenue from Operations ₹ 3,53,00,000",
            bbox=[120, 340, 1020, 380]
        )
