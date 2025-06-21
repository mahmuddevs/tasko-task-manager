import { useForm } from "react-hook-form"
import loginImg from "../../assets/images/login.png"
import { Link, useNavigate } from "react-router"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useState } from "react"
import useAuth from "../../hooks/useAuth"

type FormData = {
  email: string
  password: string
  rememberMe: boolean
}

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      rememberMe: false,
    },
  })

  const onSubmit = (data: FormData) => {
    const { email, password } = data
    login(email, password)
      .then(() => {
        navigate("/")
        alert("Logged In Successfully")
      })
      .catch((err: any) => {
        console.log(err.message)
      })
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Illustration - Hidden on mobile */}
      <div
        className="hidden lg:block lg:flex-1 bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url(${loginImg})` }}
      ></div>

      {/* Right Side - Login Form */}
      <div className="flex-1 bg-gray-50 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              Login
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Welcome Back, Please Enter your Details to Log In.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-6"
          >
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className={`w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all`}
                placeholder="m32220@gmail.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1 sm:mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className={`w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  type="checkbox"
                  {...register("rememberMe")}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 text-sm text-gray-600"
                >
                  Remember me
                </label>
              </div>
              <Link
                to="/auth/reset-password"
                className="text-sm text-gray-600 hover:text-gray-800 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/70 font-semibold py-2 sm:py-3 px-4 rounded-lg transition-colors text-sm sm:text-base cursor-pointer"
            >
              Log In
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">Or</span>
              </div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center text-sm sm:text-base">
              <span className="text-gray-600">Don't have an account? </span>
              <Link
                to="/auth/signup"
                className="text-gray-900 font-medium hover:underline"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
