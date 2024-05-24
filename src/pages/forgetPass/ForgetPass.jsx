import React, { useState, useEffect } from "react";

import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const ForgetPass = () => {
  const { forgetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (successMessage) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Check your email to reset the password",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  }, [successMessage]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await forgetPassword(email);
      setSuccessMessage("Password reset email sent successfully.");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message);
      setSuccessMessage("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="font-Montserrat w-full">
      <div className="bg-[#ebedfe] w-full text-center py-12 text-[#403030] flex justify-center items-center">
        <h1 className="text-4xl font-bold mt-10">Forget Password</h1>
      </div>
      <div className="flex md:bg-white bg-[#ebedfe] items-center justify-center h-full py-8 rounded-lg">
        <div className=" flex flex-col w-full md:w-[768px] ">
          <div className="bg-[#ebedfe]  py-[10%] px-[5%]  md:px-[15%]">
            <form onSubmit={handleResetPassword} className="">
              <div className="form-control mb-4 flex justify-center">
                <div className="absolute pl-2"></div>
                <input
                  type="email"
                  name="email"
                  placeholder="Use Only Valid Gmail"
                  className="w-full bg-[#E7E6E6] placeholder-[#5784e6] py-4 rounded-lg border outline-none pl-8 pr-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {/* <h1 className="text-sm text-center text-red-500 py-2">
                (Use Only Valid Gmail)
              </h1> */}
              <div className="form-control  mt-8">
                <button
                  className="text-xl rounded-md font-semibold  py-4 bg-[#565fa8] text-white hover:bg-[#565fa8] "
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Reset Password"}
                </button>
              </div>
            </form>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <div className="text-center flex justify-center p-2 gap-2">
              <h1>Go To Log In page</h1>{" "}
              <Link
                to={"/login"}
                className="text-[#6486FD] font-bold cursor-pointer"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPass;
