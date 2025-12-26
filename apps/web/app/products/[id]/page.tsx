import { createClient } from "@/lib/supabase/server"
import { Footer } from "@/components/footer"
import { ProductDetails } from "@/components/product-details"
import { ProductGrid } from "@/components/product-grid"
import { notFound } from "next/navigation"

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  let { data: product, error } = await supabase.from("products").select("*").eq("id", id).single()

  if (error || !product) {
    // Try finding in gifts table
    const { data: gift, error: giftError } = await supabase.from("gifts").select("*").eq("id", id).single()
    if (!giftError && gift) {
      product = gift
      error = null
    }
  }

  if (error || !product) {
    notFound()
  }

  // Fetch similar products
  // Logic: Same category, different ID. Limit to 4.
  const { data: similarProducts } = await supabase
    .from("products")
    .select("*")
    .eq("category", product.category)
    .neq("id", product.id)
    .limit(4)

  return (
    <main className="min-h-screen bg-background">
      <div className="pt-24 pb-16">
        <ProductDetails product={product} />
        
        {similarProducts && similarProducts.length > 0 && (
          <div className="container mx-auto px-4 lg:px-8 mt-24">
            <h2 className="text-2xl font-light mb-8">Similar Products</h2>
            <ProductGrid products={similarProducts} />
          </div>
        )}
      </div>
      <Footer />
    </main>
  )
}
