"use client"

import { useState } from "react"
import { SystemSidebar } from "@/components/app/system-sidebar"
import { PromptPanel } from "@/components/app/prompt-panel"
import { StatusPanel } from "@/components/app/status-panel"
import { PrivacyPanel } from "@/components/app/privacy-panel"

export default function AppPage() {
  const [selectedModel, setSelectedModel] = useState<string>("llama-3.2-3b")
  const [runtimeMode, setRuntimeMode] = useState<"local" | "hybrid">("local")
  const [isRunning, setIsRunning] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [output, setOutput] = useState("")
  const [permissions, setPermissions] = useState({
    decentralizedCompute: false,
    anonymousContribution: false,
    modelDownloads: true,
    telemetry: false,
  })

  const handleRun = () => {
    setIsRunning(true)
    // Simulate AI processing
    setTimeout(() => {
      setOutput("Model response would appear here...")
      setIsRunning(false)
    }, 2000)
  }

  const handleStop = () => {
    setIsRunning(false)
  }

  const handleClear = () => {
    setPrompt("")
    setOutput("")
  }

  return (
    <div className="h-screen flex flex-col bg-background grain-texture overflow-hidden">
      {/* Top Bar */}
      <div className="h-14 border-b border-border flex items-center justify-between px-4 bg-card">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-mono text-foreground">Kekahyde</span>
        </div>
        <div className="text-xs font-mono text-muted-foreground">Your prompts never leave this device.</div>
      </div>

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <SystemSidebar
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
          runtimeMode={runtimeMode}
          onRuntimeModeChange={setRuntimeMode}
        />

        {/* Center Panel */}
        <PromptPanel
          prompt={prompt}
          onPromptChange={setPrompt}
          output={output}
          isRunning={isRunning}
          onRun={handleRun}
          onStop={handleStop}
          onClear={handleClear}
        />

        {/* Right Panel */}
        <div className="w-80 border-l border-border flex flex-col">
          <StatusPanel runtimeMode={runtimeMode} selectedModel={selectedModel} isRunning={isRunning} />
          <PrivacyPanel permissions={permissions} onPermissionsChange={setPermissions} />
        </div>
      </div>
    </div>
  )
}
