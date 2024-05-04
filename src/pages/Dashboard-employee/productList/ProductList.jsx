import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Pagination from "../../../components/pagination/Pagination";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Product from "./Product/Product";
import ProductEditModal from "./ProductEditModal";
import ProductSellModal from "./ProductSellModal";
import deepEqual from "deep-equal";
import useRoleAndBranch from "../../../hooks/useRoleAndBranch";
import useAuth from "../../../hooks/useAuth";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const { user } = useAuth();
  const [searchValue, setSearchValue] = useState("");
  const [role, branch, isFetching, error, roleRefetch] = useRoleAndBranch();
  const axiosPublic = useAxiosPublic();
  const [openModal, setOpenModal] = useState(false);
  const [openSellModal, setOpenSellModal] = useState(false);
  const [sell, setSell] = useState("");

  const handleEditModal = async (product) => {
    try {
      const response = await axiosPublic.get(`/products/${product?._id}`);
      setSell(response?.data);
      // setOpenModal(true);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
    setOpenModal(true);
  };
  const {
    data: products = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["products", searchValue, itemsPerPage, currentPage, branch],

    queryFn: async () => {
      try {
        const res = await axiosPublic.get(
          `/products/search?role=${role}&branch=${branch}&email=${user?.email}&searchValue=${searchValue}&itemsPerPage=${itemsPerPage}&currentPage=${currentPage}`
        );
        return res.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
      }
    },
    equalityFn: deepEqual,
  });

  const handleSellModal = async (product) => {
    try {
      const response = await axiosPublic.get(`/products/${product?._id}`);
      setSell(response?.data);
      // setOpenModal(true);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
    setOpenSellModal(true);
  };

  useEffect(() => {
    refetch();
  }, [branch, searchValue, itemsPerPage, currentPage, role, user?.email]);
  const handleCloseModal = () => {
    setOpenModal(false);
    setOpenSellModal(false);
  };

  return (
    <div className="overflow-auto lg:ml-3 xl:ml-9 4xl:h-[80vh] 2xl:h-[80vh] xl:h-[85vh] lg:h-[83vh] mx-3 lg:mx-0 rounded-lg bg-white">
      {/* <SectionTitle title={"Temporary Sell List"} /> */}
      <div className="bg-white p-2 md:p-5 rounded-md space-y-5">
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="form-control lg:w-1/2 w-[96%] lg:mb-5 mb-2 mx-auto  placeholder:bg-gray-300 rounded-md">
            <input
              // value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              type="number"
              placeholder="Search product with code"
              className="input  focus:outline-none bg-gray-100"
            />
          </div>
          <div className="form-control lg:w-1/2 w-[96%] lg:mb-5 mb-2 mx-auto  placeholder:bg-gray-300 rounded-md">
            <input
              // value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              type="text"
              placeholder="Search with Category"
              className="input  focus:outline-none bg-gray-100"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table text-center">
            {/* head */}
            <thead className="">
              <tr className=" text-black border-b-[1.2px] border-black">
                <th>Sl</th>
                <th>Code</th>
                <th>Category</th>
                <th>Name</th>
                <th>Supplier</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>Sales Rate</th>
                <th>Purchase Rate</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="">
              {products?.items?.map((product, index) => (
                <Product
                  key={product._id}
                  product={product}
                  onEdit={handleEditModal}
                  onSell={handleSellModal}
                  refetchProducts={refetch}
                  index={index}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(length / itemsPerPage)}
        setCurrentPage={setCurrentPage}
      />
      {openModal && (
        <ProductEditModal
          onClose={handleCloseModal}
          refetchProducts={refetch}
          products={sell}
        />
      )}
      {openSellModal && (
        <ProductSellModal
          onClose={handleCloseModal}
          refetchProducts={refetch}
          products={sell}
        />
      )}
    </div>
  );
};

export default ProductList;
