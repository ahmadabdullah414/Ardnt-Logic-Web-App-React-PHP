import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-background/80 backdrop-blur-xl shadow-lg border-b border-white/10" 
          : "bg-transparent"
      }`}
      data-testid="navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" data-testid="link-logo">
            <motion.div 
              className="flex items-center gap-2 cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-accent to-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="font-heading font-bold text-xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ArdntLogic
              </span>
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={link.href}>
                  <span
                    className={`relative px-4 py-2 text-sm font-medium rounded-full cursor-pointer transition-all duration-300 ${
                      location === link.href
                        ? "text-accent"
                        : scrolled ? "text-foreground hover:text-accent" : "text-foreground hover:text-accent"
                    }`}
                    data-testid={`link-nav-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                    {location === link.href && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 bg-accent/10 rounded-full -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <motion.a
              href="tel:+447723347193"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
              data-testid="link-phone"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                <Phone className="w-4 h-4 text-accent" />
              </div>
              <span className="hidden lg:inline">+44 7723347193</span>
            </motion.a>
            <Link href="/contact">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  className="relative overflow-hidden bg-gradient-to-r from-primary to-accent text-white font-semibold shadow-lg shadow-accent/25 border-0"
                  data-testid="button-get-started"
                >
                  <span className="relative z-10">Get Started</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 hover:opacity-100 transition-opacity"
                  />
                </Button>
              </motion.div>
            </Link>
          </div>

          <motion.button
            className="md:hidden p-2 rounded-xl text-foreground bg-muted/50 backdrop-blur-sm"
            onClick={() => setIsOpen(!isOpen)}
            data-testid="button-mobile-menu"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-white"
              data-testid="mobile-menu"
            >
              <div className="pb-6 pt-2 space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link href={link.href}>
                      <span
                        className={`block px-4 py-3 text-base font-medium rounded-xl cursor-pointer transition-all ${
                          location === link.href
                            ? "text-accent bg-accent/10"
                            : "text-foreground hover:text-accent hover:bg-accent/5"
                        }`}
                        onClick={() => setIsOpen(false)}
                        data-testid={`link-mobile-${link.label.toLowerCase()}`}
                      >
                        {link.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  className="px-4 pt-4"
                >
                  <Link href="/contact">
                    <Button
                      className="w-full bg-gradient-to-r from-primary to-accent text-white font-semibold"
                      onClick={() => setIsOpen(false)}
                      data-testid="button-mobile-get-started"
                    >
                      Get Started
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
