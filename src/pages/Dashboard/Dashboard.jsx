"use client";

import { useState, useEffect } from "react";
import { DashboardProvider } from "../../context/DashboardContext";
import API from "../../api/api";
import DashboardLayout from "./DashboardLayout";
import Grid from "../../components/Grid";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        // Try fetching user
        const res = await API.get("/auth/me");
        setUser(res.data.user);
      } catch (err) {
        console.error("Failed to fetch user:", err);

        // Try refresh token
        try {
          const refreshRes = await API.post("/auth/refresh");
          localStorage.setItem("accessToken", refreshRes.data.accessToken);

          // Retry fetching user
          const retry = await API.get("/auth/me");
          setUser(retry.data.user);
        } catch (refreshErr) {
          console.error("Refresh failed:", refreshErr);
          localStorage.removeItem("accessToken");
          window.location.href = "/login";
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        Loading your dashboard...
      </div>
    );
  }

  if (!user) return null; // prevent rendering before auth

  return (
    <DashboardProvider>
      <DashboardLayout>
        <Grid />
      </DashboardLayout>
    </DashboardProvider>
  );
};

export default Dashboard;
