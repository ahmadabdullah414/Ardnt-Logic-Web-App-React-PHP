# Apache Port Update - Project Configuration

## Changes Made

Your project has been updated to work with Apache on port **8080** (instead of port 80).

### Files Updated:

1. **`api/config.php`**
   - Default `BASE_URL` changed from `http://localhost` to `http://localhost:8080`
   - Default `LOGO_URL` now uses port 8080

2. **`client/src/components/ContactForm.tsx`**
   - Removed hardcoded "port 5000" reference from error message
   - Now shows generic error message (works with any port)

3. **`.env.example`** (created)
   - Template file with port 8080 configuration
   - Copy to `.env` and update with your actual values

## Next Steps

### 1. Create `.env` File (if not exists)

Copy `.env.example` to `.env`:
```powershell
copy .env.example .env
```

Then edit `.env` with your actual SMTP credentials:
```env
SMTP_USER=contact@ardntlogic.com
SMTP_PASS=your-gmail-app-password
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=tls
RECIPIENT_EMAIL=contact@ardntlogic.com
BASE_URL=http://localhost:8080
LOGO_URL=http://localhost:8080/logo.png
EMAIL_ENABLED=true
```

### 2. Test Your Setup

1. **Start Apache** from XAMPP Control Panel (should be on port 8080)

2. **Test Health Endpoint:**
   ```
   http://localhost:8080/api/health
   ```

3. **Test SMTP:**
   ```
   http://localhost:8080/api/test-smtp
   ```

4. **Test Contact Form:**
   - Open your frontend: `http://localhost:8080`
   - Submit the contact form
   - Check `contact_submissions.json` for saved submissions

### 3. Frontend Development

If you're running the frontend separately (Vite dev server), you may need to configure a proxy or update API calls. However, since the frontend uses relative URLs (`/api/contact`), it should work automatically when served through Apache.

### 4. Production Build

When building for production:
```powershell
cd client
npm install
npm run build
```

The built files will be in `dist/public/` and Apache will serve them automatically via `.htaccess` routing.

## Port Configuration Summary

- **Apache:** Port 8080 (configured in `httpd.conf`)
- **BASE_URL:** `http://localhost:8080` (in `.env` and `api/config.php`)
- **Frontend:** Uses relative URLs (works with any port)

## Troubleshooting

### If port 8080 is also in use:
1. Change Apache port in `httpd.conf` to another port (e.g., 8888)
2. Update `BASE_URL` in `.env` file
3. Restart Apache

### If API calls fail:
1. Check Apache error logs: XAMPP Control Panel → Apache → Logs
2. Verify `.htaccess` is working (check if `mod_rewrite` is enabled)
3. Test endpoints directly: `http://localhost:8080/api/health`

### If frontend can't connect:
1. Make sure Apache is running
2. Check browser console for CORS errors
3. Verify `.htaccess` routing is working

## All Set!

Your project is now configured for Apache on port 8080. The frontend will automatically use the correct port when served through Apache.

