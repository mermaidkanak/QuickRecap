Write-Host "QuickRecap Debug Script" -ForegroundColor Cyan
Write-Host "======================" -ForegroundColor Cyan
Write-Host "Checking Python..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version
    Write-Host "Python detected: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Python not found. Please install Python 3.8+ and try again." -ForegroundColor Red
    exit
}
Write-Host "Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "Node.js detected: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Node.js not found. Please install Node.js and try again." -ForegroundColor Red
    exit
}
Write-Host "Checking frontend dependencies..." -ForegroundColor Yellow
if (Test-Path "frontend/node_modules") {
    Write-Host "Frontend dependencies found" -ForegroundColor Green
} else {
    Write-Host "WARNING: Frontend dependencies not found. Install them with 'cd frontend; npm install'" -ForegroundColor Yellow
}
Write-Host "Checking backend dependencies..." -ForegroundColor Yellow
if (Test-Path "backend/venv") {
    Write-Host "Backend virtual environment found" -ForegroundColor Green
} else {
    Write-Host "WARNING: Backend virtual environment not found. Create one with 'cd backend; python -m venv venv'" -ForegroundColor Yellow
}
Write-Host "Checking environment files..." -ForegroundColor Yellow
if (Test-Path "frontend/.env") {
    Write-Host "Frontend .env found" -ForegroundColor Green
    $frontendEnv = Get-Content "frontend/.env"
    Write-Host "Frontend API URL: $frontendEnv" -ForegroundColor Cyan
} else {
    Write-Host "ERROR: Frontend .env not found. Create it with 'REACT_APP_API_URL=http://localhost:5000/api'" -ForegroundColor Red
}
if (Test-Path "backend/.env") {
    Write-Host "Backend .env found" -ForegroundColor Green
} else {
    Write-Host "WARNING: Backend .env not found. Copy from .env.example" -ForegroundColor Yellow
}
Write-Host "Testing backend connectivity..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000" -Method GET -TimeoutSec 5
    Write-Host "Backend is running and accessible!" -ForegroundColor Green
    Write-Host "API response: $($response.Content)" -ForegroundColor Cyan
} catch {
    Write-Host "ERROR: Cannot connect to backend at http://localhost:5000" -ForegroundColor Red
    Write-Host "Make sure the backend is running with 'cd backend; python run.py'" -ForegroundColor Red
}
Write-Host "Debug complete. Check the messages above for any issues." -ForegroundColor Cyan
Write-Host ""
Write-Host "To start the application:" -ForegroundColor Green
Write-Host "1. Start the backend: cd backend; python run.py" -ForegroundColor Green
Write-Host "2. Start the frontend: cd frontend; npm start" -ForegroundColor Green 