import axios from "axios";

const instance = axios.create({
  // baseURL: "https://super-shop-server-2.vercel.app/api",
  baseURL: "http://localhost:5000/api",
  // baseURL: "https://supershop-server.abmgloballtd.com/api",
  // baseURL: "https://super-shop-server-2.vercel.app/api",
  withCredentials: true,
});

const useAxiosPublic = () => {
  return instance;
};

export default useAxiosPublic;
