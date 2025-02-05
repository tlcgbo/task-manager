import React, { useState } from 'react';
import Navbar from './Navbar';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase.config';
import { toast } from 'react-toastify';

const initialState = {
  email: "",
  password: "",
};

const Login = ({ setIsAuth }) => {
  const [formData, setFormData] = useState(initialState);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const { email, password } = formData;
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!email || !password) {
      toast.error("Please, fill in all input fields");
      setEmailValid(!!email);  // Set to true if email is entered
      setPasswordValid(!!password);  // Set to true if password is entered
      return;
    }

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem("isAuth", true);
      toast.success("Logged in successfully!");
      setIsAuth(true);
      navigate("/");
    } catch (error) {
      toast.error("Invalid credentials");
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Update the validity of each field as user types
    if (name === "email") setEmailValid(value.trim() !== "");
    if (name === "password") setPasswordValid(value.trim() !== "");
  };

  return (
    <div className="flex h-screen bg-slate-900 text-white">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-bold mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <div className="mb-4">
            <label htmlFor="email" className="block text-left mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              className={`w-full px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${!emailValid ? 'border-red-500' : ''}`}
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-left mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              className={`w-full px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${!passwordValid ? 'border-red-500' : ''}`}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"  // Ensures form submission triggers handleSubmit
            className="w-full py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
