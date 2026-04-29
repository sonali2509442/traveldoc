import React, { useState ,useEffect} from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Postcard from '../components/Postcard'
import heroImg from "../assets/TMX1145991747220153final banner.jpg";
import Banner from '../components/Banner';
import Footertop from '../components/Footertop';
import Footer from '../components/Footer';



const Home = () => {
    const [posts, setPosts] = useState([]); 
    const [topPosts, setTopPosts] = useState([]);
    const [location, setLocation] = useState("");
const [minBudget, setMinBudget] = useState("");
const [maxBudget, setMaxBudget] = useState("");
const [rating, setRating] = useState("");  // ⭐ create posts state

  // ⭐ Fetch posts from backend
  useEffect(() => {
    const getPosts = async () => {
      try {
        const query = new URLSearchParams({
  location,
  minBudget,
  maxBudget,
  rating,
});

const res = await fetch(
  `http://localhost:2000/api/posts?${query.toString()}`
);

        const data = await res.json();

        // ✅ Handle different backend formats safely
        if (Array.isArray(data)) {
          setPosts(data);
        } else if (Array.isArray(data.data)) {
          setPosts(data.data);
        } else {
          setPosts([]); // fallback
        }

      } catch (error) {
        console.error(error);
        setPosts([]);
      }
    };

    getPosts();
  }, [location, minBudget, maxBudget, rating]);


  useEffect(() => {
  const getTopPosts = async () => {
    try {
      const res = await fetch("http://localhost:2000/api/posts");
      const data = await res.json();

      let allPosts = [];

      if (Array.isArray(data)) {
        allPosts = data;
      } else if (Array.isArray(data.data)) {
        allPosts = data.data;
      }

      // sort by rating (safe fallback)
      const sorted = allPosts
        .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
        .slice(0, 6);

      setTopPosts(sorted);
    } catch (err) {
      console.error(err);
      setTopPosts([]);
    }
  };

  getTopPosts();
}, []);

  // create graph data
const chartData = posts && posts.length > 0
  ? posts.map((post) => ({
      name: post.title ? post.title.slice(0, 10) : "Trip",
      budget: Number(post.budget) || 0,
    }))
  : [];

  return (
  <div className="bg-[#FAF3E1]">

    {/* HERO */}
    <div className="w-full flex justify-center py-6 md:py-10">
      <div
        className="w-[95%] h-[250px] md:h-[400px] lg:h-[500px] bg-cover bg-center rounded-2xl shadow-lg flex items-center justify-center relative"
        style={{ backgroundImage: `url(${heroImg})` }}
      >
        <div className="absolute text-center text-[#D34E4E] px-16">
          <h1 className="text-2xl md:text-5xl font-bold drop-shadow-lg">
            Document Your Journey 🌍
          </h1>
          <p className="text-sm md:text-lg font-bold mt-2 text-[#D34E4E]">
            Share your trips. Inspire others.
          </p>
        </div>
      </div>
    </div>

    {/* BANNER */}
    <Banner />

    {/* ⭐ TOP RATED */}
    <div className="px-4 md:px-10 py-8">
      <h2 className="text-xl md:text-3xl font-bold mb-6 text-center">
        🌟 Top Rated Trips
      </h2>

      {topPosts.length === 0 ? (
        <p className="text-center text-gray-500">No top rated posts yet</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {topPosts.map((post) => (
            <Postcard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>

    {/* 🧭 FILTER SECTION (NEW UI) */}
    <div className="px-4 md:px-10 py-6">
      <h2 className="text-lg md:text-2xl font-semibold mb-4 text-center">
        🔍 Find Your Trip
      </h2>

      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="p-3 border rounded-lg w-full md:w-1/4"
        />

        <input
          type="number"
          placeholder="Min Budget"
          value={minBudget}
          onChange={(e) => setMinBudget(e.target.value)}
          className="p-3 border rounded-lg w-full md:w-1/5"
        />

        <input
          type="number"
          placeholder="Max Budget"
          value={maxBudget}
          onChange={(e) => setMaxBudget(e.target.value)}
          className="p-3 border rounded-lg w-full md:w-1/5"
        />

        <input
          type="number"
          placeholder="Rating ⭐"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="p-3 border rounded-lg w-full md:w-1/6"
        />
      </div>
    </div>

    {/* POSTS */}
    <div className="px-4 md:px-10 py-8">
      <h2 className="text-xl md:text-3xl font-bold mb-6 text-center">
        ✨ Recent Trips
      </h2>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts yet</p>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {posts.slice(0, 6).map((post) => (
            <Postcard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>

    {/* FOOTER */}
    <Footertop />
    <Footer />

  </div>
);
};

export default Home