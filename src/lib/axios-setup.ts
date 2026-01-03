import axios from "axios";
import { OpenAPI } from "@/api/core/OpenAPI";
import { TokenService } from "@/api/services/TokenService";

// Queue to hold requests while refreshing
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export const setupAxiosInterceptors = (onLogout: () => void) => {
  // Clear existing interceptors to avoid duplicates if this runs twice
  // (Note: axios.interceptors.response.eject is complex to track,
  // so we assume this runs once in AuthProvider)

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // 1. Skip if it's the refresh call itself (prevent infinite loops)
      if (originalRequest.url?.includes("/token/refresh")) {
        return Promise.reject(error);
      }

      // 2. Catch 401 errors
      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          // If already refreshing, queue this request
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers["Authorization"] = "Bearer " + token;
              return axios(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const refreshToken = localStorage.getItem("refresh_token");

        if (!refreshToken) {
          isRefreshing = false;
          onLogout();
          return Promise.reject(error);
        }

        try {
          // 3. Attempt Refresh
          const response = await TokenService.tokenRefresh({
            refresh: refreshToken,
          });

          // 4. Update Storage & Config
          const newAccess = response.access;
          const newRefresh = response.refresh; // If rotation is enabled

          localStorage.setItem("access_token", newAccess);
          if (newRefresh) {
            localStorage.setItem("refresh_token", newRefresh);
          }
          OpenAPI.TOKEN = newAccess;

          // 5. Retry queued requests
          processQueue(null, newAccess);

          // 6. Retry original request
          originalRequest.headers["Authorization"] = "Bearer " + newAccess;
          return axios(originalRequest);
        } catch (refreshError) {
          // Refresh failed (token expired or revoked) -> Logout user
          processQueue(refreshError, null);
          onLogout();
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    },
  );
};
