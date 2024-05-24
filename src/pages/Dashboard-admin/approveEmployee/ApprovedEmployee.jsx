import React from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line, RiDeleteBinLine } from "react-icons/ri";
import Swal from "sweetalert2";
import { CiCirclePlus } from "react-icons/ci";

const ApprovedEmployee = ({ users, index, onEdit, refetchByApproved }) => {
    const axiosPublic = useAxiosPublic();

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
                    if (res.data.deletedCount === 1) {
                        // onDelete(userId);
                        Swal.fire({
                            title: "Deleted!",
                            text: "User has been deleted.",
                            icon: "success",
                        });
                        refetchByApproved();
                    }
                });
            }
        });
    };

    return (
        <tr className=" border-b-[1.2px] border-black  ">
            <th>{index + 1}</th>
            <td>{users?.name}</td>
            <td>{users?.email}</td>
            <td>{users?.branch.toUpperCase()}</td>
            <td>{users?.role}</td>
            <th className="flex flex-row justify-center">
                <button
                    onClick={() => onEdit(users)}
                    className="btn btn-ghost btn-xs">
                    <FaRegEdit className="text-xl" />
                </button>
                <button
                    onClick={() => handleDeleteUser(users?._id)}
                    className="btn btn-ghost btn-xs"
                >
                    <RiDeleteBin6Line className="text-xl" />
                </button>
            </th>
        </tr>
    );
};

export default ApprovedEmployee;