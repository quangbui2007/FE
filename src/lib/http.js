import axios from "axios";

// Tạo một instance của axios
const http = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL, // ✅ Đổi URL này theo backend của bạn
  timeout: 10000, // 10 giây
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
http.interceptors.request.use(
  (config) => {
    // 👇 Add token nếu cần
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
http.interceptors.response.use(
  (response) => response,
  (error) => {
    // 👇 Xử lý lỗi toàn cục nếu cần
    if (error.response) {
      console.error("API Error:", error.response.status, error.response.data);
      if (error.response.status === 401) {
        // Ví dụ: redirect to login
      }
    } else {
      console.error("Network Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default http;
