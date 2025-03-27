Write-Host "Starting QuickRecap Backend Only..." -ForegroundColor Cyan
if (-not (Test-Path "backend")) {
    Write-Host "ERROR: backend directory not found!" -ForegroundColor Red
    Write-Host "Make sure you're running this script from the project root directory." -ForegroundColor Yellow
    exit
}
if (-not (Test-Path "backend/.env")) {
    Write-Host "Creating backend/.env file from example..." -ForegroundColor Yellow
    if (Test-Path "backend/.env.example") {
        Copy-Item "backend/.env.example" -Destination "backend/.env"
        Write-Host "Created backend/.env file from example." -ForegroundColor Green
    } else {
        @"
# API Configuration
PORT=5000
HOST=0.0.0.0
# OpenAI API Key (Optional - will use local model if not provided)
# OPENAI_API_KEY=your_openai_api_key_here
# CORS Settings
FRONTEND_URL=http://localhost:3000
# Log Level
LOG_LEVEL=INFO
"@ | Out-File -FilePath "backend/.env" -Encoding utf8
        Write-Host "Created backend/.env file." -ForegroundColor Green
    }
}
Set-Location -Path "backend"
Write-Host "Starting Backend API Server..." -ForegroundColor Green
Write-Host "The API will be available at http://localhost:5000" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
python run.py 