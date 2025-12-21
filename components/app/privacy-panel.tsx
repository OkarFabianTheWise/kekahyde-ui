"use client"

import { Switch } from "@/components/ui/switch"
import { ShieldCheck } from "lucide-react"

interface Permissions {
  decentralizedCompute: boolean
  anonymousContribution: boolean
  modelDownloads: boolean
  telemetry: boolean
}

interface PrivacyPanelProps {
  permissions: Permissions
  onPermissionsChange: (permissions: Permissions) => void
}

export function PrivacyPanel({ permissions, onPermissionsChange }: PrivacyPanelProps) {
  const togglePermission = (key: keyof Permissions) => {
    onPermissionsChange({
      ...permissions,
      [key]: !permissions[key],
    })
  }

  return (
    <div className="p-4 overflow-auto">
      <div className="flex items-center gap-2 mb-4">
        <ShieldCheck className="w-4 h-4 text-primary" />
        <h2 className="text-sm font-mono uppercase tracking-wider text-foreground">Privacy & Permissions</h2>
      </div>

      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="text-sm font-medium text-foreground mb-1">Decentralized Compute</div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Allow borrowing compute from the network when local resources are insufficient.
            </p>
          </div>
          <Switch
            checked={permissions.decentralizedCompute}
            onCheckedChange={() => togglePermission("decentralizedCompute")}
          />
        </div>

        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="text-sm font-medium text-foreground mb-1">Anonymous Contribution</div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Share idle compute with others anonymously. No data is ever stored.
            </p>
          </div>
          <Switch
            checked={permissions.anonymousContribution}
            onCheckedChange={() => togglePermission("anonymousContribution")}
          />
        </div>

        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="text-sm font-medium text-foreground mb-1">Model Downloads</div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Allow automatic downloads of AI models from verified sources.
            </p>
          </div>
          <Switch checked={permissions.modelDownloads} onCheckedChange={() => togglePermission("modelDownloads")} />
        </div>

        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="text-sm font-medium text-foreground mb-1">Telemetry</div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Send anonymous usage statistics to improve the software.
            </p>
          </div>
          <Switch checked={permissions.telemetry} onCheckedChange={() => togglePermission("telemetry")} />
        </div>
      </div>

      <div className="mt-6 p-3 bg-primary/10 border border-primary rounded">
        <div className="flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-primary mt-0.5" />
          <p className="text-xs text-foreground leading-relaxed">
            <strong>Your prompts never leave this device.</strong> All AI processing happens locally first.
          </p>
        </div>
      </div>
    </div>
  )
}
