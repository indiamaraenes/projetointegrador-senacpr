import Link from "next/link"
import { redirect, notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/server"
import { formatPrice } from "@/lib/utils"
import type { Metadata } from "next"

interface OrderDetailPageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: OrderDetailPageProps): Promise<Metadata> {
  const { id } = await params
  return {
    title: `Pedido #${id.slice(0, 8).toUpperCase()} | BelaFlor`,
    description: "Detalhes do seu pedido na BelaFlor.",
  }
}

const statusLabels: Record<string, { label: string; variant: "default" | "secondary" | "accent" | "outline" }> = {
  pending: { label: "Pendente", variant: "secondary" },
  confirmed: { label: "Confirmado", variant: "default" },
  shipped: { label: "Enviado", variant: "default" },
  delivered: { label: "Entregue", variant: "default" },
  cancelled: { label: "Cancelado", variant: "outline" },
}

const paymentLabels: Record<string, string> = {
  pix: "PIX",
  credit_card: "Cartão de Crédito",
  boleto: "Boleto Bancário",
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect("/auth/login?redirect=/meus-pedidos")
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
    notFound()
  }

  const status = statusLabels[order.status] || statusLabels.pending
  const subtotal = order.items?.reduce(
    (sum: number, item: { product_price: number; quantity: number }) => sum + item.product_price * item.quantity,
    0
  ) || 0
  const shipping = order.total - subtotal

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        href="/meus-pedidos"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="size-4" />
        Voltar para Meus Pedidos
      </Link>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-lg border bg-card p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h1 className="font-display text-2xl font-bold">
                  Pedido #{order.id.slice(0, 8).toUpperCase()}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Realizado em {new Date(order.created_at).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <Badge variant={status.variant}>{status.label}</Badge>
            </div>

            <h2 className="font-semibold mb-4">Itens do Pedido</h2>
            <div className="space-y-4">
              {order.items?.map((item: { id: string; product_name: string; quantity: number; product_price: number }) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center py-3 border-b last:border-0"
                >
                  <div>
                    <p className="font-medium">{item.product_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatPrice(item.product_price)} x {item.quantity}
                    </p>
                  </div>
                  <span className="font-semibold">
                    {formatPrice(item.product_price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <h2 className="font-semibold mb-4">Endereço de Entrega</h2>
            <div className="text-muted-foreground">
              <p>{order.shipping_address}</p>
              <p>{order.shipping_city}, {order.shipping_state}</p>
              <p>CEP: {order.shipping_zip}</p>
            </div>
          </div>

          {order.notes && (
            <div className="rounded-lg border bg-card p-6">
              <h2 className="font-semibold mb-4">Observações</h2>
              <p className="text-muted-foreground">{order.notes}</p>
            </div>
          )}
        </div>

        <div>
          <div className="rounded-lg border bg-card p-6 space-y-6 sticky top-24">
            <h2 className="font-display text-xl font-bold">Resumo</h2>

            <div className="space-y-3 text-sm">
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
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pagamento</span>
                <span>{paymentLabels[order.payment_method] || order.payment_method}</span>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
