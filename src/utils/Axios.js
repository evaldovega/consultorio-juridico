import axios from "axios";
import { ACCESS_TOKEN_NAME } from "constants/apiContants";
console.log(ACCESS_TOKEN_NAME);
const getToken = () => `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`;
//10.0.82.187 10.0.82.207 179.0.29.155
export const baseUrl = "https://consultoriojuridico.uniatlantico.edu.co:8000";

const API = axios.create({
  baseURL: "https://consultoriojuridico.uniatlantico.edu.co:8000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  function (config) {
    if (localStorage.getItem(ACCESS_TOKEN_NAME)) {
      config.headers.common = {
        ...config.headers.common,
        authorization: getToken(),
      };
    }
    return config;
  },
  function (error) {
    // Do something with request error

    return Promise.reject(error);
  }
);

export default API;
