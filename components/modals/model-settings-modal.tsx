"use client"

import type React from "react"

import { useState } from "react"
import { UIModal } from "@/components/ui-modal"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Brain, Sparkles, Zap } from "lucide-react"

interface ModelSettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ModelSettingsModal({ isOpen, onClose }: ModelSettingsModalProps) {
  const [temperature, setTemperature] = useState(0.7)
  const [maxTokens, setMaxTokens] = useState(2048)
  const [model, setModel] = useState("gpt-4o")
  const [enableCitations, setEnableCitations] = useState(true)
  const [enableKnowledgeCutoff, setEnableKnowledgeCutoff] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Saving model settings:", {
      model,
      temperature,
      maxTokens,
      enableCitations,
      enableKnowledgeCutoff,
    })
    onClose()
  }

  return (
    <UIModal
      title="AI Model Settings"
      description="Customize how the AI responds to your research queries"
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-6 pt-4">
        <div className="space-y-2">
          <Label htmlFor="model">AI Model</Label>
          <Select value={model} onValueChange={setModel}>
            <SelectTrigger id="model">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="gpt-4o">
                <div className="flex items-center">
                  <Brain className="h-4 w-4 mr-2 text-blue-500" />
                  <span>GPT-4o (Recommended)</span>
                </div>
              </SelectItem>
              <SelectItem value="gpt-4-turbo">
                <div className="flex items-center">
                  <Zap className="h-4 w-4 mr-2 text-yellow-500" />
                  <span>GPT-4 Turbo</span>
                </div>
              </SelectItem>
              <SelectItem value="claude-3-opus">
                <div className="flex items-center">
                  <Sparkles className="h-4 w-4 mr-2 text-purple-500" />
                  <span>Claude 3 Opus</span>
                </div>
              </SelectItem>
              <SelectItem value="med-specialized">
                <div className="flex items-center">
                  <Brain className="h-4 w-4 mr-2 text-green-500" />
                  <span>Medical Specialized</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label htmlFor="temperature">Temperature: {temperature.toFixed(1)}</Label>
            <span className="text-xs text-gray-500">
              {temperature < 0.4 ? "More focused" : temperature > 0.7 ? "More creative" : "Balanced"}
            </span>
          </div>
          <Slider
            id="temperature"
            min={0}
            max={1}
            step={0.1}
            value={[temperature]}
            onValueChange={(value) => setTemperature(value[0])}
          />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label htmlFor="max-tokens">Max Response Length: {maxTokens}</Label>
            <span className="text-xs text-gray-500">
              {maxTokens < 1000 ? "Concise" : maxTokens > 3000 ? "Detailed" : "Standard"}
            </span>
          </div>
          <Slider
            id="max-tokens"
            min={512}
            max={4096}
            step={512}
            value={[maxTokens]}
            onValueChange={(value) => setMaxTokens(value[0])}
          />
        </div>

        <div className="space-y-4">
          <Label>Advanced Settings</Label>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-medium">Enable Citations</div>
              <div className="text-xs text-gray-500">Include references to medical literature</div>
            </div>
            <Switch checked={enableCitations} onCheckedChange={setEnableCitations} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-medium">Knowledge Cutoff Override</div>
              <div className="text-xs text-gray-500">Allow access to more recent medical data</div>
            </div>
            <Switch checked={enableKnowledgeCutoff} onCheckedChange={setEnableKnowledgeCutoff} />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="bg-brand-600 hover:bg-brand-700">
            Save Settings
          </Button>
        </div>
      </form>
    </UIModal>
  )
}
