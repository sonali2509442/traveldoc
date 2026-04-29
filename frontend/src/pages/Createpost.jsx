import React, { useState } from "react";

const CreatePost = () => {
  const [youtubeLink, setYoutubeLink] = useState("");
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [budget, setBudget] = useState("");
  const [foodExpense, setFoodExpense] = useState("");
const [travelExpense, setTravelExpense] = useState("");
const [stayExpense, setStayExpense] = useState("");

  const [foodItems, setFoodItems] = useState([
    {
      name: "",
      location: "",
      price: "",
      rating: 0,
      images: [],
    },
  ]);

  const [galleryImages, setGalleryImages] = useState([]);
  const [shortVideos, setShortVideos] = useState([]);
  const [memoryImage, setMemoryImage] = useState([]);

  // const [userName, setUserName] = useState("");
  const [location, setLocation] = useState("");

  // ⭐ file names (to show user)
  const [galleryNames, setGalleryNames] = useState([]);
  const [videoNames, setVideoNames] = useState([]);
  const [memoryImageName, setMemoryImageName] = useState([]);

  const addFoodItem = () => {
    setFoodItems([
      ...foodItems,
      { name: "", location: "", price: "", rating: 0, images: [] },
    ]);
  };

  //publish return
  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("youtubeLink", JSON.stringify([youtubeLink]));
    formData.append("budget", Number(budget));
    formData.append("story", story);
    formData.append("location", location);
    formData.append("foodExpense", foodExpense);
formData.append("travelExpense", travelExpense);
formData.append("stayExpense", stayExpense);
    const cleanedFoodItems = foodItems.map(item => ({
  name: item.name,
  location: item.location,
  price: item.price,
  rating: item.rating,
  images: []   // ❗ important: remove File objects
}));

formData.append("foodItems", JSON.stringify(cleanedFoodItems));
foodItems.forEach((item) => {
  item.images.forEach(file => {
    formData.append("foodImages", file);
  });
});

    for (let file of galleryImages) {
      formData.append("galleryImages", file);
    }

    for (let file of shortVideos) {
      formData.append("shortVideos", file);
    }

    for (let file of memoryImage) {
      formData.append("memoryImage", file);
    }

    try {
      const res = await fetch("http://localhost:2000/api/posts", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      let data;
      try {
        data = await res.json();
      } catch (err) {
        console.error("Not JSON response:", err);
        alert("Server error (not JSON) ❌");
        return;
      }

      if (!res.ok) {
        if (res.status === 401) {
          alert("Please login first 🔐");
          window.location.href = "/login";
          return;
        }

        alert(data.message || "Error occurred");
        return;
      }

      alert("Post Created Successfully 🚀");

window.location.href = `/trip/${data.data._id}`;
    } catch (err) {
      console.error(err);
      alert("Something went wrong ❌");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this post?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `http://localhost:2000/api/posts/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Post deleted successfully 🗑️");
        window.location.reload();
      } else {
        alert("Delete failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 md:px-10 py-10 md:py-16 space-y-16 md:space-y-24">

      {/* HERO TITLE */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <input
          type="text"
          placeholder="Name your trip... e.g. Solo Trip to Manali 🏔️"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-2xl sm:text-3xl md:text-4xl font-bold text-center bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 pb-2"
        />

        <input
          type="text"
          placeholder="Enter place (Manali, Goa...)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-3 rounded-xl border shadow-sm text-sm md:text-base"
        />

        <p className="text-gray-500 text-lg">
          Give your journey a title that people will remember
        </p>
      </div>

      {/* PHOTO GALLERY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
       <div className="grid grid-cols-2 gap-3 sm:gap-4">
          <img src="https://i.pinimg.com/736x/c0/26/39/c0263991b73e91f61d5e6f727ea08614.jpg" className="rounded-2xl h-32 sm:h-44 md:h-60 object-cover shadow-lg" />
          <img src="https://i.pinimg.com/736x/14/2d/4c/142d4c448cf8df5fa363ab378c8a318f.jpg" className="rounded-2xl h-32 sm:h-44 md:h-60 object-cover shadow-lg mt-6" />
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-bold">📸 Travel Gallery</h2>
          <p className="text-gray-500">
            Share the photos that capture the soul of your trip.
          </p>

          <label className="block border-2 border-dashed border-gray-300 p-6 sm:p-8 md:p-12 rounded-3xl text-center cursor-pointer hover:bg-gray-100 transition">
            Upload your travel photos

            <input
              id="galleryInput"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                const files = Array.from(e.target.files);
                setGalleryImages(prev => [...prev, ...files]);
                setGalleryNames(prev => [...prev, ...files.map(f => f.name)]);
              }}
            />

            {galleryNames.map((name, i) => (
              <p key={i}>{name}</p>
            ))}
          </label>

          <button
            type="button"
            onClick={() => document.getElementById("galleryInput").click()}
            className="px-5 py-2 text-sm md:text-base bg-blue-500 text-white rounded-full w-full sm:w-auto mt-2"
          >
            ➕ Add More
          </button>
        </div>
      </div>

      {/* CINEMATIC SHORTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <img src="https://i.pinimg.com/736x/b8/65/96/b865960396e65aa2fdd8dae346f2c9a6.jpg" className="rounded-2xl h-40 sm:h-52 md:h-60 object-cover shadow-lg" />
          <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470" className="rounded-2xl h-40 sm:h-52 md:h-60 object-cover shadow-lg mt-10" />
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-bold">🎬 Moments That Felt Like Cinema</h2>
          <p className="text-gray-500">
            Upload vertical shots — sunsets, slow walks, magical scenes.
          </p>

          <label className="block border-2 border-dashed border-gray-300 p-6 sm:p-8 md:p-12 rounded-3xl text-center cursor-pointer hover:bg-gray-100 transition">
            Upload cinematic shorts

            <input
              id="videoInput"
              type="file"
              accept="video/*"
              multiple
              className="hidden"
              onChange={(e) => {
                const files = Array.from(e.target.files);
                setShortVideos(prev => [...prev, ...files]);
                setVideoNames(prev => [...prev, ...files.map(f => f.name)]);
              }}
            />

            {videoNames.map((name, i) => (
              <p key={i}>{name}</p>
            ))}
          </label>

          <button
            type="button"
            onClick={() => document.getElementById("videoInput").click()}
            className="px-5 py-2 text-sm md:text-base bg-blue-500 text-white rounded-full w-full sm:w-auto"
          >
            ➕ Add More
          </button>
        </div>
      </div>

      {/* YOUTUBE VLOG */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">📺 Watch The Full Journey</h2>
          <p className="text-gray-500">
            Got a full vlog? Let people experience your adventure.
          </p>

          <input
            type="text"
            placeholder="Paste your YouTube link..."
            value={youtubeLink}
            onChange={(e) => setYoutubeLink(e.target.value)}
            className="w-full p-4 rounded-xl border shadow-sm"
          />

          <button className="bg-red-500 text-white px-8 py-3 rounded-full hover:bg-red-600 transition">
            Preview Vlog
          </button>
        </div>

        <div className="relative">
          <img src="https://i.pinimg.com/1200x/bb/94/aa/bb94aaaf44014670939f68713734f6cb.jpg" className="rounded-3xl shadow-xl w-full h-64 sm:h-80 md:h-[420px] object-cover" />
          <img src="https://i.pinimg.com/736x/56/67/31/5667319be12dbefa6833e82c831d578a.jpg" className="absolute -bottom-6 -left-6 w-40 rounded-2xl shadow-lg" />
        </div>
      </div>

      {/* MUST TRY FOOD */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <img src="https://i.pinimg.com/1200x/b8/98/11/b898116687014fc8d5b4e37d45f75d75.jpg" className="rounded-3xl h-40 sm:h-52 md:h-60 object-cover shadow-lg" />
          <img src="https://i.pinimg.com/736x/6c/6b/56/6c6b568d887b07cd615510da930475e2.jpg" className="rounded-3xl h-40 sm:h-52 md:h-60 object-cover shadow-lg mt-10" />
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-bold">🍜 Must-Try Food</h2>

          {foodItems.map((item, index) => (
            <div key={index} className="border p-4 md:p-5 rounded-xl space-y-3 shadow-sm bg-white">
              <input
                placeholder="Food name"
                value={item.name}
                onChange={(e) => {
                  const updated = [...foodItems];
                  updated[index].name = e.target.value;
                  setFoodItems(updated);
                }}
                className="w-full p-2 border rounded text-sm md:text-base"
              />

              <input
                placeholder="Location / shop"
                value={item.location}
                onChange={(e) => {
                  const updated = [...foodItems];
                  updated[index].location = e.target.value;
                  setFoodItems(updated);
                }}
                className="w-full p-2 border rounded text-sm md:text-base"
              />

              <input
                placeholder="Price"
                value={item.price}
                onChange={(e) => {
                  const updated = [...foodItems];
                  updated[index].price = e.target.value;
                  setFoodItems(updated);
                }}
               className="w-full p-2 border rounded text-sm md:text-base"
              />

              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  const updated = [...foodItems];
                  updated[index].images = [
                    ...(updated[index].images || []),
                    ...files
                  ];
                  setFoodItems(updated);
                }}
                className="w-full p-2 border rounded text-sm md:text-base"
              />

              {item.images?.map((file, i) => (
                <p key={i}>{file.name}</p>
              ))}
            </div>
          ))}

          <button onClick={addFoodItem} className="px-5 py-2 text-sm md:text-base bg-blue-500 text-white rounded-full w-full sm:w-auto">
            ➕ Add Food Item
          </button>
        </div>
      </div>

      {/* BUDGET */}
      <div className="max-w-3xl mx-auto space-y-6 text-center px-2">
        <h2 className="text-3xl font-bold">💸 Budget Breakdown</h2>

       <input
  type="number"
  placeholder="Enter total budget (e.g. 20000)"
  value={budget}
  onChange={(e) => setBudget(e.target.value)}
  className="w-full p-4 md:p-6 rounded-3xl border shadow-sm text-sm md:text-base"
/>

       <input
  placeholder="Food Expense"
  value={foodExpense}
  onChange={(e) => setFoodExpense(e.target.value)}
 className="w-full p-4 md:p-6 rounded-3xl border shadow-sm text-sm md:text-base"
/>

<input
  placeholder="Travel Expense"
  value={travelExpense}
  onChange={(e) => setTravelExpense(e.target.value)}
  className="w-full p-4 md:p-6 rounded-3xl border shadow-sm text-sm md:text-base"
/>

<input
  placeholder="Stay Expense"
  value={stayExpense}
  onChange={(e) => setStayExpense(e.target.value)}
  className="w-full p-4 md:p-6 rounded-3xl border shadow-sm text-sm md:text-base"
/>    
  </div>

      {/* STORY + MEMORY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        <div className="space-y-6">
          <h2 className="text-3xl font-bold">🌟 Story Behind The Trip</h2>

          <textarea
            rows="8"
            value={story}
            onChange={(e) => setStory(e.target.value)}
            className="w-full p-4 md:p-5 rounded-3xl border shadow-sm text-sm md:text-base"
          />

          <label className="block border-2 border-dashed border-gray-300 p-10 rounded-3xl text-center cursor-pointer">
            Upload a memory photo 💛

            <input
              id="memoryInput"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => {
                const files = Array.from(e.target.files);
                setMemoryImage(prev => [...prev, ...files]);
                setMemoryImageName(prev => [...prev, ...files.map(f => f.name)]);
              }}
            />

            {memoryImageName.map((name, i) => (
              <p key={i}>{name}</p>
            ))}
          </label>
        </div>

        <div className="relative">
          <img src="https://i.pinimg.com/736x/e8/72/21/e87221ebc80c2a295ae927c064eec660.jpg" className="w-[70%] rounded-3xl" />

          <img src="https://i.pinimg.com/736x/68/45/b4/6845b48935ad6c683a128434ef40f108.jpg" className="absolute left-6 top-10 w-40 rounded-2xl" />

          <img src="https://i.pinimg.com/1200x/26/72/45/267245ef32696d4e616200482b036a39.jpg" className="absolute right-6 bottom-8 w-36 rounded-2xl" />
        </div>
      </div>

      {/* SUBMIT */}
      <div className="text-center pt-10">
        <button
          onClick={handleSubmit}
         className="bg-blue-600 text-white px-8 md:px-12 py-4 md:py-5 rounded-full text-lg md:text-xl font-semibold w-full md:w-auto"
        >
          Publish 🚀
        </button>
      </div>

    </div>
  );
};

export default CreatePost;
