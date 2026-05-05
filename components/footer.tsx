import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <Link href="/" className="font-display text-2xl font-bold text-primary">
              BelaFlor
            </Link>
            <p className="text-sm text-muted-foreground">
              Transformando momentos especiais com a beleza das flores desde 2020.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="size-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="size-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="size-5" />
              </a>
            </div>
          </div>

          {/* Links Rápidos */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold">Links Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/produtos" className="text-muted-foreground hover:text-primary transition-colors">
                  Produtos
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-muted-foreground hover:text-primary transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/contato" className="text-muted-foreground hover:text-primary transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold">Contato</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Rua das Flores, 123</li>
              <li>Centro - Curitiba, PR</li>
              <li>CEP: 80000-000</li>
              <li>(41) 99999-9999</li>
              <li>contato@belaflor.com.br</li>
            </ul>
          </div>

          {/* Horário de Funcionamento */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-semibold">Horário</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Segunda a Sexta: 8h - 18h</li>
              <li>Sábado: 8h - 14h</li>
              <li>Domingo: Fechado</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} BelaFlor. Todos os direitos reservados.</p>
          <p className="mt-2">
            Projeto Integrador - Senac PR
          </p>
        </div>
      </div>
    </footer>
  )
}
