import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
       
         <nav className="bg-[#D25353] text-white px-6 py-4 flex justify-between">
          <div className='flex gap-2'>
      <Link to="/" className="text-xl font-bold">TraveldocU</Link>
      <Link to="/search">Explore</Link>
      </div>
      <div className="space-x-4">
        
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        
        
        <Link to="/create">Create</Link>
        <Link to="/login">Login</Link>
        <Link to ="/signup">Sign up</Link>
      </div>
    </nav>
        </div>
  )
}

export default Navbar