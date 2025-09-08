// src/components/Register.jsx
"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StarBackground from "../components/StarBackground.jsx"; // background component

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("");
  const [section, setSection] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://igdtuw-verse.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: name,
          email,
          password,
          branch,
          semester,
          section,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        alert("Registration successful!");
        navigate("/login");
      } else {
        alert(data.error || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Try again later.");
    }
  };

  const branches = ["CSE", "CSE AI", "IT", "ECE", "ME"];
  const semesters = ["1st","2nd","3rd","4th","5th","6th","7th","8th"];
  const sectionOptions = branch ? [`${branch}1`, `${branch}2`, `${branch}3`] : [];

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-black overflow-hidden px-4 sm:px-6">
      <StarBackground />

      <div className="relative z-10 w-full max-w-md p-6 sm:p-8 rounded-2xl 
                      bg-gradient-to-br from-purple-800/40 via-purple-600/30 to-purple-800/40
                      backdrop-blur-lg border border-white/20 shadow-xl">
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-6 text-center text-white tracking-wide drop-shadow-lg">
          Create an Account
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 
                       text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 
                       text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 
                       text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            required
          />

          <select
            value={branch}
            onChange={(e) => { setBranch(e.target.value); setSection(""); }}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 
                       text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            required
          >
            <option value="" disabled>Select your branch</option>
            {branches.map((b, idx) => <option key={idx} value={b} className="text-black">{b}</option>)}
          </select>

          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 
                       text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            required
          >
            <option value="" disabled>Select your semester</option>
            {semesters.map((s, idx) => <option key={idx} value={s} className="text-black">{s}</option>)}
          </select>

          {branch && (
            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 
                         text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              required
            >
              <option value="" disabled>Select your section in {branch}</option>
              {sectionOptions.map((sec, idx) => <option key={idx} value={sec} className="text-black">{sec}</option>)}
            </select>
          )}

          <button
            type="submit"
            className="mt-2 w-full bg-gradient-to-r from-purple-500 to-purple-700 
                       text-white py-2 rounded-lg font-semibold 
                       hover:from-purple-400 hover:to-purple-600 
                       shadow-lg hover:shadow-purple-500/40 transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
