# GeM Forensic Verification - SIH 26100 Production Deployment Guide

## Overview
**GeM Forensic Verification** is an evidence-based procurement compliance verification platform created for Smart India Hackathon (SIH 26100). It assists government procurement officers in evaluating bidder submissions against tender clauses with AI-assisted evidence extraction and human-in-the-loop decision-making.

---

## High-Level Architecture & Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, PDF.js (`frontend/`) -> **Deployed to Vercel**
- **Backend**: Java 17/21, Spring Boot 3.2.3, Spring Data JPA, OpenPDF (`backend/`) -> **Deployed to Render Web Service**
- **AI Service**: Python FastAPI, PaddleOCR, PyPDF extraction & rule engine (`ai-service/`) -> **Deployed to Render Web Service**
- **Database**: PostgreSQL -> **Render Managed PostgreSQL**

---

## Production Deployment Instructions

### 1. Frontend (Vercel)
1. Import the `frontend/` directory into Vercel.
2. Framework Preset: **Vite**.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.
5. Environment Variables:
   - `VITE_API_URL`: `https://<your-render-backend-url>/api`

### 2. Spring Boot Backend (Render Web Service)
1. Create a new Web Service on Render pointing to the `backend/` directory.
2. Environment: **Docker** (using `backend/Dockerfile`).
3. Health Check Path: `/api/health`.
4. Environment Variables:
   - `PORT`: `8080`
   - `DB_URL`: `jdbc:postgresql://<render-postgres-host>:5432/gem_forensic`
   - `DB_USERNAME`: `postgres`
   - `DB_PASSWORD`: `<render-postgres-password>`
   - `AI_SERVICE_URL`: `https://<your-render-ai-service-url>`
   - `UPLOAD_DIR`: `/tmp/uploads`
   - `JWT_SECRET`: `<your_production_jwt_secret_key>`
   - `ALLOWED_ORIGINS`: `https://<your-vercel-app>.vercel.app,http://localhost:3000`

### 3. FastAPI AI Service (Render Web Service)
1. Create a new Web Service on Render pointing to the `ai-service/` directory.
2. Environment: **Python** (`Python 3.10+`).
3. Build Command: `pip install -r requirements.txt`.
4. Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`.
5. Health Check Path: `/health`.
6. Environment Variables:
   - `PORT`: `10000`
   - `ALLOWED_ORIGINS`: `https://<your-vercel-app>.vercel.app,https://<your-backend-url>.onrender.com`

---

## Important File Storage Notice
Uploaded bidder documents are currently stored in local file storage under `UPLOAD_DIR` (e.g. `/tmp/uploads` on Render).
- **Transient Storage Warning**: Container instances on Render use ephemeral disk storage.
- **Production Recommendation**: For permanent document storage across container restarts, connect an AWS S3 bucket, Google Cloud Storage, or attach a Render Persistent Disk volume mounted to `/uploads`.

---

## Local Development Setup

```bash
# Frontend
cd frontend && npm install && npm run dev

# Backend
cd backend && mvn spring-boot:run

# AI Service
cd ai-service && pip install -r requirements.txt && uvicorn app.main:app --host 0.0.0.0 --port 8000
```
