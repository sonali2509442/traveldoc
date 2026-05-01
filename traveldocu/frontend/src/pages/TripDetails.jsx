import React from 'react'
import { useParams } from 'react-router-dom';

const TripDetails = () => {
      const { id } = useParams();

  return (
    <div className="p-6 max-w-4xl mx-auto">

      <h1 className="text-4xl font-bold mb-4">
        Goa Travel Documentary
      </h1>

      {/* About place */}
      <p className="mb-6 text-gray-700">
        Goa is famous for beaches, nightlife and Portuguese culture.
      </p>

      {/* Photos */}
      <img
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
        alt="Goa"
        className="rounded-xl mb-6"
      />

      {/* YouTube vlog */}
      <div className="mb-6">
        <iframe
          className="w-full h-80 rounded-xl"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="YouTube video"
          allowFullScreen
        ></iframe>
      </div>

      {/* Trip Details */}
      <div className="bg-gray-100 p-4 rounded-xl space-y-2">
        <p><b>Budget:</b> ₹12,000</p>
        <p><b>Stay:</b> Beach Resort</p>
        <p><b>Travel:</b> Flight + Scooter</p>
        <p><b>Hotel Check-in:</b> 2 PM</p>
      </div>

    </div>
  )
}

export default TripDetails