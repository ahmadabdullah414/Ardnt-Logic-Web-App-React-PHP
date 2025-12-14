# How to Run Frontend and Backend for Testing

## Quick Start - Development Mode (Recommended for Testing)

This runs both React frontend (with hot-reload) and PHP backend separately for easy testing.

### Option 1: Using the Script (Easiest)

```powershell
.\start-dev.ps1
```

This will:
- Start PHP backend on http://localhost:8000
- Start React frontend on http://localhost:5173
- Both run in parallel

### Option 2: Manual (Two Terminals)

**Terminal 1 - PHP Backend:**
```powershell
cd C:\laragon\www\Modern
php -S localhost:8000 server.php
```

**Terminal 2 - React Frontend:**
```powershell
cd C:\laragon\www\Modern
npm run dev
```

### Access Your Application

- **Frontend**: http://localhost:5173 (React with hot-reload)
- **Backend API**: http://localhost:8000/api/health
- **Contact Form**: http://localhost:5173/contact (will call backend at :8000)

## Production Mode (Using Apache)

If you want to test the production build with Apache:

1. **Build the frontend:**
   ```powershell
   npm run build
   ```

2. **Make sure Apache and MySQL are running in Laragon**

3. **Access:**
   - http://localhost (if document root is set to project folder)
   - http://localhost/Modern (if document root is www folder)

## Development vs Production

### Development Mode (start-dev.ps1)
✅ Hot-reload (changes reflect immediately)  
✅ Separate servers (frontend: 5173, backend: 8000)  
✅ Better for active development  
✅ Easier debugging  

### Production Mode (Apache)
✅ Single server (port 80)  
✅ Production build  
✅ Better for final testing  
✅ Closer to real deployment  

## Troubleshooting

### Port Already in Use?
- Change PHP port: `php -S localhost:8001 server.php`
- Change React port: Edit `vite.config.ts` or use `npm run dev -- --port 5174`

### Backend Not Responding?
- Check PHP is running: http://localhost:8000/api/health
- Check MySQL is running in Laragon
- Check `.env` file configuration

### Frontend Not Loading?
- Check React dev server: http://localhost:5173
- Check browser console for errors
- Make sure `npm install` was run

## Quick Commands

```powershell
# Development (both servers)
.\start-dev.ps1

# Or manually:
# Terminal 1
php -S localhost:8000 server.php

# Terminal 2  
npm run dev

# Production build
npm run build
# Then access via Apache: http://localhost
```

