import React from 'react'

const Postcard = () => {
  return (
    <div className="border rounded-lg overflow-hidden shadow">
      <img
        src="https://i.pinimg.com/736x/4f/32/fa/4f32fa3df4808403ba401bc88f948461.jpg"
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="font-bold text-lg">Goa Trip</h2>
        <p className="text-sm text-gray-600">3 days of beaches & sunsets 🌅</p>
      </div>
    </div>
  )
}

export default Postcard