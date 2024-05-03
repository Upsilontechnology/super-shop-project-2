import React, { useEffect, useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { IoMdAddCircleOutline } from "react-icons/io";
import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import Pagination from "../../../components/pagination/Pagination";
import CategoryModal from "./CategoryModal";
import CategoryRow from "./CategoryRow";

const Category = () => {
  const [length, setLength] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const [openModal, setOpenModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const axiosPublic = useAxiosPublic();

  const { data: categories = [], refetch } = useQuery({
    queryKey: ["categoryData", itemsPerPage, currentPage],
    queryFn: async () => {
      try {
        const res = await axiosPublic.get(
          `/category?itemsPerPage=${itemsPerPage}&currentPage=${currentPage}`
        );
        return res.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
      }
    },
  });
  const handleAddCategory = async (e) => {
    e.preventDefault();
    const form = e.target;
    if (form.category.value === '') {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Please Input some value",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    const category = {
      category: form.category.value,
    };
    try {
      const res = await axiosPublic.post("/category", category);
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
          title: "Category has already been added",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        const res = await axiosPublic.delete(`/category/${categoryId}`);
        if (res.data.message === "success") {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Category has been deleted.",
            icon: "success",
          });
        }
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleEditModal = (category) => {
    setSelectedCategory(category);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (categories && categories?.totalCount) {
      setLength(categories?.totalCount);
      refetch();
    } else {
      setLength(0);
      refetch();
    }
  }, [categories]);

  return (
    <div className="overflow-auto rounded-md lg:ml-3 xl:ml-9 2xl:h-[80vh] lg:h-[83vh] mx-3 lg:mx-0 bg-white ">
      <div className="lg:p-5">
        <SectionTitle title={"Add Category "} />
      </div>
      <div className="3xl:h-[55vh] 2xl:h-[59vh] lg:h-[90vh] rounded-lg px-1 py-3 md:p-3">
        <div className="flex flex-col md:justify-center items-center">
          {/* Add Category Form */}
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
              <div className="mx-auto w-full mt-3 md:mt-0 lg:w-1/3">
                <button className="focus:outline-none focus:ring-2 w-full focus:border-transparent bg-[#757ec9] hover:bg-[#4a518e] text-neutral-50 font-semibold rounded-md flex justify-center items-center gap-1 px-2 h-[49px] text-xs whitespace-nowrap">
                  <IoMdAddCircleOutline className="text-lg" />
                  Add Category
                </button>
              </div>
            </form>
          </div>
          {/* Category Table */}
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
                  {categories?.items?.map((category, index) => (
                    <CategoryRow
                      key={category._id}
                      category={category}
                      index={index}
                      onEdit={handleEditModal}
                      onDelete={handleDelete}
                      refetch={refetch}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(length / itemsPerPage)}
        setCurrentPage={setCurrentPage}
      />
      {/* Edit Category Modal */}
      {openModal && (
        <CategoryModal
          category={selectedCategory}
          onClose={handleCloseModal}
          refetchCategories={refetch}
        />
      )}
    </div>
  );
};

export default Category;
