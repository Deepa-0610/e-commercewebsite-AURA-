import { Footer } from '@/components/footer'

export default function TrackOrderPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl font-light mb-6">Track Order</h1>
          <div className="prose prose-neutral max-w-none">
            <p className="text-lg text-muted-foreground mb-6">
              Enter your order number to track your shipment.
            </p>
            <div className="max-w-md">
              <form className="space-y-4">
                <div>
                  <label htmlFor="order-number" className="block text-sm font-medium text-gray-700">Order Number</label>
                  <input type="text" id="order-number" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" placeholder="e.g. #12345" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input type="email" id="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border" placeholder="you@example.com" />
                </div>
                <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Track
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
