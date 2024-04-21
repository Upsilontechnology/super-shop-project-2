import { useQuery } from "@tanstack/react-query";
import useAxiosPrivate from "./useAxiosPrivate";

const useEmployee = () => {
  const axios = useAxiosPrivate();

  // console.log(user?.email);

  //   const { data: isEmployee, isPending: isEmployeeLoading } = useQuery({
  //     queryKey: [user?.email, "isEmployee"],
  //     enabled: !isLoading,
  //     queryFn: async () => {
  //       const res = await axios.get(`/users/${user?.email}`);
  //       return res?.data?.isEmployee;
  //     },
  //   });
  return [isEmployee, isEmployeeLoading];
};

export default useEmployee;
