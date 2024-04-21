import React, { useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import { RiDeleteBinLine } from "react-icons/ri";
import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import Pagination from "../../../components/pagination/Pagination";

const Category = () => {
  const [openModal, setOpenModal] = useState(false);
  const [cid, setCId] = useState();
  const [cData, setCdata] = useState();
  const axiosPublic = useAxiosPublic();

  const { data: categories = [], refetch } = useQuery({
    queryKey: ["categoryData"],
    queryFn: async () => {
      const res = await axiosPublic.get("/category");
      return res.data;
    },
  });
  // console.log(categories);
  const handleAddCategory = async (e) => {
    e.preventDefault();
    const form = e.target;
    const category = {
      category: form.category.value,
    };
    await axiosPublic.post("/category", category).then((res) => {
      console.log(res.data);
      if (res.data.message === "success") {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Category added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Category has already added",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleDelete = (categoryId) => {
    console.log(categoryId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/category/${categoryId}`).then((res) => {
          //   console.log(res);
          refetch();
          if (res.data.message === "success") {
            Swal.fire({
              title: "Deleted!",
              text: "Product has been deleted..!",
              icon: "success",
            });
          }
        });
      }
    });
  };
  const handleEditModal = (dde) => {
    setCId(cData?._id);
    setCdata(dde);
    setOpenModal(true);
  };
  const handleUpdate = async (event) => {
    event.preventDefault();

    const form = event.target;
    const category = form.category.value;
    setCdata("");
    const updatedCategory = {
      category,
    };
    try {
      const res = await axiosPublic.put(
        `/category/${cData._id}`,
        updatedCategory
      );
      if (res.data.message === "success") {
        Swal.fire({
          title: "Category Update!",
          text: "Your request accepted.",
          icon: "success",
        });
        refetch();
      }
      setOpenModal(false);
      refetch();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="lg:ml-3 xl:ml-9 2xl:h-[80vh] lg:h-[85vh] mx-3 lg:mx-0 bg-white ">
      <div className="lg:p-5">
        <SectionTitle title={"Add Category "} />
      </div>
      <div className="2xl:h-[65vh] lg:h-[70vh] rounded-lg px-1 py-3 md:p-3">
        {/* <SectionTitle title="Add Category" /> */}
        <div className="flex flex-col md:justify-center items-center">
          <div className="md:w-4/6 w-full mx-auto mb-5">
            <form
              onSubmit={handleAddCategory}
              className="md:flex md:justify-center md:items-center md:gap-2"
            >
              <div className="w-full form-control">
                <input
                  className="w-full h-[49px] pl-2 rounded-lg outline-none bg-[#F8F8F8]"
                  type="text"
                  name="category"
                  placeholder="Put Category Name"
                  id=""
                />
              </div>
              <div className="mx-auto w-2/3 mt-3 md:mt-0 lg:w-1/3">
                <button className="focus:outline-none focus:ring-2 w-full focus:border-transparent hover:bg-[#403030] bg-[#403030] text-neutral-50 font-semibold rounded-md flex justify-center items-center gap-1 px-2 h-[49px] text-xs whitespace-nowrap">
                  <IoMdAddCircleOutline className="text-lg" />
                  Add Category
                </button>
              </div>
            </form>
          </div>
          <div className="md:w-4/6 w-[95%] mx-auto ">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="border-b-[1.2px] border-black">
                    <th className="p-1">SL No</th>
                    <th>Category Name</th>
                    <th className="float-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((dd, index) => (
                    <tr className="border-b-[1.2px] border-black" key={dd._id}>
                      <th className="p-1">0{index + 1}</th>
                      <td>{dd.category}</td>
                      <td className="flex justify-end text-base gap-3">
                        <div>
                          <div>
                            <button
                              onClick={() => handleEditModal(dd)}
                              className="rounded-sm  px-5 py-[6px]"
                              id="_modal_NavigateUI"
                            >
                              <FaRegEdit />
                            </button>
                            <div
                              onClick={() => setOpenModal(false)}
                              className={`fixed z-[100] flex items-center justify-center ${
                                openModal
                                  ? "visible opacity-100"
                                  : "invisible opacity-0"
                              } inset-0 bg-black/10 duration-100`}
                            >
                              <div
                                onClick={(e_) => e_.stopPropagation()}
                                className={` absolute max-w-md rounded-sm bg-white p-6 ${
                                  openModal
                                    ? "scale-1 opacity-1 duration-200"
                                    : "scale-0 opacity-0 duration-150"
                                }`}
                              >
                                <div className="rounded-lg">
                                  <button
                                    onClick={() => setOpenModal(false)}
                                    className="text-[#1D2A3B] float-end text-lg"
                                  >
                                    <GiCancel />
                                  </button>
                                  <form
                                    className="flex flex-col gap-2 rounded-lg"
                                    onSubmit={handleUpdate}
                                  >
                                    <div className="flex gap-6">
                                      <div className="form-control w-full my-1">
                                        <label className="label">
                                          <span className="label-text">
                                            Category Name*
                                          </span>
                                        </label>
                                        <input
                                          name="category"
                                          defaultValue={cData?.category}
                                          type="text"
                                          placeholder="Category Name"
                                          className="input input-bordered w-full focus:outline-none"
                                        />
                                      </div>
                                    </div>
                                    {/* <h1>{cData._id}</h1> */}
                                    <button className="focus:border-transparent bg-[#1D2A3B] hover:bg-[#131c29] text-white font-semibold py-2.5 rounded-md">
                                      Save
                                    </button>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <button onClick={() => handleDelete(dd._id)}>
                          <RiDeleteBinLine />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Pagination />
    </div>
  );
};

export default Category;
