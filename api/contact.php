<?php
/**
 * Contact Form Endpoint
 * Handles form submissions, email sending, and data storage
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/utils.php';
require_once __DIR__ . '/database.php';

// Load PHPMailer if available
$phpmailerAvailable = false;
if (file_exists(__DIR__ . '/../vendor/autoload.php')) {
    require_once __DIR__ . '/../vendor/autoload.php';
    $phpmailerAvailable = class_exists('PHPMailer\PHPMailer\PHPMailer');
}

// Set CORS headers
setCorsHeaders();

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse([
        'success' => false,
        'error' => 'Method not allowed'
    ], 405);
}

$startTime = microtime(true);
$sanitizedData = null;

try {
    // Get JSON input
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        sendJsonResponse([
            'success' => false,
            'error' => 'Invalid JSON data'
        ], 400);
    }
    
    // Extract form data
    $fullName = $data['fullName'] ?? '';
    $email = $data['email'] ?? '';
    $phone = $data['phone'] ?? '';
    $message = $data['message'] ?? '';
    $date = $data['date'] ?? null;
    $time = $data['time'] ?? null;
    $topic = $data['topic'] ?? null;
    
    // Validation
    if (empty($fullName) || strlen(trim($fullName)) < 2) {
        sendJsonResponse([
            'success' => false,
            'error' => 'Full name must be at least 2 characters long'
        ], 400);
    }
    
    if (empty($email) || !validateEmail(trim($email))) {
        sendJsonResponse([
            'success' => false,
            'error' => 'Please provide a valid email address'
        ], 400);
    }
    
    if (empty($phone) || strlen(trim($phone)) < 10) {
        sendJsonResponse([
            'success' => false,
            'error' => 'Phone number must be at least 10 digits'
        ], 400);
    }
    
    if (empty($message) || strlen(trim($message)) < 10) {
        sendJsonResponse([
            'success' => false,
            'error' => 'Message must be at least 10 characters long'
        ], 400);
    }
    
    // Sanitize inputs
    $sanitizedData = [
        'fullName' => trim($fullName),
        'email' => strtolower(trim($email)),
        'phone' => trim($phone),
        'message' => trim($message),
        'date' => $date ? trim($date) : null,
        'time' => $time ? trim($time) : null,
        'topic' => $topic ? trim($topic) : null,
        'timestamp' => date('c'), // ISO 8601 format
        'ip' => getClientIp()
    ];
    
    // Prepare email templates
    $baseUrl = BASE_URL;
    if (empty($baseUrl)) {
        $protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http';
        $host = $_SERVER['HTTP_HOST'] ?? 'localhost';
        $baseUrl = $protocol . '://' . $host;
    }
    $logoUrl = LOGO_URL ?: ($baseUrl . '/logo.png');
    
    // Escape message for HTML
    $escapedMessage = htmlspecialchars($sanitizedData['message'], ENT_QUOTES, 'UTF-8');
    $formattedMessage = nl2br($escapedMessage);
    
    // Create HTML email template
    $htmlEmail = '<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Client Submission - ArdntLogic</title>
</head>
<body style="margin: 0; padding: 0; background-color: #e8f0f5; font-family: Arial, Helvetica, sans-serif;">
    <div class="preheader" style="display: none !important;">New client submission from ' . htmlspecialchars($sanitizedData['fullName'], ENT_QUOTES, 'UTF-8') . '</div>
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #e8f0f5;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 12px;">
                    <tr>
                        <td style="padding: 30px;">
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="padding-bottom: 20px;">
                                        <span style="font-size: 24px; font-weight: bold; color: #1a3a5c;">ArdntLogic</span>
                                    </td>
                                </tr>
                            </table>
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td align="center" style="padding-bottom: 10px;">
                                        <h1 style="margin: 0; font-size: 32px; font-weight: bold; color: #1a3a5c; text-align: center;">NEW CLIENT SUBMISSION</h1>
                                    </td>
                                </tr>
                            </table>
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                <tr>
                                    <td style="padding: 0 30px 30px 30px;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                            <tr>
                                                <td width="48%" style="vertical-align: top; padding-right: 2%;">
                                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 8px;">
                                                        <tr>
                                                            <td style="padding: 20px;">
                                                                <h3 style="margin: 0 0 15px 0; font-size: 14px; font-weight: bold; color: #333333;">CLIENT INFORMATION</h3>
                                                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                                                    <tr>
                                                                        <td style="padding-bottom: 10px;">
                                                                            <span style="font-size: 13px; font-weight: bold; color: #333333;">Client Name:</span><br>
                                                                            <a href="#" style="font-size: 13px; color: #4a90e2;">' . htmlspecialchars($sanitizedData['fullName'], ENT_QUOTES, 'UTF-8') . '</a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td style="padding-bottom: 10px;">
                                                                            <span style="font-size: 13px; font-weight: bold; color: #333333;">Phone Number:</span><br>
                                                                            <a href="tel:' . htmlspecialchars($sanitizedData['phone'], ENT_QUOTES, 'UTF-8') . '" style="font-size: 13px; color: #4a90e2;">' . htmlspecialchars($sanitizedData['phone'], ENT_QUOTES, 'UTF-8') . '</a>
                                                                        </td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td>
                                                                            <span style="font-size: 13px; font-weight: bold; color: #333333;">Email Address:</span><br>
                                                                            <a href="mailto:' . htmlspecialchars($sanitizedData['email'], ENT_QUOTES, 'UTF-8') . '" style="font-size: 13px; color: #4a90e2;">' . htmlspecialchars($sanitizedData['email'], ENT_QUOTES, 'UTF-8') . '</a>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                                <td width="48%" style="vertical-align: top; padding-left: 2%;">
                                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 8px;">
                                                        <tr>
                                                            <td style="padding: 20px;">
                                                                <h3 style="margin: 0 0 15px 0; font-size: 14px; font-weight: bold; color: #333333;">APPOINTMENT DETAILS</h3>
                                                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">' .
    ($sanitizedData['date'] ? '<tr><td style="padding-bottom: 10px;"><span style="font-size: 13px; font-weight: bold; color: #333333;">Preferred Date:</span><br><span style="font-size: 13px; color: #333333;">' . htmlspecialchars($sanitizedData['date'], ENT_QUOTES, 'UTF-8') . '</span></td></tr>' : '') .
    ($sanitizedData['time'] ? '<tr><td style="padding-bottom: 10px;"><span style="font-size: 13px; font-weight: bold; color: #333333;">Preferred Time:</span><br><span style="font-size: 13px; color: #4a90e2;">' . htmlspecialchars($sanitizedData['time'], ENT_QUOTES, 'UTF-8') . '</span></td></tr>' : '') .
    ($sanitizedData['topic'] ? '<tr><td><span style="font-size: 13px; font-weight: bold; color: #333333;">Subject/Topic:</span><br><span style="font-size: 13px; color: #4a90e2;">' . htmlspecialchars($sanitizedData['topic'], ENT_QUOTES, 'UTF-8') . '</span></td></tr>' : '<tr><td style="font-size: 13px; color: #888888;">No appointment details provided</td></tr>') .
                                                                '</table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colspan="2" style="padding-top: 20px;">
                                                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                                        <tr>
                                                            <td width="48%" style="vertical-align: top; padding-right: 2%;">
                                                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 8px;">
                                                                    <tr>
                                                                        <td style="padding: 20px;">
                                                                            <h3 style="margin: 0 0 15px 0; font-size: 14px; font-weight: bold; color: #333333;">Next Steps:</h3>
                                                                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                                                                <tr>
                                                                                    <td style="padding-bottom: 8px;"><span style="color: #4a90e2; font-size: 16px;">•</span> Review the preferred date and time.</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td style="padding-bottom: 8px;"><span style="color: #4a90e2; font-size: 16px;">•</span> Respond to the client via email or phone to confirm.</td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td><span style="color: #4a90e2; font-size: 16px;">•</span> Process this request in your CRM/Calendar system.</td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            <td width="48%" style="vertical-align: top; padding-left: 2%;">
                                                                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 8px;">
                                                                    <tr>
                                                                        <td style="padding: 20px;">
                                                                            <h3 style="margin: 0 0 15px 0; font-size: 14px; font-weight: bold; color: #333333;">CLIENT MESSAGE</h3>
                                                                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                                                                                <tr>
                                                                                    <td style="padding: 15px; background-color: #f8f9fa; border-left: 3px solid #4a90e2; border-radius: 4px;">
                                                                                        <p style="margin: 0; font-size: 13px; color: #333333; line-height: 1.6; font-style: italic;">' . $formattedMessage . '</p>
                                                                                    </td>
                                                                                </tr>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>';
    
    // Create plain text version
    $textEmail = "NEW CLIENT SUBMISSION - ArdntLogic\nProfessional Web Agency\n\n";
    $textEmail .= "Appointment/Inquiry Details:\n";
    $textEmail .= "============================\n";
    $textEmail .= "Full Name: " . $sanitizedData['fullName'] . "\n";
    $textEmail .= "Phone Number: " . $sanitizedData['phone'] . "\n";
    $textEmail .= "Email Address: " . $sanitizedData['email'] . "\n";
    if ($sanitizedData['date']) {
        $textEmail .= "Preferred Date: " . $sanitizedData['date'] . "\n";
    }
    if ($sanitizedData['time']) {
        $textEmail .= "Preferred Time: " . $sanitizedData['time'] . "\n";
    }
    if ($sanitizedData['topic']) {
        $textEmail .= "Subject/Topic: " . $sanitizedData['topic'] . "\n";
    }
    $textEmail .= "\nClient Message:\n";
    $textEmail .= "===============\n";
    $textEmail .= $sanitizedData['message'] . "\n\n";
    $textEmail .= "Submitted: " . date('Y-m-d H:i:s', strtotime($sanitizedData['timestamp'])) . "\n";
    $textEmail .= "IP: " . $sanitizedData['ip'] . "\n\n";
    $textEmail .= "This is an automated message from your ArdntLogic contact form.";
    
    // Check if email is enabled
    $emailEnabled = EMAIL_ENABLED;
    
    if (!$emailEnabled) {
        logMessage("📧 Email disabled via EMAIL_ENABLED=false, skipping email logic", "contact");
    }
    
    // SAVE FORM SUBMISSION FIRST (always, regardless of email status)
    // Try to save to database first, fallback to JSON file
    $savedToDatabase = false;
    if (USE_DATABASE) {
        try {
            if (saveSubmissionToDatabase($sanitizedData)) {
                $savedToDatabase = true;
                logMessage("✅ Submission saved to MySQL database", "contact");
            } else {
                logMessage("⚠️ Warning: Could not save submission to database, falling back to JSON file", "contact");
            }
        } catch (\Exception $dbError) {
            logMessage("⚠️ Warning: Database error: " . $dbError->getMessage() . ", falling back to JSON file", "contact");
        }
    }
    
    // Also save to JSON file as backup (or primary if database is disabled)
    if (!$savedToDatabase || !USE_DATABASE) {
        try {
            $submissions = readJsonFile(SUBMISSIONS_FILE);
            $submissions[] = $sanitizedData;
            if (writeJsonFile(SUBMISSIONS_FILE, $submissions)) {
                logMessage("✅ Submission saved to " . SUBMISSIONS_FILE, "contact");
            } else {
                logMessage("⚠️ Warning: Could not save submission to file", "contact");
            }
        } catch (\Exception $saveError) {
            logMessage("⚠️ Warning: Could not save submission to file: " . $saveError->getMessage(), "contact");
        }
    }
    
    // Email sending is NON-BLOCKING - attempt to send but don't fail the request
    $emailSent = false;
    $emailError = null;
    
    if ($emailEnabled) {
        try {
            // Check SMTP configuration - Gmail SMTP
            $smtpUser = SMTP_USER;
            $smtpPass = SMTP_PASS;
            
            if (!$phpmailerAvailable) {
                logMessage("⚠️ Email not sent: PHPMailer not installed. Run 'composer install' to install dependencies", "contact");
                $emailError = "PHPMailer not installed";
            } elseif (empty($smtpUser) || empty($smtpPass)) {
                logMessage("⚠️ Email not sent: SMTP credentials not configured", "contact");
                $emailError = "SMTP credentials not configured";
            } else {
                // Gmail SMTP configuration
                logMessage("📧 Configuring Gmail SMTP...", "contact");
                
                $mail = new \PHPMailer\PHPMailer\PHPMailer(true);
                
                try {
                    // Server settings
                    $mail->isSMTP();
                    $mail->Host = 'smtp.gmail.com';
                    $mail->SMTPAuth = true;
                    $mail->Username = $smtpUser;
                    $mail->Password = $smtpPass;
                    $mail->SMTPSecure = \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
                    $mail->Port = 587;
                    $mail->CharSet = 'UTF-8';
                    
                    // Attempt SMTP verification (non-blocking)
                    logMessage("🔍 Verifying Gmail SMTP connection...", "contact");
                    $mail->smtpConnect();
                    logMessage("✅ Gmail SMTP verified", "contact");
                    
                    // Recipient
                    $recipientEmail = RECIPIENT_EMAIL ?: $smtpUser;
                    
                    // Email content
                    $mail->setFrom($smtpUser, 'ArdntLogic Contact Form');
                    $mail->addAddress($recipientEmail);
                    $mail->addReplyTo($sanitizedData['email'], $sanitizedData['fullName']);
                    $mail->isHTML(true);
                    $mail->Subject = 'New Contact Submission - ' . $sanitizedData['fullName'];
                    $mail->Body = $htmlEmail;
                    $mail->AltBody = $textEmail;
                    
                    // Send email with timeout
                    $mail->Timeout = 30;
                    $mail->send();
                    $emailSent = true;
                    logMessage("✅ Email sent successfully! Message ID: " . $mail->getLastMessageID(), "contact");
                } catch (\PHPMailer\PHPMailer\Exception $mailError) {
                    // FULL error logging - NO hiding
                    logMessage("❌ Gmail SMTP verification/send FAILED", "contact");
                    logMessage("   Error Message: " . $mailError->getMessage(), "contact");
                    logMessage("   Error Code: " . $mailError->getCode(), "contact");
                    logMessage("   SMTP Config: Service=gmail, User=" . $smtpUser, "contact");
                    logMessage("   Full Error: " . $mailError->__toString(), "contact");
                    
                    $emailError = $mailError->getMessage();
                    logMessage("⚠️ Email not sent: Gmail SMTP blocked or credentials rejected", "contact");
                }
            }
        } catch (\Exception $emailConfigError) {
            logMessage("⚠️ Email not sent: Configuration error", "contact");
            logMessage("   Error: " . $emailConfigError->getMessage(), "contact");
            $emailError = $emailConfigError->getMessage();
        }
    }
    
    // ALWAYS return success - email is non-blocking
    $processingTime = round((microtime(true) - $startTime) * 1000);
    sendJsonResponse([
        'success' => true,
        'message' => "Thank you for contacting ArdntLogic! Your message has been received and we'll get back to you within 24 hours.",
        'processingTime' => $processingTime . 'ms'
    ]);
    
} catch (\Exception $error) {
    // FULL error logging - NO hiding
    logMessage("❌ Contact form error occurred", "contact");
    logMessage("   Error Message: " . $error->getMessage(), "contact");
    logMessage("   Error Code: " . $error->getCode(), "contact");
    logMessage("   Error Stack: " . $error->getTraceAsString(), "contact");
    
    // Save error details for debugging
    try {
        $errorData = [
            'timestamp' => date('c'),
            'error' => [
                'message' => $error->getMessage(),
                'code' => $error->getCode(),
                'stack' => $error->getTraceAsString()
            ],
            'body' => $data ?? null,
            'ip' => getClientIp()
        ];
        appendToLog(ERROR_LOG_FILE, $errorData);
    } catch (\Exception $logError) {
        logMessage("⚠️ Could not log error to file: " . $logError->getMessage(), "contact");
    }
    
    // Try to save submission even if email verification failed
    try {
        $submissionData = $sanitizedData ?: [
            'fullName' => $data['fullName'] ?? 'Unknown',
            'email' => $data['email'] ?? 'unknown@example.com',
            'phone' => $data['phone'] ?? 'Unknown',
            'message' => $data['message'] ?? 'No message',
            'date' => $data['date'] ?? null,
            'time' => $data['time'] ?? null,
            'topic' => $data['topic'] ?? null,
            'timestamp' => date('c'),
            'ip' => getClientIp(),
            'emailError' => $error->getMessage()
        ];
        
        $submissions = readJsonFile(SUBMISSIONS_FILE);
        $submissions[] = $submissionData;
        writeJsonFile(SUBMISSIONS_FILE, $submissions);
        logMessage("✅ Submission saved despite email error", "contact");
    } catch (\Exception $saveError) {
        logMessage("⚠️ Could not save submission: " . $saveError->getMessage(), "contact");
    }
    
    // ALWAYS return success - email failures are non-blocking
    $processingTime = round((microtime(true) - $startTime) * 1000);
    sendJsonResponse([
        'success' => true,
        'message' => "Thank you for contacting ArdntLogic! Your message has been received and we'll get back to you within 24 hours.",
        'processingTime' => $processingTime . 'ms'
    ]);
}

