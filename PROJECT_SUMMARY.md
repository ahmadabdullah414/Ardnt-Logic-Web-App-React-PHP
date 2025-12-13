# Project Summary

## **Modern-Site** - Professional Business Website

### **Language**
- **TypeScript** (Full-stack)
- **JavaScript** (Runtime: Node.js)

### **Frontend**
- **React 18** with TypeScript
- **Vite** (Build tool & dev server)
- **Tailwind CSS** (Styling)
- **Radix UI** (Component library)
- **Wouter** (Client-side routing)
- **React Hook Form** + **Zod** (Form validation)
- **Framer Motion** (Animations)

### **Backend**
- **Node.js** + **Express.js**
- **TypeScript** (tsx for runtime)
- **Nodemailer** (Email sending via Gmail SMTP)
- **CORS** enabled
- RESTful API architecture

### **Database**
- **PostgreSQL** (Configured with Drizzle ORM)
- **Drizzle Kit** (Database migrations)
- **Current Storage**: JSON file (`contact_submissions.json`) for contact form submissions
- Schema defined in `shared/schema.ts` (users table)

### **Key Features**
- Contact form with email notifications
- Responsive design
- Modern UI components
- Email templating (HTML + plain text)
- Form submission persistence
- Health check endpoint

### **Project Structure**
```
Modern-Site/
├── client/          # React frontend
├── server/          # Express backend
├── shared/          # Shared schemas/types
└── script/          # Build scripts
```

### **Tech Stack Summary**
| Category | Technology |
|----------|-----------|
| **Language** | TypeScript |
| **Frontend** | React 18, Vite, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | PostgreSQL (Drizzle ORM) |
| **Email** | Nodemailer (Gmail SMTP) |
| **Validation** | Zod |
| **Routing** | Wouter (client-side) |


