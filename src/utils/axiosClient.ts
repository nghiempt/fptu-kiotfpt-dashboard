import axios from "axios";
import { HOST } from "./api";

const axiosClient = axios.create({
  headers: {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "X-Requested-With",
  },
});

axiosClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token")
  config.baseURL = HOST;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    if (config.method === "get" || config.method === "path") {
      const param = config.params;
      if (param) {
        config.params = param;
      }
    } else {
      const data = config.data;
      if (data) {
        config.data = data;
      }
    }
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response;
    }
    return response;
  },
  (error) => {
    console.log("ERROR: ", error.response);
    return error;
  }
);

export default axiosClient;