"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Spinner } from "@/components/ui/spinner"
import { createClient } from "@/lib/supabase/client"

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      subject: formData.get("subject") as string,
      message: formData.get("message") as string,
    }

    try {
      const { error: insertError } = await supabase
        .from("contact_messages")
        .insert(data)

      if (insertError) throw insertError

      setIsSuccess(true)
      e.currentTarget.reset()
    } catch (err) {
      setError("Erro ao enviar mensagem. Tente novamente.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="p-6 rounded-lg bg-secondary text-center">
        <h3 className="font-display text-xl font-semibold text-primary mb-2">
          Mensagem Enviada!
        </h3>
        <p className="text-muted-foreground">
          Obrigado pelo contato. Responderemos em breve.
        </p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => setIsSuccess(false)}
        >
          Enviar Nova Mensagem
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Nome *
          </label>
          <Input
            id="name"
            name="name"
            placeholder="Seu nome completo"
            required
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            E-mail *
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="seu@email.com"
            required
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">
            Telefone
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="(41) 99999-9999"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-medium">
            Assunto
          </label>
          <Input
            id="subject"
            name="subject"
            placeholder="Assunto da mensagem"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium">
          Mensagem *
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Escreva sua mensagem..."
          rows={5}
          required
        />
      </div>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? <Spinner size="sm" /> : "Enviar Mensagem"}
      </Button>
    </form>
  )
}
