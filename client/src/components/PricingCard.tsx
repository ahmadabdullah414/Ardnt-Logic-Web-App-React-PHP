import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Sparkles, Zap } from "lucide-react";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="max-w-lg mx-auto"
    >
      <Card
        className="relative overflow-hidden border-2 border-accent/50 bg-gradient-to-br from-card via-card to-accent/5"
        data-testid="card-pricing"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary" />
        <div className="absolute top-0 right-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />

        <div className="absolute top-4 right-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-6 h-6 text-accent" />
          </motion.div>
        </div>

        <CardHeader className="relative text-center pt-8 pb-4">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mx-auto px-4 py-2 rounded-full bg-accent/10 border border-accent/30 mb-4"
          >
            <Zap className="w-4 h-4 text-accent" />
            <span className="text-accent font-semibold text-sm">Most Popular</span>
          </motion.div>
          <p className="text-muted-foreground font-medium mb-2">
            Local Business Package
          </p>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-muted-foreground text-2xl">$</span>
            <motion.span
              initial={{ scale: 0.5, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              viewport={{ once: true }}
              className="font-heading font-extrabold text-6xl bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
              data-testid="text-price"
            >
              299
            </motion.span>
            <span className="text-muted-foreground text-xl">/mo</span>
          </div>
          <p className="text-muted-foreground mt-3 text-sm">
            No hidden fees. No contracts. Cancel anytime.
          </p>
        </CardHeader>

        <CardContent className="relative pb-4 px-8">
          <div className="space-y-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
                data-testid={`list-item-${feature.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center flex-shrink-0">
                  <Check className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-foreground">{feature}</span>
              </motion.div>
            ))}
          </div>
        </CardContent>

        <CardFooter className="relative pt-4 pb-8 px-8">
          <Link href="/contact" className="w-full">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] hover:bg-right text-white font-bold py-7 text-lg gap-2 shadow-xl shadow-accent/25 rounded-xl transition-all duration-500"
                data-testid="button-pricing-cta"
              >
                Get Started Today
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
