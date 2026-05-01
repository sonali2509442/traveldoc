import React, { useState } from "react";

const CreatePost = () => {
  const [youtubeLink, setYoutubeLink] = useState("");
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [food, setFood] = useState("");
  const [budget, setBudget] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-16 space-y-28">

      {/* HERO TITLE */}
      <div className="text-center max-w-3xl mx-auto space-y-6">
        <input
          type="text"
          placeholder="Name your trip... e.g. Solo Trip to Manali 🏔️"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-4xl font-bold text-center bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 pb-2"
        />

        <p className="text-gray-500 text-lg">
          Give your journey a title that people will remember
        </p>
      </div>

      {/* PHOTO GALLERY */}
      <div className="grid md:grid-cols-2 gap-10 items-center">

        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://i.pinimg.com/736x/c0/26/39/c0263991b73e91f61d5e6f727ea08614.jpg"
            className="rounded-2xl h-60 object-cover shadow-lg"
          />
          <img
            src="https://i.pinimg.com/736x/14/2d/4c/142d4c448cf8df5fa363ab378c8a318f.jpg"
            className="rounded-2xl h-60 object-cover shadow-lg mt-10"
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-bold">📸 Travel Gallery</h2>
          <p className="text-gray-500">
            Share the photos that capture the soul of your trip.
          </p>

          <label className="block border-2 border-dashed border-gray-300 p-12 rounded-3xl text-center cursor-pointer hover:bg-gray-100 transition">
            Upload your travel photos
            <input type="file" accept="image/*" multiple className="hidden" />
          </label>
        </div>

      </div>

      {/* CINEMATIC SHORTS */}
      <div className="grid md:grid-cols-2 gap-10 items-center">

        <div className="grid grid-cols-2 gap-4">
          <img
            src="https://i.pinimg.com/736x/b8/65/96/b865960396e65aa2fdd8dae346f2c9a6.jpg"
            className="rounded-2xl h-60 object-cover shadow-lg"
          />
          <img
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
            className="rounded-2xl h-60 object-cover shadow-lg mt-10"
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-bold">
            🎬 Moments That Felt Like Cinema
          </h2>

          <p className="text-gray-500">
            Upload vertical shots — sunsets, slow walks, magical scenes.
          </p>

          <label className="block border-2 border-dashed border-gray-300 p-12 rounded-3xl text-center cursor-pointer hover:bg-gray-100 transition">
            Upload cinematic shorts
            <input type="file" accept="video/*" multiple className="hidden" />
          </label>
        </div>

      </div>

      {/* YOUTUBE VLOG */}
      <div className="grid md:grid-cols-2 gap-10 items-center">

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
          <img
            src="https://i.pinimg.com/1200x/bb/94/aa/bb94aaaf44014670939f68713734f6cb.jpg"
            className="rounded-3xl shadow-xl h-110 w-100"
          />

          <img
            src="https://i.pinimg.com/736x/56/67/31/5667319be12dbefa6833e82c831d578a.jpg"
            className="absolute -bottom-6 -left-6 w-40 rounded-2xl shadow-lg"
          />
        </div>

      </div>

      {/* MUST TRY FOOD */}
      {/* MUST TRY FOOD */}
<div className="grid md:grid-cols-2 gap-12 items-center">

  {/* LEFT — AESTHETIC FOOD PHOTOS */}
  <div className="grid grid-cols-2 gap-4">
    <img
      src="https://i.pinimg.com/1200x/b8/98/11/b898116687014fc8d5b4e37d45f75d75.jpg"
      className="rounded-3xl h-60 object-cover shadow-lg"
      alt="food"
    />
    <img
      src="https://i.pinimg.com/736x/6c/6b/56/6c6b568d887b07cd615510da930475e2.jpg"
      className="rounded-3xl h-60 object-cover shadow-lg mt-10"
      alt="food"
    />
  </div>

  {/* RIGHT — USER INPUT */}
  <div className="space-y-6">

    <h2 className="text-3xl font-bold">
      🍜 Must-Try Food
    </h2>

    <p className="text-gray-500 italic">
      “Every destination has a flavour that tells its story.”
    </p>

    {/* Food Name Input */}
    <input
      type="text"
      placeholder="Enter food name (e.g. Butter Chicken)"
      className="w-full p-4 rounded-xl border shadow-sm"
    />

    {/* Upload Food Image */}
    <label className="block border-2 border-dashed border-gray-300 p-10 rounded-3xl text-center cursor-pointer hover:bg-gray-100 transition">
      Upload food photo
      <input type="file" accept="image/*" className="hidden" />
    </label>

    {/* Description */}
    <textarea
      rows="3"
      placeholder="Why should people try this food?"
      className="w-full p-4 rounded-2xl border shadow-sm"
    />

  </div>

</div>

      {/* BUDGET BREAKDOWN */}
      <div className="max-w-3xl mx-auto space-y-6 text-center">

        <h2 className="text-3xl font-bold">💸 Budget Breakdown</h2>

        <textarea
          rows="4"
          placeholder="Share your total expenses, tips to save money..."
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className="w-full p-6 rounded-3xl border shadow-sm focus:outline-none"
        />

      </div>

      {/* STORY BEHIND TRIP */}
      {/* STORY BEHIND THE TRIP */}
<div className="grid md:grid-cols-2 gap-12 items-center">

  {/* LEFT — USER STORY INPUT */}
  <div className="space-y-6">

    <h2 className="text-3xl font-bold">
      🌟 Story Behind The Trip
    </h2>

    <p className="text-gray-500 italic">
      “Not every journey is about places… some are about healing, love, or finding yourself.”
    </p>

    {/* Story Text Area */}
    <textarea
      rows="8"
      placeholder="Why did this trip matter to you? What made it unforgettable?"
      className="w-full p-5 rounded-3xl border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
    />

    {/* Upload Memory Photo */}
    <label className="block border-2 border-dashed border-gray-300 p-10 rounded-3xl text-center cursor-pointer hover:bg-gray-100 transition">
      Upload a memory photo from this trip 💛
      <input type="file" accept="image/*" className="hidden" />
    </label>

  </div>

  {/* RIGHT — AESTHETIC MEMORY COLLAGE */}
  <div className="relative">

    {/* Main Image */}
    <img
    src="https://i.pinimg.com/736x/e8/72/21/e87221ebc80c2a295ae927c064eec660.jpg"
    alt=""
    className="w-[70%] h-[80%] object-cover rounded-3xl shadow-2xl z-10"
  />

    {/* Floating Images */}
    <img
    src="https://i.pinimg.com/736x/68/45/b4/6845b48935ad6c683a128434ef40f108.jpg"
    alt=""
    className="absolute left-6 top-10 w-40 h-52 object-cover rounded-2xl shadow-xl rotate-[-8deg]"
  />

     <img
    src="https://i.pinimg.com/1200x/26/72/45/267245ef32696d4e616200482b036a39.jpg"
    alt=""
    className="absolute right-6 bottom-8 w-36 h-48 object-cover rounded-2xl shadow-xl rotate-[6deg]"
  />

  </div>

</div>

      {/* SUBMIT */}
      <div className="text-center pt-10">
        <button className="bg-blue-600 text-white px-12 py-5 rounded-full text-xl font-semibold hover:bg-blue-700 transition shadow-lg">
          Publish  🚀
        </button>
      </div>

    </div>
  );
};

export default CreatePost;