# Gmail App Password Setup Guide

## Quick Setup Steps

1. **Go to Google Account Settings**
   - Visit: https://myaccount.google.com/apppasswords
   - Sign in with: `ahmadtkd009@gmail.com`

2. **Enable 2-Step Verification** (if not already enabled)
   - Go to: https://myaccount.google.com/security
   - Enable "2-Step Verification"
   - Follow the setup process

3. **Generate App Password**
   - Go back to: https://myaccount.google.com/apppasswords
   - Select "Mail" as the app
   - Select "Other (Custom name)" as the device
   - Enter name: "ArdntLogic Contact Form"
   - Click "Generate"

4. **Copy the 16-Character Password**
   - You'll see a password like: `abcd efgh ijkl mnop`
   - Copy it (remove spaces): `abcdefghijklmnop`

5. **Update .env File**
   ```env
   SMTP_USER=ahmadtkd009@gmail.com
   SMTP_PASS=YOUR_16_CHARACTER_APP_PASSWORD_HERE
   PORT=5000
   NODE_ENV=development
   ```

6. **Restart Server**
   - Stop the server (Ctrl+C)
   - Run: `npm run dev`

## Testing

After setup, test the contact form:
- Visit: http://localhost:5000/contact
- Fill out the form
- Submit
- Check `ahmadtkd009@gmail.com` inbox (and spam folder)

## Troubleshooting

- **"Invalid login" error**: App password is incorrect
- **"2-Step Verification required"**: Enable 2-Step Verification first
- **No emails received**: Check spam folder, verify App Password is correct

