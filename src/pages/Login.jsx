"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import StarBackground from "../components/StarBackground.jsx";
import API from "../api/api.js";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ================== EMAIL/PASSWORD LOGIN ==================
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/login", { email, password });
      if (res.data.accessToken) {
        localStorage.setItem("accessToken", res.data.accessToken);
        navigate("/dashboard");
      } else {
        alert(res.data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ================== GOOGLE LOGIN ==================
  const handleGoogleLogin = async (credentialResponse) => {
    if (!credentialResponse?.credential) return;
    setLoading(true);
    try {
      const res = await API.post(
        "https://igdtuw-verse.onrender.com/api/auth/google-login",
        { token: credentialResponse.credential }
      );
      if (res.data.accessToken) {
        localStorage.setItem("accessToken", res.data.accessToken);
        navigate("/dashboard");
      } else {
        alert(res.data.message || "Google login failed");
      }
    } catch (err) {
      console.error("Google login error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <div className="relative flex items-center justify-center min-h-screen bg-black overflow-hidden px-4 sm:px-6">
        <StarBackground />

        <div
          className="relative z-10 w-full max-w-md p-6 sm:p-8 rounded-2xl
                     bg-gradient-to-br from-purple-800/40 via-purple-600/30 to-purple-800/40
                     backdrop-blur-lg border border-white/20 shadow-xl"
        >
          <h1 className="text-2xl sm:text-3xl font-extrabold mb-6 text-center text-white tracking-wide drop-shadow-lg">
            Sign In
          </h1>

          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 
                         text-white placeholder-gray-300 focus:outline-none 
                         focus:ring-2 focus:ring-purple-400 transition"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 
                         text-white placeholder-gray-300 focus:outline-none 
                         focus:ring-2 focus:ring-purple-400 transition"
              required
            />
            <button
              type="submit"
              className={`mt-2 w-full bg-gradient-to-r from-purple-500 to-purple-700 
                          text-white py-2 rounded-lg font-semibold 
                          hover:from-purple-400 hover:to-purple-600 
                          shadow-lg hover:shadow-purple-500/40 transition
                          ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-6 flex justify-center w-full">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => alert("Google login failed")}
              width={300}
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
