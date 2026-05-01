import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footertop = () => {
  const location = useLocation();
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      setUser(JSON.parse(localStorage.getItem("user")));
    } catch {
      setUser(null);
    }
  }, [location.pathname]);

  const firstName = (user?.name || "").trim().split(" ")[0];

  return (
    <div className="relative w-full h-[420px] md:h-[460px] overflow-hidden">
      <img
        src="/footerimg.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-br from-black/75 via-black/55 to-[#C94545]/55" />
      <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full bg-amber-300/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#C94545]/25 blur-3xl pointer-events-none" />

      <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
        {user ? (
          <>
            <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm ring-1 ring-white/25 text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
              {firstName ? `Welcome back, ${firstName}` : "Welcome back"}
            </span>

            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight max-w-3xl leading-tight">
              Where to{" "}
              <span className="bg-gradient-to-r from-amber-200 to-orange-300 bg-clip-text text-transparent">
                next?
              </span>
            </h2>

            <p className="mt-4 text-sm md:text-base text-white/80 max-w-xl">
              Share your latest journey or get inspired by new destinations from the community.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link
                to="/create"
                className="inline-flex items-center justify-center gap-2 bg-[#C94545] hover:bg-[#B83C3C] text-white font-semibold px-7 py-3.5 rounded-full shadow-lg shadow-black/30 hover:-translate-y-0.5 transition"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className="w-4 h-4">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Share a trip
              </Link>
              <Link
                to="/search"
                className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm ring-1 ring-white/30 text-white font-semibold px-7 py-3.5 rounded-full transition"
              >
                Explore stories
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </>
        ) : (
          <>
            <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm ring-1 ring-white/25 text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-300" />
              Join the community
            </span>

            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight max-w-3xl leading-tight">
              Get your{" "}
              <span className="bg-gradient-to-r from-amber-200 to-orange-300 bg-clip-text text-transparent">
                next idea
              </span>
            </h2>

            <p className="mt-4 text-sm md:text-base text-white/80 max-w-xl">
              Save trips you love, share your own stories and plan smarter — it's free.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 bg-[#C94545] hover:bg-[#B83C3C] text-white font-semibold px-7 py-3.5 rounded-full shadow-lg shadow-black/30 hover:-translate-y-0.5 transition"
              >
                Sign up
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm ring-1 ring-white/30 text-white font-semibold px-7 py-3.5 rounded-full transition"
              >
                I already have an account
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Footertop;
