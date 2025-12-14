# Deployment Setup Guide

This guide will help you set up the ArdntLogic project for production deployment with PHP and Apache.

## Prerequisites

1. **PHP 7.4+** installed and running
2. **Apache** web server with mod_rewrite enabled
3. **Composer** installed (for PHP dependencies)
4. **Node.js** and npm (for building the frontend)

## Step 1: Install PHP Dependencies

Install Composer dependencies (PHPMailer):

```bash
composer install
```

If Composer is not installed, download it from: https://getcomposer.org/download/

## Step 2: Build Frontend

Build the React frontend:

```bash
npm install
npm run build
```

This will create the production build in the `dist/public/` directory.

## Step 3: Configure Environment

1. Copy `.env.example` to `.env`:
   ```bash
   copy .env.example .env
   ```

2. Edit `.env` and update with your actual values:
   ```env
   # SMTP Configuration (Gmail)
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-gmail-app-password
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=tls
   
   # Email Recipient
   RECIPIENT_EMAIL=your-email@gmail.com
   
   # Base URL (update for production)
   BASE_URL=https://yourdomain.com
   LOGO_URL=https://yourdomain.com/logo.png
   
   # Email Feature Flag
   EMAIL_ENABLED=true
   ```

**Note:** For Gmail, you need to use an App Password, not your regular password. Generate one at: https://myaccount.google.com/apppasswords

## Step 4: Apache Configuration

### Option A: Project in Document Root

If your project is in the Apache document root (e.g., `/var/www/html` or `C:/xampp/htdocs`):

1. The `.htaccess` file should work as-is
2. Make sure `mod_rewrite` is enabled in Apache
3. Ensure `.htaccess` files are allowed in your Apache config

### Option B: Project in Subdirectory

If your project is in a subdirectory (e.g., `/var/www/html/Modern`):

1. Update the `RewriteBase` in `.htaccess` if needed
2. The `index.php` will automatically detect the base path

### Apache Configuration Example

Add this to your Apache virtual host or `httpd.conf`:

```apache
<Directory "/path/to/Modern">
    Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
</Directory>
```

Make sure `mod_rewrite` is enabled:
```apache
LoadModule rewrite_module modules/mod_rewrite.so
```

## Step 5: File Permissions

Ensure proper file permissions:

- `contact_submissions.json` - writable by web server
- `email_errors.log` - writable by web server (if exists)
- `php_errors.log` - writable by web server (if exists)

On Linux:
```bash
chmod 664 contact_submissions.json
chown www-data:www-data contact_submissions.json
```

On Windows:
- Ensure the web server user has write permissions to these files

## Step 6: Verify Setup

1. **Test Health Endpoint:**
   ```
   http://yourdomain.com/api/health
   ```
   Should return: `{"status":"ok","message":"ArdntLogic contact form server is running",...}`

2. **Test Contact Form:**
   - Navigate to your website
   - Submit the contact form
   - Check `contact_submissions.json` for saved submissions
   - Check email (if SMTP is configured)

3. **Test SMTP (optional):**
   ```
   http://yourdomain.com/api/test-smtp
   ```

## Troubleshooting

### Contact Form Not Working

1. Check Apache error logs: `error.log`
2. Check PHP error logs: `php_errors.log`
3. Verify `.htaccess` is being read (check Apache config)
4. Verify API endpoint is accessible: `/api/health`

### Email Not Sending

1. Verify SMTP credentials in `.env`
2. Check `email_errors.log` for detailed error messages
3. Ensure PHPMailer is installed: `composer install`
4. For Gmail, make sure you're using an App Password
5. Check if email is disabled: `EMAIL_ENABLED=false` in `.env`

### Frontend Not Loading

1. Ensure frontend is built: `npm run build`
2. Check that `dist/public/index.html` exists
3. Verify static file serving in `.htaccess`
4. Check browser console for errors
5. Verify base path in `index.php` matches your directory structure

### 404 Errors

1. Verify `mod_rewrite` is enabled
2. Check `.htaccess` is in the root directory
3. Ensure `AllowOverride All` is set in Apache config
4. Verify file paths match your directory structure

## Production Checklist

- [ ] PHP dependencies installed (`composer install`)
- [ ] Frontend built (`npm run build`)
- [ ] `.env` file created and configured
- [ ] SMTP credentials configured (if using email)
- [ ] Apache `mod_rewrite` enabled
- [ ] File permissions set correctly
- [ ] Health endpoint working (`/api/health`)
- [ ] Contact form submissions working
- [ ] Email sending working (if enabled)
- [ ] Static files loading correctly
- [ ] SPA routing working (try navigating to different pages)

## Security Notes

- Never commit `.env` file to version control
- Keep `composer.lock` and `package-lock.json` in version control
- Regularly update dependencies for security patches
- Use HTTPS in production
- Consider adding rate limiting for the contact form endpoint
- Sanitize and validate all user inputs (already implemented)

## Support

For issues or questions:
1. Check error logs first
2. Review this documentation
3. Check Apache/PHP error logs
4. Verify all prerequisites are installed

