import { createClient } from "@/lib/supabase/server"
import { Footer } from "@/components/footer"
import { ProductGrid } from "@/components/product-grid"
import { CategoryFilter } from "@/components/category-filter"

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>
}) {
  const supabase = await createClient()
  const params = await searchParams
  const category = params.category
  const search = params.search

  let query = supabase.from("products").select("*").order("created_at", { ascending: false })

  if (category) {
    query = query.eq("category", category)
  }

  if (search) {
    query = query.ilike("name", `%${search}%`)
  }

  const { data: products, error } = await query

  if (error) {
    console.error("Error fetching products:", error)
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12 text-center">
            <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-4">
              {category ? category : search ? "Search Results" : "All Products"}
            </h1>
            <p className="text-lg text-muted-foreground font-light">
              Discover our curated collection of luxury skincare
            </p>
          </div>

          <CategoryFilter currentCategory={category} />

          <ProductGrid products={products || []} />
        </div>
      </div>
      <Footer />
    </main>
  )
}
