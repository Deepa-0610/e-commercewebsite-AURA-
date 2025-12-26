import { Footer } from '@/components/footer'

export default function ReturnsPolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl font-light mb-6">Returns & Exchanges Policy</h1>
          <div className="prose prose-neutral max-w-none">
            <p className="text-lg text-muted-foreground mb-6">
              We want you to be completely satisfied with your purchase.
            </p>
            <p>
              If you are not happy with your order, you may return it within 30 days of receipt for a full refund or exchange.
              Items must be unused and in their original packaging.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
