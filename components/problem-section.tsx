import { AlertTriangle, Database, Lock } from "lucide-react"

export function ProblemSection() {
  const problems = [
    {
      icon: Database,
      text: "Prompts are sent to centralized servers",
    },
    {
      icon: AlertTriangle,
      text: "Your data becomes training fuel",
    },
    {
      icon: Lock,
      text: "AI is rented, not owned",
    },
  ]

  return (
    <section className="py-20 md:py-32 border-t border-border/40">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-balance">
            The Problem with <span className="text-destructive">Today's AI</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {problems.map((problem, index) => (
              <div key={index} className="relative group">
                <div className="p-8 rounded-lg border border-destructive/20 bg-card/50 backdrop-blur-sm hover:border-destructive/40 transition-all duration-300">
                  <problem.icon className="h-10 w-10 text-destructive mb-4 opacity-80 group-hover:opacity-100 transition-opacity" />
                  <p className="text-lg leading-relaxed text-card-foreground">{problem.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 rounded-lg border border-destructive/30 bg-destructive/5">
            <p className="text-center text-muted-foreground text-lg leading-relaxed">
              Your sensitive data flows away from your device into centralized servers where you have no control over
              how it's used, stored, or monetized.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
