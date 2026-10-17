import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add the API key to protected requests.
api.interceptors.request.use(
  (config) => {
    const apiKey = import.meta.env.VITE_MACHINE_API_KEY;

    if (apiKey) {
      config.headers["X-API-Key"] = apiKey;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
