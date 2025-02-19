import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { signOut } from 'firebase/auth'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
import { auth } from './firebase.config'
import Tasks from './components/Taks'

function App() {

  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
    window.location.pathname = "/login"
    })
  }
  
  return (
    <Router>
      <div className='flex'>
      <ToastContainer position="top-right" theme="colored" />
      <Navbar handleSignOut={signUserOut} isAuth={isAuth} />
      <div className="ml-64 p-6 w-full">
      <Routes>
      <Route path="/" element={<Home isAuth={isAuth} />} />
      <Route path="/signup" element={<Signup setIsAuth={setIsAuth} />} />
      <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      <Route path="/tasks" element={<Tasks setIsAuth={setIsAuth} />} />
      </Routes>
      </div>
      </div>
    </Router>
  )
}

export default App;
