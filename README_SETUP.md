# Quick Setup Guide - Connect PHP, React, and MySQL

This guide will help you connect your React frontend, PHP backend, and MySQL database using Laragon.

## Prerequisites

✅ **Laragon is running** with:
- Apache (usually on port 80)
- MySQL (usually on port 3306)

## Step 1: Configure Environment

1. **Copy the example environment file:**
   ```powershell
   copy .env.example .env
   ```

2. **Edit `.env` file** and configure:
   ```env
   # MySQL Database (Laragon default)
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=ardntlogic
   DB_USER=root
   DB_PASS=              # Leave empty if no password
   USE_DATABASE=true
   
   # Application URL (Laragon Apache port)
   BASE_URL=http://localhost
   ```

## Step 2: Create Database

**Option A: Using phpMyAdmin (Recommended)**
1. Open: http://localhost/phpmyadmin
2. Click "New" to create a database
3. Name it: `ardntlogic`
4. Click "Import" tab
5. Choose file: `database.sql`
6. Click "Go"

**Option B: Using MySQL Command Line**
```powershell
mysql -u root -p < database.sql
```

**Option C: Auto-initialize (will create table on first submission)**
- The database will automatically create the table when you submit the first contact form
- Just make sure the database exists first

## Step 3: Install Dependencies

**PHP Dependencies:**
```powershell
composer install
```

**Node.js Dependencies:**
```powershell
npm install
```

## Step 4: Build Frontend

```powershell
npm run build
```

This creates the production build in `dist/public/`

## Step 5: Start Everything

### Option A: Using Apache (Laragon) - Recommended for Testing

1. **Make sure Apache and MySQL are running in Laragon**

2. **Run the setup script:**
   ```powershell
   .\start-apache.ps1
   ```

3. **Open your browser:**
   ```
   http://localhost
   ```

### Option B: Development Mode (Separate servers)

1. **Run the development script:**
   ```powershell
   .\start-dev.ps1
   ```

2. **Access:**
   - Frontend: http://localhost:5173 (Vite dev server)
   - Backend: http://localhost:8000 (PHP server)

## Step 6: Test the Connection

1. **Test API Health:**
   ```
   http://localhost/api/health
   ```

2. **Test Database Connection:**
   - Submit the contact form on the website
   - Check phpMyAdmin: `ardntlogic` → `contact_submissions` table
   - You should see the submission saved

3. **Check Logs:**
   - PHP logs: `php_errors.log`
   - Email errors: `email_errors.log`

## Troubleshooting

### Database Connection Failed
- Check MySQL is running in Laragon
- Verify database credentials in `.env`
- Make sure database `ardntlogic` exists
- Check `php_errors.log` for detailed error messages

### Frontend Not Loading
- Make sure you ran `npm run build`
- Check Apache is running on port 80
- Verify `dist/public/index.html` exists

### API Not Working
- Check `.htaccess` file exists
- Verify Apache `mod_rewrite` is enabled
- Test: http://localhost/api/health

### CORS Errors
- The backend already has CORS headers configured
- If issues persist, check browser console for specific errors

## File Structure

```
Modern/
├── api/                    # PHP Backend
│   ├── config.php         # Configuration
│   ├── database.php       # MySQL connection
│   ├── contact.php        # Contact form endpoint
│   └── ...
├── client/                # React Frontend
│   └── src/
├── dist/                  # Built frontend (after npm run build)
│   └── public/
├── database.sql           # Database schema
├── .env                   # Environment config (create from .env.example)
├── start-apache.ps1       # Apache startup script
└── start-dev.ps1          # Development startup script
```

## Quick Commands

```powershell
# Install everything
composer install
npm install

# Build frontend
npm run build

# Start with Apache (Laragon)
.\start-apache.ps1

# Start development servers
.\start-dev.ps1

# Test API
curl http://localhost/api/health
```

## Next Steps

- ✅ Database is connected
- ✅ Frontend is built and served
- ✅ Backend API is working
- ✅ Contact form saves to MySQL

You're all set! 🎉

