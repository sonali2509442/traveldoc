import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import { Link } from "react-router-dom";

const Signup = () => {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      {/* Card */}
      <div className="w-full max-w-sm bg-white p-8 rounded-2xl shadow-lg">

        {/* Logo / Title */}
        <h2 className="text-3xl font-bold text-center text-red-600 mb-2">
          TraveldocU
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Welcome! Create your account ✨
        </p>

        {/* Form */}
        <form className="space-y-4">

          {/* Email */}
          <input
            type="email"
            placeholder="Email address"
            autoComplete="off"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Create a password"
            autoComplete="new-password"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          {/* Birthdate */}
          <input
            type="date"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500"
          />

          {/* Continue Button */}
          <button
            type="submit"
            className="w-full py-3 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition"
          >
            Continue
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-gray-400 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center py-3 border border-gray-300 rounded-full hover:bg-gray-100 transition"
        >
          <img
            src="/google logo.png"
            alt="Google"
            className="w-5 h-5 mr-3"
          />
          Continue with Google
        </button>

        {/* Login Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already a member?{" "}
          <Link to="/login" className="text-red-500 font-medium cursor-pointer hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
