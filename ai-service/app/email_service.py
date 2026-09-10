import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
from typing import Optional, Dict, Any

class EmailService:
    @staticmethod
    def send_smtp_report(
        recipient: str,
        case_id: str = "GEM/2024/9/19102",
        bidder_name: str = "ABC Infra Private Limited",
        compliance_score: int = 68,
        passed_count: int = 12,
        issues_count: int = 4,
        review_count: int = 3,
        pdf_bytes: Optional[bytes] = None,
        pdf_filename: Optional[str] = "GeM_Disqualification_Memo.pdf"
    ) -> Dict[str, Any]:
        
        smtp_host = os.environ.get("SMTP_HOST", "smtp.gmail.com")
        smtp_port = int(os.environ.get("SMTP_PORT", 587))
        smtp_user = os.environ.get("SMTP_USER", "").strip()
        smtp_password = os.environ.get("SMTP_PASSWORD", "").strip()

        if not smtp_user or not smtp_password:
            raise ValueError("SMTP_USER and SMTP_PASSWORD environment variables are required.")

        subject = f"GeM Bid Compliance Verification Report — {bidder_name}"
        
        body_text = f"""Government of India
Ministry of Finance

GeM Bid Compliance Verification

Bidder:
{bidder_name}

Case ID:
{case_id}

Verification Status:
Completed

Overall Compliance:
{compliance_score}%

Passed:
{passed_count}

Issues:
{issues_count}

Review Required:
{review_count}

Key Findings:

🔴 HIGH RISK
Turnover Below Required
Required: ₹5.00 Crore
Found: ₹35.30 Lakh

🟠 REVIEW
Missing CA Certificate

🟢 VERIFIED
GST Registration

Recommendation:
Bid requires procurement officer review before final qualification.

This system provides verification support. Final procurement decision remains with the authorized procurement officer.
"""

        msg = MIMEMultipart()
        msg['From'] = f"GeM Verification Portal <{smtp_user}>"
        msg['To'] = recipient
        msg['Subject'] = subject

        msg.attach(MIMEText(body_text, 'plain', 'utf-8'))

        if pdf_bytes:
            part = MIMEApplication(pdf_bytes, Name=pdf_filename)
            part['Content-Disposition'] = f'attachment; filename="{pdf_filename}"'
            msg.attach(part)

        # Connect to Gmail SMTP
        with smtplib.SMTP(smtp_host, smtp_port) as server:
            server.ehlo()
            server.starttls()
            server.ehlo()
            server.login(smtp_user, smtp_password)
            server.sendmail(smtp_user, recipient, msg.as_string())

        return {
            "success": True,
            "message": f"Verification report sent successfully to {recipient}",
            "recipient": recipient
        }
