export default function Privacy() {
  return (
    <main className="pt-16" data-testid="page-privacy">
      <section className="py-16 md:py-24 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-primary-foreground mb-6">
            Privacy Policy
          </h1>
          <p className="text-primary-foreground/80 text-lg">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground leading-relaxed mb-6">
              At ArdntLogic, we take your privacy seriously. This policy outlines how we collect, store, and protect your personal information.
            </p>

            <h2 className="font-heading font-bold text-2xl mt-8 mb-4">Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We collect information you provide directly to us, such as when you:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
              <li>Fill out our contact form</li>
              <li>Subscribe to our newsletter</li>
              <li>Request a consultation</li>
              <li>Sign up for our services</li>
            </ul>

            <h2 className="font-heading font-bold text-2xl mt-8 mb-4">How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
              <li>Provide, maintain, and improve our services</li>
              <li>Respond to your inquiries and requests</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Analyze usage patterns to improve user experience</li>
            </ul>

            <h2 className="font-heading font-bold text-2xl mt-8 mb-4">Data Security</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2 className="font-heading font-bold text-2xl mt-8 mb-4">Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We may use third-party services that collect, monitor, and analyze data to improve our services. These third parties have their own privacy policies.
            </p>

            <h2 className="font-heading font-bold text-2xl mt-8 mb-4">Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              You have the right to access, update, or delete your personal information. Contact us at info@ardntlogic.com to exercise these rights.
            </p>

            <h2 className="font-heading font-bold text-2xl mt-8 mb-4">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at info@ardntlogic.com.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
