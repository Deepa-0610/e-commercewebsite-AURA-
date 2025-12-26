import { createClient } from "@/lib/supabase/server"
import { Footer } from "@/components/footer"
import { CartItems } from "@/components/cart-items"
import { redirect } from "next/navigation"

export default async function CartPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: cartItems } = await supabase
    .from("cart_items")
    .select(
      `
      *,
      products (*)
    `,
    )
    .eq("user_id", user.id)

  return (
    <main className="min-h-screen bg-background">
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-12">Shopping Cart</h1>
          <CartItems items={cartItems || []} />
        </div>
      </div>
      <Footer />
    </main>
  )
}
