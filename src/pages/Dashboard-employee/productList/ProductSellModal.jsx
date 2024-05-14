import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import moment from "moment-timezone";
import useUser from "../../../hooks/useUser";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const ProductSellModal = ({ onClose, refetchProducts, products }) => {
  const axiosPublic = useAxiosPublic();
  const currentDate = moment();
  const [productdata, setProductdata] = useState(products[0]);
  const [user] = useUser();
  const [id, setId] = useState("");

  useEffect(() => {
    setId(products[0]?._id);
  }, [products[0]?._id]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const sellProductDetails = {
        productName: productdata?.productName,
        productCode: productdata?.productCode,
        quantity: data?.quantity,
        category: productdata?.category,
        price: data?.price,
        sellingDate: currentDate,
        status: "pending",
        email: user?.email,
        branch: user?.branch,
      };
      if (data?.quantity > productdata?.quantity) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "The quantity is low",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        const res = await axiosPublic.post(`/sellProducts`, sellProductDetails);
        // console.log(res);
        if (res.data.message === "success") {
          refetchProducts();
          onClose();
          Swal.fire({
            title: "Products Uploaded in sell list!",
            text: "Your request has been accepted.",
            icon: "success",
          });
        } else {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Something Wrong",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    } catch (error) {
      console.error("Error updating products:", error);
    }
  };

  return (
    <div className="fixed z-[100] flex items-center justify-center inset-0 bg-black/10 duration-100">
      <div className="lg:w-[40%] w-[90%] rounded-xl bg-white px-4 py-3 scale-1 opacity-1 duration-200">
        <div className="rounded-lg w-full">
          <button
            onClick={onClose}
            className="text-[#1D2A3B] float-end text-lg"
          >
            <GiCancel className="text-2xl" />
          </button>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 rounded-lg space-y-3 lg:px-14 px-5 lg:py-24 py-10"
          >
            <div className="flex flex-col gap-2">
              <div className="form-control w-full my-1">
                <input
                  {...register("price", { required: true })}
                  type="number"
                  placeholder="Put Price"
                  className="p-4 rounded-md w-full focus:outline-none bg-[#F0F2F5]"
                />
              </div>
              <div className="form-control w-full my-1">
                <input
                  {...register("quantity", { required: true })}
                  type="number"
                  placeholder="Put Quantity"
                  className="p-4 rounded-md w-full focus:outline-none bg-[#F0F2F5]"
                />
              </div>
            </div>
            <div className="flex gap-5">
              <button
                type="submit" // Specify type as "submit"
                className="focus:border-transparent w-full hover:bg-[#959ff0] bg-[#757ec9] text-white font-semibold py-4 rounded-md"
              >
                Add To Sell List
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductSellModal;
