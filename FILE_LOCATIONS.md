# Project File Locations Summary

## 📁 Project Root
**Location:** `D:\Modern-Site\`

---

## 🎨 **FRONTEND FILES**

### Main Frontend Directory
**Location:** `client/`

### Entry Point
- `client/index.html` - HTML entry point
- `client/src/main.tsx` - React application entry point
- `client/src/App.tsx` - Main React component

### Frontend Source Code
**Location:** `client/src/`

#### Pages (Route Components)
**Location:** `client/src/pages/`
- `Home.tsx` - Homepage
- `About.tsx` - About page
- `Services.tsx` - Services page
- `Contact.tsx` - Contact page
- `Pricing.tsx` - Pricing page
- `Testimonials.tsx` - Testimonials page
- `Privacy.tsx` - Privacy policy page
- `Terms.tsx` - Terms of service page
- `not-found.tsx` - 404 error page

#### Components
**Location:** `client/src/components/`

**Main Components:**
- `ContactForm.tsx` - Contact form component
- `Navbar.tsx` - Navigation bar
- `Hero.tsx` - Hero section
- `Footer.tsx` - Footer component
- `ServiceCard.tsx` - Service card component
- `ServicesSection.tsx` - Services section
- `PricingCard.tsx` - Pricing card component
- `TestimonialCard.tsx` - Testimonial card component

**Example Components:**
**Location:** `client/src/components/examples/`
- `ContactFormExample.tsx`
- `FooterExample.tsx`
- `HeroExample.tsx`
- `NavbarExample.tsx`
- `PricingCardExample.tsx`
- `ServiceCardExample.tsx`
- `ServicesSectionExample.tsx`
- `TestimonialCardExample.tsx`

**UI Components (Radix UI):**
**Location:** `client/src/components/ui/`
- `accordion.tsx`, `alert.tsx`, `alert-dialog.tsx`
- `avatar.tsx`, `badge.tsx`, `breadcrumb.tsx`
- `button.tsx`, `calendar.tsx`, `card.tsx`
- `carousel.tsx`, `chart.tsx`, `checkbox.tsx`
- `collapsible.tsx`, `command.tsx`, `context-menu.tsx`
- `dialog.tsx`, `drawer.tsx`, `dropdown-menu.tsx`
- `form.tsx`, `hover-card.tsx`, `input.tsx`
- `input-otp.tsx`, `label.tsx`, `menubar.tsx`
- `navigation-menu.tsx`, `pagination.tsx`, `popover.tsx`
- `progress.tsx`, `radio-group.tsx`, `resizable.tsx`
- `scroll-area.tsx`, `select.tsx`, `separator.tsx`
- `sheet.tsx`, `sidebar.tsx`, `skeleton.tsx`
- `slider.tsx`, `switch.tsx`, `table.tsx`
- `tabs.tsx`, `textarea.tsx`, `toast.tsx`
- `toaster.tsx`, `toggle.tsx`, `toggle-group.tsx`
- `tooltip.tsx`, `aspect-ratio.tsx`

#### Hooks
**Location:** `client/src/hooks/`
- `use-mobile.tsx` - Mobile detection hook
- `use-toast.ts` - Toast notification hook

#### Utilities & Libraries
**Location:** `client/src/lib/`
- `utils.ts` - Utility functions
- `queryClient.ts` - React Query client configuration

#### Styles
**Location:** `client/src/`
- `index.css` - Global CSS styles

### Static Assets
**Location:** `client/public/`
- `logo.png` - Company logo
- `favicon.png` - Website favicon
- `a.jpg`, `b.jpg`, `c.jpg`, `d.jpg`, `e.jpg`, `f.jpg` - Image assets

---

## ⚙️ **BACKEND FILES**

### Main Backend Directory
**Location:** `server/`

### Backend Source Code
**Location:** `server/`

#### Core Server Files
- `server/index.ts` - **Main server file**
  - Express.js setup
  - API endpoints (`/api/contact`, `/api/health`, `/api/test-smtp`)
  - Email sending logic (Nodemailer)
  - SMTP configuration (Gmail)
  - Contact form submission handling
  - Static file serving

- `server/static.ts` - Static file serving middleware
- `server/storage.ts` - Storage interface and implementation
- `server/vite.ts` - Vite integration for development

---

## 🔄 **SHARED FILES**

### Shared Code
**Location:** `shared/`
- `shared/schema.ts` - Database schema (Drizzle ORM)
  - Users table definition
  - Zod validation schemas

---

## 🛠️ **CONFIGURATION FILES**

### Root Configuration
**Location:** Root directory (`D:\Modern-Site\`)

#### Build & Development
- `package.json` - NPM dependencies and scripts
- `package-lock.json` - Locked dependency versions
- `tsconfig.json` - TypeScript configuration
- `vite.config.ts` - Vite build configuration
- `drizzle.config.ts` - Database ORM configuration
- `postcss.config.js` - PostCSS configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `components.json` - Component library configuration

#### Build Scripts
**Location:** `script/`
- `script/build.ts` - Production build script

---

## 📦 **BUILD OUTPUT**

### Production Build
**Location:** `dist/`
- `dist/index.cjs` - Compiled server bundle
- `dist/public/` - Compiled frontend assets
  - `dist/public/index.html` - Built HTML
  - `dist/public/assets/` - CSS, JS, and image bundles

---

## 📄 **DATA & LOGS**

### Data Files
**Location:** Root directory
- `contact_submissions.json` - Contact form submissions storage
- `email_errors.log` - Email error logs

---

## 📚 **DOCUMENTATION**

### Documentation Files
**Location:** Root directory
- `README.md` - Project readme
- `PROJECT_DETAILS.md` - Project details
- `PROJECT_SUMMARY.md` - Project summary
- `FILE_LOCATIONS.md` - This file
- `design_guidelines.md` - Design guidelines
- `GMAIL_SETUP.md` - Gmail SMTP setup instructions
- `FIX_GMAIL_ERROR.md` - Gmail error troubleshooting

---

## 🎨 **ASSETS**

### Generated Assets
**Location:** `attached_assets/`
- `attached_assets/generated_images/` - Generated images
  - `digital_agency_hero_background.png` - Hero background

---

## 📋 **QUICK REFERENCE**

### Most Important Files

**Frontend Entry:**
- `client/src/main.tsx`
- `client/src/App.tsx`

**Backend Entry:**
- `server/index.ts` ⭐ **Main server file**

**Configuration:**
- `package.json` - Dependencies
- `vite.config.ts` - Build config
- `tsconfig.json` - TypeScript config

**Database:**
- `shared/schema.ts` - Schema definitions

**Contact Form:**
- Frontend: `client/src/components/ContactForm.tsx`
- Backend: `server/index.ts` (API endpoint: `/api/contact`)

---

## 📂 **Directory Structure**

```
Modern-Site/
├── client/                 # Frontend React app
│   ├── index.html
│   ├── public/            # Static assets
│   └── src/               # Source code
│       ├── main.tsx       # Entry point
│       ├── App.tsx        # Main component
│       ├── pages/        # Page components
│       ├── components/   # React components
│       ├── hooks/        # Custom hooks
│       ├── lib/          # Utilities
│       └── index.css     # Styles
│
├── server/                # Backend Express app
│   ├── index.ts          # Main server file ⭐
│   ├── static.ts         # Static serving
│   ├── storage.ts        # Storage layer
│   └── vite.ts           # Vite integration
│
├── shared/                # Shared code
│   └── schema.ts         # Database schema
│
├── script/                # Build scripts
│   └── build.ts          # Build script
│
├── dist/                  # Build output
│   ├── index.cjs         # Server bundle
│   └── public/           # Frontend bundle
│
├── attached_assets/      # Generated assets
│
└── [config files]        # Root config files
```

---

## 🔍 **File Search Tips**

- **Frontend components:** Search in `client/src/components/`
- **Backend API:** Search in `server/index.ts`
- **Database schema:** Search in `shared/schema.ts`
- **Configuration:** Search in root directory config files
- **Build output:** Check `dist/` directory

