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
import PrivateAlt from "./route-protectors/PrivateAlt"
import Private from "./route-protectors/Private"

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
        element: (
          <Private>
            <TaskList />
          </Private>
        ),
      },
      {
        path: "/task-list/:id",
        element: (
          <Private>
            <TaskDetails />
          </Private>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: (
      <PrivateAlt>
        <Auth />
      </PrivateAlt>
    ),
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" replace />,
      },
      {
        path: "/auth/login",
        element: (
          <PrivateAlt>
            <Login />
          </PrivateAlt>
        ),
      },
      {
        path: "/auth/signup",
        element: (
          <PrivateAlt>
            <SignUp />
          </PrivateAlt>
        ),
      },
      {
        path: "/auth/reset-password",
        element: (
          <PrivateAlt>
            <ResetPassword />
          </PrivateAlt>
        ),
      },
    ],
  },
])

export default router
