import { Link } from "wouter";
import { Button } from "@/components/ui/button";
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

export default function Services() {
  return (
    <main className="pt-16" data-testid="page-services">
      <section className="py-16 md:py-24 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-primary-foreground mb-6">
            Our Services
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Everything you need to establish a strong online presence and grow your local business.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service, index) => (
              <div
                key={service.title}
                className={`flex flex-col ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-8 lg:gap-16 items-center`}
                data-testid={`service-block-${index}`}
              >
                <div className="flex-1">
                  <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                    <service.icon className="w-8 h-8 text-accent" />
                  </div>
                  <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                    {service.title}
                  </h2>
                  <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-accent" />
                        </div>
                        <span className="text-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1 w-full">
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
                    <service.icon className="w-24 h-24 text-accent/30" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-accent-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-accent-foreground/80 text-lg mb-8">
            All these services are included in our $299/month Local Business Package.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground font-semibold px-8 py-6 text-lg gap-2"
              data-testid="button-services-cta"
            >
              Start Your Growth Today
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
