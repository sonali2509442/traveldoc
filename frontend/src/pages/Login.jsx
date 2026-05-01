import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [welcomeName, setWelcomeName] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 5) {
      newErrors.password = "Password must be at least 5 characters";
    }

    return newErrors;
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:2000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();
      console.log(data);

      if (data.success) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setWelcomeName(data.user?.name || "");
        setSuccess(true);
        setTimeout(() => navigate("/"), 1400);
      } else {
        alert(data.message || "Login failed ❌");
        setLoading(false);
      }

    } catch (error) {
      console.error(error);
      alert("Something went wrong ❌");
      setLoading(false);
    }
  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-gray-100 px-4 relative">

    {success && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-2xl px-8 py-10 max-w-sm w-full mx-4 text-center transform transition-all scale-100">

          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
            <svg
              className="w-12 h-12 text-green-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h3 className="text-xl font-bold text-gray-800 mb-1">
            {welcomeName ? `Welcome back, ${welcomeName}!` : "Welcome back!"}
          </h3>
          <p className="text-gray-500 text-sm mb-5">Taking you to your homepage...</p>

          <div className="flex justify-center">
            <div className="w-7 h-7 border-[3px] border-red-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    )}

    <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-2xl shadow-lg">

      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">
        Welcome Back 👋
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} autoComplete="off" noValidate className="space-y-4">

        {/* Email */}
        <div>
          <input
            type="email"
            name="email"
            autoComplete="off"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            aria-invalid={!!errors.email}
            className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 ${
              errors.email
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-red-400"
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            name="password"
            autoComplete="new-password"
            placeholder="Enter your password"
            value={password}
            onChange={handlePasswordChange}
            aria-invalid={!!errors.password}
            className={`w-full p-3 border rounded-xl focus:outline-none focus:ring-2 ${
              errors.password
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-red-400"
            }`}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password}</p>
          )}
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-red-500 hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Bottom text */}
      <p className="text-center mt-4 text-sm text-gray-600">
        Don't have an account?{" "}
        <Link to="/signup" className="text-red-500 font-medium hover:underline">
          Signup
        </Link>
      </p>

    </div>
  </div>
);
}

export default Login;
