import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

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
<<<<<<< HEAD
const AdminDashboard = ({ isSideMenuOpen, toggleSideMenu, closeSideMenu }) => {
=======
const AdminDashboard = ({ isSideMenuOpen, toggleSideMenu }) => {
>>>>>>> 33b48b143fa60c5f5165b4e66a5cce588f4ba00c
  const { user: activeUser, loading, logOut } = useAuth();
  const [user, refetch] = useUser();
  const axios = useAxiosPrivate();
  const navigate = useNavigate();
  const { selectedBranch: fistB, updateBranch: secB } = useBranch();
  const [selectedBranch, setSelectedBranch] = useState(user?.branch || "");
<<<<<<< HEAD
  // console.log(selectedBranch);
=======

>>>>>>> 33b48b143fa60c5f5165b4e66a5cce588f4ba00c
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
    // await window.location.reload();
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

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logged Out!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut().then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Successfully logged out",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        });
      }
    });
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
          to="/adminHome"
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
          to="/productList"
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
          to="/allEmployee"
        >
          <GiBoxUnpacking />
          <span className="ml-4">Employee</span>
        </NavLink>
      </li>
    </>
  );

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logged Out!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut().then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Successfully logged out",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        });
      }
    });
  };

  return (
    <div
      className={`flex h-screen bg-white ${isSideMenuOpen ? "overflow-hidden" : ""
        }`}
    >
      {/* Dashboard */}
      <aside className="z-20 flex-shrink-0 fixed hidden w-[285px] overflow-y-auto bg-white lg:block lg:mt-20 4xl:ml-[12%] 3xl:ml-[11%] 2xl:ml-[13%] xl:ml-5 lg:ml-3 rounded-lg">
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
        </div>
      </aside>
      <div className="fixed inset-0 -z-10 flex items-end bg-slate-300 bg-opacity-50 sm:items-center sm:justify-center"></div>
      {/* responsive dashboard */}
      <aside
        className={`z-20 fixed w-64 duration-300 inset-y-0 ease-in-out overflow-y-auto bg-white ${isSideMenuOpen ? "translate-x-0" : "-translate-x-full"
          } lg:hidden`}
      >
        <div className="h-screen py-3 pl-3 flex flex-col shadow-xl">
          {/* logo */}
          <div className="flex justify-between w-full items-center mx-auto mt-2">
            <div>
              <h1 className="font-bold text-2xl">Super Shop</h1>
            </div>
            <div>
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
            </div>
          </div>
          <div>
            <p className="font-semibold text-base mt-4 text-black">
              Admin Dashboard
            </p>
          </div>
          <div className=" p-1 rounded-md">
            {/* <h1>{user?.branch} Branch</h1> */}
            <select
              onChange={handleChangeBranch}
              className="p-1 border-2 rounded-md bg-mainBG text-white"
              value={selectedBranch}
            >
              <option value={user?.branch || ""}>{user?.branch} Branch</option>
              {branchesData.map((branch) => (
                <option key={branch.id} value={branch.name}>
                  {branch.name}
                </option>
              ))}
            </select>
          </div>
          {/* items and routes */}
          <div className=" flex flex-col justify-center h-svh">
            <ul className="leading-10" onClick={() => closeSideMenu()}>
              {navlinks}
            </ul>
          </div>
        </div>
      </aside>
      {/* components */}
      <div className="flex flex-col flex-1 w-full bg-secBG overflow-y-auto ">
        <header className="py-5 bg-slate-50 fixed flex justify-between px-5 w-full top-0 lg:hidden">
          {/* toggle button */}
          <div className="">
            <button
              className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
              onClick={toggleSideMenu}
              aria-label="Menu"
            >
              {!isSideMenuOpen && <FaBarsStaggered className="w-6 h-6" />}
              {/* {isSideMenuOpen ? (
                <FaXmark className="w-6 h-6" />
              ) : (
                <FaBarsStaggered className="w-6 h-6" />
              )} */}
            </button>
            <div className="flex lg:hidden justify-end mr-4 w-full">
              <button onClick={handleLogout} className="btn btn-sm">
                {/* <IoPersonOutline className="text-xl" /> */}
                Log Out
              </button>
            </div>
          </div>
          {/* logout button */}
          <div className="">
            {user && (
              <button
                onClick={handleLogout}
                className="bg-mainBG text-base text-white font-semibold px-2 py-1 rounded"
              >
                {" "}
                Logout
              </button>
            )}
          </div>
        </header>
        <main className="scroll-smooth">
          <div className="">
            <Header />
          </div>
          <div className="4xl:ml-[25.5%] 4xl:mr-[230px] 3xl:ml-[27%] 3xl:mr-[12%] lg:h-[83vh] 2xl:ml-[29%] 2xl:mr-[12%] xl:ml-[22%] xl:mr-5 lg:ml-[295px] lg:mr-3 mt-4">
            <Outlet></Outlet>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
