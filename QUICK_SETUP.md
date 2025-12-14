# Quick Setup Guide

## For Windows (XAMPP)

### 1. Install Dependencies

```powershell
# Install Composer (if not installed)
# Download from: https://getcomposer.org/download/

# Install PHP dependencies
composer install

# Install Node.js dependencies and build frontend
npm install
npm run build
```

Or run the setup script:
```powershell
.\setup.ps1
```

### 2. Configure Environment

1. Copy `.env.example` to `.env`:
   ```powershell
   copy .env.example .env
   ```

2. Edit `.env` and add your SMTP credentials:
   ```env
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-gmail-app-password
   RECIPIENT_EMAIL=your-email@gmail.com
   BASE_URL=http://localhost:8080
   ```

### 3. Start Apache

1. Open XAMPP Control Panel
2. Start Apache (should be on port 8080)
3. Make sure `mod_rewrite` is enabled

### 4. Test

1. **Health Check:**
   ```
   http://localhost:8080/api/health
   ```

2. **Website:**
   ```
   http://localhost:8080
   ```

3. **Contact Form:**
   - Fill out and submit the contact form
   - Check `contact_submissions.json` for saved data

## File Structure

```
Modern/
├── api/                    # PHP backend
│   ├── contact.php        # Contact form endpoint
│   ├── config.php         # Configuration
│   └── utils.php          # Utilities
├── client/                # React frontend source
├── dist/public/           # Built frontend (after npm run build)
├── .htaccess             # Apache routing
├── index.php             # Main entry point
└── .env                  # Environment variables (create from .env.example)
```

## Troubleshooting

### Contact Form Not Working

1. Check if Apache is running
2. Verify `.htaccess` is being read
3. Check `php_errors.log` for errors
4. Test API endpoint: `http://localhost:8080/api/health`

### Email Not Sending

1. Verify `.env` has correct SMTP credentials
2. Check `email_errors.log`
3. Ensure PHPMailer is installed: `composer install`
4. For Gmail, use App Password (not regular password)

### Frontend Not Loading

1. Ensure frontend is built: `npm run build`
2. Check that `dist/public/index.html` exists
3. Check browser console for errors

## Notes

- Form submissions are ALWAYS saved to `contact_submissions.json` even if email fails
- Email sending is non-blocking - form will work without email configuration
- PHPMailer is optional - form works without it (but email won't send)

