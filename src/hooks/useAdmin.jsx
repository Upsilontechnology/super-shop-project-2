// import useAxiosPrivate from "./useAxiosPrivate";
// import useAuth from "./useAuth";
// import { useQuery } from "@tanstack/react-query";

// const useAdmin = () => {
//   const axios = useAxiosPrivate();
//   const { user, loading } = useAuth();
//   console.log(user);
//   const {
//     data: isAdmin,
//     isPending: isAdminLoading,
//     error: isAdminError,
//   } = useQuery({
//     queryKey: [user?.email, "isAdmin"],
//     enabled: !loading,
//     queryFn: async () => {
//       if (!user?.email) return;
//       try {
//         const res = await axios.get(`/users/admin/${user?.email}`);
//         return res?.data?.isAdmin;
//       } catch (error) {
//         if (error.isAxiosError) {
//           console.error("Network error:", error);
//         } else {
//           console.error("Unexpected error:", error);
//         }
//         throw error;
//       }
//     },
//   });

//   return [isAdmin, isAdminLoading, isAdminError];
// };

// export default useAdmin;

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
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      if (!user?.email) return;

      try {
        const res = await axios.get(`/users/admin/${user.email}`);
        if (res.status !== 200) {
          throw new Error(`Error: ${res.status}`);
        }
        return res.data.isAdmin;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Network error:",
            error.response?.data || error.message
          );
          throw new Error(error.response?.data || "Network error");
        } else {
          console.error("Unexpected error:", error);
          throw error;
        }
      }
    },
  });

  if (!isAdmin && !isAdminLoading && !isAdminError) {
    console.error("Data is undefined");
    return [null, isAdminLoading, isAdminError];
  }

  return [isAdmin, isAdminLoading, isAdminError];
};

export default useAdmin;
