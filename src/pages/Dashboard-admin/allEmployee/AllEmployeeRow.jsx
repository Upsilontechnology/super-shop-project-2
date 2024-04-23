import React from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line, RiDeleteBinLine } from "react-icons/ri";
import Swal from "sweetalert2";
import { CiCirclePlus } from "react-icons/ci";
const AllEmployeeRow = ({ users, index, onEdit, onDelete, refetch }) => {
  const axiosPublic = useAxiosPublic();
  console.log(users);
  const handleDeleteUser = (userId) => {
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
        axiosPublic.delete(`/users/${userId}`).then((res) => {
          if (res.data.message === "success") {
            onDelete(userId);
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
    <tr className=" border-b-[1.2px] border-black text-center ">
      <th>{index + 1}</th>
      <td>
        <div>{users?.name}</div>
      </td>
      <td>{users?.email}</td>
      <th>
        {/* <button className="btn btn-ghost btn-xs">
          <FiEdit />
        </button> */}
        <button
          onClick={() => handleDeleteUser(users?._id)}
          className="btn btn-ghost btn-xs"
        >
          <RiDeleteBin6Line />
        </button>
        <button className="btn btn-ghost btn-xs">
          <CiCirclePlus />
        </button>
      </th>
    </tr>
  );
};

export default AllEmployeeRow;
