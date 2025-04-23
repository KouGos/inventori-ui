"use client"

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import * as React from "react"

interface TruncatedCellProps {
  children: React.ReactNode
  widthClass?: string // e.g. w-32, w-40
}

export function TruncatedCell({ children, widthClass = "w-40" }: TruncatedCellProps) {
  const [open, setOpen] = React.useState(false)
  const text = typeof children === "string" ? children : (children as any)?.toString?.() ?? ""

  return (
    <Tooltip open={open} onOpenChange={setOpen} delayDuration={0}>
      <TooltipTrigger asChild>
        <div
          className={`truncate whitespace-nowrap overflow-hidden cursor-pointer ${widthClass}`}
          tabIndex={0}
          onClick={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onKeyDown={e => { if (e.key === "Enter" || e.key === " ") setOpen(true) }}
          title={text}
        >
          {children}
        </div>
      </TooltipTrigger>
      <TooltipContent side="top" align="center" className="max-w-xs break-words">
        {text}
      </TooltipContent>
    </Tooltip>
  )
}
