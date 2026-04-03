import axios from 'axios';
import { API_BASE_URL } from './config/api';
import { notifyUnauthorized } from './utils/authSession';

const axiosInstance = axios.create({
  baseURL: "http://3.107.177.44:3333",
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error.response?.status;
    const authHeader =
      error.config?.headers?.Authorization ?? error.config?.headers?.authorization;
    if (status === 401 && authHeader) {
      notifyUnauthorized();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
