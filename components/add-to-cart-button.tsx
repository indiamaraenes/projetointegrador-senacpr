"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ShoppingCart, Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { createClient } from "@/lib/supabase/client"
import type { Product } from "@/lib/types"

interface AddToCartButtonProps {
  product: Product
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleAddToCart = async () => {
    setIsLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push(`/auth/login?redirect=/produtos/${product.slug}`)
        return
      }

      const { data: existingItem } = await supabase
        .from("cart_items")
        .select("id, quantity")
        .eq("user_id", user.id)
        .eq("product_id", product.id)
        .single()

      if (existingItem) {
        await supabase
          .from("cart_items")
          .update({ quantity: existingItem.quantity + quantity })
          .eq("id", existingItem.id)
      } else {
        await supabase.from("cart_items").insert({
          user_id: user.id,
          product_id: product.id,
          quantity,
        })
      }

      router.push("/carrinho")
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">Quantidade:</span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            <Minus className="size-4" />
          </Button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            disabled={quantity >= product.stock}
          >
            <Plus className="size-4" />
          </Button>
        </div>
      </div>

      <Button
        size="lg"
        className="w-full"
        onClick={handleAddToCart}
        disabled={isLoading || product.stock === 0}
      >
        {isLoading ? (
          <Spinner size="sm" />
        ) : (
          <>
            <ShoppingCart className="size-5" />
            {product.stock === 0 ? "Produto Esgotado" : "Adicionar ao Carrinho"}
          </>
        )}
      </Button>
    </div>
  )
}
