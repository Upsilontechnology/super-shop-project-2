import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { getToken } from "../../components/AuthProvider/AuthApi";
import useRole from "../../hooks/useRole";

const Login = () => {
  const { signInUser } = useAuth();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const userCheck = await signInUser(email, password);
      if (!userCheck?.user?.email) {
        throw new Error("User email not found");
      }

      const userEmail = userCheck.user.email;
      await getToken(userEmail);
      const userRole = await useRole(userEmail);
      navigate(userRole === "Admin" ? "/adminHome" : "/employeeHome");

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully logged in",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-Montserrat w-full">
      <div className="bg-[#ebedfe] w-full text-center 4xl:py-12 py-5 text-[#565fa8] flex justify-center items-center">
        <h1 className="text-[46px] font-bold mt-0">Log In</h1>
      </div>
      <div className="flex md:bg-white bg-[#F3F3F3] items-center justify-center h-full 4xl:py-20 py-10 rounded-lg">
        <div className="flex flex-col w-full md:w-[768px]">
          <div className="bg-[#ebedfe] rounded-lg py-[10%] px-[5%] md:px-[15%]">
            <form onSubmit={handleLogin}>
              <div className="form-control mb-4 flex justify-center">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#ebedfe] border-1.5 border-[#6f98b9] placeholder-[#444444] py-4 rounded-lg border outline-none pl-8 pr-2"
                  required
                />
              </div>
              <div className="form-control relative flex justify-center">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-1.5 border-[#6f98b9] bg-[#ebedfe] placeholder-[#444444] py-4 rounded-lg border outline-none pl-8 pr-2"
                  required
                />
                <span
                  className="absolute right-0 cursor-pointer mr-5"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEye className="text-xl" />
                  ) : (
                    <FaEyeSlash className="text-xl" />
                  )}
                </span>
              </div>
              {error && <p className="text-red-600">{error}</p>}
              <div className="form-control mt-8">
                <button
                  className="text-xl rounded-md font-semibold py-4 bg-[#565fa8] text-white hover:bg-[#565fa8] w-full"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Log In"}
                </button>
              </div>
              <div className="mt-16 text-center">
                <p>
                  Do not have an account?{" "}
                  <Link className="font-bold text-[#6486FD]" to="/register">
                    Register Now
                  </Link>
                </p>
                <p className="mt-1">
                  Forgot the Password?{" "}
                  <Link
                    className="font-semibold text-[#6486FD]"
                    to="/forgetpassword"
                  >
                    Forgot Password
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
