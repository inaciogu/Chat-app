import axios, { AxiosError } from 'axios';

enum EStatusCode {
  unauthorized = 401
}

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.response.use((response) => response, (error: AxiosError) => {
  if (error.response?.status === EStatusCode.unauthorized) {
    window.location.reload();
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    if (config.headers) {
      config.headers.Authorization = token;
    }
  }
  return config;
});

export default api;
