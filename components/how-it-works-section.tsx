import { CheckCircle2 } from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "AI model runs locally",
      description: "Your model executes on your hardware with full control",
    },
    {
      number: "02",
      title: "Sensitive context stays on device",
      description: "Private data never leaves your environment",
    },
    {
      number: "03",
      title: "Heavy math is split and outsourced",
      description: "Computation is distributed as anonymous tasks",
    },
    {
      number: "04",
      title: "Results return, meaning stays private",
      description: "Only encrypted results come back to you",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 md:py-32 border-t border-border/40">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-balance">How It Works</h2>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                <div className="flex items-start gap-6 p-6 rounded-lg border border-border bg-card/50 backdrop-blur-sm hover:border-primary/40 transition-all duration-300">
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                      <span className="text-xl font-bold font-mono text-primary">{step.number}</span>
                    </div>
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-xl font-bold mb-2 text-card-foreground">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                  <CheckCircle2 className="h-6 w-6 text-primary opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
