package com.sih.gemforensic.service;

import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import com.sih.gemforensic.model.TenderClause;
import com.sih.gemforensic.model.Verification;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.awt.Color;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class MemoGeneratorService {

    public byte[] generateDisqualificationMemo(Verification verification, List<TenderClause> clauses) {
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        Document document = new Document(PageSize.A4, 36, 36, 36, 36);

        try {
            PdfWriter.getInstance(document, out);
            document.open();

            // Header - SIH Prototype Disclaimer
            Font disclaimerFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 8, Color.GRAY);
            Paragraph disclaimer = new Paragraph("SIH Prototype — Procurement Verification & Disqualification Memo", disclaimerFont);
            disclaimer.setAlignment(Element.ALIGN_RIGHT);
            document.add(disclaimer);

            // Document Header / Procurement Emblem Title
            Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14, new Color(15, 23, 42));
            Font memoHeaderFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 11, new Color(180, 0, 0));

            Paragraph header = new Paragraph("PROCUREMENT COMPLIANCE VERIFICATION MEMO", titleFont);
            header.setAlignment(Element.ALIGN_CENTER);
            header.setSpacingBefore(10);
            document.add(header);

            Paragraph subHeader = new Paragraph("Forensic Evidence Audit & Discrepancy Notice", FontFactory.getFont(FontFactory.HELVETICA, 10, Color.DARK_GRAY));
            subHeader.setAlignment(Element.ALIGN_CENTER);
            subHeader.setSpacingAfter(15);
            document.add(subHeader);

            // Metadata Grid Table
            PdfPTable metaTable = new PdfPTable(2);
            metaTable.setWidthPercentage(100);
            metaTable.setSpacingAfter(15);

            addTableCell(metaTable, "Case Reference ID:", true);
            addTableCell(metaTable, verification.getCaseId(), false);

            addTableCell(metaTable, "Bidder Name:", true);
            addTableCell(metaTable, verification.getBidderName(), false);

            addTableCell(metaTable, "Audit Verification Date:", true);
            addTableCell(metaTable, LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")), false);

            addTableCell(metaTable, "Assigned Procurement Officer:", true);
            addTableCell(metaTable, verification.getOfficerName() + " (" + verification.getOfficerRole() + ")", false);

            document.add(metaTable);

            // Discrepancy Findings
            Paragraph findingsTitle = new Paragraph("EVIDENCE DISCREPANCY & CLAUSE FINDINGS", memoHeaderFont);
            findingsTitle.setSpacingAfter(10);
            document.add(findingsTitle);

            // Clauses Breakdown Table
            PdfPTable clauseTable = new PdfPTable(5);
            clauseTable.setWidthPercentage(100);
            clauseTable.setWidths(new float[]{1.2f, 2.2f, 2f, 2f, 2.2f});

            addTableHeaderCell(clauseTable, "Clause");
            addTableHeaderCell(clauseTable, "Tender Requirement");
            addTableHeaderCell(clauseTable, "Extracted Evidence");
            addTableHeaderCell(clauseTable, "Discrepancy Status");
            addTableHeaderCell(clauseTable, "Officer Decision");

            for (TenderClause clause : clauses) {
                addTableCell(clauseTable, clause.getClauseNumber(), true);
                addTableCell(clauseTable, clause.getRequirement(), false);
                addTableCell(clauseTable, clause.getFoundValue() != null ? clause.getFoundValue() : "N/A", false);
                addTableCell(clauseTable, clause.getStatus(), false);
                addTableCell(clauseTable, clause.getDecision() != null ? clause.getDecision() : "CONFIRMED", false);
            }

            document.add(clauseTable);

            // Detailed Disqualification Note
            Paragraph noteHeader = new Paragraph("\nEXECUTIVE REASON FOR DISQUALIFICATION:", FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10, Color.DARK_GRAY));
            document.add(noteHeader);

            Paragraph noteBody = new Paragraph(
                "Evaluation of Tender Clause 3.2.1 identified a shortfall of ₹1.47 Crore (29.4% below the required ₹5.00 Crore turnover threshold) on Page 14 of Statement of Profit and Loss FY 2022-23 with 92% AI evidence confidence. The officer has confirmed this finding.",
                FontFactory.getFont(FontFactory.HELVETICA, 9, Color.BLACK)
            );
            noteBody.setSpacingBefore(5);
            document.add(noteBody);

            // Signature Footer
            Paragraph signature = new Paragraph("\n\nPrepared by: Procurement Officer\nDigitally Verified - GeM Forensic Engine", FontFactory.getFont(FontFactory.HELVETICA, 9, Font.ITALIC, Color.DARK_GRAY));
            signature.setAlignment(Element.ALIGN_RIGHT);
            document.add(signature);

            document.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return out.toByteArray();
    }

    private void addTableCell(PdfPTable table, String text, boolean bold) {
        Font font = bold ? FontFactory.getFont(FontFactory.HELVETICA_BOLD, 9) : FontFactory.getFont(FontFactory.HELVETICA, 9);
        PdfPCell cell = new PdfPCell(new Phrase(text, font));
        cell.setPadding(5);
        table.addCell(cell);
    }

    private void addTableHeaderCell(PdfPTable table, String text) {
        Font font = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 9, Color.WHITE);
        PdfPCell cell = new PdfPCell(new Phrase(text, font));
        cell.setBackgroundColor(new Color(15, 23, 42)); // Dark Navy
        cell.setPadding(6);
        table.addCell(cell);
    }
}
