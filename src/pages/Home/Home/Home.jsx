import React, { useState } from "react";
import EmployeeDashboard from "../../Dashboard-employee/employeeDashboard/EmployeeDashboard";

const Home = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };
  const closeSideMenu = () => {
    setIsSideMenuOpen(false);
  };
  return (
    <div>
      <EmployeeDashboard
        isSideMenuOpen={isSideMenuOpen}
        toggleSideMenu={toggleSideMenu}
        closeSideMenu={closeSideMenu}
      />
    </div>
  );
};

export default Home;
