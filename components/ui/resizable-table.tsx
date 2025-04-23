"use client"

import * as React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TruncatedCell } from "@/components/ui/truncated-cell"
import { GripVertical } from "lucide-react"

interface Column {
  key: string
  label: string
  minWidth?: number
  defaultWidth?: number
  align?: "left" | "right" | "center"
  render?: (row: any) => React.ReactNode
}

interface ResizableTableProps {
  columns: Column[]
  data: any[]
  columnWidths: number[]
  onWidthsChange: (widths: number[]) => void
}

export function ResizableTable({ columns, data, columnWidths, onWidthsChange }: ResizableTableProps) {
  const startX = React.useRef(0)
  const startWidths = React.useRef<number[]>([])
  const resizingCol = React.useRef<number | null>(null)

  const onMouseDown = (e: React.MouseEvent, colIdx: number) => {
    startX.current = e.clientX
    startWidths.current = [...columnWidths]
    resizingCol.current = colIdx
    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseup", onMouseUp)
  }

  const onMouseMove = (e: MouseEvent) => {
    if (resizingCol.current === null) return
    const delta = e.clientX - startX.current
    const min = columns[resizingCol.current!].minWidth || 60
    const next = [...columnWidths]
    next[resizingCol.current!] = Math.max(min, startWidths.current[resizingCol.current!] + delta)
    onWidthsChange(next)
  }

  const onMouseUp = () => {
    resizingCol.current = null
    document.removeEventListener("mousemove", onMouseMove)
    document.removeEventListener("mouseup", onMouseUp)
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col, i) => (
              <TableHead
                key={col.key}
                style={{ width: columnWidths[i], minWidth: col.minWidth || 60, position: "relative" }}
                className={col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"}
              >
                <div className="flex items-center justify-between select-none">
                  <span>{col.label}</span>
                  {i !== columns.length - 1 && (
                    <span
                      onMouseDown={(e) => onMouseDown(e, i)}
                      className="ml-2 cursor-col-resize w-4 h-5 flex items-center justify-center hover:bg-gray-200 rounded"
                      style={{ userSelect: "none" }}
                    >
                      <GripVertical className="w-3 h-3 text-gray-400" />
                    </span>
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIdx) => (
            <TableRow key={row.id || rowIdx}>
              {columns.map((col, i) => (
                <TableCell
                  key={col.key}
                  style={{ width: columnWidths[i], minWidth: col.minWidth || 60 }}
                  className={col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"}
                >
                  <TruncatedCell widthClass={"w-full"}>
                    {col.render ? col.render(row) : row[col.key]}
                  </TruncatedCell>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
