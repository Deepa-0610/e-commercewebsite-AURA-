import { createClient } from "@/lib/supabase/server"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { redirect } from "next/navigation"
import { formatDistanceToNow } from "date-fns"
import Image from "next/image"

export default async function OrdersPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: orders } = await supabase
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
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return (
    <main className="min-h-screen bg-background">
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-light tracking-tight mb-12">Order History</h1>

          {!orders || orders.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground font-light mb-6">You haven't placed any orders yet</p>
              <Link href="/products">
                <button className="px-6 py-3 bg-foreground text-background rounded-lg hover:bg-foreground/90 transition-colors">
                  Start Shopping
                </button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                      <div>
                        <p className="text-sm text-muted-foreground">Order #{order.id.slice(0, 8)}</p>
                        <p className="text-sm text-muted-foreground">
                          Placed {formatDistanceToNow(new Date(order.created_at), { addSuffix: true })}
                        </p>
                      </div>
                      <div className="text-left lg:text-right">
                        <p className="text-sm text-muted-foreground">Total</p>
                        <p className="text-2xl font-medium">${order.total_amount.toFixed(2)}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {order.order_items.map((item: any) => (
                        <div key={item.id} className="flex gap-4">
                          <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                            <Image
                              src={item.products.image_url || "/placeholder.svg"}
                              alt={item.products.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-light">{item.products.name}</p>
                            <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                            <p className="text-sm font-medium">${item.price.toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
  )
}
