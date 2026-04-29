import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";




const TripDetails = () => {
  const { id } = useParams(); // get trip id from URL
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userRating, setUserRating] = useState(0);
  const [saved, setSaved] = useState(false);
  

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
const isOwner =
  user && trip && user._id === trip.userId?.toString();

  

const handleRating = async (value) => {
  if (isOwner) return; // 🚫 extra safety

  try {
    const res = await fetch(
      `http://localhost:2000/api/posts/${trip._id}/rate`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ value }),
      }
    );

    const data = await res.json();

    if (!data.success) {
      alert(data.message); // shows "You cannot rate your own post"
      return;
    }

    setTrip((prev) => {
  const filteredRatings = prev.ratings.filter(
    (r) => r.userId !== user._id
  );

  return {
    ...prev,
    averageRating: data.averageRating,
    ratings: [
      ...filteredRatings,
      { userId: user._id, value },
    ],
  };
});
  } catch (err) {
    console.error(err);
  }
};


const handleSave = async () => {
  try {
    const res = await fetch(
      `http://localhost:2000/api/posts/${trip._id}/save`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    const data = await res.json();

    if (data.success) {
      setSaved(data.saved);
    }
  } catch (err) {
    console.log(err);
  }
};

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

const res = await fetch(`http://localhost:2000/api/posts/${id}`, {
  headers: {
    userid: user?._id,
  },
});
        // const data = await res.json();
        // console.log(data.data);
        // console.log(trip);

        const data = await res.json();
console.log("API DATA:", data.data); // ✅ correct
        const fixedData = {
  ...data.data,
  youtubeLink: Array.isArray(data.data.youtubeLink)
    ? data.data.youtubeLink
    : data.data.youtubeLink
    ? [data.data.youtubeLink]
    : [],
};

setTrip(fixedData);
setUserRating(fixedData.userRating || 0);
      } catch (err) {
        console.error(err);
        alert("Failed to load trip");
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [id]);

  useEffect(() => {
  if (!trip) return;

const myRating = trip.ratings?.find(
  (r) => r.userId?.toString() === user?._id?.toString()
);

  setUserRating(myRating ? myRating.value : 0);
}, [trip]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!trip) return <p className="text-center mt-10">Trip not found</p>;



const getEmbedUrl = (url) => {
  if (!url || typeof url !== "string") return null;

  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/
  );

  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
};

 return (
  <div className="px-4 sm:px-6 md:px-10 py-6 max-w-6xl mx-auto space-y-6 sm:space-y-10">

    {/* Title */}
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">{trip.title}</h1>
    <p className="text-center text-yellow-500 text-lg">
  ⭐ {trip.averageRating?.toFixed(1) || "0.0"} / 5
</p>


<button
  onClick={handleSave}
  className="block mx-auto bg-black text-white px-4 py-2 rounded text-sm sm:text-base"
>
  {saved ? "❤️ Saved" : "🤍 Save"}
</button>


{!isOwner && (
  <div className="flex justify-center gap-1">
    {[1,2,3,4,5].map((star) => (
      <span
        key={star}
        onClick={() => {
  setUserRating(star);
  handleRating(star); // ✅ send instantly
}}
        className={
          star <= userRating
            ? "text-yellow-400 text-2xl sm:text-3xl cursor-pointer"
            : "text-gray-300 text-3xl cursor-pointer"
        }
      >
        ★
      </span>
    ))}

 
  </div>
)}

    {/* Story */}
    {trip.story && (
      <p className="text-gray-700 text-center max-w-2xl mx-auto">
        {trip.story}
      </p>
    )}

    {/* Gallery */}
    {trip.galleryImages?.length > 0 && (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">📸 Travel Gallery</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {trip.galleryImages.map((img, index) => (
            <img
              key={index}
              src={`http://localhost:2000/${img}`}
              className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-xl"
            />
          ))}
        </div>
      </div>
    )}

    {/* Cinematic Shorts */}
    {trip.shortVideos?.length > 0 && (
  <div className="space-y-4">
    <h2 className="text-2xl font-semibold">🎬 Cinematic Shorts</h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {trip.shortVideos.map((video, index) => (
        <div
          key={index}
          className="w-full h-48 sm:h-56 md:h-64 bg-black rounded-xl overflow-hidden flex items-center justify-center"
        >
          <video controls className="max-h-full max-w-full">
            <source
              src={`http://localhost:2000/${video}`}
              type="video/mp4"
            />
          </video>
        </div>
      ))}
    </div>
  </div>
)}

    {/* YouTube */}
{Array.isArray(trip.youtubeLink) &&
  trip.youtubeLink
    .filter((link) => link && link.trim() !== "" && getEmbedUrl(link))
    .length > 0 && (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">📺 Full Vlogs</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trip.youtubeLink
          .filter((link) => link && link.trim() !== "" && getEmbedUrl(link))
          .map((link, index) => (
            <iframe
              key={index}
              className="w-full h-48 sm:h-56 md:h-64 rounded-xl"
              src={getEmbedUrl(link)} // ✅ always valid now
              title="YouTube video"
              allowFullScreen
            />
          ))}
      </div>
    </div>
)}

    {/* Food */}
 {trip.foodItems?.length > 0 && (
  <div className="space-y-4 bg-gray-100 p-5 rounded-xl">
    <h2 className="text-2xl font-semibold">🍜 Food Spots</h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {trip.foodItems.map((item, i) => (
        <div
          key={i}
          className="bg-white p-4 rounded-xl shadow space-y-2"
        >
          {/* Title */}
          <h3 className="font-bold text-lg">{item.name}</h3>

          {/* Details */}
          <p className="text-gray-600">📍 {item.location}</p>
          <p>💰 {item.price}</p>
          <p>⭐ {item.rating}</p>

          {/* FOOD IMAGES (if you added uploads) */}
          {item.images?.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mt-2">
              {item.images.map((img, index) => (
                <div
                  key={index}
                  className="w-full h-24 sm:h-28 md:h-32 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center"
                >
                  <img
                    src={`http://localhost:2000/${img}`}
                    className="max-h-full max-w-full object-contain"
                    alt=""
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
)}

    {/* Budget */}
    {trip.budget && (
      <div className="space-y-2 bg-gray-100 p-5 rounded-xl">
        <h2 className="text-2xl font-semibold">💸 Budget</h2>
        <p className="text-gray-700">{trip.budget}</p>
      </div>
    )}
{(trip.foodExpense || trip.travelExpense || trip.stayExpense) && (
  <div className="space-y-2 bg-gray-100 p-5 rounded-xl">
    <h2 className="text-2xl font-semibold">📊 Expense Breakdown</h2>

    {trip.foodExpense && <p>🍜 Food: {trip.foodExpense}</p>}
    {trip.travelExpense && <p>🚌 Travel: {trip.travelExpense}</p>}
    {trip.stayExpense && <p>🏨 Stay: {trip.stayExpense}</p>}
  </div>
)}


    {/* Memory */}
   {trip.memoryImage?.length > 0 && (
  <div className="space-y-4">
  <h2 className="text-xl sm:text-2xl font-semibold">Memory Images</h2>

  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
    {trip.memoryImage.map((img, i) => (
      <div
        key={i}
        className="w-full h-32 sm:h-40 md:h-48 bg-gray-100 rounded-xl overflow-hidden flex items-center justify-center"
      >
        <img
          src={`http://localhost:2000/${img}`}
          className="max-h-full max-w-full object-contain"
          alt=""
        />
      </div>
    ))}
  </div>
  </div>
)}
<button
  onClick={() => navigate(`/edit/${trip._id}`)}
  className="block mx-auto bg-black text-white px-5 py-2.5 rounded-lg text-sm sm:text-base"
>
  Edit Post ✏️
</button>
  </div>

  
);
};

export default TripDetails;