import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PlaceResult = () => {
  const { place } = useParams();   // ✅ match route param
  const navigate = useNavigate();

  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const res = await fetch("http://localhost:2000/api/posts");
        const data = await res.json();

        // ✅ filter by place from backend data
       const filteredTrips = data.data.filter((trip) =>
  trip.location?.toLowerCase() === place.toLowerCase()
);

        setTrips(filteredTrips);
      } catch (error) {
        console.error(error);
        alert("Failed to load trips");
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [place]);

  if (loading) return <p className="text-center mt-12 text-gray-500">Loading trips...</p>;

  if (!trips.length)
    return (
      <p className="text-center mt-12 text-gray-500 text-sm sm:text-base">
        No trips found for {place}
      </p>
    );

  return (
   <div className="min-h-screen bg-gray-50 px-4 sm:px-6 md:px-10 py-8 md:py-12">

      {/* HEADER */}
      <div className="max-w-5xl mx-auto mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 capitalize">
          Trips for {place} 🌴
        </h1>
        <p className="text-gray-500 text-sm sm:text-base">
          Explore travel stories shared by different travelers
        </p>
      </div>

      {/* CARDS */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {trips.map((trip) => (
          <div
            key={trip._id}
            onClick={() => navigate(`/trip/${trip._id}`)}
            className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer
           hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] transition duration-300"
          >
            <img
              src={`http://localhost:2000/${trip.galleryImages?.[0] || ""}`}
              alt={trip.title}
              className="h-40 sm:h-48 md:h-52 w-full object-cover"
            />

            <div className="p-4 sm:p-5 space-y-1">
              <h2 className="text-base sm:text-lg font-semibold truncate">
                {trip.title}
              </h2>

             <p className="text-gray-500 text-xs sm:text-sm">
                by {trip.userName || "Unknown"}
              </p>
              {trip.rating > 0 && (
  <div className="mt-2 text-yellow-400 text-base sm:text-lg">
    {"★".repeat(trip.rating)}
    {"☆".repeat(5 - trip.rating)}
    <span className="text-gray-500 text-sm ml-2">
      ({trip.rating}/5)
    </span>
  </div>
)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlaceResult;