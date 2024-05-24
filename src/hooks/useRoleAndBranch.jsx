import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";

const useRoleAndBranch = () => {
  const axios = useAxiosPrivate();
  const { user, loading } = useAuth();

  const {
    data,
    isLoading: isFetching,
    error,
    refetch: roleRefetch,
  } = useQuery({
    queryKey: [user?.email, "role-and-branch"],
    enabled: !loading,
    queryFn: async () => {
      if (!user?.email) return;

      try {
        const res = await axios.get(`/users/roleAndbranch/${user.email}`);
        // console.log(res);
        return { role: res?.data?.role, branch: res?.data?.branch };
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

  if (!data) {
    console.error("Data is undefined");
    return [null, null, isFetching, error];
  }
  const { role, branch } = data;

  return [role, branch, isFetching, error, roleRefetch];
};

export default useRoleAndBranch;
