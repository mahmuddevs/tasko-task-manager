import { useEffect } from "react"
import { createPortal } from "react-dom"
import { useForm, type SubmitHandler } from "react-hook-form"

type Task = {
  category: string
  details: string
  status: string
  points: number
  endDate: string
}

type EditTaskModalProps = {
  isOpen: boolean
  onClose: () => void
  onSubmit: (task: Task) => void
  initialData: Task | null
}

const EditTaskModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: EditTaskModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Task>()

  useEffect(() => {
    if (isOpen && initialData) {
      reset({
        ...initialData,
        endDate: new Date(initialData.endDate).toISOString().split("T")[0],
      })
    }
  }, [isOpen, initialData, reset])

  const onFormSubmit: SubmitHandler<Task> = (data) => {
    onSubmit(data)
  }

  if (!isOpen || !initialData) return null

  return createPortal(
    <div className="fixed inset-0 bg-black/50 bg-opacity-40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Edit Task</h2>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              {...register("category", { required: "Category is required" })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Select category</option>
              <option value="Friends">Friends</option>
              <option value="Arts and Craft">Arts and Craft</option>
              <option value="Nature">Nature</option>
              <option value="Family">Family</option>
              <option value="Sport">Sport</option>
              <option value="Meditation">Meditation</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>

          {/* Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Details
            </label>
            <textarea
              {...register("details", { required: "Details are required" })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              rows={3}
            />
            {errors.details && (
              <p className="text-red-500 text-sm">{errors.details.message}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              {...register("status", { required: "Status is required" })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Select status</option>
              <option value="In Progress">In Progress</option>
              <option value="Pending">Pending</option>
              <option value="Done">Done</option>
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status.message}</p>
            )}
          </div>

          {/* Points */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Points
            </label>
            <input
              type="number"
              {...register("points", {
                required: "Points are required",
                min: { value: 0, message: "Points must be positive" },
              })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {errors.points && (
              <p className="text-red-500 text-sm">{errors.points.message}</p>
            )}
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <input
              type="date"
              {...register("endDate", { required: "End date is required" })}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
            {errors.endDate && (
              <p className="text-red-500 text-sm">{errors.endDate.message}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 font-semibold rounded-md cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary font-semibold rounded-md hover:bg-primary/70 cursor-pointer"
            >
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  )
}

export default EditTaskModal
