# Quick Start Guide - PHP Backend

## Installation (5 minutes)

### 1. Install PHP Dependencies
```bash
composer install
```

### 2. Configure Environment
Ensure your `.env` file has:
```env
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=tls
RECIPIENT_EMAIL=recipient@example.com
BASE_URL=http://localhost:8000
EMAIL_ENABLED=true
```

### 3. Start Development Server
```bash
php -S localhost:8000 server.php
```

### 4. Build Frontend (if needed)
```bash
npm run build
```

## Testing

1. **Health Check:**
   ```
   http://localhost:8000/api/health
   ```

2. **Test SMTP:**
   ```
   http://localhost:8000/api/test-smtp
   ```

3. **Test Contact Form:**
   - Open your frontend
   - Submit the contact form
   - Check `contact_submissions.json` for saved data
   - Check email inbox for notification

## Production Deployment

### Apache
1. Point document root to project directory
2. Ensure `mod_rewrite` is enabled
3. `.htaccess` handles routing automatically

### Nginx
Configure routing as shown in `README_PHP.md`

## Troubleshooting

**"Composer not found"**
- Install Composer: https://getcomposer.org/download/

**"Class PHPMailer not found"**
- Run: `composer install`

**"404 on API endpoints"**
- Check `.htaccess` is working
- Try direct access: `/api/contact.php`

**"Email not sending"**
- Verify Gmail App Password is correct
- Check `php_errors.log` for details
- Test SMTP: `/api/test-smtp`

## What's Different?

- ✅ All API endpoints work the same
- ✅ Frontend requires no changes
- ✅ Same email functionality
- ✅ Same data storage format
- ✅ Same environment variables

The only difference is the backend language (PHP instead of Node.js).

