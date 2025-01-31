import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  return (
    <div className="flex h-screen bg-slate-900 text-white">
      
      {/* Sidebar Navbar on the Left */}
      <Navbar />
      
      {/* Main Content on the Right */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-7xl font-bold mb-4">Taskly</h2>
        <Link to="/signup">
          <button className="bg-blue-800 text-white py-2 px-6 rounded-md hover:bg-blue-900 transition duration-300 mb-6">
            Get Started
          </button>
        </Link>

        <p className="text-[15px] text-gray-500 max-w-xl mx-auto px-4">
          Taskly is a user-friendly task management platform designed to help individuals and teams stay organized and productive. With Taskly, users can create, track, and prioritize tasks, ensuring they stay on top of their to-do lists. 
        </p>
      </div>
    </div>
  );
}

export default Home;
