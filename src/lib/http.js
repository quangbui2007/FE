// axiosInstance.js
import axios from 'axios';

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
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh(() => {
            resolve(http(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        await http.post('/refresh-token'); // server sẽ set lại access token vào cookie

        isRefreshing = false;
        onRefreshed();

        return http(originalRequest); // Gọi lại request cũ sau khi đã refresh
      } catch (err) {
        isRefreshing = false;
        refreshSubscribers = [];
        window.location.href = '/login';
        // Có thể redirect về login ở đây
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default http;
