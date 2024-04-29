import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAuth from "../../../hooks/useAuth";
import moment from "moment-timezone";
import useUser from "../../../hooks/useUser";
const AddProduct = () => {
  const currentDate = moment();
  const axiosPublic = useAxiosPublic();
  const userAuth = useAuth();
  const [user] = useUser();
  const { register, handleSubmit, formState: { errors } } = useForm();


  const { data: categories = [], refetch } = useQuery({
    queryKey: ["categoryData"],
    queryFn: async () => {
      const res = await axiosPublic.get("/category");
      return res.data;
    },
  });

  const onSubmit = (data) => {
    const productDetails = {
      productName: data?.name,
      productCode: data?.productCode,
      unit: data?.unit,
      quantity: data?.quantity,
      category: data?.category,
      purchaseprice: data?.purchaseprice,
      sellprice: data?.sellprice,
      supplierName: data?.supplierName,
      sellingDate: currentDate,
      status: "pending",
      email: user?.email,
      branch: user?.branch,
    };
    // console.log(productDetails);
    // product added to the server
    axiosPublic.post("/products", productDetails).then((res) => {
      // console.log(res);
      if (res.data.message === "success") {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Product added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Product Code has already been taken",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div className="lg:ml-3 xl:ml-9 4xl:h-[80vh] 2xl:h-[80vh] xl:h-[85vh] mx-3 lg:mx-0 rounded-lg bg-white">
      <div className="mt-2 p-2  rounded-md 2xl:h-[66vh] h-screen flex items-center justify-center">
        <div className="md:w-5/6 mx-auto w-full md:p-5 ">
          <div className="lg:py-4">
            <SectionTitle title={"Add Products Info"} />
          </div>
          <form className="" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-2 md:gap-4 mb-2">
              {/* Product Name */}
              <div className="form-control w-full my-1">
                <input
                  {...register("name", { required: true })}
                  type="text"
                  placeholder="Product Name"
                  className="input input-bordered w-full focus:outline-none bg-[#F0F2F5]"
                />
                {errors.name && (
                  <span className="text-red-500">Product Name is required</span>
                )}
              </div>
              {/* product Code */}
              <div className="form-control w-full my-1">
                <input
                  {...register("productCode", { required: true })}
                  type="number"
                  placeholder="Product Code"
                  className="input input-bordered w-full focus:outline-none bg-[#F0F2F5]"
                />
                {errors.quantity && (
                  <span className="text-red-500">Quantity is required</span>
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
                  className="input input-bordered focus:outline-none w-full bg-[#F0F2F5]"
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
                  className="input input-bordered focus:outline-none w-full bg-[#F0F2F5]"
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
                  className="select select-bordered w-full focus:outline-none bg-[#F0F2F5]"
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
                  className="input input-bordered focus:outline-none w-full bg-[#F0F2F5]"
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
                  className="input input-bordered focus:outline-none w-full bg-[#F0F2F5]"
                />
                {errors.sellprice && (
                  <span className="text-red-500">Price is required</span>
                )}
              </div>
              {/* Supplier Name */}
              <div className="form-control w-full my-1">
                <input
                  {...register("supplierName", { required: true })}
                  type="text"
                  placeholder="Supplier Name"
                  className="input input-bordered focus:outline-none w-full bg-[#F0F2F5]"
                />
                {errors.code && (
                  <span className="text-red-500">
                    Supplier Name is required
                  </span>
                )}
              </div>
            </div>
            <button className="focus:outline-none focus:ring-2 w-full mt-5 focus:border-transparent bg-mainBG hover:bg-blue-300 text-white font-semibold py-2.5 rounded-md">
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
