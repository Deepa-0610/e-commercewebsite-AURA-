import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { CollectionStrip } from "@/components/collection-strip"
import { MaterialsSection } from "@/components/materials-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"

export default async function HomePage() {
  const supabase = await createClient()
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .limit(3)
    .order("created_at", { ascending: false })

  return (
    <main className="min-h-screen">
      <div className="pt-20">
      <HeroSection />
      <FeaturedProducts products={products || []} />
      <CollectionStrip />
      <MaterialsSection />
      <NewsletterSection />
      <Footer />
      </div>
    </main>
  )
}
