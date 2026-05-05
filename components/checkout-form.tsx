"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import { createClient } from "@/lib/supabase/client"
import type { Profile, CartItem, Product } from "@/lib/types"

interface CartItemWithProduct extends CartItem {
  product: Product
}

interface CheckoutFormProps {
  profile: Profile | null
  cartItems: CartItemWithProduct[]
  total: number
}

export function CheckoutForm({ profile, cartItems, total }: CheckoutFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error("Usuário não autenticado")

      // Criar pedido
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          total,
          status: "pending",
          shipping_address: formData.get("address") as string,
          shipping_city: formData.get("city") as string,
          shipping_state: formData.get("state") as string,
          shipping_zip: formData.get("zipCode") as string,
          payment_method: formData.get("paymentMethod") as string,
          notes: formData.get("notes") as string,
        })
        .select()
        .single()

      if (orderError) throw orderError

      // Criar itens do pedido
      const orderItems = cartItems.map((item) => ({
        order_id: order.id,
        product_id: item.product_id,
        product_name: item.product.name,
        product_price: item.product.price,
        quantity: item.quantity,
      }))

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems)

      if (itemsError) throw itemsError

      // Atualizar perfil com endereço
      await supabase
        .from("profiles")
        .update({
          full_name: formData.get("fullName") as string,
          phone: formData.get("phone") as string,
          address: formData.get("address") as string,
          city: formData.get("city") as string,
          state: formData.get("state") as string,
          zip_code: formData.get("zipCode") as string,
        })
        .eq("id", user.id)

      // Limpar carrinho
      await supabase
        .from("cart_items")
        .delete()
        .eq("user_id", user.id)

      router.push(`/pedido-confirmado/${order.id}`)
    } catch (err) {
      console.error("Erro ao finalizar pedido:", err)
      setError("Erro ao finalizar pedido. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="rounded-lg border bg-card p-6 space-y-6">
        <h2 className="font-display text-xl font-bold">Dados Pessoais</h2>
        
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="fullName" className="text-sm font-medium">
              Nome Completo *
            </label>
            <Input
              id="fullName"
              name="fullName"
              defaultValue={profile?.full_name || ""}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium">
              Telefone *
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              defaultValue={profile?.phone || ""}
              placeholder="(41) 99999-9999"
              required
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6 space-y-6">
        <h2 className="font-display text-xl font-bold">Endereço de Entrega</h2>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="address" className="text-sm font-medium">
              Endereço Completo *
            </label>
            <Input
              id="address"
              name="address"
              defaultValue={profile?.address || ""}
              placeholder="Rua, número, complemento"
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <label htmlFor="city" className="text-sm font-medium">
                Cidade *
              </label>
              <Input
                id="city"
                name="city"
                defaultValue={profile?.city || ""}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="state" className="text-sm font-medium">
                Estado *
              </label>
              <Input
                id="state"
                name="state"
                defaultValue={profile?.state || "PR"}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="zipCode" className="text-sm font-medium">
                CEP *
              </label>
              <Input
                id="zipCode"
                name="zipCode"
                defaultValue={profile?.zip_code || ""}
                placeholder="00000-000"
                required
              />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6 space-y-6">
        <h2 className="font-display text-xl font-bold">Pagamento</h2>
        
        <div className="space-y-4">
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-4 rounded-lg border cursor-pointer hover:bg-muted transition-colors">
              <input
                type="radio"
                name="paymentMethod"
                value="pix"
                defaultChecked
                className="size-4"
              />
              <div>
                <span className="font-medium">PIX</span>
                <p className="text-sm text-muted-foreground">
                  Pagamento instantâneo com desconto de 5%
                </p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-4 rounded-lg border cursor-pointer hover:bg-muted transition-colors">
              <input
                type="radio"
                name="paymentMethod"
                value="credit_card"
                className="size-4"
              />
              <div>
                <span className="font-medium">Cartão de Crédito</span>
                <p className="text-sm text-muted-foreground">
                  Parcele em até 12x sem juros
                </p>
              </div>
            </label>
            <label className="flex items-center gap-3 p-4 rounded-lg border cursor-pointer hover:bg-muted transition-colors">
              <input
                type="radio"
                name="paymentMethod"
                value="boleto"
                className="size-4"
              />
              <div>
                <span className="font-medium">Boleto Bancário</span>
                <p className="text-sm text-muted-foreground">
                  Vencimento em 3 dias úteis
                </p>
              </div>
            </label>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-card p-6 space-y-6">
        <h2 className="font-display text-xl font-bold">Observações</h2>
        <Textarea
          name="notes"
          placeholder="Instruções para entrega, mensagem do cartão, etc."
          rows={3}
        />
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
        {isLoading ? <Spinner size="sm" /> : "Confirmar Pedido"}
      </Button>
    </form>
  )
}
