import ServiceCard from "./ServiceCard";
import {
  Globe,
  Search,
  Star,
  UserCheck,
  FileText,
  Phone,
  BarChart3,
  Settings,
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Website Design",
    description: "Beautiful, user-friendly websites optimized for desktop and mobile.",
  },
  {
    icon: Search,
    title: "SEO",
    description: "Improve your Google ranking with on-page optimization and keyword targeting.",
  },
  {
    icon: Star,
    title: "Review Management",
    description: "Build a positive online reputation with streamlined review collection.",
  },
  {
    icon: UserCheck,
    title: "Lead Follow-Up",
    description: "Automate your follow-up process so no potential customer slips away.",
  },
  {
    icon: FileText,
    title: "Monthly Posts",
    description: "4 fresh posts per month to keep your website active and engaging.",
  },
  {
    icon: Phone,
    title: "Click-to-Call",
    description: "Let customers reach you instantly with one-tap calling from your site.",
  },
  {
    icon: BarChart3,
    title: "Monthly Reports",
    description: "Detailed analytics showing your growth and performance metrics.",
  },
  {
    icon: Settings,
    title: "Monthly Management",
    description: "Ongoing website maintenance and updates to keep everything running smoothly.",
  },
];

export default function ServicesSection() {
  return (
    <section className="py-16 md:py-24 bg-background" data-testid="section-services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2
            className="font-heading font-bold text-3xl md:text-4xl mb-4"
            data-testid="text-services-headline"
          >
            Complete Digital Package for Your Local Business
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            At ArdntLogic, we understand the unique challenges faced by local
            businesses. Whether you're in construction, property management, or any
            other niche, we provide tailored services that make your business
            visible, grow online, and succeed.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
