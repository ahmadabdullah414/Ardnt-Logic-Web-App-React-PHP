export default function Terms() {
  return (
    <main className="pt-16" data-testid="page-terms">
      <section className="py-16 md:py-24 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-primary-foreground mb-6">
            Terms of Service
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
              By using our services, you agree to the terms outlined here. This includes our monthly fee, payment structure, and cancellation policy.
            </p>

            <h2 className="font-heading font-bold text-2xl mt-8 mb-4">Service Agreement</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              ArdntLogic provides digital marketing services including website design, SEO, content creation, and lead management for a monthly fee of $299.
            </p>

            <h2 className="font-heading font-bold text-2xl mt-8 mb-4">Payment Terms</h2>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
              <li>Monthly fee of $299 is billed on the same date each month</li>
              <li>Payment is due upon receipt of invoice</li>
              <li>Accepted payment methods include credit card and bank transfer</li>
              <li>Late payments may result in service suspension</li>
            </ul>

            <h2 className="font-heading font-bold text-2xl mt-8 mb-4">Cancellation Policy</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You may cancel your service at any time with 30 days written notice. Upon cancellation:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
              <li>You retain ownership of all content and designs created for you</li>
              <li>Website hosting will be terminated at the end of the billing period</li>
              <li>We will provide all files and credentials needed to transfer your website</li>
            </ul>

            <h2 className="font-heading font-bold text-2xl mt-8 mb-4">Service Scope</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our $299/month package includes:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-6">
              <li>Custom website design and hosting</li>
              <li>SEO optimization</li>
              <li>4 blog posts per month</li>
              <li>Review management</li>
              <li>Lead follow-up system</li>
              <li>Monthly reporting</li>
              <li>Ongoing maintenance and support</li>
            </ul>

            <h2 className="font-heading font-bold text-2xl mt-8 mb-4">Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              You own all content, designs, and materials created specifically for your business. ArdntLogic retains rights to proprietary tools and systems used to deliver our services.
            </p>

            <h2 className="font-heading font-bold text-2xl mt-8 mb-4">Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              ArdntLogic is not liable for any indirect, incidental, or consequential damages arising from the use of our services. Our total liability shall not exceed the amount paid for services in the preceding 12 months.
            </p>

            <h2 className="font-heading font-bold text-2xl mt-8 mb-4">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at info@ardntlogic.com.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
