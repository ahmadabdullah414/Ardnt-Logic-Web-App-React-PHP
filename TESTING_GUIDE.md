# 🚀 How to Run Frontend and Backend for Testing

## Quick Start - Development Mode (Recommended)

### Option 1: Use the Script (Easiest)

```powershell
.\start-dev.ps1
```

This automatically starts:
- ✅ PHP Backend on http://localhost:8000
- ✅ React Frontend on http://localhost:5173
- ✅ Both run in parallel

**Access your app:**
- Frontend: http://localhost:5173
- API Health: http://localhost:8000/api/health

### Option 2: Manual (Two Terminals)

**Terminal 1 - Start PHP Backend:**
```powershell
cd C:\laragon\www\Modern
php -S localhost:8000 server.php
```

**Terminal 2 - Start React Frontend:**
```powershell
cd C:\laragon\www\Modern
npm run dev
```

**Access:**
- Frontend: http://localhost:5173
- Backend: http://localhost:8000

## How It Works

✅ **Vite Proxy Configured** - API requests from frontend automatically proxy to PHP backend  
✅ **Hot Reload** - Changes in React code update instantly  
✅ **CORS Enabled** - Backend allows requests from frontend  
✅ **MySQL Ready** - Database connection configured  

## Testing the Contact Form

1. Open: http://localhost:5173/contact
2. Fill out the form
3. Submit - it will call the PHP backend at :8000
4. Check MySQL database for saved submission

## Production Mode (Apache)

If you want to test with Apache instead:

1. **Build frontend:**
   ```powershell
   npm run build
   ```

2. **Make sure Apache and MySQL are running in Laragon**

3. **Access:**
   - http://localhost (if document root is project folder)
   - http://localhost/Modern (if document root is www folder)

## Troubleshooting

### Port 8000 Already in Use?
Change PHP port:
```powershell
php -S localhost:8001 server.php
```
Then update `vite.config.ts` proxy target to `http://localhost:8001`

### Port 5173 Already in Use?
Vite will automatically try the next available port, or specify:
```powershell
npm run dev -- --port 5174
```

### Backend Not Responding?
- Check PHP server is running: http://localhost:8000/api/health
- Check MySQL is running in Laragon
- Check `.env` file configuration

### Frontend Can't Connect to Backend?
- Make sure PHP backend is running on port 8000
- Check browser console for errors
- Verify proxy is configured in `vite.config.ts`

## Quick Commands Reference

```powershell
# Development (both servers)
.\start-dev.ps1

# Or manually:
# Terminal 1: PHP Backend
php -S localhost:8000 server.php

# Terminal 2: React Frontend  
npm run dev

# Production build
npm run build
# Then access via Apache: http://localhost
```

## What Gets Tested

✅ **Frontend**: React app with hot-reload  
✅ **Backend**: PHP API endpoints  
✅ **Database**: MySQL connection and saving  
✅ **Contact Form**: Full submission flow  
✅ **CORS**: Cross-origin requests  

Everything is connected and ready for testing! 🎉

