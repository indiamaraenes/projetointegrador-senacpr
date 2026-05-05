import Link from "next/link"
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SignUpSuccessPage() {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-200px)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="flex justify-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Mail className="size-10" />
          </div>
        </div>
        
        <div>
          <h1 className="font-display text-3xl font-bold">Verifique seu E-mail</h1>
          <p className="mt-4 text-muted-foreground">
            Enviamos um link de confirmação para o seu e-mail.
            Clique no link para ativar sua conta e começar a comprar.
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Não recebeu o e-mail? Verifique sua caixa de spam ou tente novamente.
          </p>
          <Link href="/auth/login">
            <Button variant="outline">Voltar para Login</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
