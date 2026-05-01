import { useState } from 'react'

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Createpost from './pages/Createpost'

import Navbar from './components/Navbar'
import Search from './pages/Search'
import Signup from './pages/Signup'
import PlaceResult from './pages/PlaceResult'
import TripDetails from './pages/TripDetails'

function App() {
  

  return (
    <>
      <div>
        <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
           <Route path="/navbar" element={<Navbar />} />
           <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<Createpost />} />

        <Route path="/search" element={<Search />} />
        <Route path="/signup" element={<Signup />}/>
         <Route path="/place/:place" element={<PlaceResult />} />
        <Route path="/trip/:id" element={<TripDetails />} />
        </Routes>
        </BrowserRouter>
      </div>
      </>
  )
}

export default App
