import { HeroSection } from "@/components/sections/hero"
import { BenefitsSection } from "@/components/sections/benefits"
import { FeaturedProductsSection } from "@/components/sections/featured-products"
import { AboutPreviewSection } from "@/components/sections/about-preview"
import { TestimonialsSection } from "@/components/sections/testimonials"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BenefitsSection />
      <FeaturedProductsSection />
      <AboutPreviewSection />
      <TestimonialsSection />
    </>
  )
}
