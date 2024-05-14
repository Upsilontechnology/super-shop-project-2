import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useEmployee from "../hooks/useEmployee";
import useAuth from "../hooks/useAuth";

const EmployeeRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const [isEmployee, isEmployeeLoading] = useEmployee();
  const location = useLocation();

  if (loading || isEmployeeLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg "></span>
      </div>
    );
  }

  if (user && isEmployee) {
    return children;
  }
  return (
    <Navigate to="/employeeHome" state={{ from: location }} replace></Navigate>
  );
};

export default EmployeeRouter;
