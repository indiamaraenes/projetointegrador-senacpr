import Link from "next/link"
import { redirect } from "next/navigation"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { formatPrice } from "@/lib/utils"
import type { Metadata } from "next"

interface OrderConfirmedPageProps {
  params: Promise<{ id: string }>
}

export const metadata: Metadata = {
  title: "Pedido Confirmado | BelaFlor",
  description: "Seu pedido foi confirmado com sucesso!",
}

export default async function OrderConfirmedPage({ params }: OrderConfirmedPageProps) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/auth/login")
  }

  const { data: order } = await supabase
    .from("orders")
    .select(`
      *,
      items:order_items(*)
    `)
    .eq("id", id)
    .eq("user_id", user.id)
    .single()

  if (!order) {
    redirect("/meus-pedidos")
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="flex size-20 items-center justify-center rounded-full bg-primary/10 text-primary">
            <CheckCircle className="size-10" />
          </div>
        </div>

        <h1 className="font-display text-3xl font-bold mb-2">
          Pedido Confirmado!
        </h1>
        <p className="text-muted-foreground mb-8">
          Obrigado pela sua compra. Você receberá um e-mail com os detalhes do pedido.
        </p>

        <div className="rounded-lg border bg-card p-6 text-left mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-display text-lg font-semibold">
              Pedido #{order.id.slice(0, 8).toUpperCase()}
            </h2>
            <span className="text-sm text-muted-foreground">
              {new Date(order.created_at).toLocaleDateString("pt-BR")}
            </span>
          </div>

          <div className="space-y-3 border-t pt-4">
            {order.items?.map((item: { id: string; product_name: string; quantity: number; product_price: number }) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.product_name} x {item.quantity}
                </span>
                <span>{formatPrice(item.product_price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span className="text-primary">{formatPrice(order.total)}</span>
            </div>
          </div>

          <div className="border-t pt-4 mt-4 text-sm text-muted-foreground">
            <p><strong>Endereço de entrega:</strong></p>
            <p>{order.shipping_address}</p>
            <p>{order.shipping_city}, {order.shipping_state} - {order.shipping_zip}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/meus-pedidos">
            <Button>Ver Meus Pedidos</Button>
          </Link>
          <Link href="/produtos">
            <Button variant="outline">Continuar Comprando</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
