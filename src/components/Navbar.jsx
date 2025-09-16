import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { auth } from "../config/firebaseConfig";
import { useHistory, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { logOutAction } from "../actionCreators/authActions";
import { motion } from "framer-motion";

function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logOutAction());
    history.push("/");
    setIsMenuOpen(false);
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      dispatch({
        type: "SET_USER",
        payload: user,
      });
    });
  }, [dispatch]);

  return (
    <motion.nav
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ delay: 0.1, duration: 0.7 }}
      className="py-4 px-4 lg:px-10 flex justify-between items-center shadow-sm bg-white z-50 sticky top-0"
    >
      <Link
        to="/"
        className="uppercase font-extrabold lg:text-4xl text-3xl tracking-widest font-Montserrat text-primary hover:opacity-90 transition-opacity"
      >
        XPENSE
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-4">
        {user && (
          <>
            {location.pathname === "/" && (
              <Link 
                to="/dashboard" 
                className="px-5 py-2 rounded-lg text-primary border-2 border-primary hover:bg-primary hover:text-white transition-colors duration-300 font-semibold"
              >
                Dashboard
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors duration-300 font-semibold"
            >
              Logout
            </button>
          </>
        )}
        {!user && (
          <Link
            to={location.pathname.includes("login") ? "/signup" : "/login"}
            className="px-5 py-2 rounded-lg bg-primary text-white hover:bg-indigo-600 transition-colors duration-300 font-semibold"
          >
            {location.pathname.includes("login") ? "Sign Up" : "Log In"}
          </Link>
        )}
      </div>

      {/* Mobile Navigation Button */}
      <div className="md:hidden">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-700 focus:outline-none"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-full right-0 left-0 bg-white shadow-lg md:hidden p-4 mt-1 z-50"
        >
          {user && (
            <div className="flex flex-col space-y-3">
              {location.pathname === "/" && (
                <Link 
                  to="/dashboard" 
                  onClick={() => setIsMenuOpen(false)}
                  className="px-4 py-2 rounded-lg text-center text-primary hover:bg-primary hover:text-white transition-colors duration-300 font-semibold border border-primary"
                >
                  Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg text-center bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors duration-300 font-semibold"
              >
                Logout
              </button>
            </div>
          )}
          {!user && (
            <Link
              to={location.pathname.includes("login") ? "/signup" : "/login"}
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2 rounded-lg text-center bg-primary text-white hover:bg-indigo-600 transition-colors duration-300 font-semibold"
            >
              {location.pathname.includes("login") ? "Sign Up" : "Log In"}
            </Link>
          )}
        </motion.div>
      )}
    </motion.nav>
  );
}

export default Navbar;
