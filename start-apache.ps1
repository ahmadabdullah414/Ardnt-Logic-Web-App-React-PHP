# ArdntLogic Apache Startup Script
# This script prepares and starts the application with Apache (Laragon)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  ArdntLogic Apache Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking Node.js..." -ForegroundColor Yellow
$nodeCheck = Get-Command node -ErrorAction SilentlyContinue
if ($nodeCheck) {
    $nodeVersion = node --version
    Write-Host "✓ Node.js $nodeVersion found" -ForegroundColor Green
} else {
    Write-Host "✗ Node.js not found. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Check if .env file exists
if (-not (Test-Path ".env")) {
    Write-Host "⚠ .env file not found. Creating from .env.example..." -ForegroundColor Yellow
    if (Test-Path ".env.example") {
        Copy-Item ".env.example" ".env"
        Write-Host "✓ .env file created. Please edit it with your configuration." -ForegroundColor Green
        Write-Host ""
        Write-Host "IMPORTANT: Please edit .env file and configure:" -ForegroundColor Yellow
        Write-Host "  - MySQL database credentials (DB_USER, DB_PASS, DB_NAME)" -ForegroundColor Yellow
        Write-Host "  - SMTP email settings (if needed)" -ForegroundColor Yellow
        Write-Host ""
        $continue = Read-Host "Press Enter to continue after editing .env file"
    } else {
        Write-Host "✗ .env.example not found. Please create .env file manually." -ForegroundColor Red
        exit 1
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

# Build frontend
Write-Host "Building frontend for production..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Failed to build frontend" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Make sure Apache and MySQL are running in Laragon" -ForegroundColor White
Write-Host "2. Create the database (if not exists):" -ForegroundColor White
Write-Host "   - Open phpMyAdmin: http://localhost/phpmyadmin" -ForegroundColor Gray
Write-Host "   - Import database.sql or run the SQL commands" -ForegroundColor Gray
Write-Host "3. Open your browser: http://localhost" -ForegroundColor White
Write-Host ""
Write-Host "Database Setup:" -ForegroundColor Yellow
Write-Host "  - Host: localhost" -ForegroundColor Gray
Write-Host "  - Port: 3306" -ForegroundColor Gray
Write-Host "  - Database: ardntlogic (or as configured in .env)" -ForegroundColor Gray
Write-Host "  - User: root (or as configured in .env)" -ForegroundColor Gray
Write-Host "  - Password: (as configured in .env)" -ForegroundColor Gray
Write-Host ""

# Check if database needs to be initialized
Write-Host "Would you like to initialize the database now? (Y/N)" -ForegroundColor Yellow
$initDb = Read-Host
if ($initDb -eq "Y" -or $initDb -eq "y") {
    Write-Host ""
    Write-Host "Initializing database..." -ForegroundColor Yellow
    
    # Try to connect and initialize
    $initScript = @"
<?php
require_once 'api/config.php';
require_once 'api/database.php';
if (initializeDatabase()) {
    echo "Database initialized successfully!\n";
} else {
    echo "Database initialization failed. Please check your .env configuration.\n";
}
"@
    
    $initScript | Out-File -FilePath "init-db-temp.php" -Encoding UTF8
    php init-db-temp.php
    Remove-Item "init-db-temp.php" -ErrorAction SilentlyContinue
}

Write-Host ""
Write-Host "Setup complete! Your application should be ready." -ForegroundColor Green
Write-Host "Access it at: http://localhost" -ForegroundColor Cyan

