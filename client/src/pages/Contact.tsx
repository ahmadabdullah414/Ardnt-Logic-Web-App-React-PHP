import ContactForm from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { SiFacebook, SiLinkedin, SiInstagram, SiX } from "react-icons/si";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    content: "(123) 456-7890",
    link: "tel:+1234567890",
  },
  {
    icon: Mail,
    title: "Email",
    content: "info@ardntlogic.com",
    link: "mailto:info@ardntlogic.com",
  },
  {
    icon: MapPin,
    title: "Address",
    content: "123 Business Ave, Suite 100\nYour City, ST 12345",
    link: null,
  },
  {
    icon: Clock,
    title: "Business Hours",
    content: "Mon - Fri: 9:00 AM - 5:00 PM",
    link: null,
  },
];

const socialLinks = [
  { href: "https://facebook.com", icon: SiFacebook, label: "Facebook" },
  { href: "https://twitter.com", icon: SiX, label: "X" },
  { href: "https://linkedin.com", icon: SiLinkedin, label: "LinkedIn" },
  { href: "https://instagram.com", icon: SiInstagram, label: "Instagram" },
];

export default function Contact() {
  return (
    <main className="pt-16" data-testid="page-contact">
      <section className="py-16 md:py-24 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-primary-foreground mb-6">
            Get In Touch
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Have questions or ready to get started? Reach out to us directly or fill out the form below.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl mb-6">
                Schedule a Free Consultation
              </h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form and one of our team members will get back to you within 24 hours to discuss how we can help grow your business online.
              </p>
              <Card>
                <CardContent className="p-6">
                  <ContactForm />
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="font-heading font-bold text-2xl md:text-3xl mb-6">
                Contact Information
              </h2>
              <p className="text-muted-foreground mb-8">
                Prefer to reach out directly? Here's how you can contact us.
              </p>
              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <div
                    key={info.title}
                    className="flex items-start gap-4"
                    data-testid={`contact-info-${info.title.toLowerCase()}`}
                  >
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
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
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t">
                <h3 className="font-heading font-semibold mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-accent transition-colors"
                      aria-label={social.label}
                      data-testid={`link-contact-social-${social.label.toLowerCase()}`}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
