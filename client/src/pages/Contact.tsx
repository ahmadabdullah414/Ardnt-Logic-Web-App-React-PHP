import ContactForm from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { SiFacebook, SiLinkedin, SiInstagram, SiX } from "react-icons/si";
import { motion } from "framer-motion";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    content: "+44 7723347193",
    link: "tel:+447723347193",
  },
  {
    icon: Mail,
    title: "Email",
    content: "contact@ardntlogic.com",
    link: "mailto:contact@ardntlogic.com",
  },
  {
    icon: MapPin,
    title: "Address",
    content: "PO Box 4385, Cardiff, CF14 8LH, UK",
    link: null,
  },
  {
    icon: Clock,
    title: "Business Hours",
    content: "Mon - Sat: 9:00 AM - 5:00 PM",
    link: null,
  },
];

const socialLinks = [
  { href: "https://web.facebook.com/profile.php?id=61578018772346&_rdc=1&_rdr#", icon: SiFacebook, label: "Facebook" },
  { href: "https://x.com/ardntlogic/", icon: SiX, label: "X" },
  { href: "https://www.linkedin.com/in/ardnt-logic-0b0b39371/", icon: SiLinkedin, label: "LinkedIn" },
  { href: "https://www.instagram.com/ardntlogic/", icon: SiInstagram, label: "Instagram" },
];

export default function Contact() {
  return (
    <main className="pt-20 overflow-x-hidden" data-testid="page-contact">
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent/60" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

        <motion.div
          className="absolute top-1/3 left-10 w-20 h-20 border border-white/20 rounded-full"
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm mb-8"
            >
              <MessageCircle className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              Let's Talk
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
              Have questions or ready to get started? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32 relative">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                Schedule a{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Free Consultation
                </span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form and one of our team members will get back to you within 24 hours.
              </p>
              <Card className="bg-gradient-to-br from-card to-card/50 border-white/10">
                <CardContent className="p-6 md:p-8">
                  <ContactForm />
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                Contact Information
              </h2>
              <p className="text-muted-foreground mb-8">
                Prefer to reach out directly? Here's how you can contact us.
              </p>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-muted/50 border border-white/10 hover-elevate"
                    data-testid={`contact-info-${info.title.toLowerCase()}`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold mb-1">
                        {info.title}
                      </h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-muted-foreground hover:text-accent transition-colors"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-muted-foreground whitespace-pre-line">
                          {info.content}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="mt-10 pt-8 border-t border-white/10"
              >
                <h3 className="font-heading font-semibold mb-6">Follow Us</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white shadow-lg shadow-accent/25"
                      aria-label={social.label}
                      data-testid={`link-contact-social-${social.label.toLowerCase()}`}
                      whileHover={{ y: -3, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <social.icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
