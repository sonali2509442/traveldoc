import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const PlaceResult = () => {
  const { placeName } = useParams();
  const navigate = useNavigate();

  const trips = [
    {
      id: 1,
      title: "Budget Goa Trip",
      user: "Sonali",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
    {
      id: 2,
      title: "Luxury Goa Vacation",
      user: "Rahul",
      image:
        "https://images.unsplash.com/photo-1526772662000-3f88f10405ff",
    },
    {
      id: 3,
      title: "Solo Goa Adventure",
      user: "Ananya",
      image:
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">

      {/* HEADER */}
      <div className="max-w-5xl mx-auto mb-10">
        <h1 className="text-4xl font-bold mb-2">
          Trips for {placeName} 🌴
        </h1>
        <p className="text-gray-500">
          Explore travel stories shared by different travelers
        </p>
      </div>

      {/* CARDS */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {trips.map((trip) => (
          <div
            key={trip.id}
            onClick={() => navigate(`/trip/${trip.id}`)}
            className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer
                       hover:shadow-xl hover:-translate-y-1 transition duration-300"
          >
            {/* IMAGE */}
            <img
              src={trip.image}
              alt={trip.title}
              className="h-48 w-full object-cover"
            />

            {/* CONTENT */}
            <div className="p-5">
              <h2 className="text-lg font-semibold mb-1">
                {trip.title}
              </h2>

              <p className="text-gray-500 text-sm">
                by {trip.user}
              </p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default PlaceResult;