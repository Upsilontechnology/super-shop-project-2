import React from "react";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";
import useRoleAndBranch from "./useRoleAndBranch";
import { useQuery } from "@tanstack/react-query";

const useSellProducts = () => {
  const { user } = useAuth();
  const [role, branch, isFetching, error, roleRefetch] = useRoleAndBranch();
  const axiosPublic = useAxiosPublic();
  const {
    data: sellproducts = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["sellproducts"],
    queryFn: async () => {
      try {
        const res = await axiosPublic.get(
          `/sellProducts?role=${role}&email=${
            user?.email
          }&branch=${branch}&status=${"pending"}`
        );
        return res.data?.items;
      } catch (error) {
        console.error("Error fetching sell products:", error);
        throw error;
      }
    },
  });
  return { sellproducts, refetch, isLoading };
};

export default useSellProducts;
