import React from "react";
import { useNavigate } from "react-router-dom";  // 🔥 add this

const Postcard = ({ post }) => {
  const BASE_URL = "http://localhost:2000";
  const navigate = useNavigate();  // 🔥 add this

  if (!post) return null;

  return (
    <div
      onClick={() => navigate(`/trip/${post._id}`)}  // 🔥 add this
      className="border rounded-lg overflow-hidden shadow cursor-pointer hover:shadow-lg transition"
    >
      <img
        src={
          post.galleryImages?.[0]
            ? `${BASE_URL}/${post.galleryImages[0]}`
            : "https://via.placeholder.com/300"
        }
        className="w-full h-48 object-cover"
        alt={post.title}
      />

      <div className="p-4">
        <h2 className="font-bold text-lg">{post.title}</h2>

        <p className="text-sm text-gray-500">
          by {post.userName || "Anonymous"}
        </p>

        <p className="text-sm text-gray-600">
          {post.story?.slice(0, 60)}...
        </p>
      </div>
    </div>
  );
};

export default Postcard;