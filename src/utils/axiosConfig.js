import axios from "axios";

const axiosConfig = axios.create();

axiosConfig.interceptors.request.use(
  function (config) {
   
  config.headers.Authorization = "Bearer 16e2f0694a311151c01aa0a131b94a5a3ad7f110e12c2d8f459fcbb158214f5f";

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosConfig;
