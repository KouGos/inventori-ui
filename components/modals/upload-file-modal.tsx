"use client"

import type React from "react"

import { useState } from "react"
import { UIModal } from "@/components/ui-modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { UploadIcon as FileUpload, Upload } from "lucide-react"
import { getSupabaseClient } from "@/lib/supabase"

interface UploadFileModalProps {
  isOpen: boolean
  onClose: () => void
}

export function UploadFileModal({ isOpen, onClose }: UploadFileModalProps) {
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    filename: "",
    category: "Reports",
    tags: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      setFormData((prev) => ({ ...prev, filename: selectedFile.name }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setLoading(true)

    try {
      const supabase = getSupabaseClient()

      // Upload file to Supabase Storage
      const fileExt = file.name.split(".").pop()
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
      const filePath = `uploads/${fileName}`

      const { error: uploadError } = await supabase.storage.from("files").upload(filePath, file)

      if (uploadError) throw uploadError

      // Get the public URL
      const { data: urlData } = supabase.storage.from("files").getPublicUrl(filePath)

      // Save file metadata to database
      // This would require a 'files' table in your database
      // For now, we'll just close the modal

      onClose()
      // You could add a toast notification here
    } catch (error) {
      console.error("Error uploading file:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <UIModal title="Upload File" description="Upload a new file to the system" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
          <FileUpload className="h-10 w-10 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500 mb-2">Drag and drop your file here, or click to browse</p>
          <Input id="file" type="file" className="hidden" onChange={handleFileChange} />
          <Button type="button" variant="outline" onClick={() => document.getElementById("file")?.click()}>
            <Upload className="h-4 w-4 mr-2" /> Browse Files
          </Button>
          {file && (
            <div className="mt-4 text-sm">
              <span className="font-medium">Selected file:</span> {file.name} ({(file.size / 1024).toFixed(2)} KB)
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="filename">File Name</Label>
            <Input
              id="filename"
              name="filename"
              placeholder="inventory_report_q1_2024.pdf"
              value={formData.filename}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Reports">Reports</SelectItem>
                <SelectItem value="Contracts">Contracts</SelectItem>
                <SelectItem value="Diagrams">Diagrams</SelectItem>
                <SelectItem value="Schedules">Schedules</SelectItem>
                <SelectItem value="Training">Training</SelectItem>
                <SelectItem value="Images">Images</SelectItem>
                <SelectItem value="Procedures">Procedures</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 col-span-2">
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Textarea
              id="tags"
              name="tags"
              placeholder="inventory, quarterly, 2024"
              value={formData.tags}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading || !file}>
            {loading ? "Uploading..." : "Upload File"}
          </Button>
        </div>
      </form>
    </UIModal>
  )
}
