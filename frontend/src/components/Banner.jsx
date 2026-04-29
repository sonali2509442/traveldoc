import React from 'react'
import { Link } from 'react-router-dom'

const Banner = () => {
  return (
    <div className="w-full py-10 px-4 md:px-10">

      {/* TOP TEXT */}
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="font-bold text-2xl md:text-4xl">
          Make memories by travelling ✈️
        </h1>

        <p className="mt-3 text-gray-600 text-sm md:text-base">
          Discover new places, explore hidden gems, and turn your journeys into unforgettable stories.
        </p>
      </div>

      {/* MAIN SECTION */}
      <div className="mt-10 flex flex-col md:flex-row items-center gap-8">

        {/* IMAGE */}
        <div className="w-full md:w-1/2">
          <img 
            src="/searchplace.png" 
            alt="search place"
            className="w-full h-[250px] md:h-[400px] object-cover rounded-2xl shadow-md"
          />
        </div>

        {/* TEXT CONTENT */}
        <div className="w-full md:w-1/2 text-center md:text-left">

          <h2 className="font-bold text-xl md:text-3xl">
            Search by places 🌍
          </h2>

          <p className="mt-3 text-gray-600 text-sm md:text-base">
            Find trips based on your favorite destinations and explore experiences shared by others.
          </p>

          <Link to="/search">
            <button className="mt-5 px-6 py-2 bg-amber-400 hover:bg-amber-500 text-black rounded-xl font-medium transition">
              Search
            </button>
          </Link>

        </div>
      </div>

    </div>
  )
}

export default Banner