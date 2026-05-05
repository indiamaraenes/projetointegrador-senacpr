import Link from "next/link"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AuthErrorPage() {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-200px)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="flex justify-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-red-100 text-red-600">
            <AlertCircle className="size-10" />
          </div>
        </div>
        
        <div>
          <h1 className="font-display text-3xl font-bold">Erro de Autenticação</h1>
          <p className="mt-4 text-muted-foreground">
            Ocorreu um erro durante o processo de autenticação.
            O link pode ter expirado ou já ter sido utilizado.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Link href="/auth/login">
            <Button className="w-full">Voltar para Login</Button>
          </Link>
          <Link href="/auth/cadastro">
            <Button variant="outline" className="w-full">Criar Nova Conta</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
