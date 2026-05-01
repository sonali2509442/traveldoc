import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_REGEX = /^[A-Za-z][A-Za-z\s'-]{1,}$/;

const Signup = () => {

  const [step, setStep] = useState(1); // 🔥 step control

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [welcomeName, setWelcomeName] = useState("");
  const navigate = useNavigate();

  const validateStep1 = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (!NAME_REGEX.test(name.trim())) {
      newErrors.name = "Name can only contain letters, spaces, ' or -";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!EMAIL_REGEX.test(email.trim())) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 5) {
      newErrors.password = "Password must be at least 5 characters";
    } else if (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
      newErrors.password = "Password must include letters and numbers";
    }

    return newErrors;
  };

  const clearFieldError = (field) => {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      return { ...prev, [field]: undefined };
    });
  };

  // ✅ SEND OTP
  const sendOtp = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:2000/api/user/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();
      alert(data.message);

      if (data.success) {
        setStep(2); // 👉 move to OTP screen
      }

    } catch (error) {
      console.error(error);
      alert("Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  // ✅ STEP 1 SUBMIT (SEND OTP)
  const handleStep1 = async (e) => {
    e.preventDefault();

    const validationErrors = validateStep1();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    await sendOtp();
  };

  // ✅ STEP 2 VERIFY OTP + REGISTER
  const verifyOtp = async () => {
    if (!otp.trim()) {
      setErrors((prev) => ({ ...prev, otp: "OTP is required" }));
      return;
    }
    if (!/^[A-Za-z0-9]{4,6}$/.test(otp.trim())) {
      setErrors((prev) => ({ ...prev, otp: "OTP must be 4-6 letters or numbers" }));
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:2000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
          otp: otp.trim(),
        }),
        credentials: "include",
      });

      const data = await res.json();

      if (data.success) {
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          setWelcomeName(data.user.name || "");
        } else {
          setWelcomeName(name.trim());
        }
        setSuccess(true);
        setTimeout(() => navigate("/"), 1400);
      } else {
        alert(data.message || "Signup failed");
        setLoading(false);
      }

    } catch (error) {
      console.error(error);
      alert("Signup failed");
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
            {welcomeName ? `Welcome aboard, ${welcomeName}!` : "Account created!"}
          </h3>
          <p className="text-gray-500 text-sm mb-5">Setting up your homepage...</p>

          <div className="flex justify-center">
            <div className="w-7 h-7 border-[3px] border-red-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </div>
    )}

    <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-2xl shadow-lg">

      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
        Create Account ✨
      </h2>

      {/* 🔹 STEP 1 */}
      {step === 1 && (
        <form onSubmit={handleStep1} autoComplete="off" noValidate className="space-y-4">

          <div>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                clearFieldError("name");
              }}
              aria-invalid={!!errors.name}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${
                errors.name
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-red-400"
              }`}
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearFieldError("email");
              }}
              aria-invalid={!!errors.email}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-red-400"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              autoComplete="new-password"
              placeholder="Create password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearFieldError("password");
              }}
              aria-invalid={!!errors.password}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-red-400"
              }`}
            />
            {errors.password ? (
              <p className="mt-1 text-sm text-red-500">{errors.password}</p>
            ) : (
              <p className="mt-1 text-xs text-gray-500">
                Min 6 characters, must include letters and numbers.
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-red-500 hover:bg-red-600 disabled:bg-red-300 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition"
          >
            {loading ? "Sending OTP..." : "Continue"}
          </button>

        </form>
      )}

      {/* 🔹 STEP 2 */}
      {step === 2 && (
        <div className="space-y-4 text-center">

          <p className="text-gray-600 text-sm">
            OTP sent to <span className="font-semibold">{email}</span>
          </p>

          <div className="text-left">
            <input
              type="text"
              inputMode="text"
              maxLength={6}
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value.replace(/[^A-Za-z0-9]/g, ""));
                clearFieldError("otp");
              }}
              aria-invalid={!!errors.otp}
              className={`w-full px-4 py-3 border rounded-xl text-center focus:outline-none focus:ring-2 ${
                errors.otp
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-green-400"
              }`}
            />
            {errors.otp && (
              <p className="mt-1 text-sm text-red-500 text-center">{errors.otp}</p>
            )}
          </div>

          <button
            onClick={verifyOtp}
            disabled={loading}
            className="w-full py-3 bg-green-500 hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition"
          >
            {loading ? "Verifying..." : "Verify & Signup"}
          </button>

          <button
            onClick={sendOtp}
            disabled={loading}
            className="text-sm text-blue-500 hover:underline disabled:text-blue-300"
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
