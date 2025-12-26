import { Footer } from '@/components/footer'

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-background">
      
      {/* Header */}
      <section className="pt-28 pb-16 border-b">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-light mb-6">
            Terms & Conditions
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            These terms govern your access to and use of the AURA website and services.
            Please read them carefully.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="prose prose-neutral max-w-none">

            <h2>Acceptance of Terms</h2>
            <p>
              By accessing or using the AURA website, you agree to comply with and be
              bound by these Terms & Conditions. If you do not agree, please refrain
              from using our services.
            </p>

            <h2>Use of the Website</h2>
            <p>
              You agree to use this website only for lawful purposes and in a manner
              that does not infringe the rights of others or restrict their use of
              the site.
            </p>

            <h2>Account Responsibility</h2>
            <p>
              If you create an account with AURA, you are responsible for maintaining
              the confidentiality of your account information and for all activities
              that occur under your account.
            </p>

            <h2>Product Information</h2>
            <p>
              We strive to ensure that product descriptions, images, and pricing are
              accurate. However, AURA does not guarantee that all information on the
              website is error-free or complete.
            </p>

            <h2>Orders & Payments</h2>
            <p>
              All orders are subject to acceptance and availability. Prices and
              availability are subject to change without notice.
            </p>

            <h2>Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos, and
              designs, is the property of AURA and protected by applicable intellectual
              property laws.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              AURA shall not be liable for any indirect, incidental, or consequential
              damages arising from the use or inability to use our website or services.
            </p>

            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms & Conditions at any time.
              Continued use of the website constitutes acceptance of the updated terms.
            </p>

            <h2>Governing Law</h2>
            <p>
              These terms shall be governed by and interpreted in accordance with the
              laws applicable in your jurisdiction.
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
