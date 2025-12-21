"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Play, Square, X } from "lucide-react"

interface PromptPanelProps {
  prompt: string
  onPromptChange: (value: string) => void
  output: string
  isRunning: boolean
  onRun: () => void
  onStop: () => void
  onClear: () => void
}

export function PromptPanel({ prompt, onPromptChange, output, isRunning, onRun, onStop, onClear }: PromptPanelProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (!isRunning && prompt.trim()) {
        onRun()
      }
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Prompt Input Area */}
      <div className="p-6 border-b border-border">
        <div className="mb-3">
          <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Prompt</label>
        </div>
        <Textarea
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Your prompt runs locally. It is never uploaded."
          className="min-h-32 font-mono text-sm resize-none bg-input border-border focus:border-primary"
        />
        <div className="flex items-center justify-between mt-3">
          <div className="text-xs text-muted-foreground font-mono">
            {prompt.length} chars • Enter to run • Shift+Enter for new line
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onClear} disabled={!prompt && !output}>
              <X className="w-3 h-3 mr-2" />
              Clear
            </Button>
            {isRunning ? (
              <Button variant="destructive" size="sm" onClick={onStop}>
                <Square className="w-3 h-3 mr-2" />
                Stop
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={onRun}
                disabled={!prompt.trim()}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Play className="w-3 h-3 mr-2" />
                Run
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Output Area */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="mb-3">
          <label className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Output</label>
        </div>
        {output ? (
          <div className="space-y-4">
            <div className="p-4 bg-card border border-border rounded font-mono text-sm leading-relaxed">{output}</div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="font-mono">Result verified locally</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">
            {isRunning ? (
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="font-mono">Processing locally...</span>
              </div>
            ) : (
              <span className="font-mono">No output yet</span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
