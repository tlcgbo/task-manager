import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { signOut } from 'firebase/auth'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [isAuth, setIsAuth] = useState(localStorage.getItem("isaUTH"));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
    window.location.pathname = "/login"
    })
  }
  
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App;
