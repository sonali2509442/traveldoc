import React from 'react'

const About = () => {
  return (
    <div className="bg-[#FAF3E1] text-gray-800">

      {/* HERO */}
      <div className="relative h-[50vh] md:h-[65vh] flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
          alt="travel"
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute w-full h-full bg-black/60"></div>

        <div className="relative text-center px-4 text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-3">
            About TraveldocU 🌍
          </h1>
          <p className="text-sm md:text-lg text-gray-200">
            A platform to explore, share, and discover travel experiences.
          </p>
        </div>
      </div>

      {/* ABOUT PLATFORM */}
      <div className="max-w-4xl mx-auto py-12 md:py-16 px-4 text-center space-y-5">
        <h2 className="text-2xl md:text-3xl font-semibold">
          What is TraveldocU?
        </h2>

        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
          TraveldocU is a travel storytelling platform where users can document,
          explore, and discover journeys from around the world. It brings together
          travel experiences, destinations, budgets, and insights in one place,
          helping users make better travel decisions.
        </p>
      </div>

      {/* FEATURES */}
      <div className="max-w-6xl mx-auto px-4 md:px-10 pb-12">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-center">
            <h3 className="text-lg font-semibold">🌍 Explore</h3>
            <p className="text-gray-500 mt-2 text-sm">
              Discover trips shared by others
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-center">
            <h3 className="text-lg font-semibold">✍️ Create</h3>
            <p className="text-gray-500 mt-2 text-sm">
              Share your own travel stories
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-center">
            <h3 className="text-lg font-semibold">💰 Budget</h3>
            <p className="text-gray-500 mt-2 text-sm">
              Plan trips with cost insights
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition text-center">
            <h3 className="text-lg font-semibold">⭐ Ratings</h3>
            <p className="text-gray-500 mt-2 text-sm">
              Find top-rated experiences
            </p>
          </div>

        </div>
      </div>

      {/* PURPOSE */}
      <div className="text-center py-12 md:py-16 px-4 max-w-3xl mx-auto">
        <h2 className="text-xl md:text-2xl font-semibold mb-3">
          Our Goal
        </h2>
        <p className="text-gray-600 text-sm md:text-base">
          To make travel planning easier by combining real experiences,
          useful insights, and a simple platform for sharing journeys.
        </p>
      </div>

    </div>
  )
}

export default About