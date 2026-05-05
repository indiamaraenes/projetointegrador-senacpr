import { Truck, Shield, Percent, CreditCard } from "lucide-react"

const benefits = [
  {
    icon: Truck,
    title: "Entrega Rápida",
    description: "Frete grátis para Curitiba e região metropolitana",
  },
  {
    icon: Shield,
    title: "Garantia de Frescor",
    description: "Flores sempre frescas com garantia de 7 dias",
  },
  {
    icon: Percent,
    title: "Ofertas Especiais",
    description: "Descontos exclusivos para clientes cadastrados",
  },
  {
    icon: CreditCard,
    title: "Pagamento Seguro",
    description: "Parcele em até 12x sem juros no cartão",
  },
]

export function BenefitsSection() {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="flex flex-col items-center text-center p-6 rounded-lg bg-card border transition-shadow hover:shadow-md"
            >
              <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                <benefit.icon className="size-7" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
