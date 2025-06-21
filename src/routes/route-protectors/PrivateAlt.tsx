import type { ReactNode } from "react"
import { Navigate } from "react-router"
import useAuth from "../../hooks/useAuth"
import Spinner from "../../components/Spinner"

const PrivateAlt = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <Spinner />
  }

  if (!user) {
    return children
  }

  return <Navigate to="/" />
}

export default PrivateAlt
