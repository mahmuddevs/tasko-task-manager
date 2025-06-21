import type { ReactNode } from "react"
import { Navigate, useLocation } from "react-router"
import useAuth from "../../hooks/useAuth"
import Spinner from "../../components/Spinner"

const Private = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return <Spinner />
  }

  if (user) {
    return children
  }

  return <Navigate state={location.pathname} to="/auth/login" />
}

export default Private
