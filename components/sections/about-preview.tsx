import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AboutPreviewSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-2 items-center">
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src="/images/about-vid.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="space-y-6">
            <h2 className="font-display text-3xl font-bold">
              Sobre a BelaFlor
            </h2>
            <p className="text-muted-foreground">
              Há mais de 5 anos, a BelaFlor transforma momentos especiais com a
              beleza das flores. Nossa missão é levar alegria e emoção através
              de arranjos únicos, criados com carinho e dedicação.
            </p>
            <p className="text-muted-foreground">
              Trabalhamos com flores frescas selecionadas diariamente, garantindo
              a qualidade e durabilidade de cada produto. Nossa equipe de
              floristas experientes cria arranjos exclusivos para cada ocasião.
            </p>
            <Link href="/sobre">
              <Button variant="outline">
                Saiba Mais
                <ArrowRight className="size-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
