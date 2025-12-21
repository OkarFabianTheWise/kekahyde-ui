"use client"

import { useEffect, useState } from "react"

export function FloatingBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Floating abstract elements */}
      <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float-slow" />
      <div className="absolute top-[20%] right-[10%] w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float-slow-delay" />
      <div className="absolute bottom-[15%] left-[15%] w-80 h-80 bg-chart-2/5 rounded-full blur-3xl animate-float-medium" />
      <div className="absolute bottom-[25%] right-[5%] w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float-medium-delay" />

      {/* Network lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.75 0.18 165)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="oklch(0.68 0.19 190)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line
          x1="10%"
          y1="20%"
          x2="90%"
          y2="30%"
          stroke="url(#line-gradient)"
          strokeWidth="1"
          className="animate-pulse"
        />
        <line
          x1="20%"
          y1="60%"
          x2="80%"
          y2="70%"
          stroke="url(#line-gradient)"
          strokeWidth="1"
          className="animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <line
          x1="5%"
          y1="80%"
          x2="95%"
          y2="85%"
          stroke="url(#line-gradient)"
          strokeWidth="1"
          className="animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </svg>

      {/* Encrypted symbols */}
      <div className="absolute top-[30%] left-[20%] text-primary/10 text-6xl font-mono animate-float-slow">{"{ }"}</div>
      <div className="absolute top-[60%] right-[25%] text-accent/10 text-5xl font-mono animate-float-medium">
        {"</>"}
      </div>
      <div className="absolute bottom-[40%] left-[60%] text-chart-2/10 text-7xl font-mono animate-float-slow-delay">
        {"#"}
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }
        
        @keyframes float-slow-delay {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-25px, 25px) scale(0.95); }
          66% { transform: translate(35px, -15px) scale(1.05); }
        }
        
        @keyframes float-medium {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -40px) scale(1.03); }
        }
        
        @keyframes float-medium-delay {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-30px, 30px) scale(0.97); }
        }
        
        .animate-float-slow {
          animation: float-slow 20s ease-in-out infinite;
        }
        
        .animate-float-slow-delay {
          animation: float-slow-delay 25s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float-medium 15s ease-in-out infinite;
        }
        
        .animate-float-medium-delay {
          animation: float-medium-delay 18s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
