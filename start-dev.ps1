# ArdntLogic Development Startup Script
# This script starts both the React frontend (Vite dev server) and PHP backend

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ArdntLogic Development Server" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✓ Node.js $nodeVersion found" -ForegroundColor Green
} catch {
    Write-Host "✗ Node.js not found. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Check if PHP is installed
Write-Host "Checking PHP..." -ForegroundColor Yellow
try {
    $phpVersion = php --version | Select-Object -First 1
    Write-Host "✓ PHP found: $phpVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ PHP not found. Please install PHP or use Laragon." -ForegroundColor Red
    exit 1
}

# Check if .env file exists
if (-not (Test-Path ".env")) {
    Write-Host "⚠ .env file not found. Creating from .env.example..." -ForegroundColor Yellow
    if (Test-Path ".env.example") {
        Copy-Item ".env.example" ".env"
        Write-Host "✓ .env file created. Please edit it with your configuration." -ForegroundColor Green
    } else {
        Write-Host "✗ .env.example not found. Please create .env file manually." -ForegroundColor Red
    }
}

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing Node.js dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Failed to install Node.js dependencies" -ForegroundColor Red
        exit 1
    }
}

# Check if vendor exists (PHP dependencies)
if (-not (Test-Path "vendor")) {
    Write-Host "Installing PHP dependencies..." -ForegroundColor Yellow
    composer install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "⚠ Composer install failed. Continuing anyway..." -ForegroundColor Yellow
    }
}

# Check if frontend is built
if (-not (Test-Path "dist/public/index.html")) {
    Write-Host "Building frontend..." -ForegroundColor Yellow
    npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Failed to build frontend" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""
Write-Host "Starting servers..." -ForegroundColor Cyan
Write-Host ""

# Start PHP development server in background
Write-Host "Starting PHP backend on http://localhost:8000..." -ForegroundColor Green
$phpJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    php -S localhost:8000 server.php
}

# Start Vite dev server in background
Write-Host "Starting React frontend on http://localhost:5173..." -ForegroundColor Green
$viteJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    npm run dev
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Servers Started!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Frontend (React): http://localhost:5173" -ForegroundColor Yellow
Write-Host "Backend (PHP):    http://localhost:8000" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press Ctrl+C to stop all servers" -ForegroundColor Gray
Write-Host ""

# Wait for user interrupt
try {
    while ($true) {
        Start-Sleep -Seconds 1
    }
} finally {
    Write-Host ""
    Write-Host "Stopping servers..." -ForegroundColor Yellow
    Stop-Job $phpJob, $viteJob
    Remove-Job $phpJob, $viteJob
    Write-Host "✓ Servers stopped" -ForegroundColor Green
}

