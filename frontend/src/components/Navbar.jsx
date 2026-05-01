import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      setUser(JSON.parse(localStorage.getItem("user")));
    } catch {
      setUser(null);
    }
    setMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:2000/api/user/logout", {
        method: "GET",
        credentials: "include",
      });
    } catch (err) {
      console.error(err);
    }
    localStorage.removeItem("user");
    setUser(null);
    setMenuOpen(false);
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;
  const initial = (user?.name || "U").trim().charAt(0).toUpperCase();

  // Inline icons
  const Icon = {
    plane: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 1 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
      </svg>
    ),
    plus: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="w-4 h-4">
        <path d="M12 5v14M5 12h14" />
      </svg>
    ),
    heart: (filled = false) => (
      <svg viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    chart: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
        <path d="M3 3v18h18" />
        <path d="M7 14l4-4 3 3 5-6" />
      </svg>
    ),
    logout: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <path d="M16 17l5-5-5-5" />
        <path d="M21 12H9" />
      </svg>
    ),
    menu: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="w-6 h-6">
        <path d="M4 7h16M4 12h16M4 17h16" />
      </svg>
    ),
    close: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" className="w-6 h-6">
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    ),
    home: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
        <path d="M3 11l9-8 9 8" />
        <path d="M5 10v10h14V10" />
      </svg>
    ),
    info: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8h.01M11 12h1v4h1" />
      </svg>
    ),
    search: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
      </svg>
    ),
  };

  // Desktop text link with animated underline + active state
  const TextLink = ({ to, children }) => {
    const active = isActive(to);
    return (
      <Link
        to={to}
        aria-current={active ? "page" : undefined}
        className="relative px-3 py-2 text-sm font-medium tracking-wide group"
      >
        <span className={active ? "text-white" : "text-white/85 group-hover:text-white transition"}>
          {children}
        </span>
        <span
          className={`absolute left-3 right-3 -bottom-0.5 h-[2px] rounded-full bg-white transition-all duration-300 ${
            active ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0 group-hover:opacity-70 group-hover:scale-x-100"
          } origin-center`}
        />
      </Link>
    );
  };

  // Mobile row link
  const MobileLink = ({ to, icon, children }) => {
    const active = isActive(to);
    return (
      <Link
        to={to}
        onClick={() => setMenuOpen(false)}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
          active ? "bg-white/20 shadow-inner" : "hover:bg-white/10"
        }`}
      >
        <span className={`flex items-center justify-center w-8 h-8 rounded-lg ${active ? "bg-white/20" : "bg-white/10"}`}>
          {icon}
        </span>
        <span className="flex-1">{children}</span>
        {active && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
      </Link>
    );
  };

  return (
    <nav className="sticky top-0 z-40 bg-gradient-to-r from-[#D25353] via-[#CA4848] to-[#B83C3C] text-white shadow-[0_4px_20px_-4px_rgba(184,60,60,0.45)] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-3">

        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0 group">
          <span className="w-9 h-9 rounded-xl bg-white/15 ring-1 ring-white/25 group-hover:bg-white/25 group-hover:ring-white/40 transition flex items-center justify-center">
            {Icon.plane}
          </span>
          <span className="text-lg md:text-xl font-extrabold tracking-tight">
            Travel<span className="text-amber-200">doc</span>U
          </span>
        </Link>

        {/* Desktop center links */}
        <div className="hidden md:flex items-center gap-1 mx-2">
          <TextLink to="/">Home</TextLink>
          <TextLink to="/about">About</TextLink>
          <TextLink to="/search">Explore</TextLink>
        </div>

        {/* Desktop right cluster */}
        <div className="hidden md:flex items-center gap-2.5">

          {/* Primary CTA */}
          <Link
            to="/create"
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold shadow-md transition transform hover:-translate-y-0.5 hover:shadow-lg ${
              isActive("/create")
                ? "bg-amber-200 text-[#9A2E2E]"
                : "bg-white text-[#C94545] hover:bg-amber-50"
            }`}
          >
            {Icon.plus} Create
          </Link>

          {/* Saved (icon button) */}
          <Link
            to="/saved"
            title="Saved trips"
            aria-label="Saved trips"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition ring-1 ring-white/20 hover:ring-white/40 hover:scale-105 ${
              isActive("/saved") ? "bg-white/30" : "bg-white/10 hover:bg-white/20"
            }`}
          >
            {Icon.heart(isActive("/saved"))}
          </Link>

          {/* Dashboard ghost button */}
          <Link
            to="/dashboard"
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium ring-1 ring-white/20 hover:ring-white/40 transition ${
              isActive("/dashboard") ? "bg-white/25" : "bg-white/10 hover:bg-white/20"
            }`}
          >
            {Icon.chart}
            <span>Dashboard</span>
          </Link>

          {/* Divider */}
          <span className="w-px h-7 bg-white/20 mx-1" />

          {/* Auth area */}
          {!user ? (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-sm font-medium px-3 py-2 rounded-full text-white/90 hover:text-white hover:bg-white/10 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-sm font-semibold px-4 py-2 rounded-full bg-white text-[#C94545] shadow hover:shadow-md hover:-translate-y-0.5 transition"
              >
                Sign up
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-white/15 ring-1 ring-white/20">
                <div className="w-7 h-7 rounded-full bg-white text-[#C94545] flex items-center justify-center font-bold text-sm">
                  {initial}
                </div>
                <span className="text-sm font-medium max-w-[120px] truncate">{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                title="Logout"
                aria-label="Logout"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 ring-1 ring-white/20 hover:ring-white/40 flex items-center justify-center transition"
              >
                {Icon.logout}
              </button>
            </div>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="md:hidden w-10 h-10 rounded-xl bg-white/15 hover:bg-white/25 ring-1 ring-white/20 flex items-center justify-center transition"
        >
          {menuOpen ? Icon.close : Icon.menu}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 top-[60px] bg-black/30 backdrop-blur-[2px] z-30"
            onClick={() => setMenuOpen(false)}
          />
          <div className="md:hidden absolute left-0 right-0 top-full z-40 bg-gradient-to-b from-[#CA4848] to-[#B83C3C] border-t border-white/15 shadow-2xl">
            <div className="px-3 py-3 flex flex-col gap-1">
              <MobileLink to="/" icon={Icon.home}>Home</MobileLink>
              <MobileLink to="/about" icon={Icon.info}>About</MobileLink>
              <MobileLink to="/search" icon={Icon.search}>Explore</MobileLink>
              <MobileLink to="/create" icon={Icon.plus}>Create Trip</MobileLink>
              <MobileLink to="/saved" icon={Icon.heart(isActive("/saved"))}>Saved</MobileLink>
              <MobileLink to="/dashboard" icon={Icon.chart}>Dashboard</MobileLink>

              <div className="h-px bg-white/15 my-2 mx-2" />

              {!user ? (
                <div className="flex flex-col gap-2 px-2 pb-2">
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="w-full text-center py-2.5 rounded-xl bg-white/10 hover:bg-white/20 ring-1 ring-white/20 font-medium transition"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="w-full text-center py-2.5 rounded-xl bg-white text-[#C94545] font-semibold shadow"
                  >
                    Sign up
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-3 px-3 py-2">
                  <div className="w-10 h-10 rounded-full bg-white text-[#C94545] flex items-center justify-center font-bold">
                    {initial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold truncate">{user.name}</p>
                    <p className="text-xs text-white/70">Signed in</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-2 rounded-xl bg-white/15 hover:bg-white/25 ring-1 ring-white/20 text-sm font-medium flex items-center gap-1.5 transition"
                  >
                    {Icon.logout} Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  )
}

export default Navbar
