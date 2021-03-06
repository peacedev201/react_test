import axios from "axios";

// ----------------------------------------------------------------------

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = "http://ergast.com/api/f1";
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || "Something went wrong")
);

export default axiosInstance;
