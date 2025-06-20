import { useState } from "react"
import { FaPlus, FaChevronDown } from "react-icons/fa"
import TaskCard from "../../components/TaskCard"
import type { Task } from "../../components/TaskCard"

const TaskList = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    "Select Task Category"
  )
  const [selectedFilter, setSelectedFilter] = useState<string>("All Task")

  // Sample task data
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Art and Craft",
      description:
        "Select the role that you want to candidates for and upload your job description.",
      date: "Friday, April 19 - 2024",
      status: "Pending",
      initials: "AC",
      color: "bg-green-500",
    },
    {
      id: "2",
      title: "Art and Craft",
      description:
        "Select the role that you want to candidates for and upload your job description.",
      date: "Friday, April 19 - 2024",
      status: "In Progress",
      initials: "AC",
      color: "bg-green-500",
    },
    {
      id: "3",
      title: "Art and Craft",
      description:
        "Select the role that you want to candidates for and upload your job description.",
      date: "Friday, April 19 - 2024",
      status: "Done",
      initials: "AC",
      color: "bg-green-500",
    },
    {
      id: "4",
      title: "Art and Craft",
      description:
        "Select the role that you want to candidates for and upload your job description.",
      date: "Friday, April 19 - 2024",
      status: "In Progress",
      initials: "AC",
      color: "bg-green-500",
    },
    {
      id: "5",
      title: "Art and Craft",
      description:
        "Select the role that you want to candidates for and upload your job description.",
      date: "Friday, April 18 - 2024",
      status: "Done",
      initials: "AC",
      color: "bg-orange-500",
    },
    {
      id: "6",
      title: "Art and Craft",
      description:
        "Select the role that you want to candidates for and upload your job description.",
      date: "Friday, April 19 - 2024",
      status: "Pending",
      initials: "AC",
      color: "bg-green-500",
    },
    {
      id: "7",
      title: "Art and Craft",
      description:
        "Select the role that you want to candidates for and upload your job description.",
      date: "Friday, April 19 - 2024",
      status: "Pending",
      initials: "AC",
      color: "bg-green-500",
    },
  ])

  const handleDeleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId))
  }

  const handleAddNewTask = () => {
    console.log("Add new task clicked")
    // Add your logic here for adding new tasks
  }

  return (
    <div className=" mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          All Task List
        </h1>

        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          {/* Category Dropdown */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-full md:min-w-[180px]"
            >
              <option>Select Task Category</option>
              <option>Art and Craft</option>
              <option>Technology</option>
              <option>Business</option>
              <option>Education</option>
            </select>
            <FaChevronDown
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              size={12}
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-full md:min-w-[180px]"
            >
              <option>All Task</option>
              <option>Pending</option>
              <option>In Progress</option>
              <option>Done</option>
            </select>
            <FaChevronDown
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              size={12}
            />
          </div>

          {/* Add New Task Button */}
          <button
            onClick={handleAddNewTask}
            className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors whitespace-nowrap"
          >
            <FaPlus size={14} />
            <span>Add New Task</span>
          </button>
        </div>
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onDelete={handleDeleteTask} />
        ))}
      </div>

      {/* Empty State */}
      {tasks.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <FaPlus size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No tasks found
          </h3>
          <p className="text-gray-600 mb-4">
            Get started by creating your first task.
          </p>
          <button
            onClick={handleAddNewTask}
            className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-3 rounded-lg inline-flex items-center space-x-2 transition-colors"
          >
            <FaPlus size={14} />
            <span>Add New Task</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default TaskList
