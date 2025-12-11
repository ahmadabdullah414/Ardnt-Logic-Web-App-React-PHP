import ServiceCard from "./ServiceCard";
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
    <section className="py-24 md:py-32 relative overflow-hidden" data-testid="section-services">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/50 to-transparent" />
      
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-6"
          >
            Our Services
          </motion.span>
          <h2
            className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl mb-6"
            data-testid="text-services-headline"
          >
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Succeed Online
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From stunning websites to powerful SEO, we provide all the tools 
            local businesses need to thrive in the digital world.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
