import axios from "axios";

const axiosInstance = axios.create({
  baseURL:"https://my-erm-backend.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;


// "https://my-erm-backend.onrender.com",
// "http://localhost:5000", 