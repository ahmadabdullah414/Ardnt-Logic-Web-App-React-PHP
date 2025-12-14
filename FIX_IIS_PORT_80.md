# Fix IIS Port 80 Conflict

## Problem
IIS (Internet Information Services) is running on port 80, blocking Laragon's Apache server.

## Solution: Stop IIS

### Option 1: Using PowerShell (Run as Administrator)
```powershell
# Stop IIS
iisreset /stop

# Or stop the service
Stop-Service -Name W3SVC -Force
```

### Option 2: Using Services (GUI)
1. Press `Win + R`, type `services.msc`, press Enter
2. Find "World Wide Web Publishing Service" or "W3SVC"
3. Right-click → Stop
4. Right-click → Properties → Set Startup type to "Manual" (to prevent auto-start)

### Option 3: Using IIS Manager
1. Press `Win + R`, type `inetmgr`, press Enter
2. Right-click on your server name → Stop

## Verify Port 80 is Free

```powershell
netstat -ano | findstr ":80 " | findstr "LISTENING"
```

If nothing is listening on port 80, you're good to go!

## Start Laragon Apache

1. Open Laragon
2. Make sure Apache is set to use port 80
3. Click "Start All" or start Apache

## Alternative: Use Different Port for Laragon

If you need IIS to stay running, configure Laragon to use port 8080:

1. In Laragon, go to Menu → Preferences → Ports
2. Change Apache port to 8080
3. Update `.env` file: `BASE_URL=http://localhost:8080`
4. Update `api/config.php` if needed

## Test Your Application

After stopping IIS and starting Laragon Apache:
- Application: http://localhost
- phpMyAdmin: http://localhost/phpmyadmin (if Laragon includes it)
- API Health: http://localhost/api/health

