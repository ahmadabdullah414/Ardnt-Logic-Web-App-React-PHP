import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import nodemailer from "nodemailer";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  // Contact form endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Get all form fields from request body
      const { 
        fullName, 
        email, 
        phone, 
        message,
        date,
        time,
        topic
      } = req.body;

      console.log("=".repeat(80));
      console.log("📧 CONTACT FORM SUBMISSION RECEIVED");
      console.log("=".repeat(80));
      console.log("Full Name:", fullName);
      console.log("Email:", email);
      console.log("Phone:", phone);
      console.log("Message:", message);
      console.log("Date:", date);
      console.log("Time:", time);
      console.log("Topic:", topic);
      console.log("=".repeat(80));

      // Get SMTP credentials from environment variables
      const smtpUser = process.env.SMTP_USER;
      const smtpPass = process.env.SMTP_PASS;

      // Validate required environment variables
      if (!smtpUser || !smtpPass || smtpPass === "your-gmail-app-password-here") {
        console.error("=".repeat(80));
        console.error("❌ SMTP CONFIGURATION ERROR");
        console.error("=".repeat(80));
        console.error("SMTP_USER:", smtpUser || "NOT SET");
        console.error("SMTP_PASS:", smtpPass ? (smtpPass.length + " characters") : "NOT SET");
        console.error("Please set SMTP_USER and SMTP_PASS in your .env file");
        console.error("Get Gmail App Password: https://myaccount.google.com/apppasswords");
        console.error("=".repeat(80));
        return res.status(500).json({ 
          success: false,
          error: "Email service not configured. Please set SMTP_USER and SMTP_PASS in your .env file. Get Gmail App Password at: https://myaccount.google.com/apppasswords"
        });
      }

      // Create Nodemailer transporter
      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      // Format date if provided
      const formatDate = (dateStr: string) => {
        if (!dateStr) return "Not provided";
        try {
          const date = new Date(dateStr);
          if (isNaN(date.getTime())) return dateStr;
          return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          });
        } catch {
          return dateStr;
        }
      };

      // Format time if provided (convert 24-hour to 12-hour format)
      const formatTime = (timeStr: string) => {
        if (!timeStr) return "Not provided";
        if (timeStr.includes(':')) {
          const [h, m] = timeStr.split(':').map(Number);
          if (!isNaN(h) && !isNaN(m)) {
            const hour12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
            const period = h >= 12 ? "PM" : "AM";
            return `${hour12}:${m.toString().padStart(2, "0")} ${period}`;
          }
        }
        return timeStr;
      };

      // Build complete email with ALL form details
      const formattedDate = date ? formatDate(date) : "Not provided";
      const formattedTime = time ? formatTime(time) : "Not provided";
      const displayTopic = topic || "Not provided";

      // Email template with ALL form fields
      const emailText = `New Message Received

Name: ${fullName || "Not provided"}
Email: ${email || "Not provided"}
Phone: ${phone || "Not provided"}
Preferred Date: ${formattedDate}
Preferred Time: ${formattedTime}
Project/Topic: ${displayTopic}
Message:
${message || "Not provided"}`;

      // Email options - send to RECIPIENT_EMAIL or SMTP_USER
      const recipientEmail = process.env.RECIPIENT_EMAIL || smtpUser;
      const mailOptions = {
        from: smtpUser, // From email MUST be the same as SMTP_USER
        to: recipientEmail, // Send to your Gmail
        subject: `New Contact Form Submission - ${fullName || "Unknown"}`,
        text: emailText,
      };

      // Verify SMTP connection first
      console.log("Verifying SMTP connection...");
      await transporter.verify();
      console.log("✓ SMTP connection verified");

      // Send email
      console.log("Sending email to:", recipientEmail);
      console.log("Email content:", emailText);
      const info = await transporter.sendMail(mailOptions);

      console.log("=".repeat(80));
      console.log("✅ EMAIL SENT SUCCESSFULLY");
      console.log("=".repeat(80));
      console.log("Message ID:", info.messageId);
      console.log("To:", recipientEmail);
      console.log("From:", smtpUser);
      console.log("Subject:", mailOptions.subject);
      console.log("=".repeat(80));

      // Return success
      return res.status(200).json({ success: true });
    } catch (error: any) {
      // Log the real error
      console.error("=".repeat(80));
      console.error("❌ ERROR SENDING EMAIL");
      console.error("=".repeat(80));
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      console.error("Error response:", error.response);
      console.error("Full error:", JSON.stringify(error, null, 2));
      console.error("=".repeat(80));

      // Return failure with error details
      return res.status(500).json({ 
        success: false,
        error: error.message || "Failed to send email",
        code: error.code
      });
    }
  });

  return httpServer;
}
