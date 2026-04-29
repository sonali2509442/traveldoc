
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

const [formData, setFormData] = useState({
  title: "",
  youtubeLink: [],
  budget: "",
  story: "",
  foodName: "",
  foodDesc: "",
  location: "",
  galleryImages: [],
  shortVideos: [],
foodItems: [
  {
    name: "",
    location: "",
    price: "",
    images: []
  }
],
  memoryImage: [],
  rating: 0,
});

  const [newImages, setNewImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newShortVideos, setNewShortVideos] = useState([]);
 

const [newMemoryImages, setNewMemoryImages] = useState([]);

  // 🧠 Fetch existing post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:2000/api/posts/${id}`);
        const data = await res.json();

        if (data.success) {
        setFormData({
  title: data.data.title || "",
youtubeLink: Array.isArray(data.data.youtubeLink)
  ? data.data.youtubeLink
  : data.data.youtubeLink
  ? [data.data.youtubeLink]
  : [],
  budget: data.data.budget || "",
  story: data.data.story || "",
  foodName: data.data.foodName || "",
  foodDesc: data.data.foodDesc || "",
  location: data.data.location || "",
  galleryImages: data.data.galleryImages || [],
  shortVideos: data.data.shortVideos || [],
  foodItems: data.data.foodItems?.length
  ? data.data.foodItems
  : [
      { name: "", location: "", price: "", images: [] }
    ],
  memoryImage: data.data.memoryImage || [],
  rating: data.data.rating || 0,
});
        }
      } catch (err) {
        console.error(err);
        alert("Failed to load post ❌");
      }
    };

    fetchPost();
  }, [id]);

  // ✏️ handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ❌ remove image (UI only)
  const removeImage = (index) => {
    const updated = [...formData.galleryImages];
    updated.splice(index, 1);
    setFormData({ ...formData, galleryImages: updated });
  };
  // remove food image
const removeFoodImage = (index) => {
  const updated = [...formData.foodItems];
  updated.splice(index, 1);
  setFormData({ ...formData, foodItems: updated });
};
// remove memory image
const removeMemoryImage = (index) => {
  const updated = [...formData.memoryImage];
  updated.splice(index, 1);
  setFormData({ ...formData, memoryImage: updated });
};

// remove short video
const removeShortVideo = (index) => {
  const updated = [...formData.shortVideos];
  updated.splice(index, 1);
  setFormData({ ...formData, shortVideos: updated });
};

  // 🎬 YouTube ID
 const getYouTubeId = (url) => {
  if (!url || typeof url !== "string") return "";

  const regExp = /(?:youtube\.com\/.*v=|youtu\.be\/)([^&\n?#]+)/;
  const match = url.match(regExp);

  return match ? match[1] : "";
};



  // 🚀 UPDATE POST
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
   
const form = new FormData();

form.append("title", formData.title);
form.append(
  "youtubeLink",
  JSON.stringify(formData.youtubeLink)
);
form.append("budget", formData.budget);
form.append("story", formData.story);
form.append("foodName", formData.foodName);
form.append("foodDesc", formData.foodDesc);
form.append("location", formData.location);
form.append("rating", formData.rating);


// ✅ gallery FIX
newImages.forEach((file) => {
  form.append("galleryImages", file);
});

form.append(
  "existingGalleryImages",
  JSON.stringify(formData.galleryImages)
);
// // gallery
// (Array.isArray(formData.shortVideos) ? formData.shortVideos : []).forEach((vid) => {
//   form.append("shortVideos", vid);
// });

// (Array.isArray(formData.foodImage) ? formData.foodImage : []).forEach((img) => {
//   form.append("foodImage", img);
// });

// (Array.isArray(formData.memoryImage) ? formData.memoryImage : []).forEach((img) => {
//   form.append("memoryImage", img);
// });




// ✅ NEW FILES
newShortVideos.forEach((file) => {
  form.append("shortVideos", file);
});



newMemoryImages.forEach((file) => {
  form.append("memoryImage", file);
});

// form.append(
//   "foodItems",
//   JSON.stringify(formData.foodItems)
// );

const cleanedFoodItems = formData.foodItems.map((item) => ({
  ...item,
  images: item.images.filter((img) => typeof img === "string") // keep only old images
}));

form.append("foodItems", JSON.stringify(cleanedFoodItems));

formData.foodItems.forEach((item, index) => {
  item.images.forEach((img) => {
    if (img instanceof File) {
      form.append(`foodImages_${index}`, img); // ✅ CORRECT
    }
  });
});
// ✅ EXISTING FILES
form.append(
  "existingShortVideos",
  JSON.stringify(formData.shortVideos)
);


form.append(
  "existingMemoryImages",
  JSON.stringify(formData.memoryImage)
);
      const res = await fetch(`http://localhost:2000/api/posts/${id}`, {
        method: "PUT",
       credentials: "include",
        body: form,
      });

      const data = await res.json();
      console.log(data);

      if (data.success) {
        alert("Updated successfully ✅");
        navigate(`/trip/${id}`);
      } else {
        alert(data.message || "Update failed ❌");
      }

    } catch (err) {
      console.error(err);
      alert("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
   <div className="min-h-screen bg-gradient-to-br from-[#fdfbfb] via-[#ebedee] to-[#fdfbfb] py-6 sm:py-10 px-3 sm:px-6">

     <div className="max-w-6xl mx-auto space-y-6 sm:space-y-10">

        {/* HEADER */}
        <div className="space-y-2">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="text-xl sm:text-2xl md:text-3xl font-bold w-full bg-transparent outline-none"
          />

          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="text-gray-500 w-full bg-transparent outline-none"
          />
        </div>

        {/* HERO IMAGE */}
        {formData.galleryImages?.[0] && (
          <div className="overflow-hidden rounded-3xl shadow-lg">
            <img
              src={`http://localhost:2000/${formData.galleryImages[0]}`}
              className="w-full h-52 sm:h-72 md:h-[400px] object-cover"
              alt="cover"
            />
          </div>
        )}

        {/* STORY */}
        <div className="bg-white/70 backdrop-blur p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-md">
          <textarea
            name="story"
            value={formData.story}
            onChange={handleChange}
            placeholder="Write your experience..."
            className="w-full outline-none text-gray-700 bg-transparent"
            rows="4"
          />
        </div>

        {/* GALLERY */}
        <div>
          <h2 className="font-semibold mb-4 text-lg">Photos</h2>

          <div className="columns-1 sm:columns-2 md:columns-3 gap-3 sm:gap-4 space-y-3 sm:space-y-4">
            {formData.galleryImages?.map((img, index) => (
              <div key={index} className="relative group break-inside-avoid">

                <img
                  src={`http://localhost:2000/${img}`}
                  className="w-full rounded-2xl shadow-md"
                  alt="gallery"
                />

                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-2xl transition"
                >
                  Remove
                </button>

              </div>
            ))}

            {newImages.map((img, index) => (
  <div key={index} className="relative group break-inside-avoid">

    <img
      src={URL.createObjectURL(img)}
      className="w-full rounded-2xl shadow-md"
      alt="new"
    />

    <button
      type="button"
      onClick={() => {
        const updated = [...newImages];
        updated.splice(index, 1);
        setNewImages(updated);
      }}
      className="absolute inset-0 bg-black/40 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-2xl transition"
    >
      Remove
    </button>

  </div>
))}

            {/* ADD IMAGE */}
            <label className="break-inside-avoid h-32 sm:h-40 flex items-center justify-center bg-white/70 rounded-xl sm:rounded-2xl cursor-pointer shadow-md">
              <span className="text-gray-400 text-lg">+ Add</span>
              <input
                type="file"
                multiple
                hidden
               onChange={(e) => {
  setNewImages([
    ...newImages,
    ...Array.from(e.target.files),
  ]);
  e.target.value = null;
}}
              />
            </label>
          </div>
        </div>

        {/* short video */}
<div>
  <h2 className="font-semibold mb-4 text-lg">Short Videos</h2>

  <div className="flex flex-wrap gap-4">

    {/* Existing videos */}
    {formData.shortVideos.map((vid, index) => (
      <div key={index} className="relative">
        <video
          src={`http://localhost:2000/${vid}`}
          className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded"
          controls
        />
        <button
          type="button"
          onClick={() => removeShortVideo(index)}
          className="absolute top-1 right-1 bg-black text-white px-2 rounded"
        >
          X
        </button>
      </div>
    ))}

    {/* New videos */}
   {newShortVideos.map((vid, index) => (
  <div key={index} className="relative">
    <video
      src={URL.createObjectURL(vid)}
      className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded"
      controls
    />

    <button
      onClick={() => {
        const updated = [...newShortVideos];
        updated.splice(index, 1);
        setNewShortVideos(updated);
      }}
      className="absolute top-1 right-1 bg-black text-white px-2 rounded"
    >
      X
    </button>
  </div>
))}

    {/* Add button */}
    <label className="w-32 h-32 flex items-center justify-center bg-white/70 rounded cursor-pointer">
      + Add
      <input
        type="file"
        hidden
        multiple
        accept="video/*"
      onChange={(e) => {
  setNewShortVideos([
    ...newShortVideos,
    ...Array.from(e.target.files),
  ]);
  e.target.value = null;
}}
      />
    </label>

  </div>
</div>
        {/* YOUTUBE */}
        <div className="bg-white/70 backdrop-blur p-6 rounded-3xl shadow-md space-y-3">
        <div className="space-y-3">

  {/* Existing Links */}
  {formData.youtubeLink.map((link, index) => {
    const id = getYouTubeId(link);
    return (
      <div key={index} className="relative">
        <iframe
          className="w-full h-48 sm:h-60 rounded-2xl shadow"
          src={`https://www.youtube.com/embed/${id}`}
          allowFullScreen
          title="YouTube"
        />
        <button
          onClick={() => {
            const updated = [...formData.youtubeLink];
            updated.splice(index, 1);
            setFormData({ ...formData, youtubeLink: updated });
          }}
          className="absolute top-2 right-2 bg-black text-white px-2 rounded"
        >
          X
        </button>
      </div>
    );
  })}

  {/* Add New */}
  <input
    placeholder="Paste YouTube link & press Enter"
    className="w-full p-3 rounded-xl bg-white outline-none"
    onKeyDown={(e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const value = e.target.value.trim();
        if (!value) return;

        setFormData({
          ...formData,
          youtubeLink: [...formData.youtubeLink, value],
        });

        e.target.value = "";
      }
    }}
  />

</div>

        </div>

        {/* food */}
<div>
  <h2 className="font-semibold mb-4 text-lg">Food Images</h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

    {/* Existing */}
   {formData.foodItems.map((item, index) => (
  <div key={index} className="border p-3 sm:p-4 rounded-xl space-y-2 bg-white/60">

    <input
      value={item.name}
      onChange={(e) => {
        const updated = [...formData.foodItems];
        updated[index].name = e.target.value;
        setFormData({ ...formData, foodItems: updated });
      }}
      placeholder="Food name"
      className="w-full p-2 border"
    />

    <input
      value={item.location}
      onChange={(e) => {
        const updated = [...formData.foodItems];
        updated[index].location = e.target.value;
        setFormData({ ...formData, foodItems: updated });
      }}
      placeholder="Location"
      className="w-full p-2 border"
    />

    <input
      value={item.price}
      onChange={(e) => {
        const updated = [...formData.foodItems];
        updated[index].price = e.target.value;
        setFormData({ ...formData, foodItems: updated });
      }}
      placeholder="Price"
      className="w-full p-2 border"
    />
<input
  type="file"
  multiple
  onChange={(e) => {
    const files = Array.from(e.target.files);

    const updated = [...formData.foodItems];

    updated[index].images = [
      ...(updated[index].images || []),
      ...files
    ];

    setFormData({ ...formData, foodItems: updated });
  }}
/>
    {/* Images */}
 {item.images?.map((img, i) => (
  <img
    key={i}
    src={
      typeof img === "string"
        ? `http://localhost:2000/${img}`
        : URL.createObjectURL(img)
    }
    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded"
  />
))}

  </div>
))}

    {/* New */}

    {/* Add */}
 <label className="w-24 h-24 bg-white/70 flex items-center justify-center cursor-pointer rounded">
  + Add
  <input
    type="file"
    hidden
    multiple
    onChange={(e) => {
      const files = Array.from(e.target.files);

      const newItem = {
        name: "",
        location: "",
        price: "",
        images: files,
      };

      setFormData({
        ...formData,
        foodItems: [...formData.foodItems, newItem],
      });

      e.target.value = null;
    }}
  />
</label>

  </div>
</div>


        {/* BUDGET */}
        <div className="bg-white/70 backdrop-blur p-6 rounded-3xl shadow-md">
          <input
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="Budget"
            className="w-full p-3 rounded-xl bg-white outline-none"
          />
        </div>

        {/* memory */}
   <div>
  <h2 className="font-semibold mb-4 text-lg">Memory Images</h2>

  <div className="flex flex-wrap gap-4">

    {/* Existing */}
    {formData.memoryImage.map((img, index) => (
      <div key={index} className="relative">
        <img
          src={`http://localhost:2000/${img}`}
          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded"
          alt=""
        />
        <button
  onClick={() => removeMemoryImage(index)}
  className="absolute top-1 right-1 bg-black text-white px-2 rounded text-xs"
>
  X
</button>
      </div>
    ))}

    {/* New */}
   {newMemoryImages.map((img, index) => (
  <div key={index} className="relative">
    <img
      src={URL.createObjectURL(img)}
      className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded"
      alt=""
    />

    <button
      onClick={() => {
        const updated = [...newMemoryImages];
        updated.splice(index, 1);
        setNewMemoryImages(updated);
      }}
      className="absolute top-1 right-1 bg-black text-white px-2 rounded"
    >
      X
    </button>
  </div>
))}

    {/* Add */}
    <label className="w-24 h-24 bg-white/70 flex items-center justify-center cursor-pointer rounded">
      + Add
      <input
        type="file"
        hidden
        multiple
    onChange={(e) => {
  setNewMemoryImages([
    ...newMemoryImages,
    ...Array.from(e.target.files),
  ]);
  e.target.value = null;
}}
      />
    </label>

  </div>
</div>
        {/* ratings */}
        <div className="flex gap-2 text-3xl">
  {[1,2,3,4,5].map((star) => (
    <span
      key={star}
      onClick={() => setFormData({...formData, rating: star})}
      className={star <= formData.rating ? "text-yellow-400" : "text-gray-300"}
    >
      ★
    </span>
  ))}
</div>

      </div>

      {/* SAVE BUTTON */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 bg-black text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-xl hover:scale-105 transition text-sm sm:text-base"
      >
        {loading ? "Saving..." : "Save"}
      </button>

    </div>
  );
};

export default EditPost;