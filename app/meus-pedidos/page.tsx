import type { Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
import { Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/server"
import { formatPrice } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Meus Pedidos | BelaFlor",
  description: "Acompanhe seus pedidos na BelaFlor.",
}

const statusLabels: Record<string, { label: string; variant: "default" | "secondary" | "accent" | "outline" }> = {
  pending: { label: "Pendente", variant: "secondary" },
  confirmed: { label: "Confirmado", variant: "default" },
  shipped: { label: "Enviado", variant: "default" },
  delivered: { label: "Entregue", variant: "default" },
  cancelled: { label: "Cancelado", variant: "outline" },
}

export default async function MyOrdersPage() {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/auth/login?redirect=/meus-pedidos")
  }

  const { data: orders } = await supabase
    .from("orders")
    .select(`
      *,
      items:order_items(*)
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  if (!orders || orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center py-20">
          <div className="flex justify-center mb-6">
            <div className="flex size-20 items-center justify-center rounded-full bg-muted">
              <Package className="size-10 text-muted-foreground" />
            </div>
          </div>
          <h1 className="font-display text-2xl font-bold mb-2">
            Nenhum pedido encontrado
          </h1>
          <p className="text-muted-foreground mb-6">
            Você ainda não fez nenhum pedido.
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
      <h1 className="font-display text-3xl font-bold mb-8">Meus Pedidos</h1>

      <div className="space-y-6">
        {orders.map((order) => {
          const status = statusLabels[order.status] || statusLabels.pending
          
          return (
            <div
              key={order.id}
              className="rounded-lg border bg-card p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <p className="font-semibold">
                    Pedido #{order.id.slice(0, 8).toUpperCase()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(order.created_at).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <Badge variant={status.variant}>{status.label}</Badge>
              </div>

              <div className="space-y-2 border-t pt-4">
                {order.items?.slice(0, 3).map((item: { id: string; product_name: string; quantity: number; product_price: number }) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.product_name} x {item.quantity}
                    </span>
                    <span>{formatPrice(item.product_price * item.quantity)}</span>
                  </div>
                ))}
                {order.items && order.items.length > 3 && (
                  <p className="text-sm text-muted-foreground">
                    + {order.items.length - 3} outros itens
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t pt-4 mt-4">
                <div className="font-bold">
                  Total: <span className="text-primary">{formatPrice(order.total)}</span>
                </div>
                <Link href={`/meus-pedidos/${order.id}`}>
                  <Button variant="outline" size="sm">
                    Ver Detalhes
                  </Button>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
