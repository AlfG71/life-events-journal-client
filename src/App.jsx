import { useState } from 'react'
import { Routes, Route, Outlet, Navigate } from 'react-router-dom'

import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import EditProfile from './components/EditProfile'
import Home from './pages/Home'

function App() {

  return (
    <Routes>
      <Route path='/signup' element={<Signup /> } />
      <Route path='/login' element={<Login /> } />
      <Route path='/profile' element={<Profile /> } />
      <Route path='/update' element={<EditProfile />} />
      <Route path='/' element={<Home />} />
    </Routes>
  )
}

export default App
