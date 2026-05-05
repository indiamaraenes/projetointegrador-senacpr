import Link from "next/link"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"

interface CartSummaryProps {
  total: number
  itemCount: number
}

export function CartSummary({ total, itemCount }: CartSummaryProps) {
  const shipping = total >= 150 ? 0 : 15
  const finalTotal = total + shipping

  return (
    <div className="rounded-lg border bg-card p-6 space-y-6 sticky top-24">
      <h2 className="font-display text-xl font-bold">Resumo do Pedido</h2>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">
            Subtotal ({itemCount} {itemCount === 1 ? "item" : "itens"})
          </span>
          <span>{formatPrice(total)}</span>
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
        {shipping > 0 && (
          <p className="text-xs text-muted-foreground">
            Frete grátis em compras acima de R$ 150,00
          </p>
        )}
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span className="text-primary">{formatPrice(finalTotal)}</span>
        </div>
      </div>

      <Link href="/checkout" className="block">
        <Button className="w-full" size="lg">
          Finalizar Compra
        </Button>
      </Link>

      <Link href="/produtos" className="block">
        <Button variant="outline" className="w-full">
          Continuar Comprando
        </Button>
      </Link>
    </div>
  )
}
