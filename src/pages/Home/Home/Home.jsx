import React, { useState } from "react";
import EmployeeDashboard from "../../Dashboard-employee/employeeDashboard/EmployeeDashboard";
import AdminDashboard from "../../Dashboard-admin/adminDashboard/AdminDashboard";
import useAdmin from "../../../hooks/useAdmin";
import useEmployee from "../../../hooks/useEmployee";
import LoginSwitch from "../../loginSwitch/LoginSwitch";
import { BranchProvider } from "../../../components/BranchContext/BranchContext";

const Home = () => {
  const [isEmployee, isEmployeeLoading] = useEmployee();
  const [isAdmin, isAdminLoading] = useAdmin();
  // console.log(isAdmin);
  // console.log(isEmployee);

  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };
  const closeSideMenu = () => {
    setIsSideMenuOpen(false);
  };

  if (isAdminLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg "></span>
      </div>
    );
  }

  if (isEmployeeLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg "></span>
      </div>
    );
  }

  return (
    <div>
      {isEmployee ? (
        <EmployeeDashboard
          isSideMenuOpen={isSideMenuOpen}
          toggleSideMenu={toggleSideMenu}
          closeSideMenu={closeSideMenu}
        />
      ) : isAdmin ? (
        <BranchProvider>
          <AdminDashboard
            isSideMenuOpen={isSideMenuOpen}
            toggleSideMenu={toggleSideMenu}
            closeSideMenu={closeSideMenu}
          />
        </BranchProvider>
      ) : (
        <LoginSwitch />
      )}
    </div>
  );
};

export default Home;
