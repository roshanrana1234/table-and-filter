import axios from "axios";

// Base URL
const baseURL = process.env.REACT_APP_BASE_URL;

// Getting Token From Local Store
const token = "Token_Bearer";

// Create an Axios instance with custom configuration
const instance = axios.create({
  baseURL: baseURL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer your-access-token",
  },
});

export const request = async ({ ...options }) => {
  instance.defaults.headers.Authorization = `Bearer ${token}`;
  const onSuccess = (response) => response;
  const onError = (error) => {
    // Optionally catch error and add aditional logging here
    return error;
  };
  return instance(options).then(onSuccess).catch(onError);
};
