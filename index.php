<?php
/**
 * Root Index File
 * Serves the React frontend application
 */

// Serve the built frontend from dist/public
$indexPath = __DIR__ . '/dist/public/index.html';

if (file_exists($indexPath)) {
    // Determine the base path from the request
    $requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $scriptName = $_SERVER['SCRIPT_NAME'];
    
    // Get the directory from script name (e.g., /Modern/index.php -> /Modern/)
    $basePath = dirname($scriptName);
    
    // Normalize the path - ensure it starts with / and ends with /
    if ($basePath === '/' || $basePath === '\\' || $basePath === '.') {
        $basePath = '/';  // Root directory
    } else {
        // Ensure it starts with / and ends with /
        $basePath = '/' . trim($basePath, '/\\') . '/';
    }
    
    // Read the HTML content
    $html = file_get_contents($indexPath);
    
    // Remove any existing base tag
    $html = preg_replace('/<base[^>]*>/i', '', $html);
    
    // Remove crossorigin attributes for same-origin requests
    $html = preg_replace('/\s+crossorigin="[^"]*"/i', '', $html);
    $html = preg_replace("/\s+crossorigin='[^']*'/i", '', $html);
    $html = preg_replace('/\s+crossorigin\b/i', '', $html);
    
    // Add the correct base tag
    $baseTag = '<base href="' . htmlspecialchars($basePath, ENT_QUOTES, 'UTF-8') . '">';
    $html = str_replace('<head>', '<head>' . $baseTag, $html);
    
    // Set proper headers
    header('Content-Type: text/html; charset=utf-8');
    header('X-Content-Type-Options: nosniff');
    
    echo $html;
    exit;
}

// Fallback: 404 if index.html doesn't exist
http_response_code(404);
header('Content-Type: text/plain');
echo '404 - Frontend not found. Please run: npm run build';

