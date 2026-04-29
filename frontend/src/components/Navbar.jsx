import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-[#D25353] text-white px-4 md:px-8 py-4">

      {/* Top Bar */}
      <div className="flex justify-between items-center">

        {/* Logo + Explore */}
        <div className="flex gap-4 items-center">
          <Link to="/" className="text-xl font-bold">TraveldocU</Link>
          <Link to="/search" className="hidden md:block">Explore</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-5">

          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/create">Create</Link>
          <Link to="/saved">❤️</Link>
          <Link to="/dashboard">Dashboard 📊</Link>

          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          ) : (
            <div className="flex gap-3 items-center">
              <p className="text-sm">Hi, {user.displayName}</p>

              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  window.location.reload();
                }}
                className="bg-white text-[#D25353] px-3 py-1 rounded-lg text-sm"
              >
                Logout
              </button>
            </div>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="flex flex-col gap-4 mt-4 md:hidden">

          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/search" onClick={() => setMenuOpen(false)}>Explore</Link>
          <Link to="/create" onClick={() => setMenuOpen(false)}>Create</Link>
          <Link to="/saved" onClick={() => setMenuOpen(false)}>❤️ Saved</Link>
          <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard 📊</Link>

          {!user ? (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)}>Signup</Link>
            </>
          ) : (
            <>
              <p className="text-sm">Hi, {user.displayName}</p>

              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  window.location.reload();
                }}
                className="bg-white text-[#D25353] px-3 py-1 rounded-lg text-sm w-fit"
              >
                Logout
              </button>
            </>
          )}

        </div>
      )}

    </nav>
  )
}

export default Navbar