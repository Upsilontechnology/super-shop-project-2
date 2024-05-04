import React, { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import useEmployee from "../../../../hooks/useEmployee";

const Product = ({ product, index, onEdit, onSell, refetchProducts }) => {
  const axiosPublic = useAxiosPublic();
  const [isEmployee, isEmployeeLoading] = useEmployee();
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
        axiosPublic.delete(`/products/${id}`).then((res) => {
          console.log(res.data);
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

  return (
    <tr className=" border-b-[1.2px] border-black">
      <th>{index + 1}</th>
      <td>
        <div>{product?.productCode}</div>
      </td>
      <td>{product?.category}</td>
      <td>{product?.productName}</td>
      <td>{product?.supplierName}</td>
      <td>{product?.quantity}</td>
      <td>{product?.unit}</td>
      <td>{product?.sellprice}</td>
      <td>{product?.purchaseprice}</td>
      <th className="flex justify-between gap-4">
        <button onClick={() => onEdit(product)}>
          <FiEdit className="text-lg" />
        </button>
        <button onClick={() => handleDelete(product?._id)}>
          <RiDeleteBin6Line className="text-lg" />
        </button>
        {isEmployee && (
          <button onClick={() => onSell(product)}>
            <CiCirclePlus className="text-lg" />
          </button>
        )}
      </th>
    </tr>
  );
};

export default Product;
