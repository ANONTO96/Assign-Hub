import { Link } from 'react-router-dom'
import { AuthContext } from '../provider/AuthProvider'
import { useContext } from 'react'
import ThemeController from "../ThemeController";
const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
  return (
    <div className='navbar lg:w-[80%] bg-base-100 shadow-sm px-4 mx-auto'>
      <div className='flex-1'>
        <Link to='/' className='flex gap-2 items-center'>
          <img className='w-auto h-7' src="https://img.icons8.com/?size=100&id=HdwVeU5AqZdJ&format=png&color=000000" href="" alt='' />
          <span className='font-bold'>AssignHub</span>
        </Link>
      </div>
      {/* theme controller */}
      <div>
        <ThemeController></ThemeController>
        </div>
        {/* right navbar */}
      <div className='flex-none'>
        <ul className='menu menu-horizontal px-1'>
          <li>
            <Link to='/' className='font-semibold'>Home</Link>
          </li>
          <li>
            <Link to='/all-assignments' className='font-semibold'>All Assignments</Link>
          </li>

          {!user && (
            <>
            <li>
              <Link to='/login' className='font-semibold'>Login</Link>
            </li>
            <li>
            <Link to='/register' className='font-semibold'>Registration</Link>
          </li>
          </>
          )}
        </ul>
        {user && (
          <div className='dropdown dropdown-end z-50'>
            <div
              tabIndex={0}
              role='button'
              className='btn btn-ghost btn-circle avatar'
            >
              <div title={user?.displayName} className='w-10 rounded-full'>
                <img
                  referrerPolicy='no-referrer'
                  alt='User Profile Photo'
                  src={user?.photoURL}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-56'
            >
              <li>
                <Link to='/add-assignments' className='justify-between'>
                  Create Assignment
                </Link>
              </li>
              <li>
                <Link to='/my-posted-assignments'>My Posted Assignments</Link>
              </li>
              <li>
                <Link to={`/my-submitted-assignments/${user?.email}`}>My Submitted Assignments</Link>
              </li>
              <li>
                <Link to={`/my-pending-assignments/${user?.email}`}>Pending Assignments</Link>
              </li>
              <li className='mt-2'>
                <button
                  onClick={logOut}
                  className='bg-gray-200 block text-center '
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar