import { Shield, Cpu, Layers } from "lucide-react"

export function SolutionSection() {
  const pillars = [
    {
      icon: Cpu,
      title: "Local by Default",
      description: "AI runs on your device",
      color: "text-primary",
    },
    {
      icon: Shield,
      title: "Private by Design",
      description: "Prompts never leave your control",
      color: "text-accent",
    },
    {
      icon: Layers,
      title: "Compute When Needed",
      description: "Borrow decentralized compute, anonymously",
      color: "text-chart-2",
    },
  ]

  return (
    <section className="py-20 md:py-32 border-t border-border/40">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-6 text-balance">
            AI Should Work Like <span className="text-primary text-glow">Software</span>
          </h2>

          <p className="text-center text-muted-foreground text-lg mb-16 max-w-2xl mx-auto leading-relaxed">
            Own your AI infrastructure. Keep sensitive data local. Scale computation without sacrificing privacy.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {pillars.map((pillar, index) => (
              <div key={index} className="relative group">
                <div className="p-8 rounded-lg border border-primary/20 bg-card backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:glow-green">
                  <pillar.icon
                    className={`h-12 w-12 ${pillar.color} mb-6 opacity-90 group-hover:opacity-100 transition-opacity`}
                  />
                  <h3 className="text-xl font-bold mb-3 text-card-foreground">{pillar.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-muted-foreground text-sm italic">
              Your device at center, compute nodes orbiting without touching your data
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
