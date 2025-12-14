# How to Run Your Website

## Option 1: Using Apache (Production - Recommended) ✅

This is the easiest way and what you're currently set up for:

1. **Start Apache in XAMPP Control Panel**
   - Open XAMPP Control Panel
   - Click "Start" next to Apache
   - Make sure it's running on port 8080

2. **Open your browser and visit:**
   ```
   http://localhost:8080
   ```
   OR if you haven't changed DocumentRoot:
   ```
   http://localhost:8080/Modern-Site/
   ```

3. **That's it!** Your website should load.

## Option 2: Using Node.js Dev Server (Development)

If you want to run the development server with hot-reload:

1. **Open terminal in the project folder:**
   ```powershell
   cd C:\xamp\htdocs\Modern-Site
   ```

2. **Run the dev server:**
   ```powershell
   npm run dev
   ```

3. **Open your browser:**
   ```
   http://localhost:5000
   ```

## Building for Production

If you make changes to the code, rebuild:

```powershell
npm run build
```

Then refresh your browser to see the changes.

## Troubleshooting

### Blank Page?
1. Open browser console (F12)
2. Check for JavaScript errors
3. Make sure Apache is running
4. Try hard refresh (Ctrl+F5)

### Port Already in Use?
- Change Apache port in `httpd.conf` or
- Stop other services using port 8080

### API Not Working?
- Test: `http://localhost:8080/api/health`
- Should return: `{"status":"ok",...}`

## Current Setup

- **Frontend:** React app served via Apache
- **Backend:** PHP API in `/api` folder
- **Port:** 8080
- **Build Output:** `dist/public/`

