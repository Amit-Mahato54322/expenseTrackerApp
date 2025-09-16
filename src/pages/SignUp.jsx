import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpAction } from "../actionCreators/authActions";
import { motion } from "framer-motion";
import LoadingSpinner from "../components/LoadingSpinner";

function SignUp({ history }) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.auth.user);
  const isFetching = useSelector((state) => state.auth.isFetching);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUpAction({ email, password, username }));
    setEmail("");
    setUsername("");
    setPassword("");
  };

  if (isFetching) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <LoadingSpinner size="large" />
        <p className="mt-4 text-gray-600 font-medium">Creating your account...</p>
      </div>
    );
  }

  if (user) {
    history.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-8">
      <motion.div
        className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-3xl font-bold text-primary mb-6 text-center">Create Account</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="username"
              autoComplete="off"
              required
              placeholder="Your username"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              autoComplete="off"
              required
              placeholder="your.email@example.com"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              required
              placeholder="Create a secure password"
              className="w-full border border-gray-300 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white font-semibold rounded-lg px-4 py-3 mt-2 shadow transition-transform duration-200 hover:bg-indigo-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Create Account
          </button>
        </form>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="text-center max-w-md"
      >
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Track Your Expenses Effortlessly</h2>
        <p className="text-gray-600">Go paperless with our automated online expense tracker and take control of your finances today.</p>
      </motion.div>
      
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 z-0 h-60 w-100"
        viewBox="10 100 2000 200"
      >
        <path
          fill="#5928E5"
          fillOpacity="1"
          d="M0,96L48,117.3C96,139,192,181,288,202.7C384,224,480,224,576,202.7C672,181,768,139,864,128C960,117,1056,139,1152,154.7C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
    </div>
  );
}

export default SignUp;
