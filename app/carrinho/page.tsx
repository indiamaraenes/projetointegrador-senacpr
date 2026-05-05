import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CartItemsList } from "@/components/cart-items-list"
import { CartSummary } from "@/components/cart-summary"
import { createClient } from "@/lib/supabase/server"

export const metadata: Metadata = {
  title: "Carrinho | BelaFlor",
  description: "Seu carrinho de compras na BelaFlor.",
}

export default async function CartPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/auth/login?redirect=/carrinho")
  }

  const { data: cartItems } = await supabase
    .from("cart_items")
    .select(`
      *,
      product:products(*)
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  const items = cartItems || []
  const total = items.reduce((sum, item) => {
    return sum + (item.product?.price || 0) * item.quantity
  }, 0)

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-20">
          <div className="flex justify-center mb-6">
            <div className="flex size-20 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="size-10 text-muted-foreground" />
            </div>
          </div>
          <h1 className="font-display text-2xl font-bold mb-2">
            Seu carrinho está vazio
          </h1>
          <p className="text-muted-foreground mb-6">
            Adicione produtos para continuar comprando.
          </p>
          <Link href="/produtos">
            <Button>Ver Produtos</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-display text-3xl font-bold mb-8">Meu Carrinho</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CartItemsList items={items} />
        </div>
        <div>
          <CartSummary total={total} itemCount={items.length} />
        </div>
      </div>
    </div>
  )
}
