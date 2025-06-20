import { createBrowserRouter, Navigate } from "react-router"
import App from "../layouts/App"
import Spin from "../pages/spin/Spin"
import Error from "../pages/error/Error"
import Auth from "../layouts/Auth"
import Login from "../pages/login/Login"
import SignUp from "../pages/sign-up/Signup"
import TaskList from "../pages/task-list/TaskList"
import ResetPassword from "../pages/reset-password/ResetPassword"
import TaskDetails from "../pages/task-details/TaskDetails"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Spin />,
      },
      {
        path: "/task-list",
        element: <TaskList />,
      },
      {
        path: "/task-list/:id",
        element: <TaskDetails />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" replace />,
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/signup",
        element: <SignUp />,
      },
      {
        path: "/auth/reset-password",
        element: <ResetPassword />,
      },
    ],
  },
])

export default router
