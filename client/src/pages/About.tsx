import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Target, Heart, Handshake, Award, Users, Building } from "lucide-react";
import { motion } from "framer-motion";

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

const stats = [
  { value: "500+", label: "Happy Clients", icon: Users },
  { value: "5+", label: "Years Experience", icon: Building },
  { value: "4.9", label: "Average Rating", icon: Award },
];

export default function About() {
  return (
    <main className="pt-20" data-testid="page-about">
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent/60" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

        <motion.div
          className="absolute top-20 left-20 w-32 h-32 border border-white/10 rounded-full"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-24 h-24 border border-white/20 rounded-full"
          animate={{ scale: [1, 0.9, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
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
              <Building className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              About ArdntLogic
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
              Empowering local businesses to succeed online through professional digital solutions.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32 relative">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[100px]" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-8">
              Our{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Story
              </span>
            </h2>
            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                ArdntLogic was founded with a simple belief: every local business deserves access to professional digital marketing services without breaking the bank. Too often, we saw small business owners struggling to compete online because traditional agencies were either too expensive or too complicated.
              </p>
              <p>
                We created the $299/month Local Business Package to change that. By focusing specifically on local businesses and streamlining our processes, we're able to deliver enterprise-level results at small business prices.
              </p>
              <p>
                Today, we're proud to work with hundreds of local businesses across various industries – from construction and property management to restaurants and professional services. Each client represents a family's livelihood, and we take that responsibility seriously.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-muted to-muted/50 border border-white/10"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                  <stat.icon className="w-7 h-7 text-accent" />
                </div>
                <p className="font-heading font-extrabold text-4xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
                  {stat.value}
                </p>
                <p className="text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-muted/50 relative" data-testid="section-values">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-6">
              Our Values
            </span>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl mb-4">
              The Principles That{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Guide Us
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card 
                  className="h-full bg-gradient-to-br from-card to-card/50 border-white/10"
                  data-testid={`card-value-${value.title.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <CardContent className="p-6 text-center">
                    <motion.div 
                      className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <value.icon className="w-7 h-7 text-accent" />
                    </motion.div>
                    <h3 className="font-heading font-semibold text-lg mb-2">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl mb-6">
              Our Mission
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              To democratize digital marketing by providing affordable, effective online solutions that help local businesses compete and thrive in the digital age.
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link href="/services">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent text-white font-bold px-10 py-7 text-lg gap-2 shadow-xl shadow-accent/25 rounded-xl"
                  data-testid="button-about-cta"
                >
                  Explore Our Services
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
