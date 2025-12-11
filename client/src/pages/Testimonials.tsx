import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import TestimonialCard from "@/components/TestimonialCard";
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
  {
    quote: "We were struggling to get found online. After working with ArdntLogic, our phone started ringing with new leads every week.",
    name: "Mike Johnson",
    company: "Johnson Plumbing",
  },
  {
    quote: "The team is incredibly responsive and really understands what local businesses need. Best investment we've made for our restaurant.",
    name: "Sarah Chen",
    company: "Golden Dragon Restaurant",
  },
  {
    quote: "Finally, a digital agency that doesn't require a huge upfront investment. The $299/month package has everything we need.",
    name: "Tom Williams",
    company: "Williams Landscaping",
  },
  {
    quote: "Our competitors are jealous of how professional our website looks. ArdntLogic delivered beyond our expectations.",
    name: "Lisa Brown",
    company: "Brown's Auto Repair",
  },
];

export default function Testimonials() {
  return (
    <main className="pt-16" data-testid="page-testimonials">
      <section className="py-16 md:py-24 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-primary-foreground mb-6">
            Our Clients Love What We Do!
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Don't just take our word for it – hear from the local businesses we've helped grow.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-accent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-accent-foreground mb-4">
            Ready to Be Our Next Success Story?
          </h2>
          <p className="text-accent-foreground/80 text-lg mb-8">
            Join hundreds of local businesses that trust ArdntLogic.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground font-semibold px-8 py-6 text-lg gap-2"
              data-testid="button-testimonials-cta"
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
