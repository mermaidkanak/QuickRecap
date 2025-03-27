@echo off
echo Starting QuickRecap Application...

echo Starting Frontend...
start cmd /k "cd frontend && npm start"

echo Starting Backend...
start cmd /k "cd backend && python run.py"

echo QuickRecap is starting! Frontend will be available at http://localhost:3000 