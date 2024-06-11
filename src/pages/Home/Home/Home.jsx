import React, { useState, useCallback, useEffect } from "react";
import EmployeeDashboard from "../../Dashboard-employee/employeeDashboard/EmployeeDashboard";
import AdminDashboard from "../../Dashboard-admin/adminDashboard/AdminDashboard";
import useAdmin from "../../../hooks/useAdmin";
import useEmployee from "../../../hooks/useEmployee";
// import LoginSwitch from "../../loginSwitch/LoginSwitch";
import { BranchProvider } from "../../../components/BranchContext/BranchContext";
import Login from "../../login/Login";
import useAuth from "../../../hooks/useAuth";

const Home = () => {
  const [isEmployee, isEmployeeLoading] = useEmployee();
  const [isAdmin, isAdminLoading] = useAdmin();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [error, setError] = useState(null);

  const toggleSideMenu = useCallback(() => {
    setIsSideMenuOpen((prevState) => !prevState);
  }, []);

  const closeSideMenu = useCallback(() => {
    setIsSideMenuOpen(false);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }

  return (
    <div>
      {isAdmin ? (
        <BranchProvider>
          <AdminDashboard
            isSideMenuOpen={isSideMenuOpen}
            toggleSideMenu={toggleSideMenu}
            closeSideMenu={closeSideMenu}
          />
        </BranchProvider>
      ) : isEmployee ? (
        <BranchProvider>
          <EmployeeDashboard
            isSideMenuOpen={isSideMenuOpen}
            toggleSideMenu={toggleSideMenu}
            closeSideMenu={closeSideMenu}
          />
        </BranchProvider>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Home;
