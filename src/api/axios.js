/**
 * Axios instance configured with base URL, timeout, and default headers.
 */
import axios from 'axios';
import router from '@/router';
import { useAuthStore } from '@/stores/authStore';

const apiClient = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedRequestsQueue = [];

/**
 * Request interceptor to add Authorization header with access token.
 */
apiClient.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();
    const token = authStore.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response interceptor to handle 401 (Unauthorized) errors by refreshing the access token.
 */
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const response = await apiClient.post('/auth/refresh');

          const newAccessToken = response.data.access_token;
          const authStore = useAuthStore();
          authStore.setUserToken(newAccessToken);

          failedRequestsQueue.forEach((callback) => callback(newAccessToken));
          failedRequestsQueue = [];

          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          const authStore = useAuthStore();
          authStore.clearAuthData();
          router.push('/');
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      } else {
        return new Promise((resolve) => {
          failedRequestsQueue.push((newAccessToken) => {
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            resolve(apiClient(originalRequest));
          });
        });
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
