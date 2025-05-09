// axiosInstance.js
import axios from "axios";
let isSessionExpired = false;
let isRefreshing = false;
let refreshSubscribers = [];

const http = axios.create({
  withCredentials: true, // 👈 Bắt buộc để gửi cookie
});

const subscribeTokenRefresh = (callback) => {
  refreshSubscribers.push(callback);
};

const onRefreshed = () => {
  refreshSubscribers.forEach((callback) => callback());
  refreshSubscribers = [];
};

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // Nếu bị 401 (token hết hạn) và chưa retry
    if (error.response?.status === 401 && !originalRequest._retry && !isSessionExpired) {
      originalRequest._retry = true;

      if (isSessionExpired) {
        return Promise.reject(error); // ⛔️ Không retry gì nữa nếu session đã hết
      }

      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh(() => {
            resolve(http(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        await http.post("/api/auth/refresh-token"); // server sẽ set lại access token vào cookie
        isSessionExpired = false;
        isRefreshing = false;
        onRefreshed();

        return http(originalRequest); // Gọi lại request cũ sau khi đã refresh
      } catch (err) {
        isSessionExpired = true;
        isRefreshing = false;
        refreshSubscribers = [];
        await http.post("/api/auth/logout"); // Đăng xuất người dùng nếu refresh token không thành công
        window.location.href = "/auth/login";
        // Có thể redirect về login ở đây
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default http;
