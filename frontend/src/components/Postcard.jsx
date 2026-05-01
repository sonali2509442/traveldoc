import React from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:2000";

const Postcard = ({ post }) => {
  const navigate = useNavigate();
  if (!post) return null;

  const cover = post.galleryImages?.[0]
    ? `${BASE_URL}/${post.galleryImages[0]}`
    : null;

  const initial = (post.userName || "U").trim().charAt(0).toUpperCase();
  const rating = Number(post.averageRating) || 0;
  const photoCount = post.galleryImages?.length || 0;

  return (
    <article
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/trip/${post._id}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigate(`/trip/${post._id}`);
        }
      }}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl ring-1 ring-gray-100 hover:ring-transparent transition-all duration-300 cursor-pointer hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#C94545]/40"
    >
      {/* Cover */}
      <div className="relative h-52 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {cover ? (
          <img
            src={cover}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-14 h-14">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        )}

        {/* gradient veil for chip legibility */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/55 to-transparent" />

        {/* Rating badge */}
        {rating > 0 && (
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-gray-900 text-xs font-bold rounded-full px-2.5 py-1 flex items-center gap-1 shadow-sm">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-amber-400">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {rating.toFixed(1)}
          </div>
        )}

        {/* Location chip */}
        {post.location && (
          <div className="absolute bottom-3 left-3 bg-black/55 backdrop-blur-sm text-white text-xs font-medium rounded-full px-2.5 py-1 flex items-center gap-1 max-w-[80%]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 shrink-0">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="truncate">{post.location}</span>
          </div>
        )}

        {/* Photo count */}
        {photoCount > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/55 backdrop-blur-sm text-white text-xs font-medium rounded-full px-2.5 py-1 flex items-center gap-1">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            {photoCount}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="font-bold text-base sm:text-lg text-gray-900 line-clamp-1 group-hover:text-[#C94545] transition">
          {post.title}
        </h3>

        {post.story && (
          <p className="text-sm text-gray-500 mt-1.5 line-clamp-2 leading-relaxed">
            {post.story}
          </p>
        )}

        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-full bg-[#C94545]/10 text-[#C94545] flex items-center justify-center font-bold text-xs shrink-0">
              {initial}
            </div>
            <span className="text-xs text-gray-600 truncate">
              by <span className="font-medium text-gray-800">{post.userName || "Anonymous"}</span>
            </span>
          </div>

          {post.budget > 0 && (
            <span className="text-xs font-semibold text-gray-700 bg-gray-100 rounded-full px-2.5 py-1 shrink-0">
              ₹{Number(post.budget).toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default Postcard;
