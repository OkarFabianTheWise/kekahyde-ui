import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProblemSection } from "@/components/problem-section"
import { SolutionSection } from "@/components/solution-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { RoadmapSection } from "@/components/roadmap-section"
import { FloatingBackground } from "@/components/floating-background"

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background grain-texture overflow-hidden">
      <FloatingBackground />
      <div className="relative z-10">
        <Header />
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <HowItWorksSection />
        <RoadmapSection />
      </div>
    </main>
  )
}
