import React from "react"
import { TbPointFilled } from "react-icons/tb"
import calanderIcon from "../assets/images/calendar.png"
import trashIcon from "../assets/images/trash.png"
import taskIcon from "../assets/images/task.png"
import { Link } from "react-router"
import moment from "moment"

type TaskCardProps = {
  _id: string
  category: string
  details: string
  endDate: string
  points: number
  status: "Pending" | "In Progress" | "Done"
  onDelete: (id: string) => void
}

export const getStatusColor = (status: string): string => {
  switch (status) {
    case "Ongoing":
      return "text-orange-600 border-purple-200"
    case "In Progress":
      return "text-purple-600 border-orange-200"
    case "Done":
      return "text-primary/70 border-primary/70"
    default:
      return "text-gray-600 border-gray-200"
  }
}

const TaskCard = ({
  _id,
  category,
  details,
  endDate,
  status,
  onDelete,
}: TaskCardProps) => {
  return (
    <Link to={`/task-list/${_id}`}>
      <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
        {/* Header with icon and delete button */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm bg-primary`}
            >
              <img src={taskIcon} alt="task-icon" />
            </div>
            <h3 className="font-semibold text-gray-900 text-lg">{category}</h3>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              onDelete(_id)
            }}
            className="text-red-400 hover:text-red-600 transition-colors p-1 cursor-pointer relative z-40"
            aria-label="Delete task"
          >
            <img src={trashIcon} alt="trashIcon" />
          </button>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 leading-relaxed md:me-20">
          {details}
        </p>

        {/* Footer with date and status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-gray-500">
            <img src={calanderIcon} alt="calanderIcon" />
            <span className="text-xs">
              {moment(endDate).format("dddd, MMMM D - YYYY")}
            </span>
          </div>
          <div className={`${getStatusColor(status)} flex items-center gap-1`}>
            <TbPointFilled />
            <span className={`pe-3 py-1 rounded-full text-xs font-medium `}>
              {status}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default TaskCard
