import { Star } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

export async function TestimonialsSection() {
  const supabase = await createClient()
  
  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(3)

  if (!testimonials || testimonials.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="mt-2 text-muted-foreground">
            Depoimentos de quem já comprou conosco
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex flex-col p-6 rounded-lg bg-card border"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="flex-1 text-muted-foreground italic">
                &ldquo;{testimonial.content}&rdquo;
              </p>
              <div className="mt-4 pt-4 border-t">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
