# Port 8080 Configuration Complete ✅

## Changes Made to Your Project

Your project has been updated to work with Apache on **port 8080**.

### ✅ Updated Files:

1. **`api/config.php`**
   - Default `BASE_URL`: `http://localhost:8080` (was `http://localhost`)
   - `LOGO_URL` automatically uses the new port

2. **`client/src/components/ContactForm.tsx`**
   - Removed hardcoded "port 5000" from error message
   - Now works with any port

## Create `.env` File

Create a `.env` file in the project root with:

```env
# SMTP Configuration (Gmail)
SMTP_USER=contact@ardntlogic.com
SMTP_PASS=your-gmail-app-password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=tls

# Email Recipient
RECIPIENT_EMAIL=contact@ardntlogic.com

# Base URL (Apache on port 8080)
BASE_URL=http://localhost:8080
LOGO_URL=http://localhost:8080/logo.png

# Email Feature Flag
EMAIL_ENABLED=true
```

## Test Your Setup

1. **Start Apache** (should be on port 8080 now)

2. **Test endpoints:**
   - Health: http://localhost:8080/api/health
   - SMTP Test: http://localhost:8080/api/test-smtp
   - Frontend: http://localhost:8080

3. **Submit contact form** and check:
   - `contact_submissions.json` for saved data
   - Email should be sent (if SMTP configured)

## Notes

- Frontend uses relative URLs (`/api/contact`) - works automatically
- All API endpoints will work on port 8080
- Logo will be served from `http://localhost:8080/logo.png`

## Done! 🎉

Your project is ready to use with Apache on port 8080.

