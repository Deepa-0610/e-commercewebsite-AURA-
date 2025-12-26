import { createClient } from "@/lib/supabase/server"
import { Footer } from "@/components/footer"
import { CheckoutForm } from "@/components/checkout-form"
import { redirect } from "next/navigation"

export default async function CheckoutPage() {
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

  if (!cartItems || cartItems.length === 0) {
    redirect("/cart")
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-12">Checkout</h1>
          <CheckoutForm items={cartItems} userId={user.id} />
        </div>
      </div>
      <Footer />
    </main>
  )
}
