import { Footer } from '@/components/footer'

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl font-light mb-6">Frequently Asked Questions</h1>
          <div className="prose prose-neutral max-w-none">
            <p className="text-lg text-muted-foreground mb-6">
              Find answers to common questions about our products and services.
            </p>
            <div className="mt-8 space-y-6">
              <div>
                <h3 className="text-xl font-medium mb-2">How do I track my order?</h3>
                <p className="text-muted-foreground">You can track your order by visiting the Track Order page and entering your order details.</p>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">What is your return policy?</h3>
                <p className="text-muted-foreground">We accept returns within 30 days of purchase. Please see our Returns Policy page for more details.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
