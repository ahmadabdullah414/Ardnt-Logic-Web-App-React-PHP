<?php
/**
 * Logo Serving Endpoint
 */

require_once __DIR__ . '/config.php';

$logoPath = LOGO_PATH;

if (file_exists($logoPath)) {
    header('Content-Type: image/png');
    header('Content-Length: ' . filesize($logoPath));
    header('Cache-Control: public, max-age=31536000');
    readfile($logoPath);
    exit;
} else {
    http_response_code(404);
    header('Content-Type: text/plain');
    echo 'Logo not found';
    exit;
}

