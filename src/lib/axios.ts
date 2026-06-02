import axios from "axios";

export const axiosInstance =
  axios.create({
    baseURL:
      "https://your-backend.onrender.com/api",
  });