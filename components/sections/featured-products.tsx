import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { createClient } from "@/lib/supabase/server"

export async function FeaturedProductsSection() {
  const supabase = await createClient()
  
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(6)

  if (!products || products.length === 0) {
    return null
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div>
            <h2 className="font-display text-3xl font-bold">
              Produtos em Destaque
            </h2>
            <p className="mt-2 text-muted-foreground">
              Os buquês e arranjos mais amados pelos nossos clientes
            </p>
          </div>
          <Link href="/produtos">
            <Button variant="outline">
              Ver Todos
              <ArrowRight className="size-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
