import React, { useState } from "react";
import Swal from "sweetalert2";
import { FaRegEdit } from "react-icons/fa";
import { GiCancel } from "react-icons/gi";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const AllEmployeeModal = ({ user, onClose, refetchUsers }) => {

  // const [editedCategory, setEditedCategory] = useState(category.category);
  const [selectValue, setSelectValue] = useState();
  const axiosPublic = useAxiosPublic();

  const handleSetSelectValue = e => {
    e.preventDefault();
    const value = e.target.value;
    setSelectValue(value);
  }

  const handleMakeAdmin = async (e) => {
    e.preventDefault();
    const updatedInfo = {
      branch: selectValue,
      role: 'Admin',
      status: 'approved'
    }
    console.log(user, updatedInfo);
    try {
      if (selectValue === undefined) {
        Swal.fire({
          title: 'Please select branch name',
          text: "Your request cannot be accepted",
          icon: "error",
        });
      }
      else {
        const res = await axiosPublic.patch(`/users/setAdminRole/${user?._id}`, updatedInfo);
        console.log(res.data);
        if (res.data.modifiedCount === 1) {
          refetchUsers();
          Swal.fire({
            title: `${user?.name} is now an Admin`,
            text: "Your request has been accepted.",
            icon: "success",
          });
          onClose();
        }
      }
    } catch (error) {
      console.error("Error updating user role", error);
    }
  }

  const handleMakeEmployee = async (e) => {
    e.preventDefault();
    const updatedInfo = {
      branch: selectValue,
      role: 'Employee',
      status: 'approved'
    }
    console.log(user, updatedInfo);
    try {
      if (selectValue === undefined) {
        Swal.fire({
          title: 'Please select branch name',
          text: "Your request cannot be accepted",
          icon: "error",
        });
      }
      else {
        const res = await axiosPublic.patch(`/users/setEmployeeRole/${user?._id}`, updatedInfo);
        console.log(res.data);
        if (res.data.modifiedCount === 1) {
          refetchUsers();
          Swal.fire({
            title: `${user?.name} is now an Employee`,
            text: "Your request has been accepted.",
            icon: "success",
          });
          onClose();
        }
      }
    } catch (error) {
      console.error("Error updating user role", error);
    }
  }


  return (
    <div className="fixed z-[100] flex items-center justify-center inset-0 bg-black/10 duration-100">
      <div className="w-[40%] rounded-xl bg-[#ebedfe] px-4 py-3 scale-1 opacity-1 duration-200">
        <div className="rounded-lg w-full">
          <button
            onClick={onClose}
            className="text-[#1D2A3B] float-end text-lg"
          >
            <GiCancel className="text-2xl" />
          </button>
          <form
            className="flex flex-col gap-2 rounded-lg space-y-3 px-14 py-24 "
          // onSubmit={handleUpdateCategory}
          >
            <div className="flex gap-6">
              <div className="form-control w-full my-1">
                <select onChange={handleSetSelectValue} name="" id="" className="p-5 border-2 border-[#749cbc] bg-[#ebedfe] rounded-md">
                  <option disabled selected value="">Select branch</option>
                  <option value="gec">GEC</option>
                  <option value="muradphur">Muradphur</option>
                  <option value="boddarhat">Boddarhat</option>
                  <option value="lalkhan">Lal Khan</option>
                </select>

              </div>
            </div>
            <div className="flex gap-5">
              <button
                onClick={handleMakeAdmin}
                className="focus:border-transparent bg-[#757ec9] hover:bg-[#959ff0] text-white font-semibold py-4 w-full rounded-md">
                Make Admin
              </button>
              <button
                onClick={handleMakeEmployee}
                className="focus:border-transparent w-full bg-[#959ff0] hover:bg-[#757ec9] text-white font-semibold py-4 rounded-md">
                Make Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AllEmployeeModal;
