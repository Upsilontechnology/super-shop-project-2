import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";

const useEmployee = () => {
  const axios = useAxiosPrivate();
  const { user, loading } = useAuth();
  console.log(user);
  const {
    data: isEmployee,
    isPending: isEmployeeLoading,
    error: isEmployeeError,
  } = useQuery({
    queryKey: [user?.email, "isEmployee"],
    enabled: !loading,
    queryFn: async () => {
      if (!user?.email) return;

      try {
        const res = await axios.get(`/users/employee/${user?.email}`);
        return res?.data?.isEmployee;
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

  return [isEmployee, isEmployeeLoading, isEmployeeError];
};

export default useEmployee;
