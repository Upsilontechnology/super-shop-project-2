import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";
import useAuth from "./useAuth";

const useEmployee = () => {
  const axios = useAxiosPrivate();
  const { user, loading } = useAuth();

  const {
    data: isEmployee = false, // Default to `false` if `data` is `undefined`
    isLoading: isEmployeeLoading, // Corrected naming for consistency
    error: isEmployeeError,
  } = useQuery({
    queryKey: [user?.email, "isEmployee"],
    enabled: !!user?.email && !loading, // Ensure `enabled` is false if `user.email` is not available
    queryFn: async () => {
      if (!user?.email) return false; // Return a default value instead of `undefined`

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
