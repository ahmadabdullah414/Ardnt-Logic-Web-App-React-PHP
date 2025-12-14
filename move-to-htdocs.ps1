# PowerShell script to move project to htdocs
# Run this script as Administrator

Write-Host "=== Moving Modern-Site to XAMPP htdocs ===" -ForegroundColor Cyan

$sourceDir = "D:\Modern-Site"
$targetDir = "C:\xampp\htdocs"

# Check if source exists
if (-not (Test-Path $sourceDir)) {
    Write-Host "Error: Source directory not found: $sourceDir" -ForegroundColor Red
    exit 1
}

# Check if htdocs exists
if (-not (Test-Path $targetDir)) {
    Write-Host "Error: XAMPP htdocs not found: $targetDir" -ForegroundColor Red
    Write-Host "Please install XAMPP first or update the path." -ForegroundColor Yellow
    exit 1
}

# Check if htdocs is empty or has only default files
$htdocsContents = Get-ChildItem $targetDir -Force
$defaultFiles = @("index.php", "webalizer", "xampp")
$hasOnlyDefaults = $htdocsContents | Where-Object { 
    $defaultFiles -notcontains $_.Name 
} | Measure-Object | Select-Object -ExpandProperty Count

if ($hasOnlyDefaults -gt 0) {
    Write-Host "Warning: htdocs contains files other than XAMPP defaults." -ForegroundColor Yellow
    Write-Host "Files in htdocs:" -ForegroundColor Yellow
    $htdocsContents | ForEach-Object { Write-Host "  - $($_.Name)" -ForegroundColor Gray }
    $response = Read-Host "Continue anyway? (y/n)"
    if ($response -ne "y") {
        Write-Host "Cancelled." -ForegroundColor Yellow
        exit 0
    }
}

Write-Host "`nMoving files from $sourceDir to $targetDir..." -ForegroundColor Cyan

# Move files (excluding node_modules and other large dirs)
$excludeDirs = @("node_modules", ".git", "dist")
Get-ChildItem $sourceDir -Force | Where-Object {
    $excludeDirs -notcontains $_.Name
} | ForEach-Object {
    $targetPath = Join-Path $targetDir $_.Name
    if (Test-Path $targetPath) {
        Write-Host "  Skipping $($_.Name) (already exists)" -ForegroundColor Yellow
    } else {
        Write-Host "  Moving $($_.Name)..." -ForegroundColor Gray
        Move-Item $_.FullName $targetPath -Force
    }
}

Write-Host "`n✅ Project moved successfully!" -ForegroundColor Green
Write-Host "`nAccess your site at:" -ForegroundColor Cyan
Write-Host "  - http://localhost:8080" -ForegroundColor White
Write-Host "  - http://localhost:8080/api/health" -ForegroundColor White
Write-Host "`nNote: You may need to:" -ForegroundColor Yellow
Write-Host "  1. Update .env file paths if needed" -ForegroundColor Gray
Write-Host "  2. Restart Apache from XAMPP Control Panel" -ForegroundColor Gray

