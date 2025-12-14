# Windows Setup Guide for PHP Backend

## Prerequisites Installation

### 1. Install PHP

**Option A: Using XAMPP (Recommended for Windows)**
1. Download XAMPP from: https://www.apachefriends.org/download.html
2. Install XAMPP (includes PHP, Apache, MySQL)
3. Add PHP to PATH:
   - Open System Properties → Environment Variables
   - Edit "Path" variable
   - Add: `C:\xampp\php` (or your XAMPP installation path)
   - Restart terminal

**Option B: Using PHP Standalone**
1. Download PHP from: https://windows.php.net/download/
2. Extract to `C:\php`
3. Add `C:\php` to PATH environment variable
4. Copy `php.ini-development` to `php.ini`
5. Enable extensions in `php.ini`:
   ```
   extension=openssl
   extension=curl
   extension=mbstring
   ```

### 2. Install Composer

1. Download Composer for Windows: https://getcomposer.org/download/
2. Run the installer (Composer-Setup.exe)
3. It will automatically detect PHP if installed
4. Verify installation:
   ```powershell
   composer --version
   ```

## Project Setup

### 1. Navigate to Project Directory
```powershell
cd D:\Modern-Site
```

### 2. Install PHP Dependencies
```powershell
composer install
```

This will install:
- PHPMailer (for email sending)

### 3. Configure Environment

Ensure your `.env` file exists and has:
```env
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=tls
RECIPIENT_EMAIL=recipient@example.com
BASE_URL=http://localhost:8000
LOGO_URL=http://localhost:8000/logo.png
EMAIL_ENABLED=true
```

## Running the Server

### Option A: PHP Built-in Server (Development)

```powershell
php -S localhost:8000 server.php
```

Then access:
- Frontend: http://localhost:8000
- API Health: http://localhost:8000/api/health
- API Test SMTP: http://localhost:8000/api/test-smtp

### Option B: XAMPP Apache (Production-like)

1. Copy project to `C:\xampp\htdocs\Modern-Site`
2. Start Apache from XAMPP Control Panel
3. Access: http://localhost/Modern-Site

**Note:** Make sure `.htaccess` is working (mod_rewrite enabled)

## Testing

### 1. Test PHP Installation
```powershell
php --version
```

### 2. Test Composer
```powershell
composer --version
```

### 3. Test Health Endpoint
```powershell
# In browser or using curl
http://localhost:8000/api/health
```

### 4. Test SMTP Connection
```powershell
# In browser
http://localhost:8000/api/test-smtp
```

### 5. Test Contact Form
- Open frontend in browser
- Submit contact form
- Check `contact_submissions.json` for saved data

## Troubleshooting

### "php is not recognized"
- PHP is not in PATH
- Add PHP directory to Windows PATH
- Restart terminal/PowerShell

### "composer is not recognized"
- Composer is not installed or not in PATH
- Reinstall Composer or add to PATH manually

### "Class 'PHPMailer\PHPMailer\PHPMailer' not found"
- Run: `composer install`
- Check `vendor/` directory exists

### "404 Not Found" on API endpoints
- Check `.htaccess` is working (Apache)
- For PHP built-in server, use `server.php` router
- Try direct access: `/api/contact.php`

### Port 8000 already in use
- Use different port: `php -S localhost:8080 server.php`
- Update `BASE_URL` in `.env` accordingly

## File Permissions

On Windows, ensure these files/directories are writable:
- `contact_submissions.json`
- `email_errors.log`
- `php_errors.log`

Right-click → Properties → Security → Edit permissions if needed.

## Development Workflow

1. **Start PHP Server:**
   ```powershell
   php -S localhost:8000 server.php
   ```

2. **Build Frontend (if needed):**
   ```powershell
   npm run build
   ```

3. **Test in Browser:**
   - Frontend: http://localhost:8000
   - API: http://localhost:8000/api/health

## Production Deployment

For production on Windows Server:
1. Use IIS with PHP or Apache
2. Configure web server to route `/api/*` to PHP
3. Set up proper file permissions
4. Configure `.env` with production values

## Quick Commands Reference

```powershell
# Check PHP version
php --version

# Check Composer version
composer --version

# Install dependencies
composer install

# Start development server
php -S localhost:8000 server.php

# Build frontend
npm run build

# Test health endpoint (in browser)
http://localhost:8000/api/health
```

