import axios from "axios";
import { OpenAPI } from "@/api/core/OpenAPI";

interface QueuedRequest {
  resolve: () => void;
  reject: (error: unknown) => void;
}

// Queue to hold requests while refreshing
let isRefreshing = false;
let failedQueue: QueuedRequest[] = [];

const processQueue = (error: unknown) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};

export const setupAxiosInterceptors = (onLogout: () => void): number => {
  // Ensure default axios sends cookies
  axios.defaults.withCredentials = true;

  const interceptorId = axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (!originalRequest) {
        return Promise.reject(error);
      }

      // 1. Skip if it's the auth endpoints themselves (prevent loops)
      if (
        originalRequest.url?.includes("/auth/refresh") ||
        originalRequest.url?.includes("/auth/login") ||
        originalRequest.url?.includes("/auth/logout") ||
        originalRequest.url?.includes("/auth/register")
      ) {
        return Promise.reject(error);
      }

      // 2. Catch 401 errors
      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          // If already refreshing, queue this request
          return new Promise<void>((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(() => {
              originalRequest.withCredentials = true;
              return axios(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          // 3. Attempt Refresh via backend HttpOnly cookie endpoint
          const refreshUrl = `${OpenAPI.BASE}/api/auth/refresh`;
          await axios.post(refreshUrl, {}, { withCredentials: true });

          // 4. Retry queued requests
          processQueue(null);

          // 5. Retry original request with credentials
          originalRequest.withCredentials = true;
          return axios(originalRequest);
        } catch (refreshError) {
          // Refresh failed (cookie expired or revoked) -> Logout user
          processQueue(refreshError);
          onLogout();
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    },
  );

  return interceptorId;
};
