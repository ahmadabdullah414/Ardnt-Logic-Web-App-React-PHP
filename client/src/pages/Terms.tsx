import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export default function Terms() {
  return (
    <main className="pt-20" data-testid="page-terms">
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-accent/60" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

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
              <FileText className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              Terms of Service
            </h1>
            <p className="text-white/80 text-lg">
              Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32 relative">
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="prose prose-lg max-w-none"
          >
            <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
              By using our services, you agree to the terms outlined here. This includes our monthly fee, payment structure, and cancellation policy.
            </p>

            <h2 className="font-heading font-bold text-2xl mt-12 mb-6">Service Agreement</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              ArdntLogic provides digital marketing services including website design, SEO, content creation, and lead management for a monthly fee of $299.
            </p>

            <h2 className="font-heading font-bold text-2xl mt-12 mb-6">Payment Terms</h2>
            <ul className="list-none space-y-3 mb-8">
              {[
                "Monthly fee of $299 is billed on the same date each month",
                "Payment is due upon receipt of invoice",
                "Accepted payment methods include credit card and bank transfer",
                "Late payments may result in service suspension"
              ].map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 text-muted-foreground"
                >
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  {item}
                </motion.li>
              ))}
            </ul>

            <h2 className="font-heading font-bold text-2xl mt-12 mb-6">Cancellation Policy</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You may cancel your service at any time with 30 days written notice. Upon cancellation:
            </p>
            <ul className="list-none space-y-3 mb-8">
              {[
                "You retain ownership of all content and designs created for you",
                "Website hosting will be terminated at the end of the billing period",
                "We will provide all files and credentials needed to transfer your website"
              ].map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 text-muted-foreground"
                >
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  {item}
                </motion.li>
              ))}
            </ul>

            <h2 className="font-heading font-bold text-2xl mt-12 mb-6">Service Scope</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our $299/month package includes:
            </p>
            <ul className="list-none space-y-3 mb-8">
              {[
                "Custom website design and hosting",
                "SEO optimization",
                "4 blog posts per month",
                "Review management",
                "Lead follow-up system",
                "Monthly reporting",
                "Ongoing maintenance and support"
              ].map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 text-muted-foreground"
                >
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  {item}
                </motion.li>
              ))}
            </ul>

            <h2 className="font-heading font-bold text-2xl mt-12 mb-6">Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              You own all content, designs, and materials created specifically for your business. ArdntLogic retains rights to proprietary tools and systems used to deliver our services.
            </p>

            <h2 className="font-heading font-bold text-2xl mt-12 mb-6">Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              ArdntLogic is not liable for any indirect, incidental, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid for services in the preceding 12 months.
            </p>

            <h2 className="font-heading font-bold text-2xl mt-12 mb-6">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at{" "}
              <a href="mailto:contact@ardntlogic.com" className="text-accent hover:underline">
                contact@ardntlogic.com
              </a>.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
