import React, { useState } from 'react';
import { auth } from '../firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import GoogleBtn from './GoogleBtn';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
  email: "",
  password: "",
};

const Login = ({ setIsAuth }) => {
  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
      localStorage.setItem("isAuth", "true");

      if (typeof setIsAuth === "function") {
        setIsAuth(true);
      }

      setFormData(initialState);
      navigate("/");
    } catch (error) {
      console.error(error);
      switch (error.code) {
        case "auth/user-not-found":
          toast.error("No user found with this email.");
          break;
        case "auth/wrong-password":
          toast.error("Incorrect password.");
          break;
        case "auth/invalid-email":
          toast.error("Invalid email format.");
          break;
        default:
          toast.error("Login failed. Please try again.");
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  return (
    <div className="flex h-screen bg-slate-900 text-white">
      <ToastContainer />

      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-bold mb-6">Log In</h2>

        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="mb-4">
            <label htmlFor="email" className="block text-left mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-left mb-2">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={handleChange}
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>

          {/* Google Sign-In Button - Positioned Below */}
          <div className="mt-4">
            <GoogleBtn setIsAuth={setIsAuth} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
