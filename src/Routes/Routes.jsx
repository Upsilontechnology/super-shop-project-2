import MainLayout from "../layout/MainLayout/MainLayout";
import AddProduct from "../pages/Dashboard-employee/addProduct/AddProduct";
import EmployeeHome from "../pages/Dashboard-employee/employeehome/EmployeeHome";
import ProductList from "../pages/Dashboard-employee/productList/ProductList";
import Errorpage from "../pages/Errorpage/Errorpage";
import Home from "../pages/Home/Home/Home";

import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login/Login";
import Registration from "../pages/registration/Registration";
import LoginSwitch from "../pages/loginSwitch/LoginSwitch";
import AdminHome from "../pages/Dashboard-admin/adminHome/AdminHome";
import AllEmployee from "../pages/Dashboard-admin/allEmployee/AllEmployee";
import Category from "../pages/Dashboard-employee/category/Category";
import SellList from "../pages/Dashboard-employee/sellList/SellList";
import ProductNotification from "../pages/Dashboard-employee/productNotification/ProductNotification";
import EmployeeRouter from "./EmployeeRouter";
import AdminRouter from "./AdminRouter";
import RegistrationMessage from "../pages/registration/RegistrationMessage";
import ForgetPass from "../pages/forgetPass/ForgetPass";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Errorpage />,
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          // employee route
          {
            path: "/employeeHome",
            element: (
              <EmployeeRouter>
                <EmployeeHome />,
              </EmployeeRouter>
            ),
          },
          {
            path: "/category",
            element: (
              <EmployeeRouter>
                <Category />,
              </EmployeeRouter>
            ),
          },
          {
            path: "/productList",
            element: <ProductList />,
          },
          {
            path: "/addProduct",
            element: (
              <EmployeeRouter>
                <AddProduct />,
              </EmployeeRouter>
            ),
          },
          {
            path: "/sellList",
            element: (
              <EmployeeRouter>
                <SellList />,
              </EmployeeRouter>
            ),
          },
          {
            path: "/productNotification",
            element: (
              <EmployeeRouter>
                <ProductNotification />,
              </EmployeeRouter>
            ),
          },
          // admin routes
          {
            path: "/adminHome",
            element: (
              <AdminRouter>
                <AdminHome />,
              </AdminRouter>
            ),
          },
          {
            path: "/allEmployee",
            element: (
              <AdminRouter>
                <AllEmployee />,
              </AdminRouter>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Registration />,
  },
  {
    path: "loginSwitch",
    element: <LoginSwitch />,
  },
  {
    path: "message",
    element: <RegistrationMessage />,
  },
  {
    path: "forgetpassword",
    element: <ForgetPass />,
  },
]);

export default router;
