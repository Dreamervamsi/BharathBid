@echo off
echo ===================================================
echo   GeM Forensic Verification Service Launcher
echo ===================================================
echo.

echo Starting Frontend (React + Vite) on http://localhost:3000...
start "GeM Frontend" cmd /k "cd frontend && npm run dev"

echo Starting Backend (Spring Boot) on http://localhost:8080...
start "GeM Backend" cmd /k "cd backend && \"..\..\Sparkle AI\backend\apache-maven-3.9.6\bin\mvn.cmd\" spring-boot:run"

echo.
echo All services launched in separate windows!
pause
