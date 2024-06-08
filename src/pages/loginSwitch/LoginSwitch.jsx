import React from "react";
import { Link } from "react-router-dom";

const LoginSwitch = () => {
  return (
    <div className="font-Montserrat w-full">
      <div className="flex items-center justify-center h-screen 4xl:py-20 py-10 rounded-lg">
        <div className=" flex flex-col w-full 4xl:py-20 py-10 md:w-[768px] ">
          <div className="bg-[#ebedfe] rounded-lg  py-[10%] px-[5%]  md:px-[15%]">
            <div className="flex gap-4 flex-col md:flex-row mt-8">
              <Link to="/login">
                <button className="text-xl rounded-md font-semibold  py-4 bg-[#757ec9] text-white hover:bg-[#565fa8] w-full">
                  Log In as Admin
                </button>
              </Link>
              <button className="text-xl rounded-md font-semibold  py-4 bg-[#959ff0] text-white hover:bg-[#565fa8] w-full">
                <Link to="/login">Log In as Employee</Link>
              </button>
            </div>
            <div className="mt-16 text-center ">
              <p>
                Do not have an account?{" "}
                <Link className="font-bold text-[#6486FD]" to="/register">
                  Register Now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSwitch;
