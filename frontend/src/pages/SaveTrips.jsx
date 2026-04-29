import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SavedTrips = () => {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        const res = await fetch(
          "http://localhost:2000/api/posts/saved/my",
          {
            credentials: "include",
          }
        );

        const data = await res.json();

        if (data.success) {
          setTrips(data.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchSaved();
  }, []);

  if (!trips.length) {
    return (
       <p className="text-center mt-20 text-gray-500 text-lg">
        No saved trips yet ❤️
      </p>
    );
  }

  return (
   <div className="px-4 sm:px-6 md:px-10 py-10 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {trips.map((trip) => (
        <div
          key={trip._id}
          onClick={() => navigate(`/trip/${trip._id}`)}
          className="bg-white rounded-2xl shadow-sm cursor-pointer hover:shadow-xl hover:scale-[1.02] transition duration-300 overflow-hidden"
        >
          <img
            src={`http://localhost:2000/${trip.galleryImages?.[0] || ""}`}
            className="h-40 sm:h-48 md:h-52 w-full object-cover"
          />

          <div className="p-4 space-y-1">
            <h2 className="font-semibold text-lg truncate">{trip.title}</h2>
            <p className="text-gray-500 text-sm truncate">{trip.location}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavedTrips;