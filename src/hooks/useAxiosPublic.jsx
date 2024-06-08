import axios from "axios";

const instance = axios.create({
  // baseURL: "https://super-shop-server-2.vercel.app/api",
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

const useAxiosPublic = () => {
  return instance;
};

export default useAxiosPublic;
