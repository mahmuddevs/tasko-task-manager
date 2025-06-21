import { createPortal } from "react-dom"
import deleteBanner from "../assets/images/delete.svg"

type DeleteModalProps = {
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
}

const DeleteModal = ({ isOpen, onConfirm, onCancel }: DeleteModalProps) => {
  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto">
        <div className="p-6 sm:p-8 text-center">
          <img src={deleteBanner} alt="deleteBanner" />

          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              Are you Sure!!
            </h2>
            <p className="text-[#737791] text-sm sm:text-base">
              Do you want to delete this task on this app?
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onConfirm}
              className="flex-1 bg-primary hover:bg-primary/70 font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer"
            >
              Yes
            </button>
            <button
              onClick={onCancel}
              className="flex-1 bg-[#FF4C24]/15 hover:bg-[#FF4C24]/30 text-[#FF4C24] font-medium py-3 px-6 rounded-lg transition-colors border border-[#FF4C24]/15 cursor-pointer"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default DeleteModal
