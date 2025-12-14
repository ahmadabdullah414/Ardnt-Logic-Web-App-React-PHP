# Stop IIS to Free Port 80 for Laragon
# Run this script as Administrator

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Stop IIS for Laragon" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if running as admin
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "⚠ This script requires Administrator privileges!" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "To stop IIS manually:" -ForegroundColor Yellow
    Write-Host "1. Press Win + R, type: services.msc" -ForegroundColor White
    Write-Host "2. Find 'World Wide Web Publishing Service' (W3SVC)" -ForegroundColor White
    Write-Host "3. Right-click → Stop" -ForegroundColor White
    Write-Host "4. Right-click → Properties → Set Startup to 'Manual'" -ForegroundColor White
    Write-Host ""
    Write-Host "Or run PowerShell as Administrator and run:" -ForegroundColor Yellow
    Write-Host "  iisreset /stop" -ForegroundColor White
    Write-Host ""
    exit 1
}

Write-Host "Stopping IIS..." -ForegroundColor Yellow
iisreset /stop

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ IIS stopped successfully" -ForegroundColor Green
    Write-Host ""
    Write-Host "Port 80 is now free for Laragon Apache!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Open Laragon" -ForegroundColor White
    Write-Host "2. Make sure Apache is set to port 80" -ForegroundColor White
    Write-Host "3. Start Apache in Laragon" -ForegroundColor White
    Write-Host "4. Visit: http://localhost" -ForegroundColor White
} else {
    Write-Host "✗ Failed to stop IIS" -ForegroundColor Red
    Write-Host "Try stopping it manually via Services (services.msc)" -ForegroundColor Yellow
}

