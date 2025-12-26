import { Footer } from '@/components/footer'

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      
      {/* Header */}
      <section className="pt-28 pb-16 border-b">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-light mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            At AURA, your privacy and trust are important to us. This policy explains
            how we collect, use, and safeguard your personal information.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="prose prose-neutral max-w-none">

            <h2>Information We Collect</h2>
            <p>
              We may collect personal information such as your name, email address,
              contact details, and order information when you interact with our website,
              create an account, or make a purchase.
            </p>

            <h2>How We Use Your Information</h2>
            <p>
              The information we collect is used to:
            </p>
            <ul>
              <li>Process and fulfill orders</li>
              <li>Improve our products and services</li>
              <li>Communicate updates, offers, or support responses</li>
              <li>Ensure security and prevent fraud</li>
            </ul>

            <h2>Data Protection</h2>
            <p>
              We implement appropriate technical and organizational measures to protect
              your personal data against unauthorized access, misuse, or disclosure.
            </p>

            <h2>Sharing of Information</h2>
            <p>
              We do not sell or rent your personal information to third parties. Your
              data may be shared only with trusted service providers who assist us in
              operating our website and services, under strict confidentiality agreements.
            </p>

            <h2>Cookies</h2>
            <p>
              AURA uses cookies to enhance user experience, analyze site traffic, and
              personalize content. You may choose to disable cookies through your browser
              settings.
            </p>

            <h2>Your Rights</h2>
            <p>
              You have the right to access, update, or request deletion of your personal
              information. For any privacy-related concerns, please contact us.
            </p>

            <h2>Policy Updates</h2>
            <p>
              This Privacy Policy may be updated periodically to reflect changes in our
              practices. We encourage you to review this page regularly.
            </p>

            <p className="text-sm text-muted-foreground mt-8">
              Last updated: {new Date().getFullYear()}
            </p>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
