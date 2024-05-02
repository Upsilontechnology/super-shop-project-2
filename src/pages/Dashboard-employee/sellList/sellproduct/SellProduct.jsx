import React from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

const SellProduct = ({ product, onEdit, refetchProducts }) => {
  const axiosPublic = useAxiosPublic();
  const handleDelete = (id) => {
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
        axiosPublic.delete(`/sellProducts/${id}`).then((res) => {
          if (res.data.deletedCount === 1) {
            Swal.fire({
              title: "Deleted!",
              text: "Product deleted successfully",
              icon: "success",
            });
            refetchProducts();
          }
        });
      }
    });
  };
  //   console.log(product);
  return (
    <tr className=" border-b-[1.2px] border-black">
      <td>{product?.productName}</td>
      <td>{product?.price}</td>
      <td>{product?.quantity}</td>
      <td>{product?.price * product?.quantity}</td>
      <th className="flex gap-4 float-end">
        <button onClick={() => onEdit(product)}>
          <FiEdit className="text-lg" />
        </button>
        <button onClick={() => handleDelete(product?._id)}>
          <RiDeleteBin6Line className="text-lg" />
        </button>
      </th>
    </tr>
  );
};

export default SellProduct;
