import { Outlet } from "react-router"
import Header from "../components/Header"

const App = () => {
  return (
    <>
      <div className="min-h-screen">
        <Header />
        <main className="w-11/12 mx-auto bg-white drop-shadow-md -mt-20 rounded-2xl pt-6 pb-4 px-6">
          <Outlet />
        </main>
      </div>
    </>
  )
}
export default App
