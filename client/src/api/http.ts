import axios from 'axios';

const baseURL: string =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? '';

export const axiosForBackend = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
});

export default axiosForBackend;
