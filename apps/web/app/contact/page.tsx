import { Footer } from '@/components/footer'

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl font-light mb-6">Contact Us</h1>
          <div className="prose prose-neutral max-w-none">
            <p className="text-lg text-muted-foreground mb-6">
              We'd love to hear from you.
            </p>
            <p>
              If you have any questions or concerns, please reach out to our support team at support@aura.com.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
