import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Postcard from "../components/Postcard";
import heroImg from "../assets/TMX1145991747220153final banner.jpg";
import Banner from "../components/Banner";
import Footertop from "../components/Footertop";
import Footer from "../components/Footer";

const SkeletonCard = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm ring-1 ring-gray-100">
    <div className="h-52 bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
    <div className="p-5 space-y-3">
      <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4" />
      <div className="h-3 bg-gray-100 rounded animate-pulse w-full" />
      <div className="h-3 bg-gray-100 rounded animate-pulse w-2/3" />
      <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
        <div className="h-3 bg-gray-100 rounded animate-pulse w-24" />
        <div className="h-5 bg-gray-100 rounded-full animate-pulse w-14" />
      </div>
    </div>
  </div>
);

const SectionHeader = ({ eyebrow, title, subtitle, action }) => (
  <div className="flex items-end justify-between gap-4 mb-6 sm:mb-8">
    <div className="min-w-0">
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.18em] font-semibold text-[#C94545] mb-1.5">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">{title}</h2>
      {subtitle && <p className="text-sm sm:text-base text-gray-500 mt-1.5 max-w-xl">{subtitle}</p>}
    </div>
    {action}
  </div>
);

const StatTile = ({ value, label, icon }) => (
  <div className="bg-white rounded-2xl p-5 ring-1 ring-gray-100 shadow-sm hover:shadow-md transition">
    <div className="w-10 h-10 rounded-xl bg-[#C94545]/10 text-[#C94545] flex items-center justify-center mb-3">
      {icon}
    </div>
    <p className="text-2xl sm:text-3xl font-bold text-gray-900 leading-none">{value}</p>
    <p className="text-xs sm:text-sm text-gray-500 mt-1.5 font-medium">{label}</p>
  </div>
);

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("http://localhost:2000/api/posts");
        const data = await res.json();
        if (cancelled) return;
        const list = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];
        setPosts(list);
      } catch (err) {
        console.error(err);
        if (!cancelled) setPosts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const topPosts = useMemo(
    () =>
      [...posts]
        .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
        .slice(0, 6),
    [posts]
  );

  const recentPosts = useMemo(
    () =>
      [...posts]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6),
    [posts]
  );

  const stats = useMemo(() => {
    const destinations = new Set(posts.map((p) => (p.location || "").trim()).filter(Boolean));
    const travelers = new Set(posts.map((p) => p.userId).filter(Boolean));
    const photos = posts.reduce((sum, p) => sum + (p.galleryImages?.length || 0), 0);
    return {
      trips: posts.length,
      destinations: destinations.size,
      travelers: travelers.size,
      photos,
    };
  }, [posts]);

  return (
    <div className="bg-gray-50">

      {/* HERO */}
      <section className="px-4 md:px-10 pt-8 md:pt-12 pb-10 md:pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">

          {/* Copy */}
          <div className="order-2 md:order-1">
            <span className="inline-flex items-center gap-1.5 bg-[#C94545]/10 text-[#C94545] text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C94545]" />
              A travel journal for everyone
            </span>

            <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.05]">
              Document the journeys{" "}
              <span className="bg-gradient-to-r from-[#C94545] to-[#E07A5F] bg-clip-text text-transparent">
                worth remembering
              </span>
              .
            </h1>

            <p className="mt-5 text-base sm:text-lg text-gray-600 leading-relaxed max-w-lg">
              Share your trip stories, photos, food finds and budget breakdowns —
              and discover real journeys from real travellers.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link
                to="/create"
                className="inline-flex items-center justify-center gap-2 bg-[#C94545] hover:bg-[#B83C3C] text-white font-semibold px-6 py-3.5 rounded-full shadow-lg shadow-[#C94545]/25 hover:shadow-xl hover:-translate-y-0.5 transition"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className="w-4 h-4">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Start your trip story
              </Link>

              <Link
                to="/search"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-900 font-semibold px-6 py-3.5 rounded-full ring-1 ring-gray-200 hover:ring-gray-300 transition"
              >
                Explore stories
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="mt-6 flex items-center gap-3 text-xs sm:text-sm text-gray-500">
              <div className="flex -space-x-2">
                {["#C94545", "#E07A5F", "#F4A261", "#2A9D8F"].map((c, i) => (
                  <div key={i} className="w-7 h-7 rounded-full ring-2 ring-gray-50" style={{ background: c }} />
                ))}
              </div>
              <span>Loved by travellers across {Math.max(stats.destinations, 12)}+ destinations</span>
            </div>
          </div>

          {/* Image collage */}
          <div className="order-1 md:order-2 relative">
            <div className="relative aspect-[4/5] sm:aspect-[5/6] md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img src={heroImg} alt="Travel" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#C94545]/30 via-transparent to-transparent" />
            </div>

            {/* Floating stat card — total trips shared */}
            {stats.trips > 0 && (
              <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl p-4 items-center gap-3 ring-1 ring-gray-100">
                <div className="w-10 h-10 rounded-xl bg-[#C94545]/10 text-[#C94545] flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-900 leading-none">
                    {stats.trips.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">Trips shared</p>
                </div>
              </div>
            )}

            {/* Floating chip — most recent destination */}
            {recentPosts[0]?.location && (
              <div className="hidden md:flex absolute -top-4 -right-4 bg-white rounded-full shadow-xl px-4 py-2.5 items-center gap-2 ring-1 ring-gray-100 max-w-[220px]">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
                <span className="text-xs font-semibold text-gray-700 truncate">
                  Just posted · {recentPosts[0].location}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="px-4 md:px-10 pb-10 md:pb-14">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <StatTile
            value={stats.trips.toLocaleString()}
            label="Trip stories"
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            }
          />
          <StatTile
            value={stats.destinations.toLocaleString()}
            label="Destinations"
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            }
          />
          <StatTile
            value={stats.travelers.toLocaleString()}
            label="Travellers"
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            }
          />
          <StatTile
            value={stats.photos.toLocaleString()}
            label="Photos shared"
            icon={
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            }
          />
        </div>
      </section>

      {/* TOP RATED */}
      <section className="px-4 md:px-10 pb-10 md:pb-14">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Editor's picks"
            title="Top rated trips"
            subtitle="The journeys our community keeps coming back to."
            action={
              <Link
                to="/search"
                className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-[#C94545] hover:text-[#B83C3C] transition shrink-0"
              >
                View all
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            }
          />

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : topPosts.length === 0 ? (
            <div className="bg-white rounded-2xl ring-1 ring-gray-100 p-10 text-center text-gray-500">
              No top rated trips yet — be the first to share!
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {topPosts.map((post) => (
                <Postcard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* BANNER (search bridge) */}
      <Banner />

      {/* RECENT TRIPS */}
      <section className="px-4 md:px-10 py-10 md:py-14">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Just in"
            title="Recent trips"
            subtitle="Fresh stories from travellers, posted this week."
            action={
              <Link
                to="/search"
                className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-[#C94545] hover:text-[#B83C3C] transition shrink-0"
              >
                View all
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </Link>
            }
          />

          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : recentPosts.length === 0 ? (
            <div className="bg-white rounded-2xl ring-1 ring-gray-100 p-10 text-center text-gray-500">
              No trips posted yet.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {recentPosts.map((post) => (
                <Postcard key={post._id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-4 md:px-10 pb-14">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#C94545] via-[#D25353] to-[#A83838] text-white px-6 sm:px-12 py-12 sm:py-16 shadow-xl">
            {/* decorative blobs */}
            <div className="absolute -top-12 -right-12 w-56 h-56 rounded-full bg-white/10 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-amber-300/15 blur-3xl pointer-events-none" />

            <div className="relative grid grid-cols-1 md:grid-cols-2 items-center gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70 mb-2">
                  Got a story?
                </p>
                <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                  Turn your last trip into your favourite post.
                </h2>
                <p className="mt-3 text-white/80 text-sm sm:text-base max-w-md">
                  It only takes a few minutes — photos, story, budget. We'll handle the layout.
                </p>
              </div>

              <div className="flex md:justify-end">
                <Link
                  to="/create"
                  className="inline-flex items-center gap-2 bg-white text-[#C94545] hover:bg-amber-50 font-semibold px-7 py-4 rounded-full shadow-xl hover:-translate-y-0.5 transition"
                >
                  Create a trip
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footertop />
      <Footer />
    </div>
  );
};

export default Home;
