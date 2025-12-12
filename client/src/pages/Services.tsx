import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Globe,
  Search,
  Star,
  UserCheck,
  FileText,
  Phone,
  BarChart3,
  Settings,
  ArrowRight,
  Check,
  Sparkles,
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Custom Websites Built to Grow Your Business",
    description: "Your website is often the first interaction potential customers have with your business. We create beautiful, user-friendly websites that are optimized for desktop and mobile.",
    benefits: [
      "Mobile-responsive design",
      "Fast loading speeds",
      "Modern, professional aesthetics",
      "Easy to navigate",
      "Conversion-optimized layouts",
    ],
  },
  {
    icon: Search,
    title: "Drive More Traffic and Rank Higher on Google",
    description: "Our SEO services are designed to improve your Google ranking, using on-page optimization, keyword targeting, and Google My Business optimization.",
    benefits: [
      "Keyword research & targeting",
      "On-page SEO optimization",
      "Google My Business setup",
      "Local SEO strategies",
      "Ongoing optimization",
    ],
  },
  {
    icon: Star,
    title: "Build Trust with Positive Reviews",
    description: "We streamline your review collection and management, helping your business build a positive online reputation that attracts new customers.",
    benefits: [
      "Automated review requests",
      "Review monitoring",
      "Reputation management",
      "Response templates",
      "Multi-platform support",
    ],
  },
  {
    icon: UserCheck,
    title: "Never Lose a Lead Again",
    description: "Automate your lead follow-up process to ensure no potential customer slips through the cracks. Our system keeps your leads warm and engaged.",
    benefits: [
      "Automated follow-up emails",
      "Lead tracking dashboard",
      "Custom nurturing sequences",
      "CRM integration",
      "Lead scoring",
    ],
  },
  {
    icon: FileText,
    title: "Keep Your Website Fresh and Engaging",
    description: "We provide 4 posts per month that help keep your website active, improving both SEO and customer engagement with relevant, quality content.",
    benefits: [
      "4 blog posts monthly",
      "SEO-optimized content",
      "Industry-relevant topics",
      "Professional copywriting",
      "Social media ready",
    ],
  },
  {
    icon: Phone,
    title: "Get Instant Contact from Your Website Visitors",
    description: "With our click-to-call feature, customers can reach you instantly, increasing conversion rates and making it easy for mobile users to connect.",
    benefits: [
      "One-tap calling",
      "Mobile-optimized",
      "Call tracking",
      "Business hours display",
      "Voicemail integration",
    ],
  },
  {
    icon: BarChart3,
    title: "Track Your Growth with Monthly Reports",
    description: "Detailed analytics showing your website traffic, lead generation, and overall performance so you always know how your investment is performing.",
    benefits: [
      "Traffic analytics",
      "Lead generation metrics",
      "Conversion tracking",
      "Ranking reports",
      "ROI insights",
    ],
  },
  {
    icon: Settings,
    title: "Hands-Off Website Management",
    description: "Ongoing website maintenance and updates to keep everything running smoothly. We handle the technical details so you can focus on your business.",
    benefits: [
      "Security updates",
      "Plugin maintenance",
      "Backup management",
      "Performance optimization",
      "Technical support",
    ],
  },
];

const serviceImages = [
  "https://i.postimg.cc/FKQMNBTQ/1.jpg",
  "https://i.postimg.cc/X7RhkPSB/2.jpg",
  "https://i.postimg.cc/R09Djn0x/3.jpg",
  "https://i.postimg.cc/wvjbB8LK/4.jpg",
  "https://i.postimg.cc/63bb2jf0/5.jpg",
  "https://i.postimg.cc/90vx1DSF/6.jpg",
  "https://i.postimg.cc/wj5WcTkz/7.jpg",
  "https://i.postimg.cc/CKmmXPtH/8.jpg",
];

export default function Services() {
  return (
    <main className="pt-20 overflow-x-hidden" data-testid="page-services">
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent/60" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 border border-white/20 rounded-full"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-32 h-32 border border-white/10 rounded-full"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
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
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              Our Services
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
              Everything you need to establish a strong online presence and grow your local business.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32 relative">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="space-y-32">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`flex flex-col ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-12 lg:gap-20 items-center`}
                data-testid={`service-block-${index}`}
              >
                <div className="flex-1">
                  <motion.div 
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <service.icon className="w-8 h-8 text-accent" />
                  </motion.div>
                  <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.benefits.map((benefit, i) => (
                      <motion.li 
                        key={benefit} 
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center flex-shrink-0">
                          <Check className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-foreground">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 w-full">
                  <motion.div 
                    className="aspect-square max-w-md mx-auto rounded-3xl relative overflow-hidden group"
                    whileHover={{ scale: 1.02 }}
                  >
                    <img 
                      src={serviceImages[index]}
                      alt={service.title}
                      className="absolute inset-0 w-full h-full object-cover rounded-3xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent via-cyan-400 to-accent" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-black mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-black/70 text-lg mb-10 max-w-2xl mx-auto">
              All these services are included in our $299/month Local Business Package.
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-primary text-white font-bold px-10 py-7 text-lg gap-2 shadow-2xl rounded-xl"
                  data-testid="button-services-cta"
                >
                  Start Your Growth Today
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
