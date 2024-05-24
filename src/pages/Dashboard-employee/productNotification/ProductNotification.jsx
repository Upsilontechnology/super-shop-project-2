import React, { useEffect, useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import NotificationList from "./notificationList/NotificationList";
import useRoleAndBranch from "../../../hooks/useRoleAndBranch";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Pagination from "../../../components/pagination/Pagination";
import deepEqual from "deep-equal";

const ProductNotification = () => {
  const [length, setLength] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [role, branch, isFetching, error, roleRefetch] = useRoleAndBranch();

  const {
    data: sellproducts = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["sellproducts", branch],

    queryFn: async () => {
      try {
        const res = await axiosPublic.get(
          `/products/search?role=${role}&branch=${branch}&email=${user?.email}&itemsPerPage=${itemsPerPage}&currentPage=${currentPage}`
        );
        return res.data.items;
      } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
      }
    },
    equalityFn: deepEqual,
  });
  // console.log(sellproducts);
  const datafilter = sellproducts?.filter((dd) => dd.quantity < 10);

  // console.log(datafilter);
  useEffect(() => {
    if (sellproducts && sellproducts?.length) {
      setLength(sellproducts?.length);
      refetch();
    } else {
      setLength(0);
      refetch();
    }
  }, [sellproducts]);
  return (
    <div className="overflow-auto lg:ml-3 xl:ml-9 4xl:h-[80vh] 2xl:h-[80vh] lg:h-[83vh] mx-3 lg:mx-0 rounded-lg bg-white">
      <div className="p-5 flex justify-start">
        <SectionTitle title={"Product  Alert Notification"} />
      </div>
      <div className="w-[95%] lg:w-[60%] mx-auto">
        <div className="bg-white p-2 md:p-5 rounded-md space-y-5">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead className="">
                <tr className=" text-black  border-b-[1.2px] border-black">
                  <th className="float-start">Sl</th>
                  <th>Product</th>
                  <th>Code</th>
                  <th className="float-end">Quantity</th>
                </tr>
              </thead>
              <tbody className="">
                {datafilter?.map((product, index) => (
                  <NotificationList
                    key={product._id}
                    product={product}
                    refetchProducts={refetch}
                    index={index}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(length / itemsPerPage)}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default ProductNotification;
