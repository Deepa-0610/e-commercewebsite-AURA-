import { Metadata } from 'next'
import { categories } from '@aura/lib'
import { Footer } from '@/components/footer'
import { createClient } from '@/lib/supabase/server'
import { CategoryProducts } from '@/components/category-products'
import { redirect } from 'next/navigation'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params
  const cat = categories.find((c) => c.slug === slug)
  const title = cat ? cat.name : slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')
  return {
    title: `${title} — AURA`,
  }
}

export default async function ShopCategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  
  if (slug === 'gifts') {
    redirect('/gifts')
  }

  const supabase = await createClient()

  const cat = categories.find((c) => c.slug === slug)
  const categoryName = cat?.name || slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ')

  let query = supabase.from('products').select('*')

  if (slug === 'new-arrivals') {
    query = query.order('created_at', { ascending: false })
  } else {
    // Handle mapping if necessary
    let searchCategory = categoryName
    if (slug === 'hair-care') searchCategory = 'Haircare'
    if (slug === 'body-care') searchCategory = 'Bath & Body'

    query = query.ilike('category', `%${searchCategory}%`)
    query = query.order('created_at', { ascending: false })
  }

  const { data: products, error } = await query

  if (error) console.error('Error fetching products:', error)

  return (
    <main className="min-h-screen bg-background">
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl font-light mb-6">{categoryName}</h1>
          <p className="text-muted-foreground mb-8">
            {slug === 'new-arrivals' 
              ? 'Check out our latest additions' 
              : `Products curated for ${categoryName}`}
          </p>

          <CategoryProducts products={products || []} />
        </div>
      </div>
      <Footer />
    </main>
  )
}
