import type { Metadata } from "next"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import { ContactForm } from "@/components/contact-form"

export const metadata: Metadata = {
  title: "Contato | BelaFlor",
  description: "Entre em contato com a BelaFlor. Estamos prontos para atender você.",
}

const contactInfo = [
  {
    icon: MapPin,
    title: "Endereço",
    content: "Rua das Flores, 123\nCentro - Curitiba, PR\nCEP: 80000-000",
  },
  {
    icon: Phone,
    title: "Telefone",
    content: "(41) 99999-9999\n(41) 3333-3333",
  },
  {
    icon: Mail,
    title: "E-mail",
    content: "contato@belaflor.com.br\nvendas@belaflor.com.br",
  },
  {
    icon: Clock,
    title: "Horário",
    content: "Segunda a Sexta: 8h - 18h\nSábado: 8h - 14h\nDomingo: Fechado",
  },
]

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl font-bold">Entre em Contato</h1>
        <p className="mt-2 text-muted-foreground">
          Estamos prontos para atender você
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-bold mb-6">
            Envie sua Mensagem
          </h2>
          <ContactForm />
        </div>

        <div className="space-y-8">
          <h2 className="font-display text-2xl font-bold">
            Informações de Contato
          </h2>
          
          <div className="grid gap-6 sm:grid-cols-2">
            {contactInfo.map((info) => (
              <div
                key={info.title}
                className="flex gap-4 p-4 rounded-lg bg-muted"
              >
                <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
                  <info.icon className="size-6" />
                </div>
                <div>
                  <h3 className="font-semibold">{info.title}</h3>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {info.content}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="aspect-video rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3602.5234693844236!2d-49.27283492374847!3d-25.431848633844297!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94dce44e8c8f4c7d%3A0x5c8f6b1a1a1a1a1a!2sCentro%2C%20Curitiba%20-%20PR!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização BelaFlor"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
