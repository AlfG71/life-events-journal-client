import { useState } from 'react'
import { Routes, Route, Outlet, Navigate } from 'react-router-dom'

import './App.css'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import EditProfile from './components/EditProfile'
import Home from './pages/Home'
import DeleteProfile from './components/DeleteProfile'
import ChildProfile from './pages/ChildProfile'
import EditChild from './components/EditChild'
import ChildProfileDelete from './components/ChildProfileDelete'
import AddEvent from './components/AddEvent'
import Event from './pages/Event'

function App() {
  return (
    <Routes>
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/update' element={<EditProfile />} />
      <Route path='/' element={<Home />} />
      <Route path='/delete' element={<DeleteProfile />} />
      <Route path="/child-profile/:childId" element={<ChildProfile />} />
      <Route path="/edit-child/:childId" element={<EditChild />} />
      <Route path='/delete-child/:childId' element={<ChildProfileDelete/>}/>
      <Route path='/create/:childId' element={<AddEvent/>}/>
      <Route path='/event/:childId/:eventId' element={<Event />}/>
    </Routes>

  )
}

export default App