import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        const res = await fetch("http://localhost:2000/api/posts", {
          headers: {
            userid: user?._id,
          },
        });

        const data = await res.json();

        // 👉 Only user's trips
const myTrips = data.data || [];

        setTrips(myTrips);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTrips();
  }, []);

  // 📊 Trips count
  const totalTrips = trips.length;

  // 💸 Avg Budget
  const budgets = trips
    .map((t) => parseInt(t.budget))
    .filter((b) => !isNaN(b));

  const avgBudget =
    budgets.length > 0
      ? Math.round(budgets.reduce((a, b) => a + b, 0) / budgets.length)
      : 0;

  // ⭐ Avg Rating
  const ratings = trips
    .map((t) => t.averageRating)
    .filter((r) => r > 0);

  const avgRating =
    ratings.length > 0
      ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
      : 0;

  // 📍 Most visited place
  const placeCount = {};
  trips.forEach((t) => {
    if (t.location) {
      placeCount[t.location] = (placeCount[t.location] || 0) + 1;
    }
  });

  const mostVisited =
    Object.keys(placeCount).length > 0
      ? Object.keys(placeCount).reduce((a, b) =>
          placeCount[a] > placeCount[b] ? a : b
        )
      : "N/A";

 return (
   <div className="min-h-screen bg-gray-50 px-4 sm:px-6 md:px-10 py-8 md:py-12">
    
    {/* Heading */}
   <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-10">
      🌍 Your Travel Dashboard
    </h1>

    {/* Cards */}
   <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">

      {/* Trips */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-xl hover:scale-[1.02] transition duration-300">
        <p className="text-gray-500 text-xs sm:text-sm">Trips Created</p>
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mt-2 text-blue-600 truncate">{totalTrips}</h2>
      </div>

      {/* Budget */}
      <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-xl hover:scale-[1.02] transition duration-300">
        <p className="text-gray-500 text-sm">Avg Budget</p>
        <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-green-600">
          ₹ {avgBudget}
        </h2>
      </div>

      {/* Rating */}
      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
        <p className="text-gray-500 text-sm">Avg Rating</p>
        <h2 className="text-3xl font-bold mt-2 text-yellow-500">
          {avgRating} ⭐
        </h2>
      </div>

      {/* Location */}
      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
        <p className="text-gray-500 text-sm">Most Visited</p>
        <h2 className="text-2xl font-bold mt-2 text-blue-600">
          {mostVisited}
        </h2>
      </div>

    </div>

  </div>
);
};

export default Dashboard;