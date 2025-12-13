# ArdntLogic Website

Full-stack web application built with React, TypeScript, Express.js, and PostgreSQL.

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Gmail account with 2-Step Verification enabled

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (see [Environment Variables](#environment-variables) below)

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5000`

## 📧 Contact Form Email Setup

The contact form sends emails using Gmail SMTP. Follow these steps to configure it:

### Step 1: Enable Gmail App Password

1. **Enable 2-Step Verification** (if not already enabled):
   - Go to: https://myaccount.google.com/security
   - Under "Signing in to Google", click **2-Step Verification**
   - Follow the prompts to enable it

2. **Generate an App Password**:
   - Go to: https://myaccount.google.com/apppasswords
   - Select **Mail** as the app
   - Select **Other (Custom name)** as the device
   - Enter a name like "ArdntLogic Website"
   - Click **Generate**
   - **Copy the 16-character password** immediately (you won't see it again!)
   - The password looks like: `abcd efgh ijkl mnop`

### Step 2: Create `.env` File

1. Create a `.env` file in the **root directory** of the project (same level as `package.json`)

2. Add the following environment variables:

   ```env
   # Gmail SMTP Configuration
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-16-character-app-password

   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Optional: Recipient Email (where contact form emails will be sent)
   # If not set, emails will be sent to SMTP_USER
   RECIPIENT_EMAIL=your-email@gmail.com
   ```

3. **Important Notes**:
   - Replace `your-email@gmail.com` with your actual Gmail address
   - Replace `your-16-character-app-password` with the App Password you generated
   - **Remove all spaces** from the App Password (e.g., `abcdefghijklmnop`)
   - **DO NOT** use your regular Gmail password - it won't work!
   - The `.env` file should be in the root directory: `d:\Modern-Site\.env`

### Step 3: Restart the Server

After creating/updating the `.env` file:

1. Stop the server (press `Ctrl+C` in the terminal)
2. Start it again:
   ```bash
   npm run dev
   ```

## 🔧 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `SMTP_USER` | Your Gmail email address | `your-email@gmail.com` |
| `SMTP_PASS` | Gmail App Password (16 characters, no spaces) | `abcdefghijklmnop` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `development` |
| `RECIPIENT_EMAIL` | Where to send contact form emails | Same as `SMTP_USER` |

## 📁 Project Structure

```
Modern-Site/
├── client/          # React frontend
├── server/          # Express backend
├── shared/          # Shared TypeScript types
├── .env            # Environment variables (create this file)
└── package.json    # Dependencies and scripts
```

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - Type check with TypeScript

## 📡 API Endpoints

### POST `/api/contact`

Sends contact form data via email.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "service": "Website Development",
  "budget": "$5000",
  "targetPlatform": "Web",
  "message": "I need a new website"
}
```

**Response:**
```json
{
  "success": true
}
```

**Error Response:**
```json
{
  "success": false
}
```

## 🔒 Security Notes

- Never commit your `.env` file to version control
- The `.env` file is already in `.gitignore`
- Use Gmail App Passwords, never your regular password
- App Passwords are 16 characters and should have no spaces

## 🐛 Troubleshooting

### Email Not Sending

1. **Check `.env` file exists** in the root directory
2. **Verify App Password**:
   - Must be 16 characters
   - No spaces
   - Generated from https://myaccount.google.com/apppasswords
3. **Check server console** for error messages
4. **Verify 2-Step Verification** is enabled on your Google account
5. **Check spam folder** - emails might be filtered

### Common Errors

- **"535-5.7.8 Username and Password not accepted"**
  - Solution: Use App Password, not regular password
  - Make sure 2-Step Verification is enabled
  - Generate a new App Password

- **"SMTP_USER or SMTP_PASS not set"**
  - Solution: Create `.env` file in root directory
  - Add `SMTP_USER` and `SMTP_PASS` variables

- **"ECONNECTION" error**
  - Solution: Check your internet connection
  - Verify Gmail SMTP settings are correct

## 📝 Contact Form Fields

The contact form expects these fields:

- `name` - Client's name (required)
- `email` - Client's email (required)
- `phone` - Client's phone number (required)
- `service` - Service requested (optional)
- `budget` - Budget range (optional)
- `targetPlatform` - Target platform (optional)
- `message` - Client's message (required)

## 🎯 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: PostgreSQL (via Drizzle ORM)
- **Email**: Nodemailer with Gmail SMTP
- **Other**: React Hook Form, Zod, Framer Motion

## 📄 License

MIT

