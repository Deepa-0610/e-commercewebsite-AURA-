import { createClient } from "@/lib/supabase/server"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { redirect } from "next/navigation"

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>
}) {
  const params = await searchParams
  const orderId = params.orderId
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  let orderDetails = null
  if (orderId) {
    const { data } = await supabase
      .from("orders")
      .select(
        `
        *,
        order_items (
          *,
          products (*)
        )
      `,
      )
      .eq("id", orderId)
      .eq("user_id", user.id)
      .single()

    orderDetails = data
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-2xl">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
            </div>

            <div>
              <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-4">Order Confirmed!</h1>
              <p className="text-lg text-muted-foreground font-light">
                Thank you for your order. We'll send you a confirmation email shortly.
              </p>
            </div>

            {orderDetails && (
              <div className="p-6 bg-card rounded-lg border border-border/50 text-left space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Order Number</p>
                  <p className="font-mono text-sm">{orderDetails.id}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="text-2xl font-medium">${orderDetails.total_amount.toFixed(2)}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Shipping Address</p>
                  <div className="text-sm">
                    <p>{orderDetails.shipping_address.fullName}</p>
                    <p>{orderDetails.shipping_address.address}</p>
                    <p>
                      {orderDetails.shipping_address.city}, {orderDetails.shipping_address.state}{" "}
                      {orderDetails.shipping_address.zipCode}
                    </p>
                    <p>{orderDetails.shipping_address.country}</p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link href="/account/orders">
                <Button variant="outline" size="lg">
                  View Orders
                </Button>
              </Link>
              <Link href="/products">
                <Button size="lg">Continue Shopping</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
