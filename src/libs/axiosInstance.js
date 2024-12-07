import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333/api",
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    const token = await localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized! Redirecting to login...");
      // Perform a logout or redirect to login logic here
    }
    return Promise.reject(error);
  }
);

export default api;
