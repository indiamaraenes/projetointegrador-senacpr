"use client"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatPrice, calculateDiscount } from "@/lib/utils"
import type { Product } from "@/lib/types"
import { createClient } from "@/lib/supabase/client"
import { useState } from "react"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false)
  const supabase = createClient()

  const discount = product.original_price
    ? calculateDiscount(product.price, product.original_price)
    : 0

  const handleAddToCart = async () => {
    setIsAdding(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        window.location.href = "/auth/login?redirect=/produtos"
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
          .update({ quantity: existingItem.quantity + 1 })
          .eq("id", existingItem.id)
      } else {
        await supabase.from("cart_items").insert({
          user_id: user.id,
          product_id: product.id,
          quantity: 1,
        })
      }

      window.location.reload()
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error)
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border bg-card transition-shadow hover:shadow-lg">
      {discount > 0 && (
        <Badge variant="accent" className="absolute top-3 left-3 z-10">
          -{discount}%
        </Badge>
      )}
      
      <Link href={`/produtos/${product.slug}`} className="relative aspect-square overflow-hidden">
        <Image
          src={product.image_url || "/images/placeholder.png"}
          alt={product.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link href={`/produtos/${product.slug}`}>
          <h3 className="font-display text-lg font-semibold line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        <div className="mt-auto flex items-center gap-2">
          <span className="text-xl font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          {product.original_price && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.original_price)}
            </span>
          )}
        </div>

        <Button
          className="mt-2 w-full"
          onClick={handleAddToCart}
          disabled={isAdding || product.stock === 0}
        >
          <ShoppingCart className="size-4" />
          {product.stock === 0 ? "Esgotado" : "Adicionar ao Carrinho"}
        </Button>
      </div>
    </div>
  )
}
