import { Metadata } from 'next'
import { categories } from '@aura/lib'
import { Footer } from '@/components/footer'
import { createClient } from '@/lib/supabase/server'
import { ProductGrid } from '@/components/product-grid'
import { CategoryProducts } from '@/components/category-products'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params
  const cat = categories.find((c) => c.slug === slug)
  
  if (cat) {
    return { title: `${cat.name} — AURA` }
  }

  // Try to fetch from collections
  const supabase = await createClient()
  const { data: collection } = await supabase
    .from('collections')
    .select('name')
    .eq('slug', slug)
    .single()

  const name = collection?.name || slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  
  return {
    title: `${name} — AURA`,
  }
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const supabase = await createClient()

  // 1. Check static categories
  const staticCat = categories.find((c) => c.slug === slug)
  let categoryName = staticCat?.name

  // 2. Check dynamic collections if not found
  if (!categoryName) {
    const { data: collection } = await supabase
      .from('collections')
      .select('name')
      .eq('slug', slug)
      .single()
    
    if (collection) {
      categoryName = collection.name
    }
  }

  // 3. Fallback to formatted slug
  if (!categoryName) {
    categoryName = slug.replace(/-/g, ' ')
  }

  const { data: products, error } = await supabase
    .from('products')
    .select('*')
    .ilike('category', `%${categoryName}%`)
    .order('created_at', { ascending: false })

  if (error) console.error('Error fetching category products:', error)

  return (
    <main className="min-h-screen bg-background">
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl font-light mb-6">{categoryName}</h1>
          <p className="text-muted-foreground mb-8">Products curated for {categoryName}</p>

          <CategoryProducts products={products || []} />
        </div>
      </div>
      <Footer />
    </main>
  )
}
