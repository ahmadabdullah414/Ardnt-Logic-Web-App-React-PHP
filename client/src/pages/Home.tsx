import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import PricingCard from "@/components/PricingCard";
import TestimonialCard from "@/components/TestimonialCard";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// todo: remove mock functionality - replace with real testimonials from API
const testimonials = [
  {
    quote: "ArdntLogic helped us redesign our website, improved our SEO, and boosted our leads. We now rank higher on Google and convert more customers.",
    name: "John Doe",
    company: "XYZ Construction",
  },
  {
    quote: "Their review management system helped us build trust with new clients. The monthly posts keep our site fresh, and we're seeing more online engagement.",
    name: "Jane Smith",
    company: "Smith Properties",
  },
];

export default function Home() {
  return (
    <main data-testid="page-home">
      <Hero />
      
      <ServicesSection />
      
      <section className="py-16 md:py-24 bg-muted" data-testid="section-testimonials-preview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              What Our Clients Say
            </h2>
            <p className="text-muted-foreground text-lg">
              Don't just take our word for it – hear from businesses we've helped grow.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} {...testimonial} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/testimonials">
              <Button variant="outline" className="gap-2">
                See More Testimonials
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-background" data-testid="section-pricing-preview">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-muted-foreground text-lg">
              Everything you need to grow your local business online.
            </p>
          </div>
          <PricingCard />
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-primary" data-testid="section-cta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-primary-foreground mb-4">
            Ready to Grow Your Business Online?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8">
            Join hundreds of local businesses that trust ArdntLogic to help them succeed online.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground font-semibold px-8 py-6 text-lg gap-2"
              data-testid="button-cta-contact"
            >
              Get Your Free Consultation
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
