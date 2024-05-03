import React, { useState } from "react";
import Swal from "sweetalert2";
import { FaRegEdit } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const CategoryModal = ({ category, onClose, refetchCategories }) => {
  const [editedCategory, setEditedCategory] = useState(category.category);
  const axiosPublic = useAxiosPublic();

  const handleUpdateCategory = async (event) => {
    event.preventDefault();
    try {
      const res = await axiosPublic.put(`/category/${category._id}`, {
        category: editedCategory,
      });
      if (res.data.message === "success") {
        refetchCategories();
        Swal.fire({
          title: "Category Updated!",
          text: "Your request has been accepted.",
          icon: "success",
        });
        onClose();
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  return (
    <div className="fixed z-[100] flex items-center justify-center inset-0 bg-black/10 duration-100">
      <div className="max-w-md rounded-sm bg-white p-6 scale-1 opacity-1 duration-200">
        <div className="rounded-lg">
          <button
            onClick={onClose}
            className="text-[#1D2A3B] float-end text-lg"
          >
            <GiCancel />
          </button>
          <form
            className="flex flex-col gap-2 rounded-lg"
            onSubmit={handleUpdateCategory}
          >
            <div className="flex gap-6">
              <div className="form-control w-full my-1">
                <label className="label">
                  <span className="label-text">Category Name*</span>
                </label>
                <input
                  name="category"
                  value={editedCategory}
                  onChange={(e) => setEditedCategory(e.target.value)}
                  type="text"
                  // placeholder="Category Name"
                  className="input input-bordered w-full focus:outline-none"
                />
              </div>
            </div>
            <button className="focus:border-transparent bg-[#757ec9] hover:bg-[#4a518e] text-white font-semibold py-2.5 rounded-md">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
