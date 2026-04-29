import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {

  const [step, setStep] = useState(1); // 🔥 step control

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");

  // ✅ SEND OTP
  const sendOtp = async () => {
    try {
      const res = await fetch("http://localhost:2000/api/user/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      alert(data.message);

      if (data.success) {
        setStep(2); // 👉 move to OTP screen
      }

    } catch (error) {
      console.error(error);
      alert("Error sending OTP");
    }
  };

  // ✅ STEP 1 SUBMIT (SEND OTP)
  const handleStep1 = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    await sendOtp();
  };

  // ✅ STEP 2 VERIFY OTP + REGISTER
  const verifyOtp = async () => {
    if (!otp) {
      alert("Enter OTP");
      return;
    }

    try {
      const res = await fetch("http://localhost:2000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          otp,
        }),
        credentials: "include",
      });

      const data = await res.json();
      alert(data.message);

      if (data.success) {
        window.location.href = "/login";
      }

    } catch (error) {
      console.error(error);
      alert("Signup failed");
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-gray-100 px-4">

    <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-2xl shadow-lg">

      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
        Create Account ✨
      </h2>

      {/* 🔹 STEP 1 */}
      {step === 1 && (
        <form onSubmit={handleStep1} autoComplete="off" className="space-y-4">

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          <input
            type="email"
            name="email"
            autoComplete="off"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          <input
            type="password"
            name="password"
            autoComplete="new-password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          <button
            type="submit"
            className="w-full py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition"
          >
            Continue
          </button>

        </form>
      )}

      {/* 🔹 STEP 2 */}
      {step === 2 && (
        <div className="space-y-4 text-center">

          <p className="text-gray-600 text-sm">
            OTP sent to <span className="font-semibold">{email}</span>
          </p>

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-center focus:outline-none focus:ring-2 focus:ring-green-400"
          />

          <button
            onClick={verifyOtp}
            className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition"
          >
            Verify & Signup
          </button>

          <button
            onClick={sendOtp}
            className="text-sm text-blue-500 hover:underline"
          >
            Resend OTP
          </button>

        </div>
      )}

      {/* Bottom */}
      <p className="text-center mt-5 text-sm text-gray-600">
        Already a member?{" "}
        <Link to="/login" className="text-red-500 font-medium hover:underline">
          Login
        </Link>
      </p>

    </div>
  </div>
);
};

export default Signup;
