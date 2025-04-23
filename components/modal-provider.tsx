"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type ModalType =
  | "add-product"
  | "add-supplier"
  | "add-warehouse"
  | "add-purchase-order"
  | "upload-file"
  | "add-transfer"
  | "add-stock-alert"
  | null

interface ModalContextType {
  modalType: ModalType
  openModal: (type: ModalType) => void
  closeModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modalType, setModalType] = useState<ModalType>(null)

  const openModal = (type: ModalType) => {
    console.log("Opening modal:", type)
    setModalType(type)
  }

  const closeModal = () => {
    console.log("Closing modal")
    setModalType(null)
  }

  return <ModalContext.Provider value={{ modalType, openModal, closeModal }}>{children}</ModalContext.Provider>
}

export function useModal() {
  const context = useContext(ModalContext)
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider")
  }
  return context
}
