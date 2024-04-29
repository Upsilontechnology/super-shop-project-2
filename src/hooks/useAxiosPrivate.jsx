import axios from "axios";
import { signOut } from "firebase/auth";
import auth from "../firebase/firebase.config";

const instance = axios.create({
  //   baseURL: "",
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

const useAxiosPrivate = () => {
  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    async (error) => {
      const status = error.response.status;
      if (status === 401 || status === 403) {
        await signOut(auth);
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default useAxiosPrivate;
