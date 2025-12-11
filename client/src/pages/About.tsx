import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Target, Heart, Handshake, Award } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Results-Focused",
    description: "We measure success by your growth, not just website traffic.",
  },
  {
    icon: Heart,
    title: "Local Business Passion",
    description: "We genuinely care about helping small businesses thrive.",
  },
  {
    icon: Handshake,
    title: "Transparency",
    description: "No hidden fees, no confusing jargon – just honest service.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We deliver quality work that exceeds expectations.",
  },
];

export default function About() {
  return (
    <main className="pt-16" data-testid="page-about">
      <section className="py-16 md:py-24 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-primary-foreground mb-6">
            We Help Local Businesses Thrive Online
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            At ArdntLogic, our mission is to empower local businesses to succeed online through professional digital solutions.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-heading font-bold text-3xl mb-6">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              ArdntLogic was founded with a simple belief: every local business deserves access to professional digital marketing services without breaking the bank. Too often, we saw small business owners struggling to compete online because traditional agencies were either too expensive or too complicated.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We created the $299/month Local Business Package to change that. By focusing specifically on local businesses and streamlining our processes, we're able to deliver enterprise-level results at small business prices.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, we're proud to work with hundreds of local businesses across various industries – from construction and property management to restaurants and professional services. Each client represents a family's livelihood, and we take that responsibility seriously.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted" data-testid="section-values">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              Our Values
            </h2>
            <p className="text-muted-foreground text-lg">
              The principles that guide everything we do.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title} data-testid={`card-value-${value.title.toLowerCase().replace(/\s+/g, "-")}`}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                    <value.icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              Our Mission
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              To democratize digital marketing by providing affordable, effective online solutions that help local businesses compete and thrive in the digital age.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground font-semibold px-8 py-6 text-lg gap-2"
                data-testid="button-about-cta"
              >
                Learn More About Our Services
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
