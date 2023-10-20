import axios from "axios";
// import { getToken, setToken } from "../AllTokens/AccessToken";

// const token = getToken("token");
const token = "Roshan";
const baseURL = process.env.REACT_APP_BASE_URL;

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    // Do something before request is sent
    console.log("Config", config);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      config.headers.Authorization = null;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  async (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // setToken(response.token);
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosInstance;
