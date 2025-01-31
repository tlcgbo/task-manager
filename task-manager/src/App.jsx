import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { signOut } from 'firebase/auth'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Signup from './components/Signup'


function App() {
  
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  )
}

export default App;
