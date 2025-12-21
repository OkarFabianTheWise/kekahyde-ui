import { CheckCircle2, Circle } from "lucide-react"

export function RoadmapSection() {
  const milestones = [
    {
      title: "Local AI runtime",
      status: "completed",
    },
    {
      title: "Private prompt execution",
      status: "in-progress",
    },
    {
      title: "Decentralized compute support",
      status: "upcoming",
    },
    {
      title: "Verification & trust layer",
      status: "upcoming",
    },
    {
      title: "Developer plugins & extensions",
      status: "upcoming",
    },
    {
      title: "Open ecosystem",
      status: "upcoming",
    },
  ]

  return (
    <section id="roadmap" className="py-20 md:py-32 border-t border-border/40">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-6 text-balance">Roadmap</h2>

          <p className="text-center text-muted-foreground mb-16 leading-relaxed">
            Clear milestones. No dates. No hype.
          </p>

          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <div key={index} className="relative group">
                <div className="flex items-center gap-4 p-5 rounded-lg border border-border bg-card/30 backdrop-blur-sm hover:bg-card/50 transition-all duration-300">
                  <div className="flex-shrink-0">
                    {milestone.status === "completed" && <CheckCircle2 className="h-6 w-6 text-primary" />}
                    {milestone.status === "in-progress" && (
                      <div className="h-6 w-6 rounded-full border-2 border-primary bg-primary/20 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                      </div>
                    )}
                    {milestone.status === "upcoming" && <Circle className="h-6 w-6 text-muted-foreground/50" />}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-lg font-medium ${
                        milestone.status === "completed"
                          ? "text-foreground"
                          : milestone.status === "in-progress"
                            ? "text-primary"
                            : "text-muted-foreground"
                      }`}
                    >
                      {milestone.title}
                    </p>
                  </div>
                  {milestone.status === "completed" && (
                    <span className="text-xs font-mono text-primary/70 px-2 py-1 rounded bg-primary/10">DONE</span>
                  )}
                  {milestone.status === "in-progress" && (
                    <span className="text-xs font-mono text-primary px-2 py-1 rounded bg-primary/10 border border-primary/30">
                      IN PROGRESS
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-muted-foreground/70 text-sm italic leading-relaxed">
              "This should exist. Why wasn't AI built this way from the start?"
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
