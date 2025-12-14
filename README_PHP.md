# ArdntLogic PHP Backend Setup

This project has been migrated from Node.js/Express.js to PHP. All functionality remains the same.

## Requirements

- PHP 7.4 or higher
- Composer (PHP package manager)
- Apache with mod_rewrite enabled (or Nginx with proper configuration)
- Gmail SMTP credentials (App Password)

## Installation

1. **Install Composer dependencies:**
   ```bash
   composer install
   ```

2. **Configure environment variables:**
   Create or update your `.env` file with the following:
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

3. **Set up Gmail App Password:**
   - Go to your Google Account settings
   - Enable 2-Step Verification
   - Generate an App Password for "Mail"
   - Use this App Password as `SMTP_PASS` in your `.env` file

## Server Configuration

### Apache (.htaccess)

The `.htaccess` file is already configured. Make sure:
- `mod_rewrite` is enabled
- `.htaccess` files are allowed
- The document root points to the project root

### Nginx

If using Nginx, add this configuration:
```nginx
location /api/ {
    try_files $uri $uri/ /api/index.php?$query_string;
}

location /logo.png {
    try_files $uri /api/logo.php;
}

location ~ \.php$ {
    fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
    fastcgi_index index.php;
    include fastcgi_params;
    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
}
```

### PHP Built-in Server (Development)

For development, you can use PHP's built-in server:
```bash
php -S localhost:8000 -t .
```

Note: The built-in server doesn't support `.htaccess`, so you'll need to access endpoints directly:
- `http://localhost:8000/api/contact.php`
- `http://localhost:8000/api/health.php`
- `http://localhost:8000/api/test-smtp.php`
- `http://localhost:8000/api/logo.php`

## API Endpoints

### POST /api/contact
Submit contact form data.

**Request:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "message": "Hello, I need help with...",
  "date": "2024-12-20",
  "time": "14:30",
  "topic": "Website Consultation"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for contacting ArdntLogic! Your message has been received and we'll get back to you within 24 hours.",
  "processingTime": "45ms"
}
```

### GET /api/health
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "message": "ArdntLogic contact form server is running",
  "timestamp": "2024-12-13T18:00:00+00:00"
}
```

### GET /api/test-smtp
Test SMTP connection.

**Response:**
```json
{
  "success": true,
  "message": "Gmail SMTP connection successful",
  "config": {
    "service": "gmail",
    "user": "your-email@gmail.com",
    "hasPassword": true
  },
  "connectionTime": "250ms"
}
```

### GET /logo.png
Serve the logo image.

## File Structure

```
.
├── api/
│   ├── config.php          # Configuration and environment variables
│   ├── utils.php           # Utility functions
│   ├── contact.php         # Contact form endpoint
│   ├── health.php          # Health check endpoint
│   ├── test-smtp.php       # SMTP test endpoint
│   ├── logo.php            # Logo serving endpoint
│   └── index.php           # Fallback router
├── client/                 # Frontend React app (unchanged)
├── vendor/                 # Composer dependencies (after composer install)
├── .env                    # Environment variables (not in git)
├── .htaccess               # Apache routing configuration
├── composer.json           # PHP dependencies
└── contact_submissions.json # Form submissions storage
```

## Features

- ✅ Full form validation
- ✅ Email sending with PHPMailer (Gmail SMTP)
- ✅ JSON file storage for submissions
- ✅ Error logging
- ✅ CORS support
- ✅ Non-blocking email sending (form submission succeeds even if email fails)
- ✅ Email template (HTML and plain text)
- ✅ SMTP connection verification
- ✅ Environment variable support
- ✅ Health check endpoint
- ✅ SMTP diagnostic endpoint

## Troubleshooting

### Email not sending
1. Check `.env` file has correct SMTP credentials
2. Verify Gmail App Password is correct
3. Check `php_errors.log` for detailed error messages
4. Test SMTP connection using `/api/test-smtp` endpoint

### 404 errors
1. Ensure `.htaccess` is working (check Apache `mod_rewrite`)
2. Try accessing endpoints directly: `/api/contact.php`
3. Check file permissions

### CORS errors
- CORS headers are set in `utils.php`
- If issues persist, check server configuration

## Migration Notes

- All Node.js/Express.js code has been replaced with PHP
- Frontend remains unchanged (React)
- API endpoints maintain the same structure and responses
- Email functionality uses PHPMailer instead of Nodemailer
- File storage format remains JSON (compatible with previous data)

