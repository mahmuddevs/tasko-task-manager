import headerImg from "../../assets/images/header.png"
import error from "../../assets/images/error.svg"
import { Link } from "react-router"
const Error = () => {
  return (
    <div className="min-h-screen">
      <header
        className="bg-no-repeat bg-cover bg-center text-white px-6 md:px-24 py-6 h-44"
        style={{ backgroundImage: `url('${headerImg}')` }}
      ></header>
      <section className="w-11/12 min-h-[85vh] mx-auto bg-white drop-shadow-md -mt-20 rounded-2xl pt-6 pb-4 px-6 flex flex-col gap-10 justify-center items-center">
        <img src={error} alt="error" />
        <Link
          to="/"
          className="bg-primary hover:bg-primary/70 text-black px-6 py-3 rounded-md font-bold flex items-center  justify-center gap-2 disabled:opacity-50 cursor-pointer min-w-64"
        >
          Back To Home
        </Link>
      </section>
    </div>
  )
}
export default Error
