import React from "react"
import { TbPointFilled } from "react-icons/tb"
import calanderIcon from "../assets/images/calendar.png"
import trashIcon from "../assets/images/trash.png"

export type Task = {
  id: string
  title: string
  description: string
  date: string
  status: "Pending" | "In Progress" | "Done"
  initials: string
  color: string
}

type TaskCardProps = {
  task: Task
  onDelete: (id: string) => void
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete }) => {
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Pending":
        return "text-purple-600 border-purple-200"
      case "In Progress":
        return "text-orange-600 border-orange-200"
      case "Done":
        return "text-primary/70 border-primary/70"
      default:
        return "text-gray-600 border-gray-200"
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
      {/* Header with icon and delete button */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div
            className={`w-10 h-10 ${task.color} rounded-full flex items-center justify-center text-white font-semibold text-sm`}
          >
            {task.initials}
          </div>
          <h3 className="font-semibold text-gray-900 text-lg">{task.title}</h3>
        </div>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-400 hover:text-red-600 transition-colors p-1 cursor-pointer"
          aria-label="Delete task"
        >
          <img src={trashIcon} alt="trashIcon" />
        </button>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
        {task.description}
      </p>

      {/* Footer with date and status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-gray-500">
          <img src={calanderIcon} alt="calanderIcon" />
          <span className="text-xs">{task.date}</span>
        </div>
        <div
          className={`${getStatusColor(task.status)} flex items-center gap-1`}
        >
          <TbPointFilled />
          <span className={`pe-3 py-1 rounded-full text-xs font-medium `}>
            {task.status}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TaskCard
