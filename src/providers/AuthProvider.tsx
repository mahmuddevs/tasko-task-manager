import axios from "axios"
import { createContext, useEffect, useState, type ReactNode } from "react"

type User = {
  _id: string
  name: string
  email: string
  userType: string
}

type AuthContextType = {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logOut: () => Promise<boolean>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/users/login`,
        { email, password },
        { withCredentials: true }
      )

      if (res.data?.success && res.data.user) {
        setUser(res.data.user)
        return true
      }

      return false
    } catch (error) {
      console.error("Login failed:", error)
      return false
    }
  }

  const signup = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/users/register`,
        { name, email, password },
        { withCredentials: true }
      )

      if (res.data?.success && res.data.user) {
        setUser(res.data.user)
        return true
      }

      return false
    } catch (error) {
      console.error("Registration failed:", error)
      return false
    }
  }

  const logOut = async (): Promise<boolean> => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/users/logout`,
        {},
        { withCredentials: true }
      )
      if (res.data?.success) {
        setUser(null)
        return true
      }
      return false
    } catch (error) {
      console.error("Logout failed:", error)
      return false
    }
  }

  useEffect(() => {
    const fetchAuthenticatedUser = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_SERVER_URL}/users/auth`,
          {},
          {
            withCredentials: true,
          }
        )
        if (res.data?.success) {
          setUser(res.data.user)
        }
      } catch (error) {
        setUser(null)
      }
    }

    fetchAuthenticatedUser()
  }, [])

  const value = { user, setUser, login, logOut, signup }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
