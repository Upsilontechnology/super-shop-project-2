import React, { useState } from "react";
import EmployeeDashboard from "../../Dashboard-employee/employeeDashboard/EmployeeDashboard";
import AdminDashboard from "../../Dashboard-admin/adminDashboard/AdminDashboard";
import useAdmin from "../../../hooks/useAdmin";
import useEmployee from "../../../hooks/useEmployee";
import LoginSwitch from "../../loginSwitch/LoginSwitch";

const Home = () => {
  const [isEmployee, isEmployeeLoading] = useEmployee();
  const [isAdmin, isAdminLoading] = useAdmin();
  console.log(isAdmin);
  console.log(isEmployee);
  // const isEmployee = true;
  // const isAdmin = false;
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };
  const closeSideMenu = () => {
    setIsSideMenuOpen(false);
  };
  return (
    <div>
      {isEmployee ? (
        <EmployeeDashboard
          isSideMenuOpen={isSideMenuOpen}
          toggleSideMenu={toggleSideMenu}
          closeSideMenu={closeSideMenu}
        />
      ) : isAdmin ? (
        <AdminDashboard
          isSideMenuOpen={isSideMenuOpen}
          toggleSideMenu={toggleSideMenu}
          closeSideMenu={closeSideMenu}
        />
      ) : (
        <LoginSwitch />
      )}
    </div>
  );
};

export default Home;
