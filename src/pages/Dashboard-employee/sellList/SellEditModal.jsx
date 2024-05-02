import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GiCancel } from "react-icons/gi";
import Swal from "sweetalert2";
import useUser from "../../../hooks/useUser";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const SellEditModal = ({ onClose, refetchProducts, products }) => {
  // console.log(products);
  const [id, setId] = useState("");
  console.log();
  const { user } = useUser();
  const axiosPublic = useAxiosPublic();
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
      const productDetails = {
        price: data?.unit,
        quantity: data?.quantity,
      };
      const res = await axiosPublic.put(`/sellProducts/${id}`, productDetails);
      // console.log(res);
      if (res.data.message === "success") {
        refetchProducts();
        Swal.fire({
          title: "Products Updated!",
          text: "Your request has been accepted.",
          icon: "success",
        });
        onClose();
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Something Wrong",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error updating products:", error);
    }
  };
  return (
    <div className="fixed z-[100] flex items-center justify-center inset-0 bg-black/10 duration-100">
      <div className="w-[50%] rounded-xl bg-white px-4 py-3 scale-1 opacity-1 duration-200">
        <div className="rounded-lg w-full">
          <button
            onClick={onClose}
            className="text-[#1D2A3B] float-end text-lg"
          >
            <GiCancel className="text-2xl" />
          </button>
          <div className="w-[90%] mx-auto pt-5 pb-10">
            <h1 className="text-2xl font-semibold py-5">
              Edit Product Details
            </h1>
            <div className="rounded-lg w-full">
              {products?.map((product) => (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-2 rounded-lg space-y-3 px-14 py-24"
                >
                  <div className="flex flex-col gap-2">
                    <div className="form-control w-full my-1">
                      <input
                        {...register("price", { required: true })}
                        type="number"
                        placeholder="Put Price"
                        defaultValue={product?.price}
                        className="p-4 rounded-md w-full focus:outline-none bg-[#F0F2F5]"
                      />
                    </div>
                    <div className="form-control w-full my-1">
                      <input
                        {...register("quantity", { required: true })}
                        type="number"
                        placeholder="Put Quantity"
                        defaultValue={product?.quantity}
                        className="p-4 rounded-md w-full focus:outline-none bg-[#F0F2F5]"
                      />
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <button
                      type="submit"
                      className="focus:border-transparent w-full hover:bg-[#959ff0] bg-[#757ec9] text-white font-semibold py-4 rounded-md"
                    >
                      Update Sell List Product
                    </button>
                  </div>
                </form>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellEditModal;
