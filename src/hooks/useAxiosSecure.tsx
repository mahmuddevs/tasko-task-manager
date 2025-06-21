import axios from "axios"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import useAuth from "./useAuth"

const instance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  // baseURL: 'https://library-management-one-gray.vercel.app/',
  withCredentials: true,
})
const useAxiosSecure = () => {
  const { logOut } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    instance.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        if (error.status === 401 || error.status === 403) {
          console.log("Unauthorized Activity")
          logOut()
            .then(() => {
              console.log("User Logged Out")
              navigate("/auth/login")
            })
            .catch(() => {
              console.log("Something Went Wrong")
            })
        }

        return Promise.reject(error)
      }
    )
  }, [])

  return instance
}

export default useAxiosSecure
