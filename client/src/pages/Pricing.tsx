import PricingCard from "@/components/PricingCard";
import { Check, X, HelpCircle, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    <main className="pt-20" data-testid="page-pricing">
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent/60" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

        <motion.div
          className="absolute top-20 right-20 w-24 h-24 border border-white/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
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
              <DollarSign className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
              Get access to a complete local business package. From custom website design to SEO, lead generation, and more.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32 relative">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <PricingCard />
        </div>
      </section>

      <section className="py-24 md:py-32 bg-muted/50 relative" data-testid="section-comparison">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-6">
              Comparison
            </span>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl mb-4">
              How We{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Compare
              </span>
            </h2>
            <p className="text-muted-foreground text-lg">
              See why ArdntLogic offers the best value for local businesses.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="overflow-x-auto"
          >
            <table className="w-full bg-card rounded-2xl overflow-hidden border border-white/10" data-testid="table-comparison">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-6 font-heading font-semibold">Feature</th>
                  <th className="text-center p-6 font-heading font-semibold">
                    <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">ArdntLogic</span>
                  </th>
                  <th className="text-center p-6 font-heading font-semibold text-muted-foreground">DIY</th>
                  <th className="text-center p-6 font-heading font-semibold text-muted-foreground">Big Agency</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, index) => (
                  <motion.tr 
                    key={row.feature} 
                    className={index % 2 === 0 ? "bg-muted/30" : ""}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <td className="p-6">{row.feature}</td>
                    <td className="p-6 text-center">
                      {row.us ? (
                        <div className="w-8 h-8 mx-auto rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 mx-auto rounded-full bg-destructive/20 flex items-center justify-center">
                          <X className="w-4 h-4 text-destructive" />
                        </div>
                      )}
                    </td>
                    <td className="p-6 text-center">
                      {row.diy ? (
                        <div className="w-8 h-8 mx-auto rounded-full bg-muted flex items-center justify-center">
                          <Check className="w-4 h-4 text-muted-foreground" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 mx-auto rounded-full bg-destructive/20 flex items-center justify-center">
                          <X className="w-4 h-4 text-destructive" />
                        </div>
                      )}
                    </td>
                    <td className="p-6 text-center">
                      {row.agency ? (
                        <div className="w-8 h-8 mx-auto rounded-full bg-muted flex items-center justify-center">
                          <Check className="w-4 h-4 text-muted-foreground" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 mx-auto rounded-full bg-destructive/20 flex items-center justify-center">
                          <X className="w-4 h-4 text-destructive" />
                        </div>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32 relative" data-testid="section-faqs">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-accent/10 mb-6">
              <HelpCircle className="w-7 h-7 text-accent" />
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem 
                  value={`item-${index}`}
                  className="bg-card border border-white/10 rounded-xl px-6 overflow-hidden"
                  data-testid={`faq-${faq.question.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                >
                  <AccordionTrigger className="font-heading font-semibold text-lg hover:no-underline py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </section>
    </main>
  );
}
