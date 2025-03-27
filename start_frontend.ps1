Write-Host "Starting QuickRecap Frontend Only..." -ForegroundColor Cyan
if (-not (Test-Path "frontend")) {
    Write-Host "ERROR: frontend directory not found!" -ForegroundColor Red
    Write-Host "Make sure you're running this script from the project root directory." -ForegroundColor Yellow
    exit
}
if (-not (Test-Path "frontend/.env")) {
    Write-Host "Creating frontend/.env file..." -ForegroundColor Yellow
    "REACT_APP_API_URL=http://localhost:5000/api" | Out-File -FilePath "frontend/.env" -Encoding utf8
    Write-Host "Created frontend/.env file." -ForegroundColor Green
}
Set-Location -Path "frontend"
Write-Host "Starting Frontend Development Server..." -ForegroundColor Green
Write-Host "The app will be available at http://localhost:3000" -ForegroundColor Green
Write-Host "Make sure your backend is running at http://localhost:5000" -ForegroundColor Yellow
npm start 