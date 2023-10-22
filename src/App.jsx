import { useState } from 'react'
import { Routes, Route, Outlet, Navigate } from 'react-router-dom'

import './App.css'
import Signup from './pages/Signup'

function App() {
  const [count, setCount] = useState(0)

  return (
      <Signup />
  )
}

export default App
