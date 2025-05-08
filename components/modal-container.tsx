"use client"

import { NewChatModal } from "./modals/new-chat-modal"
import { UploadPaperModal } from "./modals/upload-paper-modal"
import { ShareResearchModal } from "./modals/share-research-modal"
import { ExportNotesModal } from "./modals/export-notes-modal"
import { ModelSettingsModal } from "./modals/model-settings-modal"

type ModalType = "new-chat" | "upload-paper" | "share-research" | "export-notes" | "model-settings"

interface ModalContainerProps {
  activeModal: ModalType | null
  closeModal: () => void
}

export function ModalContainer({ activeModal, closeModal }: ModalContainerProps) {
  return (
    <>
      {activeModal === "new-chat" && <NewChatModal open={true} onClose={closeModal} />}
      {activeModal === "upload-paper" && <UploadPaperModal open={true} onClose={closeModal} />}
      {activeModal === "share-research" && <ShareResearchModal open={true} onClose={closeModal} />}
      {activeModal === "export-notes" && <ExportNotesModal open={true} onClose={closeModal} />}
      {activeModal === "model-settings" && <ModelSettingsModal open={true} onClose={closeModal} />}
    </>
  )
}
