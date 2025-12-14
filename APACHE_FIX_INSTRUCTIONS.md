# Apache Port 80 Conflict - Fix Instructions

## Problem
Apache cannot start because port 80 is already in use by Windows System (likely IIS or HTTP.sys).

## Solution: Change Apache to Port 8080

### Method 1: Using XAMPP Control Panel (Easiest)

1. **Open XAMPP Control Panel**

2. **Click "Config" button next to Apache**

3. **Select "httpd.conf"**

4. **Press Ctrl+F to search for:**
   - `Listen 80`
   - Change to: `Listen 8080`

5. **Search for:**
   - `ServerName localhost:80`
   - Change to: `ServerName localhost:8080`

6. **Save the file (Ctrl+S)**

7. **Click "Config" again → Select "httpd-ssl.conf" (if exists)**
   - Find: `Listen 443`
   - Change to: `Listen 8443` (optional, for HTTPS)

8. **Restart Apache from XAMPP Control Panel**

### Method 2: Direct File Edit

1. **Navigate to:**
   ```
   C:\xampp\apache\conf\httpd.conf
   ```

2. **Open in Notepad (Right-click → Open with → Notepad)**

3. **Find line 59 (or search for "Listen 80"):**
   ```apache
   Listen 80
   ```
   Change to:
   ```apache
   Listen 8080
   ```

4. **Find line 227 (or search for "ServerName"):**
   ```apache
   ServerName localhost:80
   ```
   Change to:
   ```apache
   ServerName localhost:8080
   ```

5. **Save and close**

6. **Restart Apache**

## Update Project Configuration

After changing Apache port, update your `.env` file:

```env
BASE_URL=http://localhost:8080
LOGO_URL=http://localhost:8080/logo.png
```

## Test

1. **Start Apache from XAMPP Control Panel**

2. **Open browser:**
   - http://localhost:8080
   - http://localhost:8080/api/health

3. **If you see the XAMPP dashboard or your API responds, it's working!**

## Alternative: Use PHP Built-in Server (No Apache)

If you just want to test the PHP backend without Apache:

```powershell
cd D:\Modern-Site
php -S localhost:8000 server.php
```

Then access: http://localhost:8000/api/health

## Why Port 80 is Blocked

Port 80 is commonly used by:
- **IIS (Internet Information Services)** - Windows web server
- **HTTP.sys** - Windows HTTP Server API
- **Skype** - Sometimes uses port 80
- **Other web servers**

Changing to port 8080 avoids all these conflicts.

## Verify Port is Free

After changing, check if port 8080 is available:
```powershell
netstat -ano | findstr ":8080"
```

If nothing shows, the port is free!

## Still Having Issues?

1. **Check Apache Error Log:**
   - XAMPP Control Panel → Apache → Logs → Error Log

2. **Check Windows Event Viewer:**
   - Press `Win + X` → Event Viewer
   - Look for Apache errors

3. **Try different port:**
   - 8000, 3000, 8888, etc.
   - Just update `httpd.conf` and `.env`

4. **Use PHP built-in server instead:**
   ```powershell
   php -S localhost:8000 server.php
   ```

