import React, { useState } from 'react';
import Navbar from './Navbar';
import { auth } from '../firebase.config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import GoogleBtn from './GoogleBtn';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  

const initialState = {
  username: "",
  email: "",
  password: "",  
  confirmPassword: "",
};

const Signup = ({ setIsAuth }) => {
  const [formData, setFormData] = useState(initialState);
  const { username, email, password, confirmPassword } = formData;
  const navigate = useNavigate();


  if (typeof setIsAuth !== "function") {
    console.error("setIsAuth is not a function! Make sure it's passed as a prop.");
  }

  const validateForm = () => {
    if (!username || !email || !password || !confirmPassword) {
      toast.error("Please fill in all input fields.");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: username });
      toast.success("Signup successful!");
      localStorage.setItem("isAuth", "true");

      if (typeof setIsAuth === "function") {
        setIsAuth(true); 
      }

      setFormData(initialState);
      navigate("/");
    } catch (error) {
      console.error(error);
      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error("This email is already registered.");
          break;
        case "auth/invalid-email":
          toast.error("Invalid email format.");
          break;
        case "auth/weak-password":
          toast.error("Weak password. Must be at least 6 characters.");
          break;
        default:
          toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  return (
    <div className="flex h-screen bg-slate-900 text-white">
      <Navbar />
      <ToastContainer />  
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-bold mb-6">Create an Account</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="mb-4">
            <label htmlFor="username" className="block text-left mb-2">Username</label>
            <input
              type="text"
              name="username"
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={handleChange}
              placeholder="Enter your username"
            />
          </div>

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

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-left mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
