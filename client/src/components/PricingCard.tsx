import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const features = [
  "Custom Website Design",
  "Full SEO Optimization",
  "Review Management",
  "Lead Follow-Up System",
  "4 Posts per Month",
  "Monthly Reports",
  "Click-to-Call Feature",
  "Monthly Management",
];

export default function PricingCard() {
  return (
    <Card
      className="max-w-lg mx-auto border-2 border-accent"
      data-testid="card-pricing"
    >
      <CardHeader className="text-center pb-4">
        <p className="text-accent font-semibold text-sm uppercase tracking-wide mb-2">
          Local Business Package
        </p>
        <div className="flex items-baseline justify-center gap-1">
          <span className="font-heading font-bold text-5xl" data-testid="text-price">
            $299
          </span>
          <span className="text-muted-foreground text-lg">/month</span>
        </div>
        <p className="text-muted-foreground mt-2">
          No hidden fees. No contracts.
        </p>
      </CardHeader>
      <CardContent className="pb-4">
        <ul className="space-y-3">
          {features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-3"
              data-testid={`list-item-${feature.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Check className="w-3 h-3 text-accent" />
              </div>
              <span className="text-foreground">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="pt-4">
        <Link href="/contact" className="w-full">
          <Button
            size="lg"
            className="w-full bg-accent text-accent-foreground font-semibold gap-2"
            data-testid="button-pricing-cta"
          >
            Get Started Today
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
