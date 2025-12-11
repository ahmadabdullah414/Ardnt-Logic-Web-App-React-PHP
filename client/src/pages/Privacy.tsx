import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export default function Privacy() {
  return (
    <main className="pt-20" data-testid="page-privacy">
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
              <Shield className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              Privacy Policy
            </h1>
            <p className="text-white/80 text-lg">
              Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
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
            className="prose prose-lg max-w-none"
          >
            <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
              At ArdntLogic, we take your privacy seriously. This policy outlines how we collect, store, and protect your personal information.
            </p>

            <h2 className="font-heading font-bold text-2xl mt-12 mb-6">Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We collect information you provide directly to us, such as when you:
            </p>
            <ul className="list-none space-y-3 mb-8">
              {["Fill out our contact form", "Subscribe to our newsletter", "Request a consultation", "Sign up for our services"].map((item, i) => (
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

            <h2 className="font-heading font-bold text-2xl mt-12 mb-6">How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-none space-y-3 mb-8">
              {["Provide, maintain, and improve our services", "Respond to your inquiries and requests", "Send you marketing communications (with your consent)", "Analyze usage patterns to improve user experience"].map((item, i) => (
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

            <h2 className="font-heading font-bold text-2xl mt-12 mb-6">Data Security</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2 className="font-heading font-bold text-2xl mt-12 mb-6">Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We may use third-party services that collect, monitor, and analyze data to improve our services. These third parties have their own privacy policies.
            </p>

            <h2 className="font-heading font-bold text-2xl mt-12 mb-6">Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              You have the right to access, update, or delete your personal information. Contact us at info@ardntlogic.com to exercise these rights.
            </p>

            <h2 className="font-heading font-bold text-2xl mt-12 mb-6">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:info@ardntlogic.com" className="text-accent hover:underline">
                info@ardntlogic.com
              </a>.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
