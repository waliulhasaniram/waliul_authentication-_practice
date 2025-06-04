import { NavLink } from 'react-router'
import { useAuth } from '../../contextAPI/auth'
import { useEffect, useState } from 'react'

export const Home =()=> {
    const {isLoggedIn, loggedInUser} = useAuth()

    const [updateUserData, setUpdateUserData] = useState({username:"", email:""})

    useEffect(() => {
        if (loggedInUser) {
            setUpdateUserData({ username: loggedInUser.username, email: loggedInUser.email });
        }
    }, [loggedInUser]);

    return (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100">
    <h1 className="text-3xl font-bold mb-6">Welcome to the Home</h1>

    <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-lg p-6">
      {isLoggedIn ? (
        <div className="space-y-4">
          <p className="text-lg font-medium">Username: {updateUserData.username}</p>
          <p className="text-lg font-medium">Email: {updateUserData.email}</p>
          <NavLink to="/logout">
            <button className="w-full py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700">
              Logout
            </button>
          </NavLink>
        </div>
      ) : (
        <div className="space-y-4">
          <NavLink to="/signup">
            <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Sign up now!
            </button>
          </NavLink>

          <NavLink to="/signin">
            <button className="w-full py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700">
              Sign in
            </button>
          </NavLink>
        </div>
      )}
    </div>
  </div>
);
}
