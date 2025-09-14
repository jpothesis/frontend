// src/api.js
import axios from "axios";

// Use backend URL from .env
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const API = axios.create({
  baseURL: `${BASE_URL}/api`, // use deployed backend
  withCredentials: true,      // send refresh token cookie automatically
});

// Attach access token to all requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: handle 401 → try refresh token
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call refresh endpoint using the same backend URL
        const refreshRes = await axios.post(
          `${BASE_URL}/api/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newToken = refreshRes.data.accessToken;
        localStorage.setItem("accessToken", newToken);

        // Retry original request with new token
        if (originalRequest.headers) {
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        }

        return API(originalRequest);
      } catch (refreshErr) {
        // Failed to refresh → logout
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default API;
