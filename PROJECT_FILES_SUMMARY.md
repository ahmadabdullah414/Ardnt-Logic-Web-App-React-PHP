# Project Files Summary - Frontend & Backend

## 📁 Project Structure Overview

```
Modern/
├── client/          # React Frontend
├── api/            # PHP Backend
├── dist/           # Production Build
├── shared/         # Shared Types/Schemas
└── server/         # Node.js Server (legacy)
```

---

## 🎨 FRONTEND FILES (React + TypeScript)

### **Core Application Files**

| File | Location | Description |
|------|----------|-------------|
| `main.tsx` | `client/src/` | Application entry point, React DOM rendering |
| `App.tsx` | `client/src/` | Main app component with routing setup |
| `index.css` | `client/src/` | Global styles and Tailwind CSS imports |
| `index.html` | `client/` | HTML template for React app |

### **Pages (Route Components)**

| File | Location | Description |
|------|----------|-------------|
| `Home.tsx` | `client/src/pages/` | Landing page with hero section |
| `About.tsx` | `client/src/pages/` | About us page |
| `Services.tsx` | `client/src/pages/` | Services listing page |
| `Pricing.tsx` | `client/src/pages/` | Pricing plans page |
| `Testimonials.tsx` | `client/src/pages/` | Customer testimonials page |
| `Contact.tsx` | `client/src/pages/` | Contact page with form |
| `Privacy.tsx` | `client/src/pages/` | Privacy policy page |
| `Terms.tsx` | `client/src/pages/` | Terms of service page |
| `not-found.tsx` | `client/src/pages/` | 404 error page |

### **Main Components**

| File | Location | Description |
|------|----------|-------------|
| `Navbar.tsx` | `client/src/components/` | Navigation bar component |
| `Hero.tsx` | `client/src/components/` | Hero section with CTA |
| `Footer.tsx` | `client/src/components/` | Footer with links and info |
| `ContactForm.tsx` | `client/src/components/` | Contact form with validation |
| `ServiceCard.tsx` | `client/src/components/` | Service card display |
| `ServicesSection.tsx` | `client/src/components/` | Services section layout |
| `PricingCard.tsx` | `client/src/components/` | Pricing plan card |
| `TestimonialCard.tsx` | `client/src/components/` | Testimonial card display |

### **UI Components Library** (47 components)

Located in `client/src/components/ui/` - Built with Radix UI and Tailwind CSS:

**Form Components:**
- `button.tsx`, `input.tsx`, `textarea.tsx`, `label.tsx`
- `form.tsx`, `checkbox.tsx`, `radio-group.tsx`
- `select.tsx`, `calendar.tsx`, `switch.tsx`

**Layout Components:**
- `card.tsx`, `separator.tsx`, `sheet.tsx`, `drawer.tsx`
- `accordion.tsx`, `tabs.tsx`, `collapsible.tsx`
- `sidebar.tsx`, `resizable.tsx`

**Feedback Components:**
- `alert.tsx`, `alert-dialog.tsx`, `dialog.tsx`
- `toast.tsx`, `toaster.tsx`, `progress.tsx`
- `skeleton.tsx`, `badge.tsx`

**Navigation Components:**
- `navigation-menu.tsx`, `menubar.tsx`
- `breadcrumb.tsx`, `pagination.tsx`
- `dropdown-menu.tsx`, `context-menu.tsx`

**Display Components:**
- `avatar.tsx`, `aspect-ratio.tsx`
- `carousel.tsx`, `chart.tsx`
- `table.tsx`, `scroll-area.tsx`

**Interactive Components:**
- `popover.tsx`, `hover-card.tsx`
- `tooltip.tsx`, `command.tsx`
- `toggle.tsx`, `toggle-group.tsx`
- `slider.tsx`, `input-otp.tsx`

### **Hooks**

| File | Location | Description |
|------|----------|-------------|
| `use-toast.ts` | `client/src/hooks/` | Toast notification hook |
| `use-mobile.tsx` | `client/src/hooks/` | Mobile device detection hook |

### **Utilities & Libraries**

| File | Location | Description |
|------|----------|-------------|
| `utils.ts` | `client/src/lib/` | Utility functions (cn, class merging) |
| `queryClient.ts` | `client/src/lib/` | React Query client configuration |

### **Example Components**

Located in `client/src/components/examples/`:
- Example implementations for reference
- `ContactFormExample.tsx`, `HeroExample.tsx`, etc.

### **Static Assets**

| File | Location | Description |
|------|----------|-------------|
| `logo.png` | `client/public/` | Company logo |
| `favicon.png` | `client/public/` | Site favicon |
| `a.jpg` - `f.jpg` | `client/public/` | Image assets |

### **Frontend Configuration Files**

| File | Description |
|------|-------------|
| `package.json` | Node.js dependencies and scripts |
| `vite.config.ts` | Vite build configuration with proxy |
| `tsconfig.json` | TypeScript configuration |
| `tailwind.config.ts` | Tailwind CSS configuration |
| `postcss.config.js` | PostCSS configuration |
| `components.json` | shadcn/ui components config |

---

## ⚙️ BACKEND FILES (PHP)

### **Core API Files**

| File | Location | Description |
|------|----------|-------------|
| `config.php` | `api/` | Environment configuration, .env loading, constants |
| `utils.php` | `api/` | Utility functions (CORS, logging, validation) |
| `database.php` | `api/` | MySQL connection and database operations |
| `index.php` | `api/` | API router/fallback handler |

### **API Endpoints**

| File | Location | Endpoint | Method | Description |
|------|----------|----------|---------|-------------|
| `contact.php` | `api/` | `/api/contact` | POST | Contact form submission handler |
| `health.php` | `api/` | `/api/health` | GET | Health check endpoint |
| `test-smtp.php` | `api/` | `/api/test-smtp` | GET | SMTP connection test |
| `logo.php` | `api/` | `/logo.png` | GET | Logo image serving |
| `static.php` | `api/` | `/api/static/*` | GET | Static file server |
| `debug.php` | `api/` | `/api/debug` | GET | Debug information |

### **Backend Configuration Files**

| File | Description |
|------|-------------|
| `composer.json` | PHP dependencies (PHPMailer) |
| `server.php` | PHP development server router |
| `.htaccess` | Apache routing and rewrite rules |
| `index.php` | Root index file for SPA routing |
| `database.sql` | MySQL database schema |

### **Backend Features**

**Contact Form Handler (`contact.php`):**
- Form validation (name, email, phone, message)
- Input sanitization
- Email sending via PHPMailer (Gmail SMTP)
- MySQL database storage
- JSON file backup
- Error logging
- CORS support

**Database (`database.php`):**
- MySQL connection management
- Table initialization
- Contact submissions storage
- Error handling

**Utilities (`utils.php`):**
- CORS headers
- JSON file operations
- Input sanitization
- Email validation
- Client IP detection
- Logging functions

---

## 🔧 SHARED & CONFIGURATION

### **Shared Files**

| File | Location | Description |
|------|----------|-------------|
| `schema.ts` | `shared/` | Database schema definitions (Drizzle ORM) |

### **Build & Scripts**

| File | Description |
|------|-------------|
| `script/build.ts` | Production build script |
| `start-dev.ps1` | Development server startup script |
| `start-apache.ps1` | Apache production startup script |
| `setup.ps1` | Initial setup script |

### **Server Files (Legacy/Node.js)**

| File | Location | Description |
|------|----------|-------------|
| `index.ts` | `server/` | Express.js server (legacy) |
| `static.ts` | `server/` | Static file serving |
| `storage.ts` | `server/` | Storage interface |
| `vite.ts` | `server/` | Vite integration |

---

## 📊 Technology Stack Summary

### **Frontend**
- **Framework:** React 18.3.1
- **Language:** TypeScript
- **Build Tool:** Vite 5.4.20
- **Styling:** Tailwind CSS 3.4.17
- **UI Library:** Radix UI components
- **Forms:** React Hook Form + Zod validation
- **Routing:** Wouter
- **State Management:** TanStack React Query
- **Animations:** Framer Motion

### **Backend**
- **Language:** PHP 7.4+
- **Package Manager:** Composer
- **Email:** PHPMailer 6.9
- **Database:** MySQL (via mysqli)
- **Server:** Apache (production) / PHP built-in (dev)

### **Database**
- **Type:** MySQL
- **ORM:** Drizzle ORM (TypeScript side)
- **Schema:** Defined in `database.sql` and `shared/schema.ts`

---

## 📦 Dependencies Summary

### **Frontend Dependencies** (Key)
- React & React DOM
- Radix UI components (47+ components)
- Tailwind CSS & animations
- React Hook Form & Zod
- TanStack React Query
- Framer Motion
- Date-fns
- Lucide React (icons)

### **Backend Dependencies**
- PHPMailer (email sending)
- PHP 7.4+ (mysqli extension for MySQL)

---

## 🗂️ File Count Summary

- **Frontend Pages:** 9 files
- **Frontend Components:** 8 main + 47 UI + 8 examples = 63 components
- **Backend API Files:** 10 files
- **UI Components:** 47 files
- **Hooks:** 2 files
- **Configuration Files:** 10+ files

**Total Project Files:** ~150+ source files

---

## 🚀 Key Features by File

### **Frontend Features**
- ✅ Responsive design (mobile-first)
- ✅ Dark/light theme support
- ✅ Form validation with real-time feedback
- ✅ Smooth animations and transitions
- ✅ SEO-friendly routing
- ✅ Accessible components (ARIA compliant)

### **Backend Features**
- ✅ RESTful API endpoints
- ✅ MySQL database integration
- ✅ Email notifications (Gmail SMTP)
- ✅ CORS support
- ✅ Error logging
- ✅ Input validation & sanitization
- ✅ JSON backup storage

---

## 📝 Notes

- **Production Build:** Located in `dist/public/`
- **Environment Config:** `.env` file (not in repo)
- **Database Schema:** `database.sql` for MySQL setup
- **Development:** Use `start-dev.ps1` for hot-reload
- **Production:** Use `start-apache.ps1` with Apache

