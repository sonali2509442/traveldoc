import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:2000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log(data);

      if (data.success) {
        // ✅ SAVE TOKEN
        

        // ✅ SAVE USER
        localStorage.setItem("user", JSON.stringify(data.user));

        alert("Login successful ✅");

        // ✅ REDIRECT (NO PAGE REFRESH BUG)
        navigate("/");
      } else {
        alert(data.message || "Login failed ❌");
      }

    } catch (error) {
      console.error(error);
      alert("Something went wrong ❌");
    }
  };

 return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-gray-100 px-4">

    <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-2xl shadow-lg">

      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800">
        Welcome Back 👋
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">

        {/* Email */}
        <input 
          type="email"
          name="email"
          autoComplete="off"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
          required
        />

        {/* Password */}
        <input 
          type="password"
          name="password"
          autoComplete="new-password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
          required
        />

        {/* Button */}
        <button className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition">
          Login
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