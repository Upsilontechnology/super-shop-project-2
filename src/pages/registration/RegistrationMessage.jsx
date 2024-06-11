import React from "react";
import img from "../../../public/image.png";
import { Link } from "react-router-dom";
const RegistrationMessage = () => {
  return (
    <div className="w-full bg-white text-center 4xl:py-12 py-5 text-[#565fa8] flex justify-center items-center h-screen">
      <div className="bg-[#ebedfe] flex flex-col justify-center px-24 items-center py-14 gap-8 rounded-sm">
        <img src={img} alt="" className="w-60" />
        <h1 className="font-bold">
          Congratulations! <br /> Account Registration Successful. <br />{" "}
          Waiting for the admin approval to access Employee Panel.{" "}
        </h1>
        <Link
          to={"/login"}
          className="w-full py-4 bg-[#565fa8] text-white hover:bg-[#565fa8] rounded-lg font-bold"
        >
          Log In
        </Link>
      </div>
    </div>
  );
};

export default RegistrationMessage;
