# Fix Apache Port Conflict on Windows

## Problem
Port 80 is already in use by another service (likely IIS or Windows System), preventing Apache from starting.

## Solution Options

### Option 1: Change Apache Port (Recommended - Easiest)

1. **Open XAMPP Control Panel**
2. **Click "Config" next to Apache**
3. **Select "httpd.conf"**
4. **Find these lines:**
   ```apache
   Listen 80
   ```
   And:
   ```apache
   ServerName localhost:80
   ```

5. **Change to port 8080:**
   ```apache
   Listen 8080
   ```
   And:
   ```apache
   ServerName localhost:8080
   ```

6. **Save the file**
7. **Restart Apache from XAMPP Control Panel**

8. **Update your project's `.env` file:**
   ```env
   BASE_URL=http://localhost:8080
   LOGO_URL=http://localhost:8080/logo.png
   ```

9. **Access your site at:**
   - http://localhost:8080
   - http://localhost:8080/api/health

### Option 2: Stop IIS (If Installed)

1. **Open Services:**
   - Press `Win + R`
   - Type `services.msc`
   - Press Enter

2. **Find "World Wide Web Publishing Service" (IIS)**
3. **Right-click → Stop**
4. **Set Startup Type to "Manual" or "Disabled"**
5. **Try starting Apache again**

### Option 3: Stop Windows HTTP Service

1. **Open Command Prompt as Administrator:**
   - Right-click Start Menu
   - Select "Windows PowerShell (Admin)" or "Command Prompt (Admin)"

2. **Stop the service:**
   ```powershell
   net stop http
   ```

3. **Disable it (optional):**
   ```powershell
   sc config http start= disabled
   ```

4. **Try starting Apache again**

**Note:** This may affect other Windows services. Use Option 1 (change port) if unsure.

### Option 4: Use PHP Built-in Server (No Apache Needed)

If you just need to test the PHP backend, you can use PHP's built-in server:

1. **Open Command Prompt in project directory:**
   ```powershell
   cd D:\Modern-Site
   ```

2. **Start PHP server:**
   ```powershell
   php -S localhost:8000 server.php
   ```

3. **Access your site at:**
   - http://localhost:8000
   - http://localhost:8000/api/health

**Note:** This is for development only. For production, use Apache or another web server.

## Quick Fix (Recommended)

**Change Apache to port 8080:**

1. Edit: `C:\xampp\apache\conf\httpd.conf`
2. Change `Listen 80` to `Listen 8080`
3. Change `ServerName localhost:80` to `ServerName localhost:8080`
4. Save and restart Apache
5. Update `.env` file with port 8080

## Verify Port is Free

After changing port, verify it's available:
```powershell
netstat -ano | findstr ":8080"
```

If nothing shows, the port is free!

## Testing

After fixing, test your endpoints:
- Health: http://localhost:8080/api/health
- SMTP Test: http://localhost:8080/api/test-smtp
- Contact Form: Use your frontend

## Alternative: Use Different Ports

You can use any available port:
- 8080 (common alternative)
- 8000 (PHP default)
- 3000 (common dev port)
- 8888 (another common alternative)

Just make sure to:
1. Update Apache `httpd.conf`
2. Update your `.env` file
3. Update any frontend API calls if hardcoded

