import axios from "axios";

const instance = axios.create({
  //   baseURL: "/api",
  baseURL: "http://localhost:5000/api",
  // baseURL: "https://super-shop-server-2.vercel.app/api",
  withCredentials: true,
});

const useAxiosPublic = () => {
  return instance;
};

export default useAxiosPublic;
