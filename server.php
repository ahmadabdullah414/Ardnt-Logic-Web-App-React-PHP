<?php
/**
 * PHP Development Server Router
 * Use this for development: php -S localhost:8000 server.php
 */

$requestUri = $_SERVER['REQUEST_URI'];
$requestMethod = $_SERVER['REQUEST_METHOD'];

// Remove query string
$path = parse_url($requestUri, PHP_URL_PATH);

// Serve static files from dist/public if they exist (production)
$staticPath = __DIR__ . '/dist/public' . $path;
if ($path !== '/' && file_exists($staticPath) && is_file($staticPath)) {
    $mimeType = mime_content_type($staticPath) ?: 'application/octet-stream';
    header('Content-Type: ' . $mimeType);
    readfile($staticPath);
    exit;
}

// Serve static files if they exist in root
if ($path !== '/' && file_exists(__DIR__ . $path)) {
    return false; // Serve the file as-is
}

// Route API endpoints
if (preg_match('#^/api/contact$#', $path) && $requestMethod === 'POST') {
    require_once __DIR__ . '/api/contact.php';
    exit;
} elseif (preg_match('#^/api/health$#', $path) && $requestMethod === 'GET') {
    require_once __DIR__ . '/api/health.php';
    exit;
} elseif (preg_match('#^/api/test-smtp$#', $path) && $requestMethod === 'GET') {
    require_once __DIR__ . '/api/test-smtp.php';
    exit;
} elseif (preg_match('#^/logo\.png$#', $path) && $requestMethod === 'GET') {
    require_once __DIR__ . '/api/logo.php';
    exit;
}

// For frontend routing, serve index.html (if using SPA)
// Check dist/public first (production build), then client (development)
$indexPath = __DIR__ . '/dist/public/index.html';
if (!file_exists($indexPath)) {
    $indexPath = __DIR__ . '/client/index.html';
}

if (file_exists($indexPath) && !preg_match('#^/api/#', $path)) {
    header('Content-Type: text/html');
    readfile($indexPath);
    exit;
}

// 404
http_response_code(404);
echo "404 - Not Found";

