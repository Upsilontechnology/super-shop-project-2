import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useAdmin = () => {
  const axios = useAxiosPrivate();
  const { user, loading } = useAuth();
  const {
    data: isAdmin,
    isPending: isAdminLoading,
    error: isAdminError,
  } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !loading,
    queryFn: async () => {
      if (!user?.email) return;
      try {
        const res = await axios.get(`/users/admin/${user?.email}`);
        return res?.data?.isAdmin;
      } catch (error) {
        if (error.isAxiosError) {
          console.error("Network error:", error);
        } else {
          console.error("Unexpected error:", error);
        }
        throw error;
      }
    },
  });

  return [isAdmin, isAdminLoading, isAdminError];
};

export default useAdmin;
