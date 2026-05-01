import React from 'react'

import { useState } from "react";
import { Link } from "react-router-dom";

const dummyPosts = [
  {
    id: 1,
    title: "Beach trip to Goa",
    place: "Goa",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    budget: "₹12,000",
    stay: "Beach Resort",
  },
  {
    id: 2,
    title: "Snow adventure in Manali",
    place: "Manali",
    image:
      "https://images.unsplash.com/photo-1549880338-65ddcdfd017b",
    budget: "₹10,000",
    stay: "Mountain Hostel",
  },
  {
    id: 3,
    title: "Temple visit to Puri",
    place: "Puri",
    image:
      "https://images.unsplash.com/photo-1593642634367-d91a135587b5",
    budget: "₹5,000",
    stay: "Hotel Sea View",
  },
];

const Search = () => {
    const [query, setQuery] = useState("");

  const filteredPosts = dummyPosts.filter((post) =>
    post.place.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <input
          type="text"
          placeholder="Search a place..."
          className="w-full p-4 rounded-xl border shadow-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Results */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          
 <Link to={`/place/${post.place}`} key={post.id}>
           <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={post.image}
              alt={post.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-4">
              <h3 className="font-bold text-lg">{post.title}</h3>
              <p className="text-gray-600">📍 {post.place}</p>
              <p className="text-gray-600">🏨 {post.stay}</p>
              <p className="text-gray-800 font-semibold">
                💰 {post.budget}
              </p>
            </div>
          </div>
          </Link>

        ))}
      </div>

      {/* No Results */}
      {filteredPosts.length === 0 && (
        <p className="text-center mt-10 text-gray-500">
          No trips found for this place 😢
        </p>
      )}
    </div>
  )
}

export default Search