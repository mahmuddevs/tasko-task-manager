import { useState } from "react"
import { useForm } from "react-hook-form"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import headerImg from "../../assets/images/header.png"
import clockImg from "../../assets/images/clock.png"

type ResetPasswordFormData = {
  email: string
  newPassword: string
  confirmPassword: string
}

const ResetPassword = () => {
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<ResetPasswordFormData>()

  const newPassword = watch("newPassword")

  const validatePassword = (value: string): string | boolean => {
    if (value.length < 8) {
      return "Password must be at least 8 characters long"
    }
    if (!/(?=.*[a-z])/.test(value)) {
      return "Password must contain at least one lowercase letter"
    }
    if (!/(?=.*[A-Z])/.test(value)) {
      return "Password must contain at least one uppercase letter"
    }
    if (!/(?=.*\d)/.test(value)) {
      return "Password must contain at least one number"
    }
    if (!/(?=.*[!@#$%^&*(),.?":{}|<>])/.test(value)) {
      return "Password must contain at least one special character"
    }
    return true
  }

  const validateConfirmPassword = (value: string): string | boolean => {
    if (value !== newPassword) {
      return "Passwords do not match"
    }
    return true
  }

  const onFormSubmit = async (data: ResetPasswordFormData) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("Password reset data:", data)
      setIsSuccess(true)
      reset()
    } catch (error) {
      console.error("Password reset failed:", error)
      alert("Password reset failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTryAgain = () => {
    setIsSuccess(false)
    reset()
  }

  return (
    <div className="min-h-screen">
      <header
        className="bg-no-repeat bg-cover bg-center text-white px-6 md:px-24 py-6 h-44"
        style={{ backgroundImage: `url('${headerImg}')` }}
      ></header>
      <section className="w-11/12 min-h-[85vh] mx-auto bg-white drop-shadow-md -mt-20 rounded-2xl pt-6 pb-4 px-6 flex flex-col gap-10 justify-center items-center">
        <div className="relative z-10 flex items-center justify-center p-4">
          {!isSuccess ? (
            /* Reset Password Form */
            <div className="w-full mx-auto">
              <div className="p-6 sm:p-8">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    <img src={clockImg} alt="clockImg" />
                  </div>
                </div>

                {/* Header */}
                <div className="text-center mb-8">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                    Reset your Password
                  </h1>
                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                    Strong passwords include numbers, letters, and punctuation
                    marks
                  </p>
                </div>

                {/* Form */}
                <form
                  onSubmit={handleSubmit(onFormSubmit)}
                  className="space-y-6"
                >
                  {/* Email Address */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      {...register("email", {
                        required: "Email address is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="m32220@gmail.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* New Password */}
                  <div>
                    <label
                      htmlFor="newPassword"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Enter New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        id="newPassword"
                        {...register("newPassword", {
                          required: "New password is required",
                          validate: validatePassword,
                        })}
                        className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all ${
                          errors.newPassword
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="••••••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {errors.newPassword && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.newPassword.message}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        {...register("confirmPassword", {
                          required: "Please confirm your password",
                          validate: validateConfirmPassword,
                        })}
                        className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-all ${
                          errors.confirmPassword
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Retype password"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.confirmPassword.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/70 disabled:bg-primary/40 font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        <span>Resetting Password...</span>
                      </>
                    ) : (
                      <span>Reset Password</span>
                    )}
                  </button>
                </form>
              </div>
            </div>
          ) : (
            /* Success State */
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto">
              <div className="p-6 sm:p-8 text-center">
                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Success Message */}
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  Password Reset Successful!
                </h1>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
                  Your password has been successfully reset. You can now log in
                  with your new password.
                </p>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => (window.location.href = "/login")}
                    className="w-full bg-primary hover:bg-primary/70 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                  >
                    Go to Login
                  </button>
                  <button
                    onClick={handleTryAgain}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors"
                  >
                    Reset Another Password
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default ResetPassword
