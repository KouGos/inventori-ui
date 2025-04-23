"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"

export function AddSupplierButton() {
  const router = useRouter()

  const handleClick = () => {
    router.push("/suppliers/add")
  }

  return (
    <Button
      className="bg-black hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200"
      onClick={handleClick}
    >
      <Plus className="mr-2 h-4 w-4" /> Add Supplier
    </Button>
  )
}
