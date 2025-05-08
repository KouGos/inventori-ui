"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AddProductModal } from "@/components/modals/add-product-modal"

// Material UI Icons
import AddIcon from "@mui/icons-material/Add"

export function AddProductButton() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Button onClick={() => setShowModal(true)} className="bg-[#500001] hover:bg-[#700001]">
        <AddIcon fontSize="small" className="mr-1" /> Add Product
      </Button>

      {showModal && (
        <AddProductModal
          onClose={() => setShowModal(false)}
          onSuccess={() => {
            setShowModal(false)
            // Optionally refresh data after adding a product
            window.location.reload()
          }}
        />
      )}
    </>
  )
}
