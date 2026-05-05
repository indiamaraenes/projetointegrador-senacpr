import Image from "next/image"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sobre | BelaFlor",
  description: "Conheça a história da BelaFlor e nossa paixão por flores.",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl font-bold">Sobre a BelaFlor</h1>
        <p className="mt-2 text-muted-foreground">
          Nossa história e paixão pelas flores
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-2 items-center mb-16">
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
          <h2 className="font-display text-2xl font-bold">Nossa História</h2>
          <p className="text-muted-foreground">
            A BelaFlor nasceu em 2020, fruto da paixão de uma família por flores
            e do desejo de levar beleza e alegria para os lares paranaenses.
            Começamos como uma pequena floricultura no centro de Curitiba e,
            graças ao carinho dos nossos clientes, crescemos e nos tornamos
            referência no mercado de flores da região.
          </p>
          <p className="text-muted-foreground">
            Hoje, atendemos toda Curitiba e região metropolitana, mantendo o
            mesmo cuidado artesanal e a dedicação que nos trouxeram até aqui.
            Cada arranjo é criado com amor e atenção aos detalhes, porque
            acreditamos que flores são muito mais que decoração - são mensagens
            de carinho, amor e celebração.
          </p>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3 mb-16">
        <div className="text-center p-6 rounded-lg bg-secondary/30">
          <div className="font-display text-4xl font-bold text-primary mb-2">5+</div>
          <p className="text-muted-foreground">Anos de experiência</p>
        </div>
        <div className="text-center p-6 rounded-lg bg-secondary/30">
          <div className="font-display text-4xl font-bold text-primary mb-2">10.000+</div>
          <p className="text-muted-foreground">Clientes atendidos</p>
        </div>
        <div className="text-center p-6 rounded-lg bg-secondary/30">
          <div className="font-display text-4xl font-bold text-primary mb-2">50.000+</div>
          <p className="text-muted-foreground">Flores entregues</p>
        </div>
      </div>

      <div className="grid gap-12 lg:grid-cols-2 items-center">
        <div className="space-y-6 order-2 lg:order-1">
          <h2 className="font-display text-2xl font-bold">Nossa Missão</h2>
          <p className="text-muted-foreground">
            Transformar momentos especiais em memórias inesquecíveis através da
            beleza e frescor das flores. Trabalhamos diariamente para oferecer
            produtos de alta qualidade, com atendimento personalizado e entrega
            pontual.
          </p>
          <h2 className="font-display text-2xl font-bold">Nossos Valores</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-primary" />
              Qualidade em cada detalhe
            </li>
            <li className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-primary" />
              Compromisso com o cliente
            </li>
            <li className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-primary" />
              Sustentabilidade e respeito à natureza
            </li>
            <li className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-primary" />
              Inovação constante
            </li>
          </ul>
        </div>
        <div className="relative aspect-square rounded-lg overflow-hidden order-1 lg:order-2">
          <Image
            src="/images/Flower-Delivery-Services.png"
            alt="Entrega de flores BelaFlor"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  )
}
