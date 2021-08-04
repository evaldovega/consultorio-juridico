import axios from "axios";
import { ACCESS_TOKEN_NAME } from "constants/apiContants";
console.log(ACCESS_TOKEN_NAME)
const getToken = () => `Bearer ${localStorage.getItem(ACCESS_TOKEN_NAME)}`;

const API = axios.create({
  baseURL: "http://ua-cj-dashboard.ufotech.co/api/",
  headers: {
    'Content-Type': 'application/json'
  }
});

API.interceptors.request.use(
  function (config) {
    if(localStorage.getItem(ACCESS_TOKEN_NAME)){
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
