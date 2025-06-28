import axios from "axios";
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
    timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (request) => {
    
    const token = localStorage.getItem("token");
    if (token) {
      request.headers["Authorization"] =  `Bearer ${token}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    {
    console.error('API Error:', error.response?.data || error.message);
        Promise.reject(error)
    } 
        
);

export default axiosInstance;