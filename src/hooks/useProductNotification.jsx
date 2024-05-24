import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "./useAuth";
import useRoleAndBranch from "./useRoleAndBranch";
import useAxiosPublic from "./useAxiosPublic";

const useProductNotification = () => {
  const { user } = useAuth();
  const [role, branch, isFetching, error, roleRefetch] = useRoleAndBranch();
  const axiosPublic = useAxiosPublic();
  const {
    data: productNotificationData = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["productNotificationData"],
    queryFn: async () => {
      try {
        const res = await axiosPublic.get(
          `/products/search?role=${role}&branch=${branch}&email=${user?.email}`
        );
        return res.data?.items;
      } catch (error) {
        console.error("Error fetching sell products:", error);
        throw error;
      }
    },
  });
  const datafilter = productNotificationData?.filter((dd) => dd.quantity < 10);
  return { datafilter, refetch, isLoading };
};

export default useProductNotification;