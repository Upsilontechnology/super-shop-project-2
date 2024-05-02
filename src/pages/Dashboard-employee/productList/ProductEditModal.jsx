import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

import moment from "moment-timezone";
import useUser from "../../../hooks/useUser";

const ProductEditModal = ({ onClose, refetchProducts, products }) => {
  const [id, setId] = useState("");
  console.log();
  const { user } = useUser();
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    setId(products[0]._id);
  }, [products[0]._id]);
  //   console.log(id);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data: categories = [], refetch } = useQuery({
    queryKey: ["categoryData"],
    queryFn: async () => {
      const res = await axiosPublic.get("/category");
      return res.data;
    },
  });

  const onSubmit = async (data) => {
    // console.log(data);
    // product added to the server
    // axiosPublic.put(`/products/${id}`, productDetails).then((res) => {
    //   console.log(res);
    //   if (res.data.message === "success") {
    //     Swal.fire({
    //       position: "top-end",
    //       icon: "success",
    //       title: "Product added successfully",
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //     refetchProducts();
    //     onClose();
    //   } else {
    //     Swal.fire({
    //       position: "top-end",
    //       icon: "error",
    //       title: "Product Code has already been taken",
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //   }
    // });
    try {
      const productDetails = {
        productName: data?.name,
        productCode: data?.productCode,
        unit: data?.unit,
        quantity: data?.quantity,
        category: data?.category,
        purchaseprice: data?.purchaseprice,
        sellprice: data?.sellprice,
        supplierName: data?.name,
        //   sellingDate: currentDate,
        status: "pending",
        email: user?.email,
        branch: user?.branch,
      };
      const res = await axiosPublic.put(`/products/${id}`, productDetails);
      console.log(res);
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
            {/* mapping the data */}
            {products?.map((product) => (
              <form key={product?._id} onSubmit={handleSubmit(onSubmit)}>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-2 md:gap-4 mb-2">
                  {/* Product Name */}
                  <div className="form-control w-full my-1">
                    <input
                      {...register("name", { required: true })}
                      type="text"
                      placeholder="Product Name"
                      className="input  w-full focus:outline-none bg-[#F0F2F5]"
                      defaultValue={product?.productName}
                    />
                    {errors.name && (
                      <span className="text-red-500">
                        Product Name is required
                      </span>
                    )}
                  </div>
                  {/* product Code */}
                  <div className="form-control w-full my-1">
                    <input
                      {...register("productCode", { required: true })}
                      type="number"
                      placeholder="Product Code"
                      className="input w-full focus:outline-none bg-[#F0F2F5]"
                      defaultValue={product?.productCode}
                    />
                    {errors.quantity && (
                      <span className="text-red-500">
                        Product Code is required
                      </span>
                    )}
                  </div>
                </div>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-2 md:gap-4 mb-2">
                  {/* Unit */}
                  <div className="form-control w-full my-1">
                    <input
                      {...register("unit", { required: true })}
                      type="number"
                      placeholder="Unit"
                      className="input focus:outline-none w-full bg-[#F0F2F5]"
                      defaultValue={product?.unit}
                    />
                    {errors.unit && (
                      <span className="text-red-500">Unit is required</span>
                    )}
                  </div>
                  {/* Quantity */}
                  <div className="form-control w-full my-1">
                    <input
                      {...register("quantity", { required: true })}
                      type="number"
                      placeholder="Quantity"
                      className="input focus:outline-none w-full bg-[#F0F2F5]"
                      defaultValue={product?.quantity}
                    />
                    {errors.quantity && (
                      <span className="text-red-500">Quantity is required</span>
                    )}
                  </div>
                </div>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-2 md:gap-4 mb-2">
                  {/* category */}
                  <div className="form-control w-full my-1">
                    <select
                      className="select w-full focus:outline-none bg-[#F0F2F5]"
                      defaultValue={product?.category}
                      {...register("category", { required: true })}
                    >
                      {categories?.items?.map((category, index) => (
                        <option value={category?.category} key={category._id}>
                          {category?.category}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Purchase Price */}
                  <div className="form-control w-full my-1">
                    <input
                      {...register("purchaseprice", { required: true })}
                      type="number"
                      placeholder="Purchase Price"
                      className="input focus:outline-none w-full bg-[#F0F2F5]"
                      defaultValue={product?.purchaseprice}
                    />
                    {errors.purchaseprice && (
                      <span className="text-red-500">
                        Purchase Price is required
                      </span>
                    )}
                  </div>
                </div>
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-2 md:gap-4 mb-2">
                  {/* Sell Price */}
                  <div className="form-control w-full my-1">
                    <input
                      {...register("sellprice", { required: true })}
                      type="number"
                      placeholder="Sell Price"
                      className="input focus:outline-none w-full bg-[#F0F2F5]"
                      defaultValue={product?.sellprice}
                    />
                    {errors.sellprice && (
                      <span className="text-red-500">
                        Sell Price is required
                      </span>
                    )}
                  </div>
                  {/* Supplier Name */}
                  <div className="form-control w-full my-1">
                    <input
                      {...register("supplierName", { required: true })}
                      type="text"
                      placeholder="Supplier Name"
                      className="input focus:outline-none w-full bg-[#F0F2F5]"
                      defaultValue={product?.supplierName}
                    />
                    {errors.code && (
                      <span className="text-red-500">
                        Supplier Name is required
                      </span>
                    )}
                  </div>
                </div>
                <button className="focus:outline-none focus:ring-2 w-full mt-5 focus:border-transparent hover:bg-[#959ff0] bg-[#757ec9] text-white font-semibold py-2.5 rounded-md">
                  Update Product
                </button>
              </form>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEditModal;
