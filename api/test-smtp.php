<?php
/**
 * SMTP Test Endpoint
 * Tests Gmail SMTP connection
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/utils.php';
require_once __DIR__ . '/../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

setCorsHeaders();

// Only allow GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    sendJsonResponse([
        'success' => false,
        'error' => 'Method not allowed'
    ], 405);
}

try {
    // Gmail SMTP configuration
    $smtpUser = SMTP_USER;
    $smtpPass = SMTP_PASS;
    
    logMessage("🔍 SMTP Test - Configuring Gmail SMTP...", "test-smtp");
    
    if (empty($smtpUser) || empty($smtpPass)) {
        logMessage("❌ SMTP Test - Credentials not configured", "test-smtp");
        sendJsonResponse([
            'success' => false,
            'error' => 'SMTP credentials not configured',
            'config' => [
                'hasUser' => !empty($smtpUser),
                'hasPass' => !empty($smtpPass),
                'service' => 'gmail'
            ]
        ], 400);
    }
    
    // Gmail SMTP transporter
    $mail = new PHPMailer(true);
    
    logMessage("🔍 SMTP Test - Verifying Gmail SMTP connection...", "test-smtp");
    $startTime = microtime(true);
    
    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = $smtpUser;
        $mail->Password = $smtpPass;
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;
        $mail->SMTPDebug = 0; // Set to 2 for verbose debugging
        $mail->Timeout = 30;
        
        // Test connection
        $mail->smtpConnect();
        $duration = round((microtime(true) - $startTime) * 1000);
        logMessage("✅ SMTP Test - Gmail SMTP verified in {$duration}ms", "test-smtp");
        
        sendJsonResponse([
            'success' => true,
            'message' => 'Gmail SMTP connection successful',
            'config' => [
                'service' => 'gmail',
                'user' => $smtpUser,
                'hasPassword' => !empty($smtpPass)
            ],
            'connectionTime' => $duration . 'ms'
        ]);
    } catch (Exception $verifyError) {
        $duration = round((microtime(true) - $startTime) * 1000);
        
        // FULL error logging
        logMessage("❌ SMTP Test - Gmail SMTP verification FAILED", "test-smtp");
        logMessage("   Error Message: " . $verifyError->getMessage(), "test-smtp");
        logMessage("   Error Code: " . $verifyError->getCode(), "test-smtp");
        logMessage("   Full Error: " . $verifyError->__toString(), "test-smtp");
        
        sendJsonResponse([
            'success' => false,
            'error' => $verifyError->getMessage() ?: 'Gmail SMTP verification failed',
            'code' => $verifyError->getCode(),
            'config' => [
                'service' => 'gmail',
                'user' => $smtpUser,
                'hasPassword' => !empty($smtpPass)
            ],
            'connectionTime' => $duration . 'ms',
            'details' => [
                'message' => $verifyError->getMessage(),
                'code' => $verifyError->getCode(),
                'stack' => $verifyError->getTraceAsString()
            ]
        ], 500);
    }
} catch (Exception $error) {
    logMessage("❌ SMTP Test - Unexpected error: " . $error->getMessage(), "test-smtp");
    logMessage("   Stack: " . $error->getTraceAsString(), "test-smtp");
    
    sendJsonResponse([
        'success' => false,
        'error' => $error->getMessage() ?: 'Unknown error',
        'stack' => $error->getTraceAsString()
    ], 500);
}

