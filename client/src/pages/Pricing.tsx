import PricingCard from "@/components/PricingCard";
import { Check, X } from "lucide-react";

const faqs = [
  {
    question: "Are there any contracts?",
    answer: "No long-term contracts. You can cancel anytime with 30 days notice.",
  },
  {
    question: "What's included in the monthly fee?",
    answer: "Everything listed in the package: website hosting, design, SEO, content, lead management, reports, and ongoing support.",
  },
  {
    question: "How long does it take to get started?",
    answer: "Most websites are up and running within 2-3 weeks of signing up.",
  },
  {
    question: "Do I own my website?",
    answer: "Yes! You own all the content and design. We provide hosting and maintenance as part of the service.",
  },
];

const comparisons = [
  { feature: "Professional Website", us: true, diy: false, agency: true },
  { feature: "SEO Optimization", us: true, diy: false, agency: true },
  { feature: "Lead Follow-Up System", us: true, diy: false, agency: false },
  { feature: "Monthly Content", us: true, diy: false, agency: true },
  { feature: "Review Management", us: true, diy: false, agency: false },
  { feature: "Monthly Reports", us: true, diy: false, agency: true },
  { feature: "No Contract Required", us: true, diy: true, agency: false },
  { feature: "Under $500/month", us: true, diy: true, agency: false },
];

export default function Pricing() {
  return (
    <main className="pt-16" data-testid="page-pricing">
      <section className="py-16 md:py-24 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-primary-foreground mb-6">
            $299/Month Local Business Package
          </h1>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto">
            Get access to a complete local business package. From custom website design to SEO, lead generation, and more. No hidden fees, no contracts.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PricingCard />
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted" data-testid="section-comparison">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              How We Compare
            </h2>
            <p className="text-muted-foreground text-lg">
              See why ArdntLogic offers the best value for local businesses.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full bg-background rounded-lg overflow-hidden" data-testid="table-comparison">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4 font-heading font-semibold">Feature</th>
                  <th className="text-center p-4 font-heading font-semibold text-accent">ArdntLogic</th>
                  <th className="text-center p-4 font-heading font-semibold">DIY</th>
                  <th className="text-center p-4 font-heading font-semibold">Big Agency</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, index) => (
                  <tr key={row.feature} className={index % 2 === 0 ? "bg-muted/30" : ""}>
                    <td className="p-4">{row.feature}</td>
                    <td className="p-4 text-center">
                      {row.us ? (
                        <Check className="w-5 h-5 text-accent mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-destructive mx-auto" />
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {row.diy ? (
                        <Check className="w-5 h-5 text-accent mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-destructive mx-auto" />
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {row.agency ? (
                        <Check className="w-5 h-5 text-accent mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-destructive mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background" data-testid="section-faqs">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="border-b pb-6" data-testid={`faq-${faq.question.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
                <h3 className="font-heading font-semibold text-lg mb-2">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
