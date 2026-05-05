import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/20">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/images/home-bg.png')" }}
      />
      <div className="container relative z-10 mx-auto px-4 py-20 text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-balance">
          Flores que Encantam,
          <br />
          <span className="text-primary">Momentos que Marcam</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground text-pretty">
          Descubra a beleza das nossas flores frescas e arranjos exclusivos.
          Entrega rápida e garantia de frescor para todas as ocasiões especiais.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/produtos">
            <Button size="xl">Ver Produtos</Button>
          </Link>
          <Link href="/contato">
            <Button variant="outline" size="xl">
              Fale Conosco
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
