"use client"

import { useState, useEffect } from "react"
import { SystemSidebar } from "@/components/app/system-sidebar"
import { PromptPanel } from "@/components/app/prompt-panel"
import { StatusPanel } from "@/components/app/status-panel"
import { PrivacyPanel } from "@/components/app/privacy-panel"

interface Policy {
  allow_networking: boolean;
  allow_hybrid_compute: boolean;
  allow_telemetry: boolean;
}

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
  const [currentExecutionId, setCurrentExecutionId] = useState<string | null>(null)
  const [isInitializing, setIsInitializing] = useState(true)
  const [initMessage, setInitMessage] = useState("Initializing AI runtime...")

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch('http://localhost:3000/status')
        if (response.ok) {
          setIsInitializing(false)
        } else {
          setInitMessage("AI runtime starting up...")
        }
      } catch (error) {
        setInitMessage("AI runtime starting up...")
      }
    }

    if (isInitializing) {
      checkStatus()
      const interval = setInterval(checkStatus, 2000)
      return () => clearInterval(interval)
    }
  }, [isInitializing])

  const handleRun = async () => {
    if (!prompt.trim()) return
    setIsRunning(true)
    setOutput("")
    try {
      const policy: Policy = {
        allow_networking: false,
        allow_hybrid_compute: permissions.decentralizedCompute,
        allow_telemetry: permissions.telemetry,
      }
      const startResponse = await fetch('http://localhost:3000/execution/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, policy }),
      })
      if (!startResponse.ok) {
        throw new Error(`HTTP error! status: ${startResponse.status}`)
      }
      const { id } = await startResponse.json()
      setCurrentExecutionId(id)

      // Connect to WebSocket
      const ws = new WebSocket(`ws://localhost:3000/ws/execution/${id}`)
      ws.onmessage = (event) => {
        const status = JSON.parse(event.data)
        if (status.state === 'Completed') {
          setOutput(status.result || '')
          setIsRunning(false)
          setCurrentExecutionId(null)
          ws.close()
        } else if (status.state === 'Failed') {
          setOutput(`Error: ${status.error || 'Unknown error'}`)
          setIsRunning(false)
          setCurrentExecutionId(null)
          ws.close()
        } else if (status.state === 'Cancelled') {
          setOutput('Execution cancelled')
          setIsRunning(false)
          setCurrentExecutionId(null)
          ws.close()
        }
        // For Running/Queued, just update UI if needed
      }
      ws.onerror = (error) => {
        console.error('WebSocket error:', error)
        setOutput('WebSocket connection failed')
        setIsRunning(false)
        setCurrentExecutionId(null)
      }
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
      setIsRunning(false)
      setCurrentExecutionId(null)
    }
  }

  const handleStop = async () => {
    if (currentExecutionId) {
      try {
        await fetch(`http://localhost:3000/execution/cancel/${currentExecutionId}`, {
          method: 'POST',
        })
        setOutput('Execution cancelled')
      } catch (error) {
        console.error('Failed to cancel:', error)
      }
    }
    setIsRunning(false)
    setCurrentExecutionId(null)
  }

  const handleClear = () => {
    setPrompt("")
    setOutput("")
    setCurrentExecutionId(null)
  }

  if (isInitializing) {
    return (
      <div className="h-screen flex items-center justify-center bg-background grain-texture">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <h2 className="text-lg font-mono mb-2">Initializing Kekahyde</h2>
          <p className="text-sm text-muted-foreground font-mono">{initMessage}</p>
          <p className="text-xs text-muted-foreground mt-2">This may take a few minutes on first run while downloading the AI model.</p>
        </div>
      </div>
    )
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
