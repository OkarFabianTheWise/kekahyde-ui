import { Button } from "@/components/ui/button"
import { ArrowRight, Download } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6">
            <span className="text-xs font-mono text-primary px-3 py-1 rounded-full border border-primary/30 bg-primary/5">
              Privacy-First AI Platform
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 text-balance leading-tight">
            Your prompts shouldn't belong to <span className="text-primary text-glow">someone else</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-4 max-w-3xl mx-auto leading-relaxed">
            Run AI like software. Keep data local. Borrow compute only when needed.
          </p>

          <p className="text-base md:text-lg text-muted-foreground/80 mb-10 max-w-2xl mx-auto">
            No centralized servers. No data harvesting. No black boxes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/app">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-green group">
                <Download className="mr-2 h-5 w-5" />
                Run AI Locally
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-border hover:border-primary/50 bg-transparent">
              See How It Works
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
