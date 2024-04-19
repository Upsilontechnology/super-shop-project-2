import React from "react";
import EmployeeHome from "../../pages/Dashboard-employee/employeehome/EmployeeHome";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="text-black font-Montserrat">
      <Outlet />
    </div>
  );
};

export default MainLayout;
