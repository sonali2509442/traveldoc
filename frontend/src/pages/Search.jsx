import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Search = () => {
  const [query, setQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState({});



  const getPlaceImage = async (place) => {
  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${place}&per_page=1`,
      {
        headers: {
          Authorization: "j16SZVClrE6cvsW3PrInUASPA4L7mkgMWsbOgkk8WvAqdhlfgetcFebh",
        },
      }
    );

    const data = await res.json();
    return data.photos?.[0]?.src?.large2x;
  } catch (err) {
    console.log(err);
    return null;
  }
};

  // ✅ Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:2000/api/posts");
        const data = await res.json();
        console.log(data);
        setPosts(data?.data || []);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch trips");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // ✅ Extract UNIQUE places
 
const places = [
  ...new Set(
    posts
      .map((post) => post.location)
      .filter((location) => location && location.trim() !== "")
  ),
];

useEffect(() => {
  const loadImages = async () => {
    const temp = {};

    for (let post of posts) {
  if (!post.location || post.location.trim() === "") continue;

  if (!temp[post.location]) {
        const img = await getPlaceImage(post.location);
        temp[post.location] = img;
      }
    }

    setImages(temp);
  };

  if (posts.length > 0) {
    loadImages();
  }
}, [posts]);

  // ✅ Filter based on search
  const filteredPlaces = places.filter((place) =>
    place.toLowerCase().includes(query.toLowerCase())
  );

  if (loading) return <p className="text-center mt-12 text-gray-500">Loading places...</p>;

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 md:px-10 py-8 md:py-10">

      {/* 🔍 SEARCH BAR */}
     <div className="max-w-2xl mx-auto mb-6 md:mb-10">
        <input
          type="text"
          placeholder="Search a place..."
         className="w-full p-3 sm:p-4 rounded-xl border shadow-sm text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-black"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* 🌍 PLACES GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {filteredPlaces.map((place, index) => {
          // ✅ AUTO RANDOM IMAGE FOR ANY PLACE
          // const image = `https://picsum.photos/seed/${encodeURIComponent(place + index)}/600/400`;
         const image =
  images[place] ||
  "https://via.placeholder.com/600x400?text=Loading...";

          return (
            <Link to={`/place/${place}`} key={index}>
              <div className="relative h-40 sm:h-48 md:h-52 rounded-2xl overflow-hidden shadow-md hover:shadow-xl cursor-pointer group transition duration-300">

                {/* IMAGE */}
                <img
                  src={image}
                  alt={place}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition duration-300"></div>

                {/* PLACE NAME */}
                <h2 className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 text-white text-base sm:text-lg md:text-xl font-semibold capitalize truncate">
                  {place}
                </h2>

              </div>
            </Link>
          );
        })}
      </div>

      {/* ❌ NO RESULTS */}
      {filteredPlaces.length === 0 && (
        <p className="text-center mt-12 text-gray-500 text-sm sm:text-base">
          No places found 😢
        </p>
      )}
    </div>
  );
};

export default Search;