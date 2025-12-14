# Migration Guide: Node.js/Express.js to PHP

This guide explains the migration from Node.js/Express.js backend to PHP backend.

## What Changed

### Backend
- **Node.js/Express.js** → **PHP**
- **Nodemailer** → **PHPMailer**
- **TypeScript** → **PHP**
- All API endpoints remain the same structure and responses

### Frontend
- **No changes required** - The React frontend works exactly the same
- API endpoints are identical (`/api/contact`, `/api/health`, `/api/test-smtp`)
- Response formats are identical

## File Structure Changes

### New PHP Files
```
api/
├── config.php          # Configuration (replaces server/index.ts config)
├── utils.php           # Utility functions (logging, CORS, etc.)
├── contact.php         # Contact form endpoint (replaces Express route)
├── health.php          # Health check endpoint
├── test-smtp.php       # SMTP test endpoint
├── logo.php            # Logo serving endpoint
├── static.php          # Static file server for production
└── index.php           # Fallback router

server.php              # Development server router
.htaccess               # Apache routing configuration
composer.json           # PHP dependencies
```

### Removed/Deprecated Files
- `server/index.ts` - Replaced by PHP endpoints
- `server/static.ts` - Replaced by `api/static.php`
- Node.js server files (still present but not used)

## Setup Instructions

### 1. Install PHP Dependencies
```bash
composer install
```

This installs:
- PHPMailer (for email sending)

### 2. Environment Variables
Your `.env` file remains the same:
```env
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=tls
RECIPIENT_EMAIL=recipient@example.com
BASE_URL=http://localhost
LOGO_URL=http://localhost/logo.png
EMAIL_ENABLED=true
```

### 3. Server Configuration

#### Option A: Apache (Production)
1. Ensure `mod_rewrite` is enabled
2. Point document root to project root
3. `.htaccess` handles routing automatically

#### Option B: Nginx (Production)
Configure Nginx to route `/api/*` to PHP-FPM and serve static files:
```nginx
location /api/ {
    try_files $uri $uri/ /api/index.php?$query_string;
}

location / {
    try_files $uri $uri/ /dist/public/index.html;
}
```

#### Option C: PHP Built-in Server (Development)
```bash
php -S localhost:8000 server.php
```

## API Endpoints (Unchanged)

All endpoints work exactly the same:

### POST /api/contact
- Same request format
- Same validation rules
- Same response format
- Same email template

### GET /api/health
- Same response format

### GET /api/test-smtp
- Same response format

### GET /logo.png
- Same functionality

## Development Workflow

### Before (Node.js)
```bash
npm run dev          # Start Node.js server with Vite
npm run build        # Build for production
npm start            # Start production server
```

### After (PHP)
```bash
# Development
php -S localhost:8000 server.php

# Build frontend (still needed)
npm run build

# Production
# Deploy to Apache/Nginx with PHP support
```

## Frontend Development

The frontend development workflow remains the same:
- Use Vite dev server for frontend development
- Point API calls to PHP backend (localhost:8000 or your PHP server)

## Key Differences

### Email Sending
- **Before**: Nodemailer with `transporter.sendMail()`
- **After**: PHPMailer with `$mail->send()`
- Same Gmail SMTP configuration
- Same email templates (HTML and plain text)

### Error Handling
- **Before**: Express error middleware
- **After**: PHP try-catch blocks
- Same error logging format
- Same user-facing error messages

### File Storage
- **Before**: Node.js `fs/promises`
- **After**: PHP `file_get_contents` / `file_put_contents`
- Same JSON file format (`contact_submissions.json`)
- Compatible with existing data

### Logging
- **Before**: Console.log with timestamps
- **After**: PHP `error_log()` with timestamps
- Same log format and structure

## Testing

1. **Test Contact Form:**
   ```bash
   curl -X POST http://localhost:8000/api/contact \
     -H "Content-Type: application/json" \
     -d '{"fullName":"Test","email":"test@example.com","phone":"1234567890","message":"Test message"}'
   ```

2. **Test Health Check:**
   ```bash
   curl http://localhost:8000/api/health
   ```

3. **Test SMTP:**
   ```bash
   curl http://localhost:8000/api/test-smtp
   ```

## Troubleshooting

### "Class 'PHPMailer\PHPMailer\PHPMailer' not found"
- Run `composer install` to install dependencies

### "404 Not Found" on API endpoints
- Check `.htaccess` is working (Apache)
- Check file permissions
- Try accessing directly: `/api/contact.php`

### Email not sending
- Verify `.env` file has correct SMTP credentials
- Check `php_errors.log` for detailed errors
- Test SMTP connection: `/api/test-smtp`

### CORS errors
- CORS headers are set in `api/utils.php`
- Check server configuration allows CORS

## Production Deployment

1. Build frontend: `npm run build`
2. Install PHP dependencies: `composer install --no-dev`
3. Configure web server (Apache/Nginx)
4. Set up `.env` file with production credentials
5. Ensure file permissions are correct:
   - `contact_submissions.json` - writable
   - `email_errors.log` - writable
   - `php_errors.log` - writable

## Backward Compatibility

- Existing `contact_submissions.json` files are compatible
- API response formats are identical
- Frontend requires no changes
- Environment variables are the same

## Performance Notes

- PHP may have slightly different performance characteristics
- Email sending is still non-blocking (form saves even if email fails)
- Static file serving is handled efficiently
- Caching headers are set for static assets

