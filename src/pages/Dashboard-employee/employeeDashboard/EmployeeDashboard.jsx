import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { RiFileList3Line } from "react-icons/ri";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import Header from "../../../components/shared/header/Header";
import { MdDashboard, MdOutlineNotifications } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import { IoMdAddCircleOutline } from "react-icons/io";
import { GiBoxUnpacking } from "react-icons/gi";
import useUser from "../../../hooks/useUser";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import useSellProducts from "../../../hooks/useSellProducts";
import useProductNotification from "../../../hooks/useProductNotification";
const EmployeeDashboard = ({ isSideMenuOpen, toggleSideMenu }) => {
  const [user] = useUser();
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const { sellproducts, refetch, isLoading } = useSellProducts();
  const {
    datafilter,
    refetch: nFetch,
    isLoading: nLoading,
  } = useProductNotification();

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
          console.log("Logged out successfully");
        });
      }
    });
  };
  // console.log(user);
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
          to="employeeHome"
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
          to="category"
        >
          <IoMdAddCircleOutline />
          <span className="ml-4">Add category</span>
        </NavLink>
      </li>
      <li className="relative px-2 py-1 ">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "inline-flex items-center bg-[#757ec9] hover:bg-[#4a518e] w-56 pl-2 pr-2 py-1 rounded font-normal text-white text-base"
              : "inline-flex items-center font-normal pl-2 py-1 rounded hover:bg-[#757ec9] w-56 text-base"
          }
          to="addProduct"
        >
          <GiBoxUnpacking />
          <span className="ml-4">Add Product</span>
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
          <CiViewList />
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
          to="sellList"
        >
          <RiFileList3Line />
          <span className="ml-4">Sell List ({sellproducts?.length})</span>
        </NavLink>
      </li>

      <li className="relative px-2 py-1">
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "inline-flex items-center bg-[#757ec9] hover:bg-[#4a518e] w-60 pl-2 pr-2 py-1 rounded font-normal text-white text-base"
              : "inline-flex items-center font-normal pl-2 py-1 w-60 rounded hover:bg-[#757ec9] text-base"
          }
          to="productNotification"
        >
          <MdOutlineNotifications />
          <span className="ml-4 text-nowrap">
            Product Notification ({datafilter?.length}){" "}
          </span>
        </NavLink>
      </li>
    </>
  );
  return (
    <>
      <div
        className={`flex h-screen bg-white ${isSideMenuOpen ? "overflow-hidden" : ""
          }`}
      >
        {/* Dashboard */}
        <aside className="z-20 flex-shrink-0 fixed hidden w-[285px] overflow-y-auto bg-white lg:block lg:mt-[78px] 4xl:ml-[12%] 3xl:ml-[12%] 2xl:ml-[13%] xl:ml-5 lg:ml-3 rounded-lg">
          <div className="2xl:h-[80vh] lg:h-[84.5vh] py-3 pl-3 flex flex-col gap-9 shadow-xl">
            {/* logo */}
            <div>
              <p className="font-bold text-lg">Employee Dashboard</p>
              <div className="bg-mainBG text-white p-1 rounded-md w-fit">
                <h1 className="text-nowrap">{user?.branch} Branch</h1>
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
          <div className="h-screen py-3 pl-3 flex flex-col justify-between shadow-xl">
            {/* logo */}
            <div className="flex justify-between w-full items-center mx-auto mt-2">
              <div>
                <h1 className="font-bold text-2xl">Sper Shop</h1>
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
                Employee Dashboard
              </p>
            </div>
            <div className="bg-mainBG text-white p-1 rounded-md w-max text-balance">
              <h1>{user?.branch} Branch</h1>
            </div>
            {/* items and routes */}
            <div className=" flex flex-col justify-center h-svh">
              <ul className="leading-10">{navlinks}</ul>
            </div>
          </div>
        </aside>
        {/* components */}
        <div className="flex flex-col flex-1 w-full bg-secBG overflow-y-auto ">
          {/* <header className="py-5 bg-white fixed w-full top-0 lg:hidden">
            
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
              <div className="flex md:hidden justify-center mr-4 w-[80%]"></div>
              <div className="flex lg:hidden justify-end mr-4 w-full">
                <button
                  onClick={handleLogout}
                  className="bg-white whitespace-nowrap mb-2 lg:mb-0 lg:text-dark  text-base text-dark lg:text-lg font-semibold px-2 py-1 rounded flex items-center justify-center gap-1"
                >
                  {" "}
                  Logout
                </button>
              </div>
            </div>
          </header> */}
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
    </>
  );
};

export default EmployeeDashboard;
