"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Trash2, Check } from "lucide-react"

interface Model {
  id: string
  name: string
  size: string
  runtime: "Local" | "Hybrid"
  memory: string
  installed: boolean
}

const MODELS: Model[] = [
  {
    id: "llama-3.2-3b",
    name: "Llama 3.2 3B",
    size: "3B",
    runtime: "Local",
    memory: "4GB",
    installed: true,
  },
  {
    id: "llama-3.2-7b",
    name: "Llama 3.2 7B",
    size: "7B",
    runtime: "Local",
    memory: "8GB",
    installed: true,
  },
  {
    id: "mixtral-8x7b",
    name: "Mixtral 8x7B",
    size: "47B",
    runtime: "Hybrid",
    memory: "32GB",
    installed: false,
  },
]

interface SystemSidebarProps {
  selectedModel: string
  onModelChange: (modelId: string) => void
  runtimeMode: "local" | "hybrid"
  onRuntimeModeChange: (mode: "local" | "hybrid") => void
}

export function SystemSidebar({ selectedModel, onModelChange, runtimeMode, onRuntimeModeChange }: SystemSidebarProps) {
  return (
    <div className="w-80 border-r border-border bg-sidebar flex flex-col">
      {/* Model Selection */}
      <div className="p-4 border-b border-sidebar-border">
        <h2 className="text-sm font-mono uppercase tracking-wider text-sidebar-foreground mb-4">Model Selection</h2>
        <div className="space-y-2">
          {MODELS.map((model) => (
            <button
              key={model.id}
              onClick={() => model.installed && onModelChange(model.id)}
              className={`w-full p-3 border rounded text-left transition-colors ${
                selectedModel === model.id
                  ? "border-sidebar-primary bg-sidebar-primary/10"
                  : "border-sidebar-border bg-sidebar-accent hover:bg-sidebar-accent/80"
              } ${!model.installed ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={!model.installed}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-sm font-medium text-sidebar-foreground">{model.name}</span>
                {model.installed && selectedModel === model.id && <Check className="w-4 h-4 text-sidebar-primary" />}
              </div>
              <div className="flex gap-2 text-xs">
                <Badge variant="secondary" className="font-mono bg-sidebar-border">
                  {model.size}
                </Badge>
                <Badge variant="secondary" className="font-mono bg-sidebar-border">
                  {model.runtime}
                </Badge>
                <Badge variant="secondary" className="font-mono bg-sidebar-border">
                  {model.memory}
                </Badge>
              </div>
            </button>
          ))}
        </div>
        <div className="flex gap-2 mt-4">
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <Download className="w-3 h-3 mr-2" />
            Install
          </Button>
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            <Trash2 className="w-3 h-3 mr-2" />
            Remove
          </Button>
        </div>
      </div>

      {/* Runtime Mode */}
      <div className="p-4">
        <h2 className="text-sm font-mono uppercase tracking-wider text-sidebar-foreground mb-4">Runtime Mode</h2>
        <div className="space-y-3">
          <button
            onClick={() => onRuntimeModeChange("local")}
            className={`w-full p-3 border rounded text-left transition-colors ${
              runtimeMode === "local"
                ? "border-sidebar-primary bg-sidebar-primary/10"
                : "border-sidebar-border bg-sidebar-accent hover:bg-sidebar-accent/80"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-sidebar-foreground">Local Only</span>
              {runtimeMode === "local" && <div className="w-2 h-2 rounded-full bg-sidebar-primary" />}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              All computation runs on this device. Nothing leaves your machine.
            </p>
          </button>

          <button
            onClick={() => onRuntimeModeChange("hybrid")}
            className={`w-full p-3 border rounded text-left transition-colors ${
              runtimeMode === "hybrid"
                ? "border-sidebar-primary bg-sidebar-primary/10"
                : "border-sidebar-border bg-sidebar-accent hover:bg-sidebar-accent/80"
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-sidebar-foreground">Local + Decentralized</span>
              {runtimeMode === "hybrid" && <div className="w-2 h-2 rounded-full bg-sidebar-primary" />}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Use local device first. Borrow anonymous compute only when needed.
            </p>
          </button>
        </div>
      </div>
    </div>
  )
}
