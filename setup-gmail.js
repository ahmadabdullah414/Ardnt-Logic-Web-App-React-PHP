/**
 * Gmail App Password Setup Helper
 * 
 * This script helps you verify your Gmail App Password is configured correctly.
 * 
 * STEP 1: Get Your Gmail App Password
 * 1. Go to: https://myaccount.google.com/apppasswords
 * 2. Sign in with: ahmadtkd009@gmail.com
 * 3. If 2-Step Verification is not enabled:
 *    - Go to: https://myaccount.google.com/security
 *    - Enable "2-Step Verification"
 *    - Follow the setup process
 * 4. Go back to App Passwords
 * 5. Select "Mail" as the app
 * 6. Select "Other (Custom name)" as the device
 * 7. Enter name: "ArdntLogic Contact Form"
 * 8. Click "Generate"
 * 9. Copy the 16-character password (remove spaces)
 *    Example: "abcd efgh ijkl mnop" → "abcdefghijklmnop"
 * 
 * STEP 2: Update .env File
 * Replace YOUR_GMAIL_APP_PASSWORD_HERE with your actual App Password
 * 
 * STEP 3: Run this script to test
 * node setup-gmail.js
 */

import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const smtpUser = process.env.SMTP_USER?.trim();
const smtpPass = process.env.SMTP_PASS?.trim();

console.log('\n=== Gmail SMTP Configuration Test ===\n');

if (!smtpUser) {
  console.error('❌ SMTP_USER is not set in .env file');
  console.log('   Please add: SMTP_USER=ahmadtkd009@gmail.com\n');
  process.exit(1);
}

if (!smtpPass || smtpPass === 'YOUR_GMAIL_APP_PASSWORD_HERE') {
  console.error('❌ SMTP_PASS is not configured in .env file');
  console.log('\n📋 SETUP INSTRUCTIONS:');
  console.log('1. Go to: https://myaccount.google.com/apppasswords');
  console.log('2. Sign in with: ahmadtkd009@gmail.com');
  console.log('3. Enable 2-Step Verification if not already enabled');
  console.log('4. Generate App Password for "Mail"');
  console.log('5. Copy the 16-character password');
  console.log('6. Update .env file: SMTP_PASS=your_16_char_password\n');
  process.exit(1);
}

console.log(`✅ SMTP_USER: ${smtpUser}`);
console.log(`✅ SMTP_PASS: ${'*'.repeat(smtpPass.length)} (${smtpPass.length} characters)\n`);

console.log('Testing Gmail SMTP connection...\n');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: smtpUser,
    pass: smtpPass
  }
});

transporter.verify()
  .then(() => {
    console.log('✅ SUCCESS! Gmail SMTP is configured correctly!');
    console.log('   Your contact form should now work properly.\n');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ FAILED! Gmail SMTP authentication error:\n');
    console.error(`   ${error.message}\n`);
    
    if (error.message.includes('Invalid login') || error.message.includes('535')) {
      console.log('🔧 TROUBLESHOOTING:');
      console.log('1. Make sure you\'re using an App Password, not your regular Gmail password');
      console.log('2. Verify 2-Step Verification is enabled');
      console.log('3. Check that the App Password is correct (16 characters, no spaces)');
      console.log('4. Try generating a new App Password\n');
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
      console.log('🔧 TROUBLESHOOTING:');
      console.log('1. Check your internet connection');
      console.log('2. Verify Gmail SMTP servers are accessible\n');
    }
    
    process.exit(1);
  });

