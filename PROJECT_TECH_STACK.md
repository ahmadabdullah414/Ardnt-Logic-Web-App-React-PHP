# ArdntLogic - Project Tech Stack & Architecture

## 📋 Project Overview

**ArdntLogic** is a modern, full-stack web application for a digital agency/business website. It features a React frontend with a PHP backend, designed for local business growth services including website design, SEO, lead generation, and more.

---

## 🏗️ Architecture

### **Full-Stack Architecture**
```
Frontend (React + TypeScript)  ←→  Backend (PHP + Apache)
     ↓                                    ↓
  Vite Build                         RESTful API
     ↓                                    ↓
  Static Files                    Contact Form Handler
  (dist/public)                   Email (PHPMailer)
                                  JSON Storage
```

---

## 🎨 Frontend Technology Stack

### **Core Framework**
- **React 18.3.1** - Modern React library for building user interfaces
- **TypeScript 5.6.3** - Type-safe JavaScript with static typing
- **Vite 5.4.20** - Fast build tool and development server

### **Routing**
- **Wouter 3.3.5** - Lightweight React router (alternative to React Router)
  - Client-side routing
  - SPA (Single Page Application) navigation
  - Routes: `/`, `/services`, `/pricing`, `/testimonials`, `/about`, `/contact`, `/privacy`, `/terms`

### **UI Framework & Styling**
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **shadcn/ui** - High-quality React components built on Radix UI
- **Radix UI** - Unstyled, accessible component primitives
  - Components: Dialog, Dropdown, Popover, Select, Tabs, Toast, etc.
- **Framer Motion 11.13.1** - Animation library for React
- **Lucide React 0.453.0** - Icon library
- **React Icons 5.4.0** - Popular icons library

### **Form Handling & Validation**
- **React Hook Form 7.55.0** - Performant form library
- **Zod 3.24.2** - TypeScript-first schema validation
- **@hookform/resolvers 3.10.0** - Resolvers for React Hook Form

### **State Management & Data Fetching**
- **TanStack Query (React Query) 5.60.5** - Powerful data synchronization for React
  - Server state management
  - Caching and synchronization
  - Background updates

### **Utilities & Helpers**
- **date-fns 3.6.0** - Date utility library
- **clsx 2.1.1** - Conditional class names
- **tailwind-merge 2.6.0** - Merge Tailwind classes
- **class-variance-authority 0.7.1** - Variant management

### **Additional Libraries**
- **next-themes 0.4.6** - Theme switching (dark/light mode support)
- **react-day-picker 8.10.1** - Date picker component
- **embla-carousel-react 8.6.0** - Carousel/slider component
- **recharts 2.15.2** - Charting library

---

## ⚙️ Backend Technology Stack

### **Core Backend**
- **PHP 7.4+** - Server-side scripting language
- **Apache HTTP Server** - Web server with mod_rewrite
- **Composer** - PHP dependency manager

### **PHP Libraries**
- **PHPMailer 6.9+** - Email sending library
  - SMTP support (Gmail)
  - HTML email templates
  - Attachment support

### **Backend Architecture**
```
Apache (.htaccess routing)
    ↓
index.php (Frontend Router)
    ↓
API Endpoints:
  - /api/contact (POST) → api/contact.php
  - /api/health (GET) → api/health.php
  - /api/test-smtp (GET) → api/test-smtp.php
  - /logo.png (GET) → api/logo.php
```

### **Data Storage**
- **JSON File Storage** - `contact_submissions.json`
  - Simple, file-based storage
  - No database required
  - Easy to migrate to database later

### **Configuration**
- **Environment Variables** - `.env` file for configuration
  - SMTP credentials
  - Base URL
  - Feature flags

---

## 📁 Project Structure

```
Modern/
├── client/                    # Frontend source code
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── ui/           # shadcn/ui components
│   │   │   ├── ContactForm.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ...
│   │   ├── pages/            # Page components
│   │   │   ├── Home.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Contact.tsx
│   │   │   └── ...
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utilities
│   │   ├── App.tsx           # Main app component
│   │   └── main.tsx          # Entry point
│   └── public/               # Static assets
│
├── api/                      # Backend PHP code
│   ├── contact.php          # Contact form handler
│   ├── config.php           # Configuration
│   ├── utils.php            # Utility functions
│   ├── health.php           # Health check endpoint
│   └── static.php           # Static file server
│
├── dist/                     # Production build output
│   └── public/              # Built frontend files
│       ├── index.html
│       ├── assets/
│       └── ...
│
├── shared/                   # Shared types/schemas
├── server/                   # Node.js server (optional/legacy)
├── .htaccess                # Apache routing rules
├── index.php                # Frontend entry point
├── package.json             # Node.js dependencies
├── composer.json            # PHP dependencies
└── .env                     # Environment variables
```

---

## 🔄 Data Flow

### **Contact Form Submission Flow**

```
1. User fills form (React component)
   ↓
2. Form validation (Zod schema)
   ↓
3. POST request to /api/contact
   ↓
4. Apache routes to api/contact.php
   ↓
5. PHP processes request:
   - Validates input
   - Sanitizes data
   - Saves to contact_submissions.json
   - Sends email (optional, via PHPMailer)
   ↓
6. Returns JSON response
   ↓
7. React updates UI (toast notification)
```

---

## 🛠️ Development Tools

### **Build Tools**
- **Vite** - Fast build tool and dev server
- **TypeScript** - Type checking
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

### **Code Quality**
- **ESLint** (implicit via Vite)
- **TypeScript Compiler** - Type checking
- **Prettier** (recommended)

### **Package Managers**
- **npm** - Node.js package manager
- **Composer** - PHP package manager

---

## 📦 Key Dependencies

### **Frontend Dependencies**
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "typescript": "5.6.3",
  "vite": "^5.4.20",
  "wouter": "^3.3.5",
  "react-hook-form": "^7.55.0",
  "zod": "^3.24.2",
  "@tanstack/react-query": "^5.60.5",
  "framer-motion": "^11.13.1",
  "tailwindcss": "^3.4.17"
}
```

### **Backend Dependencies**
```json
{
  "php": ">=7.4",
  "phpmailer/phpmailer": "^6.9"
}
```

---

## 🌐 API Endpoints

### **POST /api/contact**
- **Purpose**: Handle contact form submissions
- **Method**: POST
- **Content-Type**: application/json
- **Request Body**:
  ```json
  {
    "fullName": "string",
    "email": "string",
    "phone": "string",
    "message": "string",
    "date": "string (optional)",
    "time": "string (optional)",
    "topic": "string (optional)"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Thank you message",
    "processingTime": "XXXms"
  }
  ```

### **GET /api/health**
- **Purpose**: Health check endpoint
- **Method**: GET
- **Response**:
  ```json
  {
    "status": "ok",
    "message": "ArdntLogic contact form server is running",
    "timestamp": "ISO 8601 date"
  }
  ```

### **GET /api/test-smtp**
- **Purpose**: Test SMTP configuration
- **Method**: GET
- **Response**: SMTP connection test results

---

## 🔐 Security Features

- **Input Validation** - Zod schema validation on frontend
- **Input Sanitization** - PHP sanitization on backend
- **CORS Headers** - Configured for API endpoints
- **XSS Protection** - HTML escaping in PHP
- **File Access Protection** - .htaccess blocks sensitive files
- **Environment Variables** - Secrets stored in .env (not in code)

---

## 🚀 Deployment Architecture

### **Production Setup**
```
Apache Web Server
    ↓
.htaccess (URL Rewriting)
    ↓
├─→ Static Files (dist/public/)
├─→ API Routes (api/*.php)
└─→ SPA Routing (index.php)
```

### **Static File Serving**
- Production build: `dist/public/`
- Static assets: `/assets/*`
- Images: `/logo.png`, `/favicon.png`

### **SPA Routing**
- All non-API routes → `index.php`
- Client-side routing handled by Wouter
- Server serves `index.html` for all routes

---

## 📊 Features

### **Frontend Features**
- ✅ Responsive design (mobile-first)
- ✅ Modern UI with animations
- ✅ Form validation
- ✅ Toast notifications
- ✅ Dark mode support (via next-themes)
- ✅ Smooth page transitions
- ✅ SEO-friendly structure

### **Backend Features**
- ✅ RESTful API endpoints
- ✅ Contact form processing
- ✅ Email sending (optional)
- ✅ JSON file storage
- ✅ Error logging
- ✅ CORS support
- ✅ Health check endpoint

---

## 🔧 Configuration Files

### **Frontend Config**
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `components.json` - shadcn/ui configuration

### **Backend Config**
- `.env` - Environment variables
- `.htaccess` - Apache routing
- `api/config.php` - PHP configuration
- `composer.json` - PHP dependencies

---

## 📝 Scripts

### **NPM Scripts**
```bash
npm run dev      # Start development server (Node.js)
npm run build    # Build production frontend
npm run start    # Start production server (Node.js)
npm run check    # Type check TypeScript
```

### **Production Build**
```bash
npm install
npm run build
# Output: dist/public/
```

### **PHP Setup**
```bash
composer install  # Install PHP dependencies
```

---

## 🌍 Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript support required
- CSS Grid and Flexbox support required

---

## 📈 Performance

- **Vite** - Fast HMR (Hot Module Replacement) in development
- **Code Splitting** - Automatic code splitting with Vite
- **Tree Shaking** - Unused code removal
- **Static Asset Optimization** - Optimized images and fonts
- **Lazy Loading** - Components loaded on demand

---

## 🎯 Project Goals

1. **Modern Tech Stack** - Latest versions of React, TypeScript, and PHP
2. **Performance** - Fast load times and smooth animations
3. **Maintainability** - Clean code structure and TypeScript types
4. **Scalability** - Easy to extend and add features
5. **Production Ready** - Proper error handling and logging

---

## 📚 Learning Resources

- **React**: https://react.dev
- **TypeScript**: https://www.typescriptlang.org
- **Vite**: https://vitejs.dev
- **Wouter**: https://github.com/molefrog/wouter
- **Tailwind CSS**: https://tailwindcss.com
- **shadcn/ui**: https://ui.shadcn.com
- **PHP**: https://www.php.net
- **PHPMailer**: https://github.com/PHPMailer/PHPMailer

---

## 🔄 Migration Path

### **Current State**
- PHP backend with JSON file storage
- React frontend with static build
- Apache web server

### **Future Enhancements**
- Database integration (MySQL/PostgreSQL)
- User authentication
- Admin dashboard
- Content management system
- API rate limiting
- Advanced caching

---

## 📞 Support & Documentation

- `DEPLOYMENT_SETUP.md` - Deployment guide
- `QUICK_SETUP.md` - Quick start guide
- `SETUP_COMPLETE.md` - Setup completion checklist
- `PROJECT_TECH_STACK.md` - This file

---

**Last Updated**: 2024
**Project Version**: 1.0.0
**License**: MIT

