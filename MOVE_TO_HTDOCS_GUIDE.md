# Moving Project to htdocs - Guide

## Option 1: Move Entire Project (Recommended)

### Steps:

1. **Close any running servers/processes** (Node.js dev server, etc.)

2. **Move the project folder:**
   - From: `D:\Modern-Site`
   - To: `C:\xampp\htdocs\Modern-Site`

3. **Update your `.env` file** (if it has absolute paths):
   ```env
   BASE_URL=http://localhost:8080
   LOGO_URL=http://localhost:8080/logo.png
   ```

4. **Access your site:**
   - http://localhost:8080/Modern-Site
   - http://localhost:8080/Modern-Site/api/health

### Pros:
- ✅ No Apache configuration changes needed
- ✅ Works immediately
- ✅ Standard XAMPP setup

### Cons:
- ❌ Project is in XAMPP directory (not your preferred location)
- ❌ Need to update URLs to include `/Modern-Site` path

## Option 2: Create Symbolic Link (Best of Both Worlds)

Keep project in `D:\Modern-Site` but create a link in htdocs:

1. **Open Command Prompt as Administrator**

2. **Run:**
   ```powershell
   mklink /D "C:\xampp\htdocs\Modern-Site" "D:\Modern-Site"
   ```

3. **Access via:** http://localhost:8080/Modern-Site

### Pros:
- ✅ Project stays in `D:\Modern-Site`
- ✅ No Apache config changes
- ✅ Changes in `D:\Modern-Site` reflect immediately

### Cons:
- ❌ Still need `/Modern-Site` in URLs

## Option 3: Move to htdocs Root (Simplest URLs)

Move project contents directly to htdocs:

1. **Move all files from `D:\Modern-Site` to `C:\xampp\htdocs`**

2. **Access directly:**
   - http://localhost:8080
   - http://localhost:8080/api/health

### Pros:
- ✅ Cleanest URLs (no subdirectory)
- ✅ No path changes needed

### Cons:
- ❌ Mixes your project with XAMPP files
- ❌ Harder to manage multiple projects

## Recommendation

**Option 2 (Symbolic Link)** is best because:
- Project stays where you want it (`D:\Modern-Site`)
- No file copying needed
- Works immediately
- Easy to remove later

Just need to update `.htaccess` RewriteBase if using symbolic link.

