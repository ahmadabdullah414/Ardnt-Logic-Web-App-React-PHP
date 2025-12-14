# Quick Fix: IIS Port Conflict

## Problem
IIS is using port 80, blocking Laragon Apache.

## Solution: Use Port 8080 for Laragon

I've updated your configuration to use port 8080. Now:

### 1. Configure Laragon to Use Port 8080

1. Open **Laragon**
2. Click **Menu** → **Preferences** → **Ports**
3. Change **Apache** port from `80` to `8080`
4. Click **Save**

### 2. Restart Laragon Apache

1. In Laragon, click **Stop All**
2. Then click **Start All**

### 3. Access Your Application

- **Application**: http://localhost:8080
- **phpMyAdmin**: http://localhost:8080/phpmyadmin (or check Laragon menu)
- **API Health**: http://localhost:8080/api/health

## Configuration Updated

✅ `api/config.php` - Updated to use port 8080
✅ `.env` file - Updated BASE_URL to port 8080

## Alternative: Stop IIS (If You Don't Need It)

If you don't need IIS, you can stop it:

1. **Run PowerShell as Administrator**
2. Run: `iisreset /stop`
3. Or disable the service:
   - Press `Win + R` → `services.msc`
   - Find "World Wide Web Publishing Service"
   - Right-click → Stop → Set Startup to "Manual"

Then you can use port 80 for Laragon.

## Test

After configuring Laragon to port 8080:
1. Make sure Apache and MySQL are running in Laragon
2. Visit: **http://localhost:8080**
3. Test the contact form - it should work!

