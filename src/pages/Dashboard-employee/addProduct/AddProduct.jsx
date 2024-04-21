import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
const AddProduct = () => {
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // const { user } = useAuth();
  const { data: categories = [], refetch } = useQuery({
    queryKey: ["categoryData"],
    queryFn: async () => {
      const res = await axiosPublic.get("/category");
      return res.data;
    },
  });

  const onSubmit = (data) => {
    // sending image to the imageBB if provided
    const productDetails = {
      productName: data?.name,
      productCode: data?.code,
      unit: data?.price,
      quantity: data?.quantity,
      category: data?.category,
      purchaseprice: data?.price,
      sellprice: data?.price,
      supplierName: data?.name,
      sellingDate: data?.date,
      status: "pending",
      email: user?.email,
      branch: "none",
    };
    // product added to the server
    axiosPublic.post("/sellProduct", productDetails).then((res) => {
      console.log(res);
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
              {/* Quantity */}
              <div className="form-control w-full my-1">
                <input
                  {...register("quantity", { required: true })}
                  type="number"
                  placeholder="Quantity"
                  className="input input-bordered w-full focus:outline-none bg-[#F0F2F5]"
                />
                {errors.quantity && (
                  <span className="text-red-500">Quantity is required</span>
                )}
              </div>
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-2 md:gap-4 mb-2">
              {/* price */}
              <div className="form-control w-full my-1">
                <input
                  {...register("price", { required: true })}
                  type="number"
                  placeholder="Price"
                  className="input input-bordered focus:outline-none w-full bg-[#F0F2F5]"
                />
                {errors.price && (
                  <span className="text-red-500">Price is required</span>
                )}
              </div>
              {/* Date */}
              <div className="form-control w-full my-1">
                <input
                  {...register("price", { required: true })}
                  type="number"
                  placeholder="Price"
                  className="input input-bordered focus:outline-none w-full bg-[#F0F2F5]"
                />
                {errors.price && (
                  <span className="text-red-500">Price is required</span>
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
                  {categories?.map((category, index) => (
                    <option value={category?.category} key={category._id}>
                      {category?.category}
                    </option>
                  ))}
                </select>
              </div>
              {/* product Code */}
              <div className="form-control w-full my-1">
                <input
                  {...register("code", { required: true })}
                  type="number"
                  placeholder="Product Code"
                  className="input input-bordered focus:outline-none w-full bg-[#F0F2F5]"
                />
                {errors.code && (
                  <span className="text-red-500">Product Code is required</span>
                )}
              </div>
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-2 md:gap-4 mb-2">
              {/* category */}
              <div className="form-control w-full my-1">
                <input
                  {...register("price", { required: true })}
                  type="number"
                  placeholder="Price"
                  className="input input-bordered focus:outline-none w-full bg-[#F0F2F5]"
                />
                {errors.price && (
                  <span className="text-red-500">Price is required</span>
                )}
              </div>
              {/* product Code */}
              <div className="form-control w-full my-1">
                <input
                  {...register("code", { required: true })}
                  type="number"
                  placeholder="Product Code"
                  className="input input-bordered focus:outline-none w-full bg-[#F0F2F5]"
                />
                {errors.code && (
                  <span className="text-red-500">Product Code is required</span>
                )}
              </div>
            </div>
            <button className="focus:outline-none focus:ring-2 w-full mt-5 focus:border-transparent bg-[#403030] hover:bg-[#221919] text-white font-semibold py-2.5 rounded-md">
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
