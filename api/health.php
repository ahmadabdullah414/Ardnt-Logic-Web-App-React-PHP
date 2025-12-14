<?php
/**
 * Health Check Endpoint
 */

require_once __DIR__ . '/utils.php';

setCorsHeaders();

sendJsonResponse([
    'status' => 'ok',
    'message' => 'ArdntLogic contact form server is running',
    'timestamp' => date('c')
]);

