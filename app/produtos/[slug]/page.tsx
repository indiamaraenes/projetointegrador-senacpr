import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { createClient } from "@/lib/supabase/server"
import { formatPrice, calculateDiscount } from "@/lib/utils"
import type { Metadata } from "next"

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single()

  if (!product) {
    return {
      title: "Produto não encontrado | BelaFlor",
    }
  }

  return {
    title: `${product.name} | BelaFlor`,
    description: product.description || `Compre ${product.name} na BelaFlor`,
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const supabase = await createClient()
  
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single()

  if (!product) {
    notFound()
  }

  const discount = product.original_price
    ? calculateDiscount(product.price, product.original_price)
    : 0

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        href="/produtos"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="size-4" />
        Voltar para Produtos
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
          {discount > 0 && (
            <Badge variant="accent" className="absolute top-4 left-4 z-10">
              -{discount}%
            </Badge>
          )}
          <Image
            src={product.image_url || "/images/placeholder.png"}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <h1 className="font-display text-3xl font-bold">{product.name}</h1>
            <p className="mt-4 text-muted-foreground">{product.description}</p>
          </div>

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-primary">
              {formatPrice(product.price)}
            </span>
            {product.original_price && (
              <span className="text-lg text-muted-foreground line-through">
                {formatPrice(product.original_price)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {product.stock > 0 ? (
              <Badge variant="secondary">
                {product.stock} em estoque
              </Badge>
            ) : (
              <Badge variant="destructive">Esgotado</Badge>
            )}
          </div>

          <AddToCartButton product={product} />

          <div className="border-t pt-6 space-y-4">
            <h3 className="font-semibold">Informações</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Entrega em até 24 horas para Curitiba e região</li>
              <li>Garantia de frescor de 7 dias</li>
              <li>Embalagem especial para presente</li>
              <li>Cartão com mensagem personalizada</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
