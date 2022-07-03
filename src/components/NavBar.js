import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { authContext } from '../contexts/Auth'
function NavBar () {
  const Auth = useContext(authContext)
  return (
    <>
      <nav className='bg-red-500 p-3 flex justify-between'>
        <Link to='/' className='text-2xl no-underline text-white font-semibold'>
          Youtube Clone
        </Link>
        <div>
          {Auth.authenticated ? (
            <button className='text-xl no-underline text-white font-normal ml-2' onClick={()=>Auth.logout()}>
              Logout
            </button>
          ) : (
            <div>
              <Link
                to='/register'
                className='text-xl no-underline text-white font-normal mr-2'
              >
                Register
              </Link>
              <Link
                to='/login'
                className='text-xl no-underline text-white font-normal ml-2'
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  )
}

export default NavBar
