import axios, { type AxiosInstance, type InternalAxiosRequestConfig, type AxiosResponse } from "axios";
import { message } from "antd";
import { store } from '@/store';

const BASE_URL: string = import.meta.env.VITE_API_URL;

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

  if (rsp.code !== 200) {
    message.error(`${rsp.code}: ${rsp.message}`);
    return Promise.reject(new Error(rsp.message));
  }


  console.log("Response Interceptor", config);
  return config.data;
})


export default http;
