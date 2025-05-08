"use client"

import type React from "react"

import { useState } from "react"
import { UIModal } from "@/components/ui-modal"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { FileText, Download, FileJson, FileSpreadsheet } from "lucide-react"

interface ExportNotesModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ExportNotesModal({ isOpen, onClose }: ExportNotesModalProps) {
  const [format, setFormat] = useState("pdf")
  const [includeMetadata, setIncludeMetadata] = useState(true)
  const [includeCitations, setIncludeCitations] = useState(true)
  const [includeImages, setIncludeImages] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Exporting notes in format:", format, "with options:", {
      includeMetadata,
      includeCitations,
      includeImages,
    })
    onClose()
  }

  return (
    <UIModal
      title="Export Research Notes"
      description="Download your research notes in various formats"
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-6 pt-4">
        <div className="space-y-3">
          <Label>Export Format</Label>
          <RadioGroup value={format} onValueChange={setFormat} className="grid grid-cols-2 gap-3">
            <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="pdf" id="pdf" className="sr-only" />
              <Label htmlFor="pdf" className="flex flex-1 items-center cursor-pointer">
                <FileText className="h-5 w-5 text-red-500 mr-2" />
                <div className="font-medium">PDF</div>
              </Label>
            </div>

            <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="docx" id="docx" className="sr-only" />
              <Label htmlFor="docx" className="flex flex-1 items-center cursor-pointer">
                <FileText className="h-5 w-5 text-blue-500 mr-2" />
                <div className="font-medium">Word (DOCX)</div>
              </Label>
            </div>

            <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="json" id="json" className="sr-only" />
              <Label htmlFor="json" className="flex flex-1 items-center cursor-pointer">
                <FileJson className="h-5 w-5 text-yellow-500 mr-2" />
                <div className="font-medium">JSON</div>
              </Label>
            </div>

            <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-gray-50">
              <RadioGroupItem value="csv" id="csv" className="sr-only" />
              <Label htmlFor="csv" className="flex flex-1 items-center cursor-pointer">
                <FileSpreadsheet className="h-5 w-5 text-green-500 mr-2" />
                <div className="font-medium">CSV</div>
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-3">
          <Label>Export Options</Label>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="include-metadata"
                checked={includeMetadata}
                onCheckedChange={(checked) => setIncludeMetadata(checked as boolean)}
              />
              <Label htmlFor="include-metadata" className="text-sm font-normal cursor-pointer">
                Include metadata (date, author, tags)
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="include-citations"
                checked={includeCitations}
                onCheckedChange={(checked) => setIncludeCitations(checked as boolean)}
              />
              <Label htmlFor="include-citations" className="text-sm font-normal cursor-pointer">
                Include citations and references
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="include-images"
                checked={includeImages}
                onCheckedChange={(checked) => setIncludeImages(checked as boolean)}
              />
              <Label htmlFor="include-images" className="text-sm font-normal cursor-pointer">
                Include images and diagrams
              </Label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" className="bg-brand-600 hover:bg-brand-700">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </form>
    </UIModal>
  )
}
