import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useUser = () => {
  const axios = useAxiosPublic();
  const users = useAuth();
  const email = users?.user?.email;
  // console.log(email);
  const { data: user = [], refetch } = useQuery({
    queryKey: ["Users"],
    queryFn: async () => {
      const res = await axios.get(`/users/${email}`);
      return res.data;
    },
  });
  // console.log(user);
  return [user, refetch];
};

export default useUser;
