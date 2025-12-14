# ArdntLogic Setup Script for Windows
# This script helps set up the project for deployment

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "ArdntLogic Project Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Composer is installed
Write-Host "Checking for Composer..." -ForegroundColor Yellow
$composerInstalled = $false
try {
    $composerVersion = composer --version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Composer is installed" -ForegroundColor Green
        $composerInstalled = $true
    }
} catch {
    Write-Host "✗ Composer is not installed" -ForegroundColor Red
    Write-Host "  Please install Composer from: https://getcomposer.org/download/" -ForegroundColor Yellow
}

# Check if Node.js is installed
Write-Host "Checking for Node.js..." -ForegroundColor Yellow
$nodeInstalled = $false
try {
    $nodeVersion = node --version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Node.js is installed: $nodeVersion" -ForegroundColor Green
        $nodeInstalled = $true
    }
} catch {
    Write-Host "✗ Node.js is not installed" -ForegroundColor Red
    Write-Host "  Please install Node.js from: https://nodejs.org/" -ForegroundColor Yellow
}

Write-Host ""

# Install PHP dependencies if Composer is available
if ($composerInstalled) {
    Write-Host "Installing PHP dependencies (Composer)..." -ForegroundColor Yellow
    composer install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ PHP dependencies installed" -ForegroundColor Green
    } else {
        Write-Host "✗ Failed to install PHP dependencies" -ForegroundColor Red
    }
    Write-Host ""
} else {
    Write-Host "⚠ Skipping PHP dependencies (Composer not installed)" -ForegroundColor Yellow
    Write-Host ""
}

# Install Node dependencies if Node.js is available
if ($nodeInstalled) {
    Write-Host "Installing Node.js dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Node.js dependencies installed" -ForegroundColor Green
    } else {
        Write-Host "✗ Failed to install Node.js dependencies" -ForegroundColor Red
    }
    Write-Host ""
    
    # Build frontend
    Write-Host "Building frontend..." -ForegroundColor Yellow
    npm run build
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ Frontend built successfully" -ForegroundColor Green
    } else {
        Write-Host "✗ Failed to build frontend" -ForegroundColor Red
    }
    Write-Host ""
} else {
    Write-Host "⚠ Skipping Node.js setup (Node.js not installed)" -ForegroundColor Yellow
    Write-Host ""
}

# Check for .env file
Write-Host "Checking for .env file..." -ForegroundColor Yellow
if (Test-Path ".env") {
    Write-Host "✓ .env file exists" -ForegroundColor Green
} else {
    Write-Host "⚠ .env file not found" -ForegroundColor Yellow
    Write-Host "  Creating .env from .env.example..." -ForegroundColor Yellow
    if (Test-Path ".env.example") {
        Copy-Item ".env.example" ".env"
        Write-Host "✓ .env file created. Please edit it with your configuration." -ForegroundColor Green
    } else {
        Write-Host "✗ .env.example not found. Please create .env manually." -ForegroundColor Red
    }
}
Write-Host ""

# Check if dist/public exists (frontend build)
Write-Host "Checking frontend build..." -ForegroundColor Yellow
if (Test-Path "dist/public/index.html") {
    Write-Host "✓ Frontend build found" -ForegroundColor Green
} else {
    Write-Host "⚠ Frontend build not found. Run 'npm run build' to build the frontend." -ForegroundColor Yellow
}
Write-Host ""

# Check if vendor directory exists (PHP dependencies)
Write-Host "Checking PHP dependencies..." -ForegroundColor Yellow
if (Test-Path "vendor/autoload.php") {
    Write-Host "✓ PHP dependencies found (PHPMailer)" -ForegroundColor Green
} else {
    Write-Host "⚠ PHP dependencies not found. Run 'composer install' to install them." -ForegroundColor Yellow
}
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Edit .env file with your SMTP credentials" -ForegroundColor White
Write-Host "2. Ensure Apache is running with mod_rewrite enabled" -ForegroundColor White
Write-Host "3. Test the health endpoint: http://localhost:8080/api/health" -ForegroundColor White
Write-Host "4. Test the contact form on your website" -ForegroundColor White
Write-Host ""
Write-Host "For more information, see DEPLOYMENT_SETUP.md" -ForegroundColor Cyan
Write-Host ""

