<?php
/**
 * API Index - Fallback router
 * This file can be used as a router if .htaccess is not available
 */

$requestUri = $_SERVER['REQUEST_URI'];
$requestMethod = $_SERVER['REQUEST_METHOD'];

// Remove query string
$path = parse_url($requestUri, PHP_URL_PATH);

// Route to appropriate endpoint
if (preg_match('#^/api/contact$#', $path) && $requestMethod === 'POST') {
    require_once __DIR__ . '/contact.php';
    exit;
} elseif (preg_match('#^/api/health$#', $path) && $requestMethod === 'GET') {
    require_once __DIR__ . '/health.php';
    exit;
} elseif (preg_match('#^/api/test-smtp$#', $path) && $requestMethod === 'GET') {
    require_once __DIR__ . '/test-smtp.php';
    exit;
} elseif (preg_match('#^/logo\.png$#', $path) && $requestMethod === 'GET') {
    require_once __DIR__ . '/logo.php';
    exit;
} else {
    http_response_code(404);
    header('Content-Type: application/json');
    echo json_encode([
        'success' => false,
        'error' => 'Endpoint not found'
    ]);
    exit;
}

