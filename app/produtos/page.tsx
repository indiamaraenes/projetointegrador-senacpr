import { ProductCard } from "@/components/product-card"
import { createClient } from "@/lib/supabase/server"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Produtos | BelaFlor",
  description: "Confira nossa seleção de buquês, arranjos e flores frescas para todas as ocasiões.",
}

export default async function ProductsPage() {
  const supabase = await createClient()
  
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="font-display text-4xl font-bold">Nossos Produtos</h1>
        <p className="mt-2 text-muted-foreground">
          Encontre o presente perfeito para cada ocasião
        </p>
      </div>

      {products && products.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-muted-foreground">
            Nenhum produto disponível no momento.
          </p>
        </div>
      )}
    </div>
  )
}
