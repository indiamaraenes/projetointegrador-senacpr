"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"
import type { CartItem, Product } from "@/lib/types"

interface CartItemWithProduct extends CartItem {
  product: Product
}

interface CartItemsListProps {
  items: CartItemWithProduct[]
}

export function CartItemsList({ items }: CartItemsListProps) {
  const [isUpdating, setIsUpdating] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setIsUpdating(itemId)

    try {
      await supabase
        .from("cart_items")
        .update({ quantity: newQuantity })
        .eq("id", itemId)

      router.refresh()
    } catch (error) {
      console.error("Erro ao atualizar quantidade:", error)
    } finally {
      setIsUpdating(null)
    }
  }

  const removeItem = async (itemId: string) => {
    setIsUpdating(itemId)

    try {
      await supabase.from("cart_items").delete().eq("id", itemId)
      router.refresh()
    } catch (error) {
      console.error("Erro ao remover item:", error)
    } finally {
      setIsUpdating(null)
    }
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex gap-4 p-4 rounded-lg border bg-card"
        >
          <Link
            href={`/produtos/${item.product.slug}`}
            className="relative size-24 shrink-0 rounded-md overflow-hidden"
          >
            <Image
              src={item.product.image_url || "/images/placeholder.png"}
              alt={item.product.name}
              fill
              className="object-cover"
            />
          </Link>

          <div className="flex-1 min-w-0">
            <Link href={`/produtos/${item.product.slug}`}>
              <h3 className="font-semibold truncate hover:text-primary transition-colors">
                {item.product.name}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground mt-1">
              {formatPrice(item.product.price)} cada
            </p>

            <div className="flex items-center gap-2 mt-3">
              <Button
                variant="outline"
                size="icon"
                className="size-8"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                disabled={isUpdating === item.id || item.quantity <= 1}
              >
                <Minus className="size-4" />
              </Button>
              <span className="w-8 text-center font-medium">
                {item.quantity}
              </span>
              <Button
                variant="outline"
                size="icon"
                className="size-8"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                disabled={isUpdating === item.id || item.quantity >= item.product.stock}
              >
                <Plus className="size-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-col items-end justify-between">
            <span className="font-bold text-primary">
              {formatPrice(item.product.price * item.quantity)}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-red-500"
              onClick={() => removeItem(item.id)}
              disabled={isUpdating === item.id}
            >
              <Trash2 className="size-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
