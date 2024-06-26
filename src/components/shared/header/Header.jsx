import React from "react";
import { IoPersonOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useNavigate } from "react-router";
import { clearToken } from "../../AuthProvider/AuthApi";
const Header = () => {
  const { logOut, user } = useAuth();
  const navigate = useNavigate();
  
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
          clearToken();
          navigate("/");
        });
      }
    });
  };
  return (
    <>
      <div className="w-full bg-mainBG border-b-2 border-mainBG">
        <div className="flex flex-row justify-between py-3 3xl:w-[76%] 2xl:w-[76%] 2xl:mx-auto mx-3">
          <div className="w-44 md:w-[600px] lg:w-[700px]">
            <h2 className="text-white font-bold text-lg">Super Shop</h2>
          </div>
          <div className="">
            {user && (
              <button
                onClick={handleLogout}
                className="lg:bg-white whitespace-nowrap mb-2 lg:mb-0 lg:text-dark  text-base text-dark lg:text-lg font-semibold px-2 py-1 rounded flex items-center justify-center gap-1"
              >
                {" "}
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
