# 🚀 Quick Start - Connect PHP, React & MySQL

## ✅ What's Been Set Up

1. ✅ **MySQL Database Integration** - Contact form now saves to MySQL
2. ✅ **Database Connection** - Automatic connection with fallback to JSON
3. ✅ **Startup Scripts** - Easy scripts to run everything
4. ✅ **Configuration Files** - Environment setup ready

## 🎯 Quick Setup (3 Steps)

### Step 1: Configure Database

1. **Make sure MySQL is running in Laragon**

2. **Create the database:**
   - Open phpMyAdmin: http://localhost/phpmyadmin
   - Click "New" → Name: `ardntlogic` → Create
   - Click "Import" → Select `database.sql` → Go

   OR run in MySQL:
   ```sql
   CREATE DATABASE ardntlogic;
   USE ardntlogic;
   SOURCE database.sql;
   ```

3. **Edit `.env` file** (already exists):
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=ardntlogic
   DB_USER=root
   DB_PASS=              # Leave empty if no password
   USE_DATABASE=true
   BASE_URL=http://localhost
   ```

### Step 2: Install Dependencies

Open PowerShell in project folder and run:

```powershell
# PHP dependencies
composer install

# Node.js dependencies  
npm install

# Build frontend
npm run build
```

### Step 3: Start & Test

**Option A: Using Laragon Apache (Recommended)**

1. Make sure **Apache** and **MySQL** are running in Laragon
2. Open browser: **http://localhost**
3. Test the contact form - it will save to MySQL!

**Option B: Development Mode**

```powershell
.\start-dev.ps1
```

Then access:
- Frontend: http://localhost:5173
- Backend: http://localhost:8000

## 🧪 Test Everything

### 1. Test Database Connection

If PHP is in your PATH:
```powershell
php test-database.php
```

Or use Laragon terminal (which has PHP in PATH):
- Right-click Laragon → Terminal
- Navigate to project: `cd C:\laragon\www\Modern`
- Run: `php test-database.php`

### 2. Test API

Open in browser:
- Health check: http://localhost/api/health
- Should return: `{"status":"ok",...}`

### 3. Test Contact Form

1. Go to: http://localhost/contact
2. Fill out and submit the form
3. Check database:
   - phpMyAdmin → `ardntlogic` → `contact_submissions` table
   - You should see your submission!

## 📁 Files Created

- `api/database.php` - MySQL connection utility
- `api/config.php` - Updated with MySQL config
- `api/contact.php` - Updated to save to MySQL
- `database.sql` - Database schema
- `.env.example` - Environment template
- `start-apache.ps1` - Apache startup script
- `start-dev.ps1` - Development startup script
- `test-database.php` - Database connection test

## 🔧 Troubleshooting

### Database Connection Failed

1. **Check MySQL is running** in Laragon
2. **Verify database exists:**
   - phpMyAdmin → Check if `ardntlogic` database exists
   - If not, create it or import `database.sql`
3. **Check `.env` file:**
   - DB_NAME should match your database name
   - DB_USER and DB_PASS should be correct
4. **Check logs:** `php_errors.log`

### Frontend Not Loading

1. **Build the frontend:**
   ```powershell
   npm run build
   ```
2. **Check Apache is running** on port 80
3. **Verify:** `dist/public/index.html` exists

### API Not Working

1. **Test health endpoint:** http://localhost/api/health
2. **Check `.htaccess`** file exists
3. **Verify Apache mod_rewrite** is enabled

## 📊 How It Works

1. **React Frontend** (built in `dist/public/`)
   - Served by Apache
   - Makes API calls to `/api/contact`

2. **PHP Backend** (`api/` folder)
   - Handles API requests
   - Saves to MySQL database
   - Falls back to JSON if database unavailable

3. **MySQL Database**
   - Stores contact submissions
   - Table: `contact_submissions`
   - Auto-creates on first use

## 🎉 You're Ready!

Everything is connected:
- ✅ React frontend → PHP backend
- ✅ PHP backend → MySQL database
- ✅ Contact form saves to database

Just make sure:
1. Apache is running (port 80)
2. MySQL is running (port 3306)
3. Database `ardntlogic` exists
4. Frontend is built (`npm run build`)

Then visit: **http://localhost** 🚀

