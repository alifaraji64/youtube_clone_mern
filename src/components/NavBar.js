import { Link } from "react-router-dom"
function NavBar () {
  return (
    <>
      <nav className="bg-red-500 p-3 flex justify-between">
        <Link to='/' className="text-2xl no-underline text-white font-semibold">Youtube Clone</Link>
        <div>
            <Link to='/register' className="text-xl no-underline text-white font-normal mr-2">Register</Link>
            <Link to='/login' className="text-xl no-underline text-white font-normal ml-2">Login</Link>
        </div>
      </nav>
    </>
  )
}

export default NavBar
