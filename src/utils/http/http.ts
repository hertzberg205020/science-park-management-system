import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosResponse } from 'axios';
import { message } from 'antd';
import { store } from '@/store';

const BASE_URL: string = import.meta.env.VITE_API_URL;

export const isRequestSuccess = (statusCode: number): boolean => {
  return statusCode >= 200 && statusCode < 300;
};

// encapsulation the axios instance
const http: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
});

// request interceptor

http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Add any custom request headers or configurations here

    const { token } = store.getState().authSlice;

    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }

    return config;
  }
);

// response interceptor
http.interceptors.response.use((config: AxiosResponse) => {
  // Handle response data

  const rsp = config.data;

  if (!isRequestSuccess(rsp.code)) {
    message.error(`${rsp.code}: ${rsp.message}`);
    return Promise.reject(new Error(rsp.message));
  }

  return config.data;
});


export default http;
