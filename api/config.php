<?php
/**
 * Configuration file for ArdntLogic PHP Backend
 * Loads environment variables from .env file
 */

// Load environment variables
function loadEnv($path) {
    if (!file_exists($path)) {
        return;
    }
    
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) {
            continue;
        }
        
        list($name, $value) = explode('=', $line, 2);
        $name = trim($name);
        $value = trim($value);
        
        if (!array_key_exists($name, $_SERVER) && !array_key_exists($name, $_ENV)) {
            putenv(sprintf('%s=%s', $name, $value));
            $_ENV[$name] = $value;
            $_SERVER[$name] = $value;
        }
    }
}

// Load .env file
$envPath = dirname(__DIR__) . '/.env';
loadEnv($envPath);

// Get environment variable with fallback
function env($key, $default = null) {
    $value = getenv($key);
    if ($value === false) {
        return $default;
    }
    return $value;
}

// SMTP Configuration
define('SMTP_USER', env('SMTP_USER', ''));
define('SMTP_PASS', env('SMTP_PASS', ''));
define('SMTP_HOST', env('SMTP_HOST', 'smtp.gmail.com'));
define('SMTP_PORT', (int)env('SMTP_PORT', 587));
define('SMTP_SECURE', env('SMTP_SECURE', 'tls'));
define('RECIPIENT_EMAIL', env('RECIPIENT_EMAIL', SMTP_USER));
define('BASE_URL', env('BASE_URL', 'http://localhost'));
define('LOGO_URL', env('LOGO_URL', BASE_URL . '/logo.png'));
define('EMAIL_ENABLED', env('EMAIL_ENABLED', 'true') !== 'false');

// MySQL Database Configuration
define('DB_HOST', env('DB_HOST', 'localhost'));
define('DB_PORT', (int)env('DB_PORT', 3306));
define('DB_NAME', env('DB_NAME', 'ardntlogic'));
define('DB_USER', env('DB_USER', 'root'));
define('DB_PASS', env('DB_PASS', ''));
define('DB_CHARSET', env('DB_CHARSET', 'utf8mb4'));
define('USE_DATABASE', env('USE_DATABASE', 'true') !== 'false');

// Paths
define('SUBMISSIONS_FILE', dirname(__DIR__) . '/contact_submissions.json');
define('ERROR_LOG_FILE', dirname(__DIR__) . '/email_errors.log');
define('LOGO_PATH', dirname(__DIR__) . '/client/public/logo.png');

