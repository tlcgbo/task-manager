import React from 'react';
import Navbar from './Navbar';

function Signup() {
  return (
    <div className="flex h-screen bg-slate-900 text-white">
     
      <Navbar />

   
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-bold mb-6">Create an Account</h2>
        
        <form className="w-full max-w-sm">
          <div className="mb-4">
            <label htmlFor="username" className="block text-left mb-2">Username</label>
            <input
              type="text"
              id="username"
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-left mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-left mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="button"
            className="w-full py-2 px-6 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
