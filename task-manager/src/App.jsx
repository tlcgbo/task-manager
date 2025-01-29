import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { signOut } from 'firebase/auth'
import Navbar from './components/Navbar'


function App() {
  
  return (
    <Router>
      <Navbar />
    </Router>
  )
}

export default App;
