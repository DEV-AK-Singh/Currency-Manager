import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { store } from "../pages/Root";

export default function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(store);
  const handleLogout = () => { 
    setIsLoggedIn(!isLoggedIn);
    setUser(null); 
    localStorage.removeItem('user');
    localStorage.removeItem('token'); 
    navigate('/', {replace: true});
  };

  return (
    <header className="border-b border-gray-200 bg-gray-100">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link to="/">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Currency Manager
              </h1>
            </Link>
            <p className="mt-1.5 text-sm text-gray-500">
              Manage your currency data with ease.
            </p>
          </div>
          {
            !isLoggedIn ?
            <div className="flex items-center gap-4">
              <Link to="/register" className="inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring">
                <i className="fa-solid fa-user"></i>
                <span className="text-sm font-medium ms-2">Register</span>
              </Link>
              <Link to="/login" className="inline-flex items-center justify-center gap-1.5 rounded border border-gray-200 bg-white px-5 py-3 text-gray-900 transition hover:text-gray-700 focus:outline-none focus:ring">
                <i className="fa-solid fa-right-to-bracket"></i>
                <span className="text-sm font-medium ms-2">Login</span>
              </Link>
            </div> 
            :
            <div className="flex items-center gap-4">
              <button className="inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring">
                <i className="fa-solid fa-money-bill-wave"></i>
                <span className="text-sm font-medium ms-2">Add Money</span>
              </button>
              <button onClick={handleLogout} className="inline-flex items-center justify-center gap-1.5 rounded border border-gray-200 bg-white px-5 py-3 text-gray-900 transition hover:text-gray-700 focus:outline-none focus:ring">
                <span className="text-sm font-medium me-2">Logout</span>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
              </button>
            </div>  
          }
        </div>
      </div>
    </header>
  );
}
