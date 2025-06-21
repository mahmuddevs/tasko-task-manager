import { useState } from "react"
import spinnerWheel from "../assets/images/spinner.png"
import triangle from "../assets/images/polygon.png"
import spinIcon from "../assets/images/spin-icon.png"
import { MdKeyboardArrowDown } from "react-icons/md"
import { Link } from "react-router"

// Segments in their visual order (clockwise from top)
const segments = [
  "Friends", // 0° (top position)
  "Meditation", // 60°
  "Arts and Craft", // 120°
  "Nature", // 180°
  "Family", // 240°
  "Sport", // 300°
]

const segmentSize = 360 / segments.length // 60° per segment

const SpinWheel = () => {
  const [rotation, setRotation] = useState<number>(0)
  const [isSpinning, setIsSpinning] = useState<boolean>(false)
  const [selected, setSelected] = useState<string>("")

  const spinWheel = () => {
    if (isSpinning) return

    const fullSpins = 5 * 360
    const randomOffset = Math.floor(Math.random() * 360)
    const finalRotation = rotation + fullSpins + randomOffset

    setIsSpinning(true)
    setRotation(finalRotation)

    setTimeout(() => {
      const normalized = finalRotation % 360
      // Calculate which segment is at the pointer (bottom position)
      // Add 180° to account for pointer being at bottom (180° from top)
      const pointerAngle = (normalized + 180) % 360
      const segmentIndex = Math.floor(pointerAngle / segmentSize)

      setSelected(segments[segmentIndex] || "Unknown")
      setIsSpinning(false)
    }, 4000)
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Spin Wheel
        </h1>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Select Task Category
          </label>
          <div className="relative">
            <select
              value={selected}
              onChange={(e) => setSelected(e.target.value)}
              className="appearance-none bg-transparent border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent min-w-56 cursor-pointer"
            >
              {segments.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <MdKeyboardArrowDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 -z-20" />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center p-4">
        <div>
          <img
            src={spinnerWheel}
            alt="Spin Wheel"
            className="w-[90%] transition-transform duration-[4000ms] ease-out mx-auto"
            style={{ transform: `rotate(${rotation}deg)` }}
          />

          {/* Pointer (Bottom Center Triangle) */}
          <img
            src={triangle}
            alt="pointer"
            className="relative mx-auto -mt-15 z-30"
          />
        </div>

        <p className="text-lg font-semibold mb-2">
          Spin Wheel to pick your task
        </p>

        <div className="flex gap-4">
          <button
            onClick={spinWheel}
            disabled={isSpinning}
            className="bg-primary hover:bg-primary/70 text-black px-6 py-3 rounded-md font-bold flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer min-w-64"
          >
            <span>Spin</span>
            <img src={spinIcon} alt="" />
          </button>
          <Link
            to={`/task-list`}
            className={`bg-primary hover:bg-primary/70 text-black px-6 py-3 rounded-md font-bold flex items-center  justify-center gap-2 disabled:opacity-50 cursor-pointer min-w-64 ${
              selected === "" ? "hidden" : "block"
            }`}
          >
            Go To Task
          </Link>
        </div>
      </div>
    </section>
  )
}

export default SpinWheel
