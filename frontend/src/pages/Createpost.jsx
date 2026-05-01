import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

// --------------------- helper UI components ---------------------

const SectionCard = ({ number, title, subtitle, required, children }) => (
  <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
    <header className="flex items-start gap-4 px-5 sm:px-7 py-5 border-b border-gray-100 bg-gradient-to-r from-red-50/40 to-transparent">
      <div className="w-10 h-10 rounded-xl bg-[#C94545] text-white flex items-center justify-center font-bold text-base shrink-0 shadow-sm">
        {number}
      </div>
      <div className="flex-1 min-w-0">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-1.5">
          {title}
          {required && <span className="text-[#C94545]" aria-label="required">*</span>}
        </h2>
        {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
    </header>
    <div className="px-5 sm:px-7 py-6 space-y-5">{children}</div>
  </section>
);

const FieldLabel = ({ children, required, htmlFor, hint }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-1.5">
    {children}
    {required && <span className="text-[#C94545] ml-0.5">*</span>}
    {hint && <span className="block text-xs font-normal text-gray-400 mt-0.5">{hint}</span>}
  </label>
);

const TextInput = (props) => (
  <input
    {...props}
    className={`w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C94545]/40 focus:border-[#C94545] transition ${props.className || ""}`}
  />
);

const useObjectUrl = (file) => {
  const [url, setUrl] = useState("");
  useEffect(() => {
    if (!file) return;
    const u = URL.createObjectURL(file);
    setUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [file]);
  return url;
};

const ImageThumb = ({ file, onRemove }) => {
  const url = useObjectUrl(file);
  return (
    <div className="relative h-28 sm:h-32 rounded-xl overflow-hidden bg-gray-100 group ring-1 ring-gray-200">
      {url ? (
        <img src={url} alt={file.name} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="w-5 h-5 border-2 border-gray-300 border-t-[#C94545] rounded-full animate-spin" />
        </div>
      )}
      <button
        type="button"
        onClick={onRemove}
        aria-label="Remove image"
        className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-black/60 hover:bg-black/80 text-white opacity-0 group-hover:opacity-100 focus:opacity-100 transition flex items-center justify-center"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className="w-3.5 h-3.5">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>
  );
};

const VideoThumb = ({ file, onRemove }) => {
  const url = useObjectUrl(file);
  return (
    <div className="relative h-44 sm:h-52 rounded-xl overflow-hidden bg-black/90 group ring-1 ring-gray-200">
      {url ? (
        <video src={url} className="w-full h-full object-cover" muted preload="metadata" />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
        </div>
      )}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-10 h-10 rounded-full bg-white/85 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#C94545] ml-0.5">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
      <button
        type="button"
        onClick={onRemove}
        aria-label="Remove video"
        className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-black/70 hover:bg-black/90 text-white opacity-0 group-hover:opacity-100 focus:opacity-100 transition flex items-center justify-center"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className="w-3.5 h-3.5">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
      <p className="absolute bottom-0 left-0 right-0 text-[10px] text-white bg-black/55 px-2 py-1 truncate">{file.name}</p>
    </div>
  );
};

const Dropzone = ({ id, label, hint, onFiles, accept, multiple = true }) => (
  <label
    htmlFor={id}
    className="block border-2 border-dashed border-gray-300 hover:border-[#C94545] hover:bg-red-50/30 rounded-2xl px-6 py-8 sm:py-10 text-center cursor-pointer transition group"
  >
    <div className="w-12 h-12 rounded-2xl bg-red-50 group-hover:bg-[#C94545]/15 mx-auto flex items-center justify-center mb-3 transition">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-[#C94545]">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <path d="M7 10l5-5 5 5" />
        <path d="M12 5v12" />
      </svg>
    </div>
    <p className="text-sm font-medium text-gray-700">{label}</p>
    {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    <input
      id={id}
      type="file"
      accept={accept}
      multiple={multiple}
      className="hidden"
      onChange={(e) => {
        const files = Array.from(e.target.files);
        if (files.length) onFiles(files);
        e.target.value = ""; // allow re-selecting the same file
      }}
    />
  </label>
);

// --------------------- main page ---------------------

const CreatePost = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [youtubeLink, setYoutubeLink] = useState("");
  const [story, setStory] = useState("");

  const [budget, setBudget] = useState("");
  const [foodExpense, setFoodExpense] = useState("");
  const [travelExpense, setTravelExpense] = useState("");
  const [stayExpense, setStayExpense] = useState("");

  const [foodItems, setFoodItems] = useState([
    { name: "", location: "", price: "", rating: 0, images: [] },
  ]);

  const [galleryImages, setGalleryImages] = useState([]);
  const [shortVideos, setShortVideos] = useState([]);
  const [memoryImage, setMemoryImage] = useState([]);

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Derived: subtotal of itemized expenses (for the user's sanity check)
  const subtotal = useMemo(() => {
    const toNum = (v) => Number(String(v).replace(/[^0-9.]/g, "")) || 0;
    return toNum(foodExpense) + toNum(travelExpense) + toNum(stayExpense);
  }, [foodExpense, travelExpense, stayExpense]);

  const storyMax = 1500;

  const FIELD_LABELS = {
    title: "Trip title",
    location: "Destination",
    budget: "Total budget",
  };

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = "Trip title is required";
    else if (title.trim().length < 3) e.title = "Trip title must be at least 3 characters";

    if (!location.trim()) e.location = "Destination is required";

    const budgetNum = Number(budget);
    if (!budget) e.budget = "Total budget is required";
    else if (Number.isNaN(budgetNum) || budgetNum <= 0) e.budget = "Enter a valid budget greater than 0";

    return e;
  };

  const updateFoodItem = (index, key, value) => {
    setFoodItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [key]: value };
      return next;
    });
  };

  const addFoodItem = () => {
    setFoodItems((prev) => [
      ...prev,
      { name: "", location: "", price: "", rating: 0, images: [] },
    ]);
  };

  const removeFoodItem = (index) => {
    setFoodItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault?.();

    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      // scroll the error banner (and the first invalid field) into view
      requestAnimationFrame(() => {
        const banner = document.getElementById("form-error-banner");
        const firstKey = Object.keys(v)[0];
        const field = document.getElementById(firstKey);
        (banner || field)?.scrollIntoView({ behavior: "smooth", block: "center" });
        field?.focus({ preventScroll: true });
      });
      return;
    }
    setErrors({});

    const formData = new FormData();
    formData.append("title", title);
    formData.append("youtubeLink", JSON.stringify([youtubeLink]));
    formData.append("budget", Number(budget));
    formData.append("story", story);
    formData.append("location", location);
    formData.append("foodExpense", foodExpense);
    formData.append("travelExpense", travelExpense);
    formData.append("stayExpense", stayExpense);

    const cleanedFoodItems = foodItems.map((item) => ({
      name: item.name,
      location: item.location,
      price: item.price,
      rating: item.rating,
      images: [],
    }));
    formData.append("foodItems", JSON.stringify(cleanedFoodItems));

    foodItems.forEach((item) => {
      item.images.forEach((file) => {
        formData.append("foodImages", file);
      });
    });

    galleryImages.forEach((file) => formData.append("galleryImages", file));
    shortVideos.forEach((file) => formData.append("shortVideos", file));
    memoryImage.forEach((file) => formData.append("memoryImage", file));

    setSubmitting(true);
    try {
      const res = await fetch("http://localhost:2000/api/posts", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      let data;
      try {
        data = await res.json();
      } catch {
        alert("Server returned an unexpected response");
        setSubmitting(false);
        return;
      }

      if (!res.ok) {
        if (res.status === 401) {
          alert("Please login first");
          navigate("/login");
          return;
        }
        alert(data.message || "Could not publish your trip");
        setSubmitting(false);
        return;
      }

      const id = data.data?._id;
      setSuccess(true);
      setTimeout(() => navigate(id ? `/trip/${id}` : "/"), 1300);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
      setSubmitting(false);
    }
  };

  // --------------------- render ---------------------

  return (
    <form onSubmit={handleSubmit} className="min-h-screen bg-gray-50 pb-32">

      {/* Sticky page header */}
      <div className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full hover:bg-gray-100 flex items-center justify-center transition"
            aria-label="Back"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-700">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex-1 min-w-0">
            <p className="text-[11px] uppercase tracking-wider text-gray-400 font-medium">New Trip</p>
            <h1 className="text-base sm:text-lg font-bold text-gray-900 truncate">
              {title.trim() || "Untitled trip"}
            </h1>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold bg-[#C94545] hover:bg-[#B83C3C] text-white shadow-md disabled:opacity-60 disabled:cursor-not-allowed transition"
          >
            {submitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Publishing
              </>
            ) : (
              <>
                Publish
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-6">

        {/* Error summary banner */}
        {Object.keys(errors).length > 0 && (
          <div
            id="form-error-banner"
            role="alert"
            aria-live="assertive"
            className="bg-red-50 border border-red-200 rounded-2xl p-4 sm:p-5 flex gap-3 items-start"
          >
            <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-red-600">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm sm:text-base font-semibold text-red-800">
                Please fix {Object.keys(errors).length} {Object.keys(errors).length === 1 ? "issue" : "issues"} before publishing
              </h3>
              <ul className="mt-1.5 text-sm text-red-700 space-y-1">
                {Object.entries(errors).map(([key, msg]) => (
                  <li key={key}>
                    <button
                      type="button"
                      onClick={() => {
                        const el = document.getElementById(key);
                        el?.scrollIntoView({ behavior: "smooth", block: "center" });
                        el?.focus({ preventScroll: true });
                      }}
                      className="text-left hover:underline"
                    >
                      <span className="font-medium">{FIELD_LABELS[key] || key}:</span> {msg}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Hero / Basics */}
        <section className="bg-gradient-to-br from-[#C94545] via-[#D25353] to-[#A83838] rounded-2xl shadow-lg text-white px-6 sm:px-8 py-8 sm:py-10">
          <p className="text-xs uppercase tracking-widest text-white/70 font-medium mb-2">
            Tell us where you went
          </p>
          <input
            id="title"
            type="text"
            placeholder="Name your trip… e.g. Solo trip to Manali"
            value={title}
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? "title-error" : undefined}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors((p) => {
                const { title, ...rest } = p;
                return rest;
              });
            }}
            className={`w-full bg-transparent text-2xl sm:text-3xl md:text-4xl font-bold text-white placeholder-white/50 border-b-2 focus:outline-none pb-2 transition ${
              errors.title
                ? "border-amber-200 focus:border-amber-100"
                : "border-white/30 focus:border-white"
            }`}
          />
          {errors.title && (
            <p id="title-error" className="text-amber-100 text-sm mt-2 flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
                <path d="M12 2L1 21h22L12 2zm0 6l7.5 13h-15L12 8zm-1 4v3h2v-3h-2zm0 4v2h2v-2h-2z" />
              </svg>
              {errors.title}
            </p>
          )}

          <div className={`mt-5 flex items-center gap-2 rounded-xl px-3.5 py-2.5 max-w-md transition ${
            errors.location
              ? "bg-white/15 ring-2 ring-amber-200"
              : "bg-white/12 ring-1 ring-white/20"
          }`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white/80 shrink-0">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <input
              id="location"
              type="text"
              placeholder="Destination (Manali, Goa…)"
              value={location}
              aria-invalid={!!errors.location}
              aria-describedby={errors.location ? "location-error" : undefined}
              onChange={(e) => {
                setLocation(e.target.value);
                if (errors.location) setErrors((p) => {
                  const { location, ...rest } = p;
                  return rest;
                });
              }}
              className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder-white/60 focus:outline-none"
            />
          </div>
          {errors.location && (
            <p id="location-error" className="text-amber-100 text-sm mt-2 flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
                <path d="M12 2L1 21h22L12 2zm0 6l7.5 13h-15L12 8zm-1 4v3h2v-3h-2zm0 4v2h2v-2h-2z" />
              </svg>
              {errors.location}
            </p>
          )}
        </section>

        {/* 1. Travel Gallery */}
        <SectionCard
          number="1"
          title="Travel Gallery"
          subtitle="Upload photos that capture the soul of your trip."
        >
          <Dropzone
            id="galleryInput"
            label="Drop photos here, or click to browse"
            hint="JPG, PNG · multiple files allowed"
            accept="image/*"
            onFiles={(files) => setGalleryImages((prev) => [...prev, ...files])}
          />

          {galleryImages.length > 0 && (
            <>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{galleryImages.length} photo{galleryImages.length !== 1 ? "s" : ""} added</span>
                <button
                  type="button"
                  onClick={() => setGalleryImages([])}
                  className="text-[#C94545] hover:underline font-medium"
                >
                  Clear all
                </button>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {galleryImages.map((file, i) => (
                  <ImageThumb
                    key={`${file.name}-${i}`}
                    file={file}
                    onRemove={() =>
                      setGalleryImages((prev) => prev.filter((_, idx) => idx !== i))
                    }
                  />
                ))}
              </div>
            </>
          )}
        </SectionCard>

        {/* 2. Cinematic Shorts */}
        <SectionCard
          number="2"
          title="Cinematic Shorts"
          subtitle="Vertical clips — sunsets, slow walks, magical scenes."
        >
          <Dropzone
            id="videoInput"
            label="Drop short videos here, or click to browse"
            hint="MP4, MOV · vertical format works best"
            accept="video/*"
            onFiles={(files) => setShortVideos((prev) => [...prev, ...files])}
          />

          {shortVideos.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {shortVideos.map((file, i) => (
                <VideoThumb
                  key={`${file.name}-${i}`}
                  file={file}
                  onRemove={() =>
                    setShortVideos((prev) => prev.filter((_, idx) => idx !== i))
                  }
                />
              ))}
            </div>
          )}
        </SectionCard>

        {/* 3. YouTube Vlog */}
        <SectionCard
          number="3"
          title="YouTube Vlog"
          subtitle="Got a full vlog? Drop the link here."
        >
          <FieldLabel htmlFor="ytLink">YouTube URL</FieldLabel>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M21.6 7.2c-.2-1-1-1.7-2-2C17.6 5 12 5 12 5s-5.6 0-7.6.2c-1 .2-1.8 1-2 2C2 9.2 2 12 2 12s0 2.8.4 4.8c.2 1 1 1.7 2 2 2 .2 7.6.2 7.6.2s5.6 0 7.6-.2c1-.2 1.8-1 2-2 .4-2 .4-4.8.4-4.8s0-2.8-.4-4.8zM10 15.5v-7l6 3.5-6 3.5z" />
              </svg>
            </span>
            <input
              id="ytLink"
              type="url"
              placeholder="https://youtube.com/watch?v=…"
              value={youtubeLink}
              onChange={(e) => setYoutubeLink(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C94545]/40 focus:border-[#C94545] transition"
            />
          </div>
        </SectionCard>

        {/* 4. Must-Try Food */}
        <SectionCard
          number="4"
          title="Must-Try Food"
          subtitle="The dishes other travellers shouldn't miss."
        >
          <div className="space-y-4">
            {foodItems.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-2xl p-4 sm:p-5 bg-gray-50/50 hover:bg-white transition"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Dish #{index + 1}
                  </span>
                  {foodItems.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFoodItem(index)}
                      className="text-xs text-[#C94545] hover:underline font-medium"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <TextInput
                    placeholder="Dish name (e.g. Maggi)"
                    value={item.name}
                    onChange={(e) => updateFoodItem(index, "name", e.target.value)}
                  />
                  <TextInput
                    placeholder="Where to find it"
                    value={item.location}
                    onChange={(e) => updateFoodItem(index, "location", e.target.value)}
                  />
                  <TextInput
                    placeholder="Price (e.g. ₹120)"
                    value={item.price}
                    onChange={(e) => updateFoodItem(index, "price", e.target.value)}
                    className="sm:col-span-2"
                  />
                </div>

                <div className="mt-3">
                  <input
                    id={`food-image-${index}`}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => {
                      const files = Array.from(e.target.files);
                      updateFoodItem(index, "images", [...(item.images || []), ...files]);
                      e.target.value = "";
                    }}
                  />
                  <label
                    htmlFor={`food-image-${index}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-[#C94545] hover:text-[#B83C3C] cursor-pointer"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M21 15l-5-5L5 21" />
                    </svg>
                    Add photo
                  </label>
                </div>

                {item.images?.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 mt-3">
                    {item.images.map((file, i) => (
                      <ImageThumb
                        key={`${file.name}-${i}`}
                        file={file}
                        onRemove={() =>
                          updateFoodItem(
                            index,
                            "images",
                            item.images.filter((_, idx) => idx !== i)
                          )
                        }
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={addFoodItem}
              className="w-full py-3 rounded-xl border-2 border-dashed border-gray-300 hover:border-[#C94545] hover:bg-red-50/30 text-sm font-medium text-gray-600 hover:text-[#C94545] flex items-center justify-center gap-1.5 transition"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-4 h-4">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Add another dish
            </button>
          </div>
        </SectionCard>

        {/* 5. Budget */}
        <SectionCard
          number="5"
          title="Budget Breakdown"
          subtitle="Help future travellers plan their spend."
          required
        >
          <div>
            <FieldLabel htmlFor="budget" required>Total budget (INR)</FieldLabel>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
              <input
                id="budget"
                type="number"
                min="0"
                placeholder="20000"
                value={budget}
                aria-invalid={!!errors.budget}
                aria-describedby={errors.budget ? "budget-error" : undefined}
                onChange={(e) => {
                  setBudget(e.target.value);
                  if (errors.budget) setErrors((p) => {
                    const { budget, ...rest } = p;
                    return rest;
                  });
                }}
                className={`w-full pl-9 pr-4 py-3 rounded-xl border bg-white text-base font-semibold focus:outline-none focus:ring-2 transition ${
                  errors.budget
                    ? "border-red-400 focus:ring-red-300"
                    : "border-gray-200 focus:ring-[#C94545]/40 focus:border-[#C94545]"
                }`}
              />
            </div>
            {errors.budget && (
              <p id="budget-error" className="text-red-600 text-sm mt-1 flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
                  <path d="M12 2L1 21h22L12 2zm0 6l7.5 13h-15L12 8zm-1 4v3h2v-3h-2zm0 4v2h2v-2h-2z" />
                </svg>
                {errors.budget}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: "foodExpense", label: "Food", value: foodExpense, set: setFoodExpense, emoji: "🍜" },
              { id: "travelExpense", label: "Travel", value: travelExpense, set: setTravelExpense, emoji: "🚌" },
              { id: "stayExpense", label: "Stay", value: stayExpense, set: setStayExpense, emoji: "🏨" },
            ].map((f) => (
              <div key={f.id}>
                <FieldLabel htmlFor={f.id}>
                  <span className="mr-1">{f.emoji}</span> {f.label}
                </FieldLabel>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">₹</span>
                  <input
                    id={f.id}
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    value={f.value}
                    onChange={(e) => f.set(e.target.value)}
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#C94545]/40 focus:border-[#C94545] transition"
                  />
                </div>
              </div>
            ))}
          </div>

          {subtotal > 0 && (
            <div className="text-xs text-gray-500 flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-3.5 h-3.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" />
              </svg>
              Itemized subtotal: <span className="font-semibold text-gray-700">₹{subtotal.toLocaleString()}</span>
            </div>
          )}
        </SectionCard>

        {/* 6. Story + Memories */}
        <SectionCard
          number="6"
          title="Story & Memories"
          subtitle="The little things people remember long after the photos fade."
        >
          <div>
            <FieldLabel htmlFor="story">Your story</FieldLabel>
            <textarea
              id="story"
              rows="6"
              maxLength={storyMax}
              value={story}
              onChange={(e) => setStory(e.target.value)}
              placeholder="Write about the smells, the people, the moment you decided to come back…"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm sm:text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C94545]/40 focus:border-[#C94545] transition resize-y"
            />
            <div className="flex justify-end mt-1">
              <span className={`text-xs ${story.length > storyMax * 0.9 ? "text-[#C94545]" : "text-gray-400"}`}>
                {story.length}/{storyMax}
              </span>
            </div>
          </div>

          <div>
            <FieldLabel>Memory photos</FieldLabel>
            <Dropzone
              id="memoryInput"
              label="Drop your favourite shots"
              hint="The ones you'd frame on a wall"
              accept="image/*"
              onFiles={(files) => setMemoryImage((prev) => [...prev, ...files])}
            />

            {memoryImage.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mt-4">
                {memoryImage.map((file, i) => (
                  <ImageThumb
                    key={`${file.name}-${i}`}
                    file={file}
                    onRemove={() =>
                      setMemoryImage((prev) => prev.filter((_, idx) => idx !== i))
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </SectionCard>

        {/* Inline mobile publish */}
        <div className="sm:hidden">
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 rounded-2xl bg-[#C94545] hover:bg-[#B83C3C] disabled:bg-[#C94545]/60 text-white font-semibold text-base shadow-lg flex items-center justify-center gap-2 transition"
          >
            {submitting ? (
              <>
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Publishing your trip…
              </>
            ) : (
              <>
                Publish trip
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Success overlay */}
      {success && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-2xl px-8 py-10 max-w-sm w-full text-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-12 h-12 text-green-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">Trip published!</h3>
            <p className="text-gray-500 text-sm mb-5">Taking you to your trip page…</p>
            <div className="flex justify-center">
              <div className="w-7 h-7 border-[3px] border-[#C94545] border-t-transparent rounded-full animate-spin" />
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default CreatePost;
