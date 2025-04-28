import axios from "axios";
import handleError from "./handleError";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    handleError(error);
  }
);

export default axiosInstance;
