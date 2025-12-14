# Apache Document Root Configuration

## Problem
Apache is running on port 8080, but the document root is pointing to `C:\xampp\htdocs` instead of your project directory `D:\Modern-Site`.

## Solution: Configure Apache Document Root

### Method 1: Change Apache Document Root (Recommended)

1. **Open XAMPP Control Panel**

2. **Click "Config" next to Apache**

3. **Select "httpd.conf"**

4. **Find this line (around line 250):**
   ```apache
   DocumentRoot "C:/xampp/htdocs"
   ```
   And this line (around line 251):
   ```apache
   <Directory "C:/xampp/htdocs">
   ```

5. **Change both to your project directory:**
   ```apache
   DocumentRoot "D:/Modern-Site"
   ```
   And:
   ```apache
   <Directory "D:/Modern-Site">
   ```

6. **Also find and update this section (around line 260):**
   ```apache
   <Directory "C:/xampp/htdocs">
   ```
   Change to:
   ```apache
   <Directory "D:/Modern-Site">
   ```

7. **Save the file (Ctrl+S)**

8. **Restart Apache** from XAMPP Control Panel

9. **Test:**
   - http://localhost:8080/api/health
   - http://localhost:8080

### Method 2: Use VirtualHost (Alternative)

If you want to keep XAMPP's default htdocs, you can add a VirtualHost:

1. **Open `httpd.conf`**

2. **Find this line (around line 500):**
   ```apache
   # Virtual hosts
   # Include conf/extra/httpd-vhosts.conf
   ```

3. **Uncomment it:**
   ```apache
   # Virtual hosts
   Include conf/extra/httpd-vhosts.conf
   ```

4. **Open:** `C:\xampp\apache\conf\extra\httpd-vhosts.conf`

5. **Add at the end:**
   ```apache
   <VirtualHost *:8080>
       DocumentRoot "D:/Modern-Site"
       ServerName localhost
       <Directory "D:/Modern-Site">
           Options Indexes FollowSymLinks
           AllowOverride All
           Require all granted
       </Directory>
   </VirtualHost>
   ```

6. **Save and restart Apache**

### Method 3: Use Symbolic Link (Quick Fix)

Create a symbolic link from htdocs to your project:

1. **Open Command Prompt as Administrator**

2. **Run:**
   ```powershell
   mklink /D "C:\xampp\htdocs\Modern-Site" "D:\Modern-Site"
   ```

3. **Access via:** http://localhost:8080/Modern-Site

**Note:** This method requires updating `.htaccess` RewriteBase to `/Modern-Site`

## Verify Configuration

After configuration, test:

1. **Health endpoint:**
   ```
   http://localhost:8080/api/health
   ```
   Should return: `{"status":"ok","message":"PHP backend is running"}`

2. **Frontend:**
   ```
   http://localhost:8080
   ```
   Should show your React app

3. **Check Apache error log** if issues persist:
   - XAMPP Control Panel → Apache → Logs → Error Log

## Important Notes

- **Use forward slashes** (`/`) in paths, not backslashes (`\`)
- **Restart Apache** after any configuration changes
- **Ensure `mod_rewrite` is enabled** (should be by default in XAMPP)
- **Check `.htaccess` is being read** - if not, add `AllowOverride All` in Directory directive

## Troubleshooting

### 403 Forbidden Error
- Check Directory permissions in `httpd.conf`
- Ensure `Require all granted` is set
- Check Windows folder permissions

### 404 Not Found
- Verify DocumentRoot path is correct
- Check `.htaccess` file exists in project root
- Verify `mod_rewrite` is enabled: `LoadModule rewrite_module modules/mod_rewrite.so`

### .htaccess Not Working
- Check `AllowOverride All` is set in Directory directive
- Verify `mod_rewrite` is enabled
- Check Apache error log for specific errors

