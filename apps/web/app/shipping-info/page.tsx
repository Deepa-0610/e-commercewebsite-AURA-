import { Footer } from '@/components/footer'

export default function ShippingInfoPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl font-light mb-6">Shipping & Delivery</h1>
          <div className="prose prose-neutral max-w-none">
            <p className="text-lg text-muted-foreground mb-6">
              Information about our shipping methods and delivery times.
            </p>
            <p>
              We offer standard and express shipping options. Standard shipping typically takes 3-5 business days, while express shipping takes 1-2 business days.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
