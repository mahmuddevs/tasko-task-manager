import { useEffect, useState } from "react"
import { FaChevronDown, FaTrash, FaCheck } from "react-icons/fa"
import taskIcon from "../../assets/images/task.png"
import calenderIcon from "../../assets/images/calendar.png"
import editIcon from "../../assets/images/edit.png"
import { Link, useNavigate, useParams } from "react-router"
import useAxios from "../../hooks/useAxios"
import { getStatusColor } from "../../components/TaskCard"
import DeleteModal from "../../components/DeleteModal"
import SuccessModal from "../../components/SuccessModal"
import AddTaskModal from "../../components/AddTaskModal"

type Task = {
  id: string
  category: string
  details: string
  endDate: string
  status: "Done" | "Pending" | "In Progress"
  points: number
}

const TaskDetails = () => {
  const [task, setTask] = useState<Task>()
  const [selectedStatus, setSelectedStatus] = useState<string>("Done")
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false)
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] =
    useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const { id } = useParams()
  const axiosBase = useAxios()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchTask = async () => {
      axiosBase
        .get(`/tasks/task/${id}`)
        .then((res) => {
          if (res.data.susccess === false) {
            throw new Response("Not Found", { status: 404 })
          }
          setTask(res.data.task)
        })
        .catch((err: any) => {
          alert(`Error: ${err.message}`)
        })
    }

    fetchTask()
  }, [])

  const statusOptions = [
    "All Task",
    "Ongoing",
    "Pending",
    "Collaboration task",
    "Done",
  ]

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status)
    setIsStatusDropdownOpen(false)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Task completed successfully")
      setShowSuccessModal(true)
    } catch (error) {
      console.error("Failed to complete task:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false)
  }

  const handleConfirmDelete = () => {
    axiosBase
      .delete(`/tasks/task/${id}`)
      .then((res) => {
        if (res.data.success) {
          alert("Task Deleted")
          setShowDeleteModal(false)
          navigate("/task-list")
        }
      })
      .catch((err: any) => {
        alert(`Error: ${err.message}`)
      })
  }

  const handleDeleteTask = () => {
    setShowDeleteModal(true)
  }

  const handleCancelDelete = () => {
    setShowDeleteModal(false)
  }

  return (
    <section className="min-h-[70vh] flex flex-col">
      <div className="mx-auto flex flex-col flex-1 w-full gap-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Task Details
          </h1>

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <span className="bg-purple-100 text-purple-600 px-3 py-1.5 rounded-md text-sm font-medium">
              {task?.points} Points
            </span>
            <button className="bg-[#FFAB00]/10 hover:bg-[#FFAB00]/20 px-6 py-3 rounded-md flex items-center space-x-2 transition-colors text-sm font-semibold cursor-pointer text-[#FFAB00]">
              <img src={editIcon} width="20px" alt="edit-icon" />
              <span>Edit Task</span>
            </button>
            <Link
              to="/task-list"
              className="bg-primary hover:bg-primary/70 px-6 py-3 rounded-md flex items-center space-x-2 transition-colors text-sm font-semibold cursor-pointer"
            >
              Back
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="border-t-[1px] border-[#E1E1E1] pt-8">
          {/* Task Header */}
          <div className="flex items-start space-x-4 mb-6">
            <div
              className={`w-16 h-16 bg-primary rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0`}
            >
              <img src={taskIcon} alt="task-icon" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                {task?.category}
              </h2>
              <p className="text-gray-600 leading-relaxed">{task?.details}</p>
            </div>
          </div>

          {/* End Date */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">End Date</h3>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-gray-600 pe-6">
                <img src={calenderIcon} alt="calenderIcon" />
                <span className="text-sm">{task?.endDate}</span>
              </div>
              <div
                className={`flex items-center gap-1 py-2 ps-8 border-s border-[#E1E1E1] ${getStatusColor(
                  task?.status || ""
                )}`}
              >
                <span>
                  <svg
                    width="14"
                    height="15"
                    viewBox="0 0 14 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="6.90592"
                      cy="7.49992"
                      r="6.90592"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-2xl font-semibold`}
                >
                  {task?.status}
                </span>
              </div>
            </div>
          </div>

          {/* Change Status */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Change Status
            </h3>
            <div className="relative">
              <button
                onClick={() => setIsStatusDropdownOpen(!isStatusDropdownOpen)}
                className="w-full sm:w-64 bg-white border border-gray-300 rounded-md px-4 py-2.5 text-left flex items-center justify-between hover:border-gray-400 transition-colors"
              >
                <span className="text-sm text-gray-700">{selectedStatus}</span>
                <FaChevronDown
                  className={`text-gray-400 transform transition-transform ${
                    isStatusDropdownOpen ? "rotate-180" : ""
                  }`}
                  size={12}
                />
              </button>

              {isStatusDropdownOpen && (
                <div className="absolute top-full left-0 right-0 sm:w-64 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                  {statusOptions.map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(status)}
                      className="w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors flex items-center justify-between first:rounded-t-md last:rounded-b-md"
                    >
                      <span className="text-gray-700">{status}</span>
                      {selectedStatus === status && (
                        <FaCheck className="text-primary" size={12} />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end self-end mt-auto">
          <button
            onClick={handleDeleteTask}
            className="bg-[#FF4C24]/30 hover:bg-[#FF4C24]/40 text-[#FF4C24] px-6 py-2.5 rounded-md flex items-center justify-center space-x-2 transition-colors font-medium cursor-pointer"
          >
            <FaTrash size={14} />
            <span>Delete Task</span>
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-primary hover:bg-primary/70 disabled:bg-primary/40 px-6 py-2.5 rounded-md flex items-center justify-center space-x-2 transition-colors font-medium cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Updating...</span>
              </>
            ) : (
              <span>Submit</span>
            )}
          </button>
        </div>
      </div>
      <DeleteModal
        isOpen={showDeleteModal}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccessModal}
        points={task?.points}
      />
    </section>
  )
}

export default TaskDetails
