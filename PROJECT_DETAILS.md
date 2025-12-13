# Project Details - ArdntLogic Website

## 📋 Project Overview
**Project Name:** ArdntLogic - Local Business Growth Solutions  
**Type:** Full-Stack Web Application  
**Purpose:** Professional website for a digital agency offering local business services ($299/month package)

---

## 🗣️ Programming Languages

### Primary Languages
- **TypeScript** (5.6.3) - Main language for both frontend and backend
- **JavaScript** (ESNext/ES Modules) - Runtime language
- **TSX/JSX** - React component syntax
- **CSS** - Styling (via Tailwind CSS)

### Configuration Languages
- **JSON** - Package configuration, component configs
- **Markdown** - Documentation

---

## 🎨 Frontend Stack

### Core Framework
- **React** (18.3.1) - UI library
- **React DOM** (18.3.1) - DOM rendering

### Routing
- **Wouter** (3.3.5) - Lightweight client-side routing

### UI Component Libraries
- **Radix UI** - Headless, accessible component primitives
  - Accordion, Alert Dialog, Avatar, Checkbox, Dialog, Dropdown Menu
  - Form, Input, Label, Popover, Select, Tabs, Toast, Tooltip, and more
- **shadcn/ui** - Custom component system built on Radix UI

### Form Handling
- **React Hook Form** (7.55.0) - Form state management
- **Zod** (3.24.2) - Schema validation
- **@hookform/resolvers** (3.10.0) - Zod integration for React Hook Form

### Styling
- **Tailwind CSS** (3.4.17) - Utility-first CSS framework
- **tailwindcss-animate** (1.0.7) - Animation utilities
- **@tailwindcss/typography** (0.5.15) - Typography plugin
- **PostCSS** (8.4.47) - CSS processing
- **Autoprefixer** (10.4.20) - CSS vendor prefixing
- **clsx** (2.1.1) - Conditional class names
- **tailwind-merge** (2.6.0) - Merge Tailwind classes
- **class-variance-authority** (0.7.1) - Component variants

### Animations
- **Framer Motion** (11.13.1) - Animation library for React

### Icons
- **Lucide React** (0.453.0) - Icon library
- **React Icons** (5.4.0) - Additional icon sets

### Date/Time Handling
- **date-fns** (3.6.0) - Date utility library
- **react-day-picker** (8.10.1) - Date picker component

### Data Fetching
- **TanStack Query (React Query)** (5.60.5) - Server state management

### Charts/Visualization
- **Recharts** (2.15.2) - Chart library

### Other Frontend Libraries
- **next-themes** (0.4.6) - Theme management
- **embla-carousel-react** (8.6.0) - Carousel component
- **cmdk** (1.1.1) - Command menu component
- **vaul** (1.1.2) - Drawer component
- **input-otp** (1.4.2) - OTP input component
- **react-resizable-panels** (2.1.7) - Resizable panel layouts

---

## ⚙️ Backend Stack

### Server Framework
- **Express.js** (4.21.2) - Web application framework
- **Node.js** - Runtime environment
- **HTTP Server** (built-in) - HTTP server

### Email Service
- **Nodemailer** (7.0.11) - Email sending library
- **Gmail SMTP** - Email delivery service

### Authentication (Available)
- **Passport.js** (0.7.0) - Authentication middleware
- **passport-local** (1.0.0) - Local authentication strategy

### Session Management (Available)
- **express-session** (1.18.1) - Session middleware
- **connect-pg-simple** (10.0.0) - PostgreSQL session store
- **memorystore** (1.6.7) - In-memory session store

### Environment Configuration
- **dotenv** (17.2.3) - Environment variable management
- **cross-env** (10.1.0) - Cross-platform environment variables

---

## 🗄️ Database

### ORM
- **Drizzle ORM** (0.39.3) - TypeScript ORM
- **drizzle-zod** (0.7.0) - Zod schema integration
- **drizzle-kit** (0.31.4) - Database migrations and tooling

### Database Type
- **PostgreSQL** - Relational database (configured via DATABASE_URL)
- **pg** (8.16.3) - PostgreSQL client for Node.js

### Database Configuration
- Connection via `DATABASE_URL` environment variable
- Migrations stored in `./migrations` directory
- Schema defined in `./shared/schema.ts`

---

## 🛠️ Build Tools & Development

### Build System
- **Vite** (5.4.20) - Next-generation frontend build tool
- **@vitejs/plugin-react** (4.7.0) - React plugin for Vite
- **esbuild** (0.25.0) - Fast JavaScript bundler (for server)

### TypeScript
- **TypeScript** (5.6.3) - Type checking and compilation
- **tsx** (4.20.5) - TypeScript execution for Node.js

### Development Tools
- **@replit/vite-plugin-runtime-error-modal** - Error overlay
- **@replit/vite-plugin-cartographer** - Development tools
- **@replit/vite-plugin-dev-banner** - Dev banner

### Code Quality
- TypeScript strict mode enabled
- Path aliases configured (`@/*`, `@shared/*`)

---

## 📁 Project Structure

```
Modern-Site/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── ui/         # shadcn/ui components
│   │   │   └── ...         # Custom components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility libraries
│   │   └── main.tsx        # Entry point
│   ├── public/             # Static assets
│   └── index.html          # HTML template
├── server/                  # Backend Express application
│   ├── index.ts            # Server entry point
│   ├── routes.ts           # API routes
│   ├── storage.ts          # Database storage interface
│   ├── static.ts           # Static file serving
│   └── vite.ts             # Vite dev server setup
├── shared/                  # Shared code between frontend/backend
│   └── schema.ts           # Database schemas
├── script/                  # Build scripts
│   └── build.ts            # Production build script
└── dist/                    # Production build output
```

---

## 🌐 API & Communication

### API Endpoints
- **POST /api/contact** - Contact form submission
  - Sends email via Nodemailer
  - Validates form data with Zod
  - Returns success/error responses

### WebSocket (Available)
- **ws** (8.18.0) - WebSocket library (configured but not actively used)

---

## 📦 Package Management

- **npm** - Node Package Manager
- **package.json** - Project dependencies and scripts
- **package-lock.json** - Locked dependency versions

---

## 🚀 Scripts

```json
{
  "dev": "cross-env NODE_ENV=development tsx server/index.ts",
  "build": "tsx script/build.ts",
  "start": "cross-env NODE_ENV=production node dist/index.cjs",
  "check": "tsc",
  "db:push": "drizzle-kit push"
}
```

---

## 🔧 Configuration Files

- **tsconfig.json** - TypeScript configuration
- **vite.config.ts** - Vite build configuration
- **tailwind.config.ts** - Tailwind CSS configuration
- **postcss.config.js** - PostCSS configuration
- **drizzle.config.ts** - Drizzle ORM configuration
- **components.json** - shadcn/ui component configuration
- **.env** - Environment variables (not in repo)

---

## 🎯 Key Features

### Frontend Features
- ✅ Responsive design (mobile-first)
- ✅ Modern UI with shadcn/ui components
- ✅ Form validation with React Hook Form + Zod
- ✅ Date and time pickers
- ✅ Smooth animations with Framer Motion
- ✅ Toast notifications
- ✅ Client-side routing
- ✅ Dark mode support (via next-themes)

### Backend Features
- ✅ RESTful API endpoints
- ✅ Email sending via Gmail SMTP
- ✅ Environment-based configuration
- ✅ Error handling and logging
- ✅ CORS support
- ✅ Static file serving

### Pages
- Home
- Services
- Pricing
- Testimonials
- About
- Contact (with form)
- Privacy Policy
- Terms of Service

---

## 🔐 Environment Variables

Required environment variables (`.env` file):
```
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-gmail-app-password
RECIPIENT_EMAIL=ahmadtkd009@gmail.com
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://... (if using database)
```

---

## 📊 Technology Summary

| Category | Technology |
|----------|-----------|
| **Language** | TypeScript, JavaScript |
| **Frontend Framework** | React 18 |
| **Backend Framework** | Express.js |
| **Database** | PostgreSQL (via Drizzle ORM) |
| **Styling** | Tailwind CSS |
| **UI Components** | Radix UI / shadcn/ui |
| **Form Handling** | React Hook Form + Zod |
| **Routing** | Wouter |
| **Build Tool** | Vite |
| **Email** | Nodemailer (Gmail SMTP) |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |

---

## 🎨 Design System

- **Component Library:** shadcn/ui (built on Radix UI)
- **Styling Approach:** Utility-first CSS (Tailwind)
- **Color System:** HSL-based with CSS variables
- **Typography:** Custom font families via CSS variables
- **Responsive:** Mobile-first breakpoints
- **Accessibility:** WCAG compliant (via Radix UI)

---

## 📝 Development Workflow

1. **Development:** `npm run dev` - Starts dev server with hot reload
2. **Type Checking:** `npm run check` - Runs TypeScript compiler
3. **Build:** `npm run build` - Creates production build
4. **Start:** `npm start` - Runs production server
5. **Database:** `npm run db:push` - Pushes schema changes

---

## 🌟 Notable Libraries & Tools

- **Zod** - Runtime type validation
- **date-fns** - Modern date utilities
- **Framer Motion** - Production-ready motion library
- **TanStack Query** - Powerful data synchronization
- **Drizzle ORM** - TypeScript ORM with excellent DX
- **Vite** - Lightning-fast build tool
- **Radix UI** - Unstyled, accessible components

---

## 📄 License
MIT

---

## 👥 Project Type
Full-Stack TypeScript Web Application  
Monorepo structure (client + server in one repository)  
Modern development stack with type safety

