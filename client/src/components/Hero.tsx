import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@assets/generated_images/digital_agency_hero_background.png";

export default function Hero() {
  return (
    <section
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
      data-testid="section-hero"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1
          className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl text-white mb-6 leading-tight"
          data-testid="text-hero-headline"
        >
          Helping Local Businesses Grow Online –{" "}
          <span className="text-accent">$299/Month</span>
        </h1>
        <p
          className="text-lg sm:text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed"
          data-testid="text-hero-subheading"
        >
          Your business deserves a professional website that attracts customers,
          improves your Google ranking, and generates quality leads. ArdntLogic
          is here to provide the tools and services you need to succeed online.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact">
            <Button
              size="lg"
              className="bg-accent text-accent-foreground font-semibold px-8 py-6 text-lg gap-2"
              data-testid="button-hero-cta"
            >
              Start Your Growth Today
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <Link href="/services">
            <Button
              size="lg"
              variant="outline"
              className="backdrop-blur-md bg-white/10 border-white/30 text-white font-semibold px-8 py-6 text-lg"
              data-testid="button-hero-learn-more"
            >
              Learn More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
