# Start development servers for Innovathon
# Run this script: .\start-dev.ps1

Write-Host "Starting Innovathon development servers..." -ForegroundColor Cyan

# Start server in new window
Write-Host "Starting server on port 5000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\server'; npm run dev"

# Wait a bit for server to start
Start-Sleep -Seconds 3

# Start client in new window  
Write-Host "Starting client on port 5173..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\client'; npm run dev"

Write-Host "`nServers starting in new windows..." -ForegroundColor Yellow
Write-Host "Server: http://localhost:5000" -ForegroundColor Cyan
Write-Host "Client: http://localhost:5173" -ForegroundColor Cyan
Write-Host "`nTest health endpoint: http://localhost:5000/health" -ForegroundColor Yellow
