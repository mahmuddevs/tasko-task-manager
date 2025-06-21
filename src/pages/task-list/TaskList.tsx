import { useEffect, useState } from "react"
import { FaChevronDown } from "react-icons/fa"
import TaskCard from "../../components/TaskCard"
import noTaskBanner from "../../assets/images/notask.svg"
import useAxios from "../../hooks/useAxios"
import DeleteModal from "../../components/DeleteModal"
import AddTaskModal from "../../components/AddTaskModal"

type Task = {
  _id: string
  category: string
  details: string
  endDate: string
  points: number
  status: "Pending" | "In Progress" | "Done"
}

const TaskList = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    "Select Task Category"
  )
  const [selectedFilter, setSelectedFilter] = useState<string>("All Task")
  const [showAddTaskModal, setShowAddTaskModal] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)

  // Sample task data
  const [tasks, setTasks] = useState<Task[]>([])
  const [category, setCategory] = useState<string>("")
  const [deletId, setDeleteId] = useState<string>("")
  const [status, setStatus] = useState<string>("")
  const axiosBase = useAxios()

  useEffect(() => {
    const fetchTasks = () => {
      axiosBase
        .get(`/tasks/all-tasks?category=${category}&status=${status}`)
        .then((res) => {
          if (res.data.success === false) {
            alert("Something Went Wrong")
          }
          setTasks(res.data.tasks)
        })
        .catch((err: any) => {
          alert(`Error: ${err.message}`)
        })
    }

    fetchTasks()
  }, [])

  // const handleDeleteTask = (taskId: string) => {
  //
  // }

  const handleConfirmDelete = () => {
    axiosBase
      .delete(`/tasks/task/${deletId}`)
      .then((res) => {
        if (res.data.success) {
          alert("Task Deleted")
          setShowDeleteModal(false)
          setTasks((prevTasks) =>
            prevTasks.filter((task) => task._id !== deletId)
          )
        }
      })
      .catch((err: any) => {
        alert(`Error: ${err.message}`)
      })
  }

  const handleDeleteTask = (taskId: string) => {
    setDeleteId(taskId)
    setShowDeleteModal(true)
  }

  const handleCancelDelete = () => {
    setShowDeleteModal(false)
  }

  const handleAddTask = (data: any) => {
    axiosBase
      .post("/tasks/add", data)
      .then((res) => {
        if (res.data.success) {
          setTasks([...tasks, res.data.task])
          setShowAddTaskModal(false)
          alert("Task Added Successfully")
        }
      })
      .catch((err: any) => {
        alert(`Error: ${err.message}`)
      })
  }

  return (
    <div className="mx-auto">
      <div>
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
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full md:min-w-[180px]"
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
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent w-full md:min-w-[180px]"
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
              onClick={() => {
                setShowAddTaskModal(true)
              }}
              className="bg-primary hover:bg-primary/70 font-semibold px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors whitespace-nowrap"
            >
              <svg
                width="18"
                height="20"
                viewBox="0 0 18 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.236 0.761963H4.584C2.525 0.761963 0.75 2.43096 0.75 4.49096V15.34C0.75 17.516 2.408 19.115 4.584 19.115H12.572C14.632 19.115 16.302 17.4 16.302 15.34V6.03796L11.236 0.761963Z"
                  stroke="#1F1F1F"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.9766 0.750244V3.65924C10.9766 5.07924 12.1256 6.23124 13.5456 6.23424C14.8616 6.23724 16.2086 6.23824 16.2996 6.23224"
                  stroke="#1F1F1F"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.7994 10.9141H5.89844"
                  stroke="#1F1F1F"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.34375 13.3654V8.46436"
                  stroke="#1F1F1F"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <span>Add New Task</span>
            </button>
          </div>
        </div>

        {/* Task Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <TaskCard key={task?._id} {...task} onDelete={handleDeleteTask} />
          ))}
        </div>
      </div>

      {/* Empty State */}
      {tasks.length === 0 && (
        <div className="text-center mt-8 py-12 flex justify-center items-center flex-col gap-8">
          <img src={noTaskBanner} alt="no-task" />
          <p className="font-semibold">
            No Task is Available yet, Please Add your New Task
          </p>
        </div>
      )}
      <DeleteModal
        isOpen={showDeleteModal}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
      <AddTaskModal
        isOpen={showAddTaskModal}
        onClose={() => setShowAddTaskModal(false)}
        onSubmit={handleAddTask}
      />
    </div>
  )
}

export default TaskList
