<?php
/**
 * Static File Server
 * Serves the built frontend files
 */

// Handle OPTIONS preflight requests for CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Max-Age: 86400');
    http_response_code(200);
    exit;
}

$requestUri = $_SERVER['REQUEST_URI'];
$path = parse_url($requestUri, PHP_URL_PATH);

// Get the project root directory name (e.g., /Modern-Site)
// The script is in api/, so project root is one level up
$scriptName = $_SERVER['SCRIPT_NAME'];
$projectRoot = dirname(dirname($scriptName));
if ($projectRoot === '/' || $projectRoot === '\\' || $projectRoot === '.') {
    $projectRoot = '';
} else {
    $projectRoot = '/' . trim($projectRoot, '/\\');
}

// Remove project root from request path if present
// e.g., /Modern-Site/assets/file.js -> assets/file.js
if ($projectRoot && strpos($path, $projectRoot) === 0) {
    $path = substr($path, strlen($projectRoot));
}

// Remove leading slash
$path = ltrim($path, '/');

// Security: prevent directory traversal
if (strpos($path, '..') !== false) {
    http_response_code(403);
    exit('Forbidden');
}

// Check if file exists in dist/public (production build)
$distPath = dirname(__DIR__) . '/dist/public/' . $path;
if (file_exists($distPath) && is_file($distPath)) {
    // Determine MIME type based on extension (more reliable than mime_content_type)
    $ext = strtolower(pathinfo($distPath, PATHINFO_EXTENSION));
    $mimeTypes = [
        'html' => 'text/html; charset=utf-8',
        'css' => 'text/css; charset=utf-8',
        'js' => 'application/javascript; charset=utf-8',
        'mjs' => 'application/javascript; charset=utf-8',
        'json' => 'application/json; charset=utf-8',
        'png' => 'image/png',
        'jpg' => 'image/jpeg',
        'jpeg' => 'image/jpeg',
        'gif' => 'image/gif',
        'svg' => 'image/svg+xml',
        'ico' => 'image/x-icon',
        'woff' => 'font/woff',
        'woff2' => 'font/woff2',
        'ttf' => 'font/ttf',
        'eot' => 'application/vnd.ms-fontobject'
    ];
    $mimeType = $mimeTypes[$ext] ?? 'application/octet-stream';
    
    // Set CORS headers for ES modules (required for dynamic imports)
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Expose-Headers: Content-Type, Content-Length');
    
    // For ES modules, ensure correct MIME type
    if ($ext === 'js' || $ext === 'mjs') {
        header('Content-Type: application/javascript; charset=utf-8');
    } else {
        header('Content-Type: ' . $mimeType);
    }
    
    header('Content-Length: ' . filesize($distPath));
    
    // Cache static assets
    if (preg_match('/\.(css|js|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|ico)$/', $path)) {
        header('Cache-Control: public, max-age=31536000');
    }
    
    readfile($distPath);
    exit;
}

// For SPA routing: serve index.html for all non-API routes
$indexPath = dirname(__DIR__) . '/dist/public/index.html';
if (file_exists($indexPath) && !preg_match('#^api/#', $path)) {
    header('Content-Type: text/html');
    readfile($indexPath);
    exit;
}

// 404
http_response_code(404);
header('Content-Type: text/plain');
echo '404 - Not Found';

