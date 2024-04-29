import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Pagination from "../../../components/pagination/Pagination";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Product from "./Product/Product";
import ProductEditModal from "./ProductEditModal";
import ProductSellModal from "./ProductSellModal";

const ProductList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const axiosPublic = useAxiosPublic();
  const [openModal, setOpenModal] = useState(false);
  const [openSellModal, setOpenSellModal] = useState(false);
  const [sell, setSell] = useState("");

  const { data: products = [], refetch } = useQuery({
    queryKey: ["productData", itemsPerPage, currentPage],
    queryFn: async () => {
      try {
        const res = await axiosPublic.get(
          `/products?itemsPerPage=${itemsPerPage}&currentPage=${currentPage}`
        );
        return res.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
      }
    },
  });

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

  const handleCloseModal = () => {
    setOpenModal(false);
    setOpenSellModal(false)
  };


  return (
    <div className="lg:ml-3 xl:ml-9 4xl:h-[80vh] 2xl:h-[80vh] xl:h-[85vh] mx-3 lg:mx-0 rounded-lg bg-white">
      <div className="bg-white p-2 md:p-5 rounded-md space-y-5">
        <div className="flex flex-row gap-5">
          <div className="form-control lg:w-1/2 w-[96%] lg:mb-5 mb-2 mx-auto  placeholder:bg-gray-300 rounded-md">
            <input
              onChange={(e) => setSearchValue(e.target.value)}
              type="text"
              placeholder="Search product with code"
              className="input  focus:outline-none bg-gray-100"
            />
          </div>
          <div className="form-control lg:w-1/2 w-[96%] lg:mb-5 mb-2 mx-auto  placeholder:bg-gray-300 rounded-md">
            <input
              onChange={(e) => setSearchValue(e.target.value)}
              type="text"
              placeholder="Search with Category"
              className="input  focus:outline-none bg-gray-100"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="">
              <tr className=" text-black  border-b-[1.2px] border-black">
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
              {products?.map((product, index) => (
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
    </div >
  );
};

export default ProductList;
