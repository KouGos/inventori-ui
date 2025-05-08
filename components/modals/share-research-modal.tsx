"use client"

import type React from "react"

import { useState } from "react"
import { UIModal } from "@/components/ui-modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Copy } from "lucide-react"

interface ShareResearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ShareResearchModal({ isOpen, onClose }: ShareResearchModalProps) {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [allowEditing, setAllowEditing] = useState(false)
  const [includeHistory, setIncludeHistory] = useState(true)

  const shareLink = "https://medassist.ai/share/r3s34rch1d"

  const copyLink = () => {
    navigator.clipboard.writeText(shareLink)
    // You would add a toast notification here in a real app
    console.log("Link copied to clipboard")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Sharing research with:", email, "Message:", message, "Settings:", { allowEditing, includeHistory })
    onClose()
  }

  return (
    <UIModal
      title="Share Research"
      description="Share your research findings with colleagues"
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-6 pt-4">
        <div className="space-y-2">
          <Label htmlFor="share-link">Share Link</Label>
          <div className="flex">
            <Input id="share-link" value={shareLink} readOnly className="rounded-r-none" />
            <Button type="button" onClick={copyLink} className="rounded-l-none" variant="outline">
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Invite</Label>
          <Input
            id="email"
            type="email"
            placeholder="colleague@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Message (Optional)</Label>
          <Textarea
            id="message"
            placeholder="Add a personal message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[80px]"
          />
        </div>

        <div className="space-y-4">
          <Label>Sharing Options</Label>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-medium">Allow Editing</div>
              <div className="text-xs text-gray-500">Recipients can make changes to the research</div>
            </div>
            <Switch checked={allowEditing} onCheckedChange={setAllowEditing} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-medium">Include Chat History</div>
              <div className="text-xs text-gray-500">Share the full conversation history</div>
            </div>
            <Switch checked={includeHistory} onCheckedChange={setIncludeHistory} />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="bg-brand-600 hover:bg-brand-700">
            Share
          </Button>
        </div>
      </form>
    </UIModal>
  )
}
