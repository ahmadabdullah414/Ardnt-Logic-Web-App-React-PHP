# ArdntLogic Website Design Guidelines

## Design Approach
**Reference-Based**: Professional agency websites (Webflow, Wix, Squarespace landing pages) with modern SaaS aesthetics - clean, trustworthy, conversion-focused.

## Color System
```
Primary: #0056D2 (Blue) - Trust, professionalism
Background: #FFFFFF (White) - Clean, modern
Accent: #00E5FF (Neon Teal) - CTAs, buttons, highlights, hover states
Text: #2B2B2B (Dark Gray) - Body content
```

## Typography
- **Headlines**: Montserrat (Bold, weights 600-700)
- **Body**: Open Sans (Regular 400, Medium 500)
- **Hierarchy**: h1 (48px), h2 (36px), h3 (24px), body (16px), small (14px)

## Layout System
- **Spacing**: Tailwind units 4, 8, 12, 16, 24 (p-4, mb-8, py-12, etc.)
- **Container**: max-w-7xl centered with px-4 (mobile), px-8 (tablet), px-16 (desktop)
- **Sections**: py-16 (mobile), py-24 (desktop) vertical rhythm
- **Grid**: 1 column mobile, 2-3 columns tablet/desktop for service blocks

## Page Structure

### Homepage
1. **Hero Section** (80vh):
   - Large background image showing local business success (modern office/team)
   - Centered headline + subheading + CTA button
   - Button with blur backdrop effect
   
2. **Why Choose ArdntLogic** (Full-width section):
   - Centered headline + description text (max-w-3xl)
   - 4x2 grid of service feature cards (icons + title + brief description)
   - Use Font Awesome icons (fa-laptop, fa-chart-line, fa-star, fa-phone, etc.)

### Services Page
- Individual sections for each of 8 services
- Alternating left-right image/text layouts
- Service icon + headline + detailed description + benefits list
- Images: Professional stock photos of businesses, technology, analytics

### Contact Page
- Two-column layout (desktop): Form left, contact info right
- Form fields: Name, Email, Phone, Message with proper spacing
- Social media icon links (Font Awesome brands)

### Testimonials Page
- 2-column grid of testimonial cards
- Each card: Quote text + Client name + Business name
- Subtle card elevation with border

### Pricing Page
- Centered pricing card (max-w-2xl)
- Bold $299/month headline
- Checklist of 8 included services with checkmark icons
- Prominent CTA button

### About & Legal Pages
- Single column, max-w-4xl centered
- Clean typography hierarchy
- Standard text formatting

## Component Library

### Buttons
- **Primary CTA**: Neon teal bg, white text, rounded-lg, px-8 py-4, hover brightness
- **Secondary**: Blue outline, blue text, same padding
- **On Images**: Blur backdrop (backdrop-blur-md), white text

### Cards
- White background, subtle shadow, rounded-lg, p-6
- Hover: slight elevation increase

### Navigation
- Sticky top bar, white bg, shadow on scroll
- Logo left, menu items right
- Mobile: Hamburger menu
- Links: Blue text, neon underline on hover

### Service Icons
- Font Awesome icons, 48px size, neon teal color
- Centered in circular backgrounds (light blue tint)

### Forms
- Input fields: Border, rounded, py-3 px-4
- Focus: Blue border, subtle shadow
- Labels: Above inputs, medium weight

## Images
**Hero Section**: Large professional image showing diverse local businesses or team collaboration (1920x1080 min)

**Service Sections**: Relevant stock photos for each service type - website mockups, analytics dashboards, review screenshots, professional office settings

**Testimonial Sections**: Optional headshots or business logos

## Interactions
- Smooth scroll behavior
- Subtle hover effects on cards (transform scale 1.02)
- Button hover: brightness increase
- Navigation: Sticky with shadow on scroll
- Minimal animations - focus on performance

## Responsive Breakpoints
- Mobile: < 768px (single column, stacked layouts)
- Tablet: 768px - 1024px (2 columns)
- Desktop: > 1024px (full multi-column layouts)

## Accessibility
- High contrast ratios (WCAG AA)
- Keyboard navigation support
- ARIA labels on all interactive elements
- Alt text for all images
- Focus states visible on all interactive elements

## SEO Requirements
- Semantic HTML5 structure
- Meta tags on all pages
- Alt text for images
- Fast loading (optimize images, minimal JS)
- Mobile-first responsive approach