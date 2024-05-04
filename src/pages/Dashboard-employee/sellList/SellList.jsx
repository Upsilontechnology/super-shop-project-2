import React, { useRef, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useRoleAndBranch from "../../../hooks/useRoleAndBranch";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import SellEditModal from "./SellEditModal";
import Pagination from "../../../components/pagination/Pagination";
import { useQuery } from "@tanstack/react-query";
import SellProduct from "./sellproduct/SellProduct";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { ReactToPrint } from "react-to-print";
import { IoPrintOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
const SellList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const { user } = useAuth();
  const [role, branch, isFetching, error, roleRefetch] = useRoleAndBranch();
  const axiosPublic = useAxiosPublic();
  const [openModal, setOpenModal] = useState(false);
  const [sell, setSell] = useState("");
  const [items, setItems] = useState(null);
  const componentRef = useRef(null);
  const handleCloseModal = () => {
    setOpenModal(false);
  };
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
  // console.log(sellproducts);
  const handleEditModal = async (product) => {
    try {
      const response = await axiosPublic.get(`/sellProducts/${product?._id}`);
      setSell(response?.data);
      setOpenModal(true);
      console.log(openModal);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
    setOpenModal(true);
  };
  const totalAmount = sellproducts?.reduce(
    (total, product) => total + product?.price * product?.quantity,
    0
  );
  const totalProduct = sellproducts?.reduce(
    (total, product) => total + product?.quantity,
    0
  );
  const handleSoldProduct = async (product) => {
    // setItems(product);
    // console.log(product);
    const data = product?.map((data) => ({
      quantity: data?.quantity,
      code: data?.productCode,
    }));
    // console.log(data);
    if (sellproducts?.length === 0) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Please add data first",
        showConfirmButton: false,
        timer: 2000,
      });
    } else {
      await axiosPublic
        .patch("/sellProducts/soldProducts", { items: data })
        .then((res) => {
          if (res.data.message === "success") {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Payment successfull",
              showConfirmButton: false,
              timer: 1000,
            });
          }
        });
      await axiosPublic.patch("/sellProducts/status");
      refetch();
    }
  };

  return (
    <div className="overflow-auto lg:ml-3 xl:ml-9 4xl:h-[80vh] 2xl:h-[80vh] xl:h-[85vh] lg:h-[83vh] mx-3 lg:mx-0 rounded-lg bg-white">
      {/* <div className="p-5 flex justify-between">
        <SectionTitle title={"Temporary Sell List"} />
        <div>
          <ReactToPrint
            trigger={() => (
              <button className="font-bold rounded">
                <IoPrintOutline className="text-2xl" />
              </button>
            )}
            content={() => componentRef.current}
            documentTitle="Product Summary"
            pageStyle="print"
          />
        </div>
      </div> */}
      {sellproducts?.length > 0 ? (
        <div className="w-[90%] mx-auto">
          <div className="p-5 flex justify-between">
            <SectionTitle title={"Temporary Sell List"} />
            <div>
              <ReactToPrint
                trigger={() => (
                  <button className="font-bold rounded">
                    <IoPrintOutline className="text-2xl" />
                  </button>
                )}
                content={() => componentRef.current}
                documentTitle="Product Summary"
                pageStyle="print"
              />
            </div>
          </div>
          <div className="bg-white p-2 md:p-5 rounded-md space-y-5">
            <div className="overflow-x-auto" ref={componentRef}>
              <table className="table">
                {/* head */}
                <thead className="">
                  <tr className=" text-black  border-b-[1.2px] border-black">
                    <th className="float-start">Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th className="float-end">Action</th>
                  </tr>
                </thead>
                <tbody className="">
                  {sellproducts?.map((product, index) => (
                    <SellProduct
                      key={product?._id}
                      product={product}
                      onEdit={handleEditModal}
                      // onSell={handleSellModal}
                      refetchProducts={refetch}
                      index={index}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-1/2 float-right m-5">
            <div className="flex lg:flex-row flex-col justify-between p-5 border-2 border-black font-bold lg:text-xl text-base">
              <h1>Total({totalProduct})</h1>
              <h1>BDT({totalAmount})</h1>
            </div>
          </div>
          <button
            onClick={() => handleSoldProduct(sellproducts)}
            className="focus:outline-none focus:ring-2 w-full mt-5 focus:border-transparent bg-mainBG hover:bg-blue-300 text-white font-semibold py-2.5 rounded-md"
          >
            Submit
          </button>
        </div>
      ) : (
        <>
          <div className="bg-white md:h-auto overflow-scroll 2xl:h-[80vh] xl:h-[80vh] lg:h-[100vh] h-[81vh] lg:ml-10 rounded-md mx-3 lg:mx-0">
            <div className="flex flex-col justify-center h-full items-center">
              <div className="flex justify-center items-center mt-4">
                <img
                  className="w-[50%]"
                  src="https://i.ibb.co/MC9sqSm/doctor-Profile-20.jpg"
                  alt=""
                />
              </div>
              <div className="text-center mt-6 w-3/4 ">
                <p className="font-semibold">
                  No Product Available to Show Here
                </p>
                <Link to="/productList">
                  <button className="focus:outline-none focus:ring-2 w-[70%] mt-5 focus:border-transparent bg-[#757ec9] hover:bg-[#4a518e] text-white font-semibold py-2.5 rounded-md">
                    Sell Product
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
      {openModal && (
        <SellEditModal
          onClose={handleCloseModal}
          refetchProducts={refetch}
          products={sell}
        />
      )}
    </div>
  );
};

export default SellList;
