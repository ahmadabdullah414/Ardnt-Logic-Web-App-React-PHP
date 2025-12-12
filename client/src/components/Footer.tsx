import { Link } from "wouter";
import { Phone, Mail, MapPin, Sparkles, ArrowUpRight } from "lucide-react";
import { SiFacebook, SiLinkedin, SiInstagram, SiX } from "react-icons/si";
import { motion } from "framer-motion";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

const socialLinks = [
  { href: "https://web.facebook.com/profile.php?id=61578018772346&_rdc=1&_rdr#", icon: SiFacebook, label: "Facebook" },
  { href: "https://x.com/ardntlogic/", icon: SiX, label: "X" },
  { href: "https://www.linkedin.com/in/ardnt-logic-0b0b39371/", icon: SiLinkedin, label: "LinkedIn" },
  { href: "https://www.instagram.com/ardntlogic/", icon: SiInstagram, label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-background to-primary/5 border-t border-white/10" data-testid="footer">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ArdntLogic
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Helping local businesses thrive online with professional website
              design, SEO, and digital marketing solutions.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-muted/50 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/50 hover:bg-accent/10 transition-all duration-300"
                  aria-label={social.label}
                  data-testid={`link-social-${social.label.toLowerCase()}`}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span
                      className="group flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors cursor-pointer text-sm"
                      data-testid={`link-footer-${link.label.toLowerCase()}`}
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span
                      className="group flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors cursor-pointer text-sm"
                      data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg mb-6">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a 
                  href="tel:+447723347193" 
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-accent transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Phone className="w-4 h-4 text-accent" />
                  </div>
                  +44 7723347193
                </a>
              </li>
              <li>
                <a 
                  href="mailto:contact@ardntlogic.com" 
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-accent transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Mail className="w-4 h-4 text-accent" />
                  </div>
                  contact@ardntlogic.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-accent" />
                </div>
                <span>PO Box 4385, Cardiff, CF14 8LH, UK</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} ArdntLogic. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm">
            Made with <span className="text-accent">♥</span> for local businesses
          </p>
        </div>
      </div>
    </footer>
  );
}
