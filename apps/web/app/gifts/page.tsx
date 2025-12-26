import { createClient } from '@/lib/supabase/server'
import { Footer } from '@/components/footer'
import { giftSets } from '@aura/lib'
import { ProductGrid } from '@/components/product-grid'

export default async function GiftsPage() {
  const supabase = await createClient()
  const { data: gifts, error } = await supabase
    .from('gifts')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching gifts:', error)
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl font-light mb-6">Gift Sets</h1>
          <p className="text-muted-foreground mb-8">Hand-picked gift sets for every occasion</p>

          <div className="mb-8">
            <p className="text-muted-foreground mb-6">Curated bundles and travel-friendly kits for effortless gifting.</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              {giftSets.map((g) => (
                <div key={g} className="p-6 bg-white rounded-lg shadow-sm">
                  <h3 className="font-medium mb-2">{g}</h3>
                  <p className="text-sm text-muted-foreground">A thoughtful selection from our bestsellers perfect for {g.toLowerCase()}.</p>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-light mb-4">Recommended for gifting</h3>
            <ProductGrid products={gifts || []} />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
