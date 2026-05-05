import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { CheckoutForm } from "@/components/checkout-form"
import { createClient } from "@/lib/supabase/server"
import { formatPrice } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Checkout | BelaFlor",
  description: "Finalize sua compra na BelaFlor.",
}

export default async function CheckoutPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/auth/login?redirect=/checkout")
  }

  const { data: cartItems } = await supabase
    .from("cart_items")
    .select(`
      *,
      product:products(*)
    `)
    .eq("user_id", user.id)

  if (!cartItems || cartItems.length === 0) {
    redirect("/carrinho")
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single()

  const subtotal = cartItems.reduce((sum, item) => {
    return sum + (item.product?.price || 0) * item.quantity
  }, 0)

  const shipping = subtotal >= 150 ? 0 : 15
  const total = subtotal + shipping

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-display text-3xl font-bold mb-8">Finalizar Compra</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CheckoutForm
            profile={profile}
            cartItems={cartItems}
            total={total}
          />
        </div>

        <div className="lg:order-first lg:order-none">
          <div className="rounded-lg border bg-card p-6 space-y-6 sticky top-24">
            <h2 className="font-display text-xl font-bold">Seu Pedido</h2>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {item.product?.name} x {item.quantity}
                  </span>
                  <span>{formatPrice((item.product?.price || 0) * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Frete</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-primary font-medium">Grátis</span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </span>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
