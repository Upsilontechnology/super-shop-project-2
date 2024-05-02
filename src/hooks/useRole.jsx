import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";

const useRole = () => {
  const axios = useAxiosPrivate();
  const { user, loading } = useAuth();
  const {
    data: role,
    isPending: roleLoading,
    error: roleError,
  } = useQuery({
    queryKey: [user?.email, "role"],
    enabled: !loading,
    queryFn: async () => {
      if (!user?.email) return;
      try {
        const res = await axios.get(`/users/role/${user?.email}`);
        // console.log(res?.data?.role);
        return res?.data?.role;
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

  return [role, roleLoading, roleError];
};

export default useRole;
