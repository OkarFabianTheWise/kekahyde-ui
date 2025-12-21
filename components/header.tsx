import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight text-primary">
          kekahyde
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            How It Works
          </Link>
          <Link href="#roadmap" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Roadmap
          </Link>
          <Button variant="outline" size="sm" className="border-primary/30 hover:border-primary bg-transparent">
            Documentation
          </Button>
        </nav>
      </div>
    </header>
  )
}
