import { useEffect } from "react"
import { FaTimes } from "react-icons/fa"
import successBanner from "../assets/images/success.png"
import { createPortal } from "react-dom"

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  points?: number
}

const SuccessModal = ({ isOpen, onClose, points }: SuccessModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-[9999]">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
          aria-label="Close modal"
        >
          <FaTimes size={20} />
        </button>

        <div className="p-8 text-center relative">
          {/* Decorative Elements */}
          <img src={successBanner} alt="successBanner" />

          {/* Main Content */}
          <div className="relative z-10">
            {/* Success Message */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4">
                Successfully Completed the Task!
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Congratulations! you have successfully completed the task and
                you got {points} points.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default SuccessModal
