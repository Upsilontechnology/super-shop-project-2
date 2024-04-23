import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";

const useAdmin = () => {
  const axios = useAxiosPrivate();
  const user = useAuth();
  try {
    // const { data: isAdmin, isPending: isAdminLoading } = useQuery({
    //   queryKey: [user?.email, "isAdmin"],
    //   enabled: !isLoading,
    //   queryFn: async () => {
    //     const res = await axios.get(`/users/admin/${user?.email}`);
    //     return res?.data?.isAdmin;
    //   },
    // });
  } catch (error) {
    console.log(error);
  }
  return [isAdmin, isAdminLoading];
};

export default useAdmin;
