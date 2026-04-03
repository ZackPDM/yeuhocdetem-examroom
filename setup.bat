@echo off
REM ExamRoom Quick Start Script for Windows

echo ExamRoom - Setup Script
echo =======================
echo.

REM Check Node.js
node --version >nul 2>&1
if errorlevel 1 (
  echo Node.js not found. Please install Node.js 18+
  exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo Node.js %NODE_VERSION% found
echo.

REM Install dependencies
echo Installing dependencies...
call npm install

REM Setup .env.local
echo.
echo Setting up environment variables...
if not exist ".env.local" (
  copy .env.local.example .env.local
  echo .env.local created
  echo WARNING: Please edit .env.local with your Supabase credentials:
  echo   - NEXT_PUBLIC_SUPABASE_URL
  echo   - NEXT_PUBLIC_SUPABASE_ANON_KEY
) else (
  echo WARNING: .env.local already exists
)

REM Done
echo.
echo Setup complete!
echo.
echo Next steps:
echo 1. Edit .env.local with Supabase credentials
echo 2. Run: npm run dev
echo 3. Open: http://localhost:3000
echo.
echo More info:
echo   - README.md
echo   - DEVELOPMENT.md
echo   - DEPLOYMENT.md
