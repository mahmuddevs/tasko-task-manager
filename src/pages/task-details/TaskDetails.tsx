import React, { useState } from "react"
import {
  FaCalendarAlt,
  FaChevronDown,
  FaEdit,
  FaArrowLeft,
  FaTrash,
  FaCheck,
} from "react-icons/fa"

interface Task {
  id: string
  title: string
  description: string
  endDate: string
  status:
    | "Done"
    | "All Task"
    | "Ongoing"
    | "Pending"
    | "Collaboration task"
    | "In Progress"
  points: number
  initials: string
  color: string
}

const TaskDetails: React.FC = () => {
  const [task, setTask] = useState<Task>({
    id: "1",
    title: "Art and Craft",
    description:
      "Select the role that you want to candidates for and upload your job description. Select the role that you want to candidates for and upload your job description. Select the role that you want to candidates for and upload your job description.",
    endDate: "Friday, April 19 - 2024",
    status: "In Progress",
    points: 20,
    initials: "AC",
    color: "bg-primary",
  })

  const [selectedStatus, setSelectedStatus] = useState<string>("Done")
  const [isStatusDropdownOpen, setIsStatusDropdownOpen] =
    useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const statusOptions = [
    "All Task",
    "Ongoing",
    "Pending",
    "Collaboration task",
    "Done",
  ]

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "In Progress":
        return "bg-orange-100 text-orange-600 border-orange-200"
      default:
        return "bg-orange-100 text-orange-600 border-orange-200"
    }
  }

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status)
    setIsStatusDropdownOpen(false)
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Task updated")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteTask = () => {
    console.log("Delete task")
  }

  const handleBack = () => {
    console.log("Navigate back")
  }

  const handleEditTask = () => {
    console.log("Edit task")
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
              {task.points} Points
            </span>
            <button
              onClick={handleEditTask}
              className="bg-yellow-500 hover:bg-yellow-600 px-4 py-1.5 rounded-md flex items-center space-x-2 transition-colors text-sm font-medium"
            >
              <FaEdit size={12} />
              <span>Edit Task</span>
            </button>
            <button
              onClick={handleBack}
              className="bg-primary hover:bg-primary/70 px-4 py-1.5 rounded-md flex items-center space-x-2 transition-colors text-sm font-medium"
            >
              <FaArrowLeft size={12} />
              <span>Back</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="border-t-[1px] border-[#E1E1E1] pt-8">
          {/* Task Header */}
          <div className="flex items-start space-x-4 mb-6">
            <div
              className={`w-16 h-16 ${task.color} rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0`}
            >
              {task.initials}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                {task.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {task.description}
              </p>
            </div>
          </div>

          {/* End Date */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">End Date</h3>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-gray-600">
                <FaCalendarAlt size={14} />
                <span className="text-sm">{task.endDate}</span>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                  task.status
                )}`}
              >
                {task.status}
              </span>
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
        <div className="flex flex-col sm:flex-row gap-3 justify-end self-end mt-6 mt-auto">
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
    </section>
  )
}

export default TaskDetails
