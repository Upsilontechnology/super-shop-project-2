import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import Header from "../../../components/shared/header/Header";
import { MdDashboard } from "react-icons/md";

import { IoMdAddCircleOutline } from "react-icons/io";
import { GiBoxUnpacking } from "react-icons/gi";
import useUser from "../../../hooks/useUser";
import branchesData from "../../../../public/branches.json";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useBranch } from "../../../components/BranchContext/BranchContext";
const AdminDashboard = ({ isSideMenuOpen, toggleSideMenu }) => {
  const { user: activeUser, loading } = useAuth();
  const [user, refetch] = useUser();
  const axios = useAxiosPrivate();
  const { selectedBranch: fistB, updateBranch: secB } = useBranch();
  const [selectedBranch, setSelectedBranch] = useState(user?.branch || "");

  const handleChangeBranch = async (e) => {
    e.preventDefault();
    const newBranch = e.target.value;
    setSelectedBranch(newBranch);

    if (!newBranch) {
      Swal.fire(
        "Please Select",
        "You must select a branch to update.",
        "warning"
      );
      return;
    }
    secB(newBranch);
    await updateBranch(newBranch);
  };
  const updateBranch = async (newBranch) => {
    try {
      const res = await axios.patch(`/users/changebranch/${user._id}`, {
        branch: newBranch,
      });
      if (res.data.modifiedCount === 1) {
        refetch();
        Swal.fire("Success!", "Branch updated successfully.", "success");
      } else {
        console.error("Error updating branch:", res.data);
        Swal.fire("Error", "Failed to update branch.", "error");
      }
    } catch (error) {
      console.error("Error updating branch:", error);
      Swal.fire("Error", "Network error or unexpected issue.", "error");
    }
  };

  const navlinks = (
    <>
      <li className="relative px-2 py-1">
        <NavLink
          defaultChecked
          className={({ isActive }) =>
            isActive
            ? "inline-flex items-center bg-[#757ec9] hover:bg-[#4a518e] w-56 pl-2 pr-2 py-1 rounded font-normal text-white text-base"
            : "inline-flex items-center font-normal pl-2 py-1 rounded hover:bg-[#757ec9] w-56 text-base"
          }
          to="adminHome"
        >
          <MdDashboard />
          <span className="ml-4">Overview</span>
        </NavLink>
      </li>
      <li className="relative px-2 py-1 ">
        <NavLink
          className={({ isActive }) =>
            isActive
            ? "inline-flex items-center bg-[#757ec9] hover:bg-[#4a518e] w-56 pl-2 pr-2 py-1 rounded font-normal text-white text-base"
            : "inline-flex items-center font-normal pl-2 py-1 rounded hover:bg-[#757ec9] w-56 text-base"
          }
          to="productList"
        >
          <IoMdAddCircleOutline />
          <span className="ml-4">Product List</span>
        </NavLink>
      </li>
      <li className="relative px-2 py-1 ">
        <NavLink
          className={({ isActive }) =>
            isActive
            ? "inline-flex items-center bg-[#757ec9] hover:bg-[#4a518e] w-56 pl-2 pr-2 py-1 rounded font-normal text-white text-base"
            : "inline-flex items-center font-normal pl-2 py-1 rounded hover:bg-[#757ec9] w-56 text-base"
          }
          to="allEmployee"
        >
          <GiBoxUnpacking />
          <span className="ml-4">Employee</span>
        </NavLink>
      </li>
    </>
  );
  return (
    <div
      className={`flex h-screen bg-white ${
        isSideMenuOpen ? "overflow-hidden" : ""
      }`}
    >
      {/* Dashboard */}
      <aside className="z-20 flex-shrink-0 fixed hidden w-[285px] overflow-y-auto bg-white lg:block lg:mt-20 4xl:ml-[12%] 3xl:ml-[11%] 2xl:ml-[13%] xl:ml-5 lg:ml-5 rounded-lg">
        <div className="2xl:h-[80vh] lg:h-[84.5vh] py-3 pl-3 flex flex-col gap-9 shadow-xl">
          {/* logo */}
          <div>
            <p className="font-bold text-lg">Admin Dashboard</p>
            <div className=" p-1 rounded-md">
              {/* <h1>{user?.branch} Branch</h1> */}
              <select
                onChange={handleChangeBranch}
                className="p-1 border-2 rounded-md bg-mainBG text-white"
                value={selectedBranch}
              >
                <option value={""}>{user?.branch} Branch</option>
                {branchesData.map((branch) => (
                  <option key={branch.id} value={branch.name}>
                    {branch.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* items and routes */}
          <div className="flex flex-col justify-start bg-white">
            <ul className="leading-5">{navlinks}</ul>
          </div>
          {/* social icons */}
          {/* <div className="flex gap-2 justify-center items-center">
              <AiFillFacebook className="text-2xl rounded-full text-blue-500" />
              <AiFillInstagram className="text-2xl rounded-full text-pink-600" />
              <AiOutlineWhatsApp className="text-2xl rounded-full text-green-500" />
              <AiOutlineTwitter className="text-2xl rounded-full" />
            </div> */}
        </div>
      </aside>
      <div className="fixed inset-0 -z-10 flex items-end bg-slate-300 bg-opacity-50 sm:items-center sm:justify-center"></div>
      {/* responsive dashboard */}
      <aside
        className={`z-20 fixed w-64 duration-300 inset-y-0 ease-in-out overflow-y-auto bg-white ${
          isSideMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <div className="h-screen py-3 pl-3 flex flex-col justify-between shadow-xl">
          {/* logo */}
          <div>
            <p className="font-bold text-lg">Employee Dashboard</p>
          </div>
          {/* items and routes */}
          <div className=" flex flex-col justify-between">
            <ul className="leading-10">{navlinks}</ul>
          </div>
          {/* social icons */}
          {/* <div className="flex gap-2 justify-center items-center">
              <AiFillFacebook className="text-2xl rounded-full text-blue-500" />
              <AiFillInstagram className="text-2xl rounded-full text-pink-600" />
              <AiOutlineWhatsApp className="text-2xl rounded-full text-green-500" />
              <AiOutlineTwitter className="text-2xl rounded-full" />
            </div> */}
        </div>
      </aside>
      {/* components */}
      <div className="flex flex-col flex-1 w-full bg-secBG overflow-y-auto ">
        <header className="z-40 py-5 bg-slate-50 fixed w-full top-0 lg:hidden">
          {/* toggle button */}
          <div className="flex items-center justify-between h-8 px-6 mx-auto">
            <button
              className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
              onClick={toggleSideMenu}
              aria-label="Menu"
            >
              {isSideMenuOpen ? (
                <FaXmark className="w-6 h-6" />
              ) : (
                <FaBarsStaggered className="w-6 h-6" />
              )}
            </button>
            {/* <div className="flex md:hidden justify-center mr-4 w-[80%]"></div> */}
            {/* <div className="flex lg:hidden justify-end mr-4 w-full">
                <button className="btn btn-sm">
                  <IoPersonOutline className="text-xl" /> Logout
                </button>
              </div> */}
          </div>
        </header>
        <main className="scroll-smooth">
          <div className="">
            <Header />
          </div>
          <div className="4xl:ml-[27.5%] 4xl:mr-[200px] 3xl:ml-[26%] 3xl:mr-[10%] lg:h-[83vh] 2xl:ml-[29%] 2xl:mr-[12%] xl:ml-[22%] xl:mr-5 lg:ml-[280px] lg:mr-5 mt-4">
            <Outlet></Outlet>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
