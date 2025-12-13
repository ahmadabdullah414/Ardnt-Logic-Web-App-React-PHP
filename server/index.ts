import "dotenv/config";
import express, { type Request, Response, NextFunction } from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import { createServer } from "http";
import { serveStatic } from "./static";
import fs from "fs";
import path from "path";

const app = express();
const httpServer = createServer(app);

// Enable CORS
app.use(cors());

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Logging function
export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      log(`${req.method} ${path} ${res.statusCode} in ${duration}ms`);
    }
  });
  next();
});

// Serve logo image
app.get('/logo.png', (req: Request, res: Response) => {
  const logoPath = path.join(process.cwd(), 'client', 'public', 'logo.png');
  if (fs.existsSync(logoPath)) {
    res.sendFile(logoPath);
  } else {
    res.status(404).send('Logo not found');
  }
});

// Contact form endpoint
app.post("/api/contact", async (req: Request, res: Response) => {
  const startTime = Date.now();
  let sanitizedData: any = null;

  try {
    const { fullName, email, phone, message, date, time, topic } = req.body;

    // Validation
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: "Full name must be at least 2 characters long"
      });
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: "Please provide a valid email address"
      });
    }

    if (!phone || typeof phone !== 'string' || phone.trim().length < 10) {
      return res.status(400).json({
        success: false,
        error: "Phone number must be at least 10 digits"
      });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return res.status(400).json({
        success: false,
        error: "Message must be at least 10 characters long"
      });
    }

    // Sanitize inputs
    sanitizedData = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      message: message.trim(),
      date: date ? date.trim() : null,
      time: time ? time.trim() : null,
      topic: topic ? topic.trim() : null,
      timestamp: new Date().toISOString(),
      ip: req.ip || req.connection.remoteAddress || 'unknown'
    };

    // Prepare email templates (needed for email sending) - define early
    const baseUrl = process.env.BASE_URL || (req.protocol + '://' + (req.get('host') || 'localhost:5000'));
    const logoUrl = process.env.LOGO_URL || `${baseUrl}/logo.png`;
    
    // Create professional HTML email template
    const htmlEmail = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>New Client Submission - ArdntLogic</title></head><body style="margin: 0; padding: 0; background-color: #e8f0f5; font-family: Arial, Helvetica, sans-serif;"><div class="preheader" style="display: none !important;">New client submission from ${sanitizedData.fullName}</div><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #e8f0f5;"><tr><td align="center" style="padding: 40px 20px;"><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 12px;"><tr><td style="padding: 30px;"><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr><td style="padding-bottom: 20px;"><span style="font-size: 24px; font-weight: bold; color: #1a3a5c;">ArdntLogic</span></td></tr></table><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr><td align="center" style="padding-bottom: 10px;"><h1 style="margin: 0; font-size: 32px; font-weight: bold; color: #1a3a5c; text-align: center;">NEW CLIENT SUBMISSION</h1></td></tr></table><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr><td style="padding: 0 30px 30px 30px;"><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr><td width="48%" style="vertical-align: top; padding-right: 2%;"><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 8px;"><tr><td style="padding: 20px;"><h3 style="margin: 0 0 15px 0; font-size: 14px; font-weight: bold; color: #333333;">CLIENT INFORMATION</h3><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr><td style="padding-bottom: 10px;"><span style="font-size: 13px; font-weight: bold; color: #333333;">Client Name:</span><br><a href="#" style="font-size: 13px; color: #4a90e2;">${sanitizedData.fullName}</a></td></tr><tr><td style="padding-bottom: 10px;"><span style="font-size: 13px; font-weight: bold; color: #333333;">Phone Number:</span><br><a href="tel:${sanitizedData.phone}" style="font-size: 13px; color: #4a90e2;">${sanitizedData.phone}</a></td></tr><tr><td><span style="font-size: 13px; font-weight: bold; color: #333333;">Email Address:</span><br><a href="mailto:${sanitizedData.email}" style="font-size: 13px; color: #4a90e2;">${sanitizedData.email}</a></td></tr></table></td></tr></table></td><td width="48%" style="vertical-align: top; padding-left: 2%;"><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 8px;"><tr><td style="padding: 20px;"><h3 style="margin: 0 0 15px 0; font-size: 14px; font-weight: bold; color: #333333;">APPOINTMENT DETAILS</h3><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">${sanitizedData.date ? `<tr><td style="padding-bottom: 10px;"><span style="font-size: 13px; font-weight: bold; color: #333333;">Preferred Date:</span><br><span style="font-size: 13px; color: #333333;">${sanitizedData.date}</span></td></tr>` : ''}${sanitizedData.time ? `<tr><td style="padding-bottom: 10px;"><span style="font-size: 13px; font-weight: bold; color: #333333;">Preferred Time:</span><br><span style="font-size: 13px; color: #4a90e2;">${sanitizedData.time}</span></td></tr>` : ''}${sanitizedData.topic ? `<tr><td><span style="font-size: 13px; font-weight: bold; color: #333333;">Subject/Topic:</span><br><span style="font-size: 13px; color: #4a90e2;">${sanitizedData.topic}</span></td></tr>` : '<tr><td style="font-size: 13px; color: #888888;">No appointment details provided</td></tr>'}</table></td></tr></table></td></tr><tr><td colspan="2" style="padding-top: 20px;"><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr><td width="48%" style="vertical-align: top; padding-right: 2%;"><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 8px;"><tr><td style="padding: 20px;"><h3 style="margin: 0 0 15px 0; font-size: 14px; font-weight: bold; color: #333333;">Next Steps:</h3><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr><td style="padding-bottom: 8px;"><span style="color: #4a90e2; font-size: 16px;">•</span> Review the preferred date and time.</td></tr><tr><td style="padding-bottom: 8px;"><span style="color: #4a90e2; font-size: 16px;">•</span> Respond to the client via email or phone to confirm.</td></tr><tr><td><span style="color: #4a90e2; font-size: 16px;">•</span> Process this request in your CRM/Calendar system.</td></tr></table></td></tr></table></td><td width="48%" style="vertical-align: top; padding-left: 2%;"><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #ffffff; border-radius: 8px;"><tr><td style="padding: 20px;"><h3 style="margin: 0 0 15px 0; font-size: 14px; font-weight: bold; color: #333333;">CLIENT MESSAGE</h3><table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"><tr><td style="padding: 15px; background-color: #f8f9fa; border-left: 3px solid #4a90e2; border-radius: 4px;"><p style="margin: 0; font-size: 13px; color: #333333; line-height: 1.6; font-style: italic;">${sanitizedData.message.replace(/\n/g, '<br>').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p></td></tr></table></td></tr></table></td></tr></table></td></tr></table></td></tr></table></td></tr></table></td></tr></table></td></tr></table></body></html>`;
    
    // Create plain text version
    const textEmail = `NEW CLIENT SUBMISSION - ArdntLogic\nProfessional Web Agency\n\nAppointment/Inquiry Details:\n============================\nFull Name: ${sanitizedData.fullName}\nPhone Number: ${sanitizedData.phone}\nEmail Address: ${sanitizedData.email}\n${sanitizedData.date ? `Preferred Date: ${sanitizedData.date}\n` : ''}${sanitizedData.time ? `Preferred Time: ${sanitizedData.time}\n` : ''}${sanitizedData.topic ? `Subject/Topic: ${sanitizedData.topic}\n` : ''}\nClient Message:\n===============\n${sanitizedData.message}\n\nSubmitted: ${new Date(sanitizedData.timestamp).toLocaleString()}\nIP: ${sanitizedData.ip}\n\nThis is an automated message from your ArdntLogic contact form.`;

    // Check if email is enabled (optional feature flag)
    const emailEnabled = process.env.EMAIL_ENABLED?.trim() !== 'false';
    
    if (!emailEnabled) {
      log("ðŸ“§ Email disabled via EMAIL_ENABLED=false, skipping email logic", "contact");
    }

    // SAVE FORM SUBMISSION FIRST (always, regardless of email status)
    try {
      const fs = await import('fs/promises');
      const submissionsFile = 'contact_submissions.json';
      let submissions = [];
      try {
        const data = await fs.readFile(submissionsFile, 'utf8');
        submissions = JSON.parse(data);
      } catch (error) {
        // File doesn't exist or is empty, start with empty array
      }
      submissions.push(sanitizedData);
      await fs.writeFile(submissionsFile, JSON.stringify(submissions, null, 2));
      log(`âœ… Submission saved to ${submissionsFile}`, "contact");
    } catch (saveError: any) {
      log(`âš ï¸ Warning: Could not save submission to file: ${saveError?.message || String(saveError)}`, "contact");
    }

    // Email sending is NON-BLOCKING - attempt to send but don't fail the request
    let emailSent = false;
    let emailError: any = null;

    if (emailEnabled) {
      try {
        // Check SMTP configuration - Gmail SMTP
        const smtpUser = process.env.SMTP_USER?.trim();
        const smtpPass = process.env.SMTP_PASS?.trim();

        if (!smtpUser || !smtpPass) {
          log("âš ï¸ Email not sent: SMTP credentials not configured", "contact");
          emailError = { message: "SMTP credentials not configured" };
        } else {
          // Gmail SMTP configuration
          log(`ðŸ“§ Configuring Gmail SMTP: ...`, "contact");
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: smtpUser,
              pass: smtpPass
            },
          });

          // Attempt SMTP verification (non-blocking)
          log("ðŸ” Verifying Gmail SMTP connection...", "contact");
          try {
            await transporter.verify();
            log("âœ… Gmail SMTP verified", "contact");
          } catch (verifyError: any) {
            // Detect specific SMTP connection failures
            const errorCode = verifyError.code || '';
            const errorMessage = verifyError.message || '';
            const isTimeout = errorCode === 'ETIMEDOUT' || errorMessage.includes('timeout') || errorMessage.includes('TIMEDOUT');
            const isConnectionRefused = errorCode === 'ECONNREFUSED' || errorMessage.includes('ECONNREFUSED');
            const isSocketError = errorCode === 'ESOCKET' || errorMessage.includes('socket');
            const isAuthError = errorCode === 'EAUTH' || errorMessage.includes('535') || errorMessage.includes('authentication');
            
            if (isTimeout || isConnectionRefused || isSocketError || isAuthError) {
              log("ðŸš« Gmail SMTP blocked or rejected at network/provider level", "contact");
            }
            
            // FULL error logging - NO hiding
            log("âŒ Gmail SMTP verification FAILED", "contact");
            log(`   Error Message: ${verifyError.message || 'Unknown error'}`, "contact");
            log(`   Error Code: ${verifyError.code || 'N/A'}`, "contact");
            log(`   Error Response: ${verifyError.response || 'N/A'}`, "contact");
            log(`   Error Stack: ${verifyError.stack || 'N/A'}`, "contact");
            log(`   SMTP Config: Service=gmail, User=${smtpUser}`, "contact");
            log(`   Full Error Object: ${JSON.stringify(verifyError, Object.getOwnPropertyNames(verifyError), 2)}`, "contact");
            
            // Don't throw - just skip email sending
            emailError = verifyError;
            log("âš ï¸ Email not sent: Gmail SMTP blocked or credentials rejected", "contact");
          }

          // Only attempt to send email if verification passed
          if (!emailError) {
            // Get recipient email from environment or use SMTP_USER as fallback
            const recipientEmail = process.env.RECIPIENT_EMAIL?.trim() || smtpUser;
            
            // Send email with FULL error logging (non-blocking)
            log(`ðŸ“¤ Sending email to ${recipientEmail}...`, "contact");
            const mailOptions = {
              from: `"ArdntLogic Contact Form" <${smtpUser}>`,
              to: recipientEmail,
              replyTo: sanitizedData.email,
              subject: `New Contact Submission - ${sanitizedData.fullName}`,
              text: textEmail,
              html: htmlEmail
            };

            try {
              const sendPromise = transporter.sendMail(mailOptions);
              const timeoutPromise = new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Email send timeout after 30 seconds')), 30000)
              );
              
              const info = await Promise.race([sendPromise, timeoutPromise]) as any;
              emailSent = true;
              log(`âœ… Email sent successfully! Message ID: ${info.messageId}`, "contact");
            } catch (sendError: any) {
              // Detect specific SMTP connection failures
              const errorCode = sendError.code || '';
              const errorMessage = sendError.message || '';
              const isTimeout = errorCode === 'ETIMEDOUT' || errorMessage.includes('timeout') || errorMessage.includes('TIMEDOUT');
              const isConnectionRefused = errorCode === 'ECONNREFUSED' || errorMessage.includes('ECONNREFUSED');
              const isSocketError = errorCode === 'ESOCKET' || errorMessage.includes('socket');
              const isAuthError = errorCode === 'EAUTH' || sendError.responseCode === 535 || errorMessage.includes('authentication') || errorMessage.includes('535');
              
              if (isTimeout || isConnectionRefused || isSocketError || isAuthError) {
                log("ðŸš« Gmail SMTP blocked or rejected at network/provider level", "contact");
              }
              
              // FULL error logging - NO hiding
              log("âŒ Email send FAILED", "contact");
              log(`   Error Message: ${sendError.message || 'Unknown error'}`, "contact");
              log(`   Error Code: ${sendError.code || 'N/A'}`, "contact");
              log(`   Error Response: ${sendError.response || 'N/A'}`, "contact");
              log(`   Error Stack: ${sendError.stack || 'N/A'}`, "contact");
              log(`   Response Code: ${sendError.responseCode || 'N/A'}`, "contact");
              log(`   Command: ${sendError.command || 'N/A'}`, "contact");
              log(`   Syscall: ${sendError.syscall || 'N/A'}`, "contact");
              log(`   Address: ${sendError.address || 'N/A'}`, "contact");
              log(`   Port: ${sendError.port || 'N/A'}`, "contact");
              log(`   Full Error Object: ${JSON.stringify(sendError, Object.getOwnPropertyNames(sendError), 2)}`, "contact");
              
              emailError = sendError;
              log("âš ï¸ Email not sent: Gmail SMTP blocked or credentials rejected", "contact");
            }
          }
        }
      } catch (emailConfigError: any) {
        log("âš ï¸ Email not sent: Configuration error", "contact");
        log(`   Error: ${emailConfigError.message || 'Unknown error'}`, "contact");
        emailError = emailConfigError;
      }
    }

    // ALWAYS return success - email is non-blocking
    res.status(200).json({
      success: true,
      message: "Thank you for contacting ArdntLogic! Your message has been received and we'll get back to you within 24 hours.",
      processingTime: `${Date.now() - startTime}ms`
    });

  } catch (error: any) {
    // FULL error logging - NO hiding
    log("âŒ Contact form error occurred", "contact");
    log(`   Error Message: ${error.message || 'Unknown error'}`, "contact");
    log(`   Error Code: ${error.code || 'N/A'}`, "contact");
    log(`   Error Response: ${error.response || 'N/A'}`, "contact");
    log(`   Error Stack: ${error.stack || 'N/A'}`, "contact");
    log(`   Error Command: ${error.command || 'N/A'}`, "contact");
    
    // Log full error object
    log(`   Full Error Object: ${JSON.stringify(error, Object.getOwnPropertyNames(error), 2)}`, "contact");

    // Save error details for debugging
    try {
      const fs = await import('fs/promises');
      const errorData = {
        timestamp: new Date().toISOString(),
        error: {
          message: error.message,
          code: error.code,
          response: error.response,
          command: error.command,
          stack: error.stack
        },
        body: req.body,
        ip: req.ip || req.connection.remoteAddress
      };

      await fs.appendFile('email_errors.log', JSON.stringify(errorData, null, 2) + '\n\n');
    } catch (logError: any) {
      log(`âš ï¸ Could not log error to file: ${logError?.message || String(logError)}`, "contact");
    }

    // Try to save submission even if email verification failed
    try {
      // Use sanitizedData if available, otherwise create from request body
      const submissionData = sanitizedData || {
        fullName: req.body?.fullName || 'Unknown',
        email: req.body?.email || 'unknown@example.com',
        phone: req.body?.phone || 'Unknown',
        message: req.body?.message || 'No message',
        date: req.body?.date || null,
        time: req.body?.time || null,
        topic: req.body?.topic || null,
        timestamp: new Date().toISOString(),
        ip: req.ip || req.connection.remoteAddress || 'unknown',
        emailError: error.message
      };
      
      const fs = await import('fs/promises');
      const submissionsFile = 'contact_submissions.json';
      let submissions = [];
      try {
        const data = await fs.readFile(submissionsFile, 'utf8');
        submissions = JSON.parse(data);
      } catch (e) {
        // File doesn't exist, start with empty array
      }
      submissions.push({
        ...submissionData,
        emailError: error.message
      });
      await fs.writeFile(submissionsFile, JSON.stringify(submissions, null, 2));
      log(`âœ… Submission saved despite email error`, "contact");
    } catch (saveError: any) {
      log(`âš ï¸ Could not save submission: ${saveError?.message || String(saveError)}`, "contact");
    }

    // ALWAYS return success - email failures are non-blocking
    // Submission is saved, so user should get success response
    res.status(200).json({
      success: true,
      message: "Thank you for contacting ArdntLogic! Your message has been received and we'll get back to you within 24 hours.",
      processingTime: `${Date.now() - startTime}ms`
    });
  }
});

// Health check endpoint
app.get("/api/health", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    message: "ArdntLogic contact form server is running",
    timestamp: new Date().toISOString()
  });
});

// SMTP diagnostic endpoint - Gmail SMTP
app.get("/api/test-smtp", async (req: Request, res: Response) => {
  try {
    // Gmail SMTP configuration
    const smtpUser = process.env.SMTP_USER?.trim();
    const smtpPass = process.env.SMTP_PASS?.trim();

    log(`ðŸ” SMTP Test - Configuring Gmail SMTP: ...`, "test-smtp");

    if (!smtpUser || !smtpPass) {
      log("âŒ SMTP Test - Credentials not configured", "test-smtp");
      return res.status(400).json({
        success: false,
        error: "SMTP credentials not configured",
        config: {
          hasUser: !!smtpUser,
          hasPass: !!smtpPass,
          service: 'gmail'
        }
      });
    }

    // Gmail SMTP transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: smtpPass
      }
    });

    log("ðŸ” SMTP Test - Verifying Gmail SMTP connection...", "test-smtp");
    const startTime = Date.now();
    
    try {
      await transporter.verify();
      const duration = Date.now() - startTime;
      log(`âœ… SMTP Test - Gmail SMTP verified in ${duration}ms`, "test-smtp");
      
      res.json({
        success: true,
        message: "Gmail SMTP connection successful",
        config: {
          service: 'gmail',
          user: smtpUser,
          hasPassword: !!smtpPass
        },
        connectionTime: `${duration}ms`
      });
    } catch (verifyError: any) {
      const duration = Date.now() - startTime;
      
      // FULL error logging
      log("âŒ SMTP Test - Gmail SMTP verification FAILED", "test-smtp");
      log(`   Error Message: ${verifyError.message || 'Unknown error'}`, "test-smtp");
      log(`   Error Code: ${verifyError.code || 'N/A'}`, "test-smtp");
      log(`   Error Response: ${verifyError.response || 'N/A'}`, "test-smtp");
      log(`   Error Stack: ${verifyError.stack || 'N/A'}`, "test-smtp");
      log(`   Full Error: ${JSON.stringify(verifyError, Object.getOwnPropertyNames(verifyError), 2)}`, "test-smtp");
      
      res.status(500).json({
        success: false,
        error: verifyError.message || 'Gmail SMTP verification failed',
        code: verifyError.code,
        config: {
          service: 'gmail',
          user: smtpUser,
          hasPassword: !!smtpPass
        },
        connectionTime: `${duration}ms`,
        details: {
          message: verifyError.message,
          code: verifyError.code,
          response: verifyError.response,
          syscall: verifyError.syscall,
          address: verifyError.address,
          port: verifyError.port,
          stack: verifyError.stack
        }
      });
    }
  } catch (error: any) {
    log(`âŒ SMTP Test - Unexpected error: ${error.message}`, "test-smtp");
    log(`   Stack: ${error.stack}`, "test-smtp");
    
    res.status(500).json({
      success: false,
      error: error.message || 'Unknown error',
      stack: error.stack
    });
  }
});

// Error handling middleware
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

  log(`Error ${status}: ${message}`, "error");
    res.status(status).json({ message });
  });

// Start server
(async () => {
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  const port = parseInt(process.env.PORT || "5000", 10);
  httpServer.listen(port, "0.0.0.0", () => {
    log(`ArdntLogic contact form server running on port ${port}`);
  });
})();
