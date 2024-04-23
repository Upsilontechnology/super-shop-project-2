import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const CategoryRow = ({ category, index, onEdit, onDelete, refetch }) => {
  const axiosPublic = useAxiosPublic();

  const handleDeleteCategory = (categoryId) => {
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
          if (res.data.message === "success") {
            onDelete(categoryId);
            Swal.fire({
              title: "Deleted!",
              text: "Category has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  return (
    <tr className="border-b-[1.2px] border-black">
      <th className="p-1">0{index + 1}</th>
      <td>{category.category}</td>
      <td className="flex justify-end text-base gap-3">
        <button
          onClick={() => onEdit(category)}
          className="rounded-sm  px-5 py-[6px]"
        >
          <FaRegEdit />
        </button>
        <button onClick={() => handleDeleteCategory(category._id)}>
          <RiDeleteBinLine />
        </button>
      </td>
    </tr>
  );
};

export default CategoryRow;
