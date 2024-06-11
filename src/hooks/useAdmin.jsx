import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";

const useAdmin = () => {
  const axios = useAxiosPrivate();
  const { user, loading } = useAuth();

  const {
    data: isAdmin,
    isLoading: isAdminLoading,
    error: isAdminError,
  } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !loading && Boolean(user?.email),
    queryFn: async () => {
      try {
        const res = await axios.get(`/users/admin/${user.email}`);
        return res.data.isAdmin;
      } catch (error) {
        const errorMessage = axios.isAxiosError(error)
          ? error.response?.data || "Network error"
          : "Unexpected error";
        console.error("Error fetching admin status:", errorMessage);
        throw new Error(errorMessage);
      }
    },
  });

  return [isAdmin, isAdminLoading, isAdminError];
};

export default useAdmin;
