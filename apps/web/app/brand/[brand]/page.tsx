import { Metadata } from 'next'
import { brands } from '@aura/lib'
import { Footer } from '@/components/footer'
import { createClient } from '@/lib/supabase/server'
import { ProductGrid } from '@/components/product-grid'

export async function generateMetadata({ params }: { params: { brand: string } }): Promise<Metadata> {
  const brandName = brands.find((b) => b.toLowerCase() === params.brand)
  return { title: `${brandName || params.brand} — AURA` }
}

export default async function BrandPage({ params }: { params: { brand: string } }) {
  const { brand } = params
  const supabase = await createClient()

  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .ilike('brand', `%${brand}%`)
    .order('created_at', { ascending: false })

  if (error) console.error('Error fetching brand products:', error)

  return (
    <main className="min-h-screen bg-background">
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl font-light mb-6">{brand}</h1>
          <p className="text-muted-foreground mb-8">Products by {brand}</p>

          <ProductGrid products={products || []} />
        </div>
      </div>
      <Footer />
    </main>
  )
}
