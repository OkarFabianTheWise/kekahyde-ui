"use client"

import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Check, Circle } from "lucide-react"

interface StatusPanelProps {
  runtimeMode: "local" | "hybrid"
  selectedModel: string
  isRunning: boolean
}

export function StatusPanel({ runtimeMode, selectedModel, isRunning }: StatusPanelProps) {
  const cpuUsage = isRunning ? 67 : 12
  const memoryUsage = isRunning ? 45 : 8

  return (
    <div className="flex-1 p-4 border-b border-border overflow-auto">
      <h2 className="text-sm font-mono uppercase tracking-wider text-foreground mb-4">System Status</h2>

      {/* Runtime Status */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground font-mono">Local Runtime</span>
          <Badge variant="outline" className="font-mono bg-primary/10 text-primary border-primary">
            <Circle className="w-2 h-2 mr-1 fill-primary" />
            Active
          </Badge>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground font-mono">Compute Mode</span>
          <Badge variant="secondary" className="font-mono">
            {runtimeMode === "local" ? "Local" : "Hybrid"}
          </Badge>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground font-mono">Model Loaded</span>
          <div className="flex items-center gap-1.5 text-primary">
            <Check className="w-3 h-3" />
            <span className="text-xs font-mono">Yes</span>
          </div>
        </div>
      </div>

      {/* Progress Indicators */}
      <div className="space-y-4 mb-6">
        <div>
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-muted-foreground font-mono">CPU Usage</span>
            <span className="text-foreground font-mono">{cpuUsage}%</span>
          </div>
          <Progress value={cpuUsage} className="h-1.5" />
        </div>

        <div>
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-muted-foreground font-mono">Memory Usage</span>
            <span className="text-foreground font-mono">{memoryUsage}%</span>
          </div>
          <Progress value={memoryUsage} className="h-1.5" />
        </div>

        {isRunning && (
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-muted-foreground font-mono">Token Progress</span>
              <span className="text-foreground font-mono">247 / 512</span>
            </div>
            <Progress value={48} className="h-1.5" />
          </div>
        )}
      </div>

      {/* Verification Status */}
      <div className="p-3 bg-primary/10 border border-primary rounded">
        <div className="flex items-start gap-2">
          <Check className="w-4 h-4 text-primary mt-0.5" />
          <div>
            <div className="text-xs font-medium text-foreground mb-1">Verified Locally</div>
            <div className="text-xs text-muted-foreground leading-relaxed">
              All outputs are computed and verified on this device.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
