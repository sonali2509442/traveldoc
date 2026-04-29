import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 mt-16">

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 grid sm:grid-cols-2 md:grid-cols-3 gap-8">

        {/* BRAND */}
        <div className="space-y-3 text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-bold text-white">
            TraveldocU
          </h2>
          <p className="text-sm text-gray-400">
            Not just places, but memories you carry forever.
          </p>
        </div>

        {/* LINKS */}
        <div className="space-y-3 text-center md:text-left">
          <h3 className="text-lg font-semibold text-white">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition">Home</Link>
            </li>
            <li>
              <Link to="/search" className="hover:text-white transition">Search</Link>
            </li>
            <li>
              <Link to="/create" className="hover:text-white transition">Create Post</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white transition">About</Link>
            </li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div className="space-y-3 text-center md:text-left">
          <h3 className="text-lg font-semibold text-white">Connect</h3>

          <div className="flex justify-center md:justify-start gap-4 text-xl">
            <span className="hover:text-white cursor-pointer">🌐</span>
            <span className="hover:text-white cursor-pointer">📸</span>
            <span className="hover:text-white cursor-pointer">🎥</span>
            <span className="hover:text-white cursor-pointer">💌</span>
          </div>

          <p className="text-sm text-gray-400">
            Share your story with the world.
          </p>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-800 text-center py-5 text-xs md:text-sm text-gray-500">
        © {new Date().getFullYear()} TraveldocU — Made with 💛
      </div>

    </footer>
  )
}

export default Footer