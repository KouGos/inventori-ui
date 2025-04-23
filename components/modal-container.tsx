"use client"

import { useModal } from "@/components/modal-provider"
import { AddProductModal } from "@/components/modals/add-product-modal"
import { AddSupplierModal } from "@/components/modals/add-supplier-modal"
import { AddWarehouseModal } from "@/components/modals/add-warehouse-modal"
import { AddPurchaseOrderModal } from "@/components/modals/add-purchase-order-modal"
import { UploadFileModal } from "@/components/modals/upload-file-modal"
import { AddTransferModal } from "@/components/modals/add-transfer-modal"
import { AddStockAlertModal } from "@/components/modals/add-stock-alert-modal"

export function ModalContainer() {
  const { modalType, closeModal } = useModal()

  return (
    <>
      {modalType === "add-product" && <AddProductModal isOpen={true} onClose={closeModal} />}
      {modalType === "add-supplier" && <AddSupplierModal isOpen={true} onClose={closeModal} />}
      {modalType === "add-warehouse" && <AddWarehouseModal isOpen={true} onClose={closeModal} />}
      {modalType === "add-purchase-order" && <AddPurchaseOrderModal isOpen={true} onClose={closeModal} />}
      {modalType === "upload-file" && <UploadFileModal isOpen={true} onClose={closeModal} />}
      {modalType === "add-transfer" && <AddTransferModal isOpen={true} onClose={closeModal} />}
      {modalType === "add-stock-alert" && <AddStockAlertModal isOpen={true} onClose={closeModal} />}
    </>
  )
}
