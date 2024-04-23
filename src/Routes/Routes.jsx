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
<<<<<<< HEAD
            {
                path: "/",
                element: <Home />
            },
            // employee routes
            {
              path: "/employeeHome",
              element: <EmployeeHome />,
            },
            {
              path: "/productList",
              element: <ProductList />,
            },
            {
              path: "/addProduct",
              element: <AddProduct />,
            },
            {
              path: "/sellList",
              element: <ProductList />,
            },
            {
              path: "/productNotification",
              element: <ProductList />,
            },
            {
              path: "/addCategory",
              element: <ProductList />,
            },
            // admin routes
            {
                path: 'adminHome',
                element: <AdminHome />
            },
            {
                path: 'allEmployee',
                element: <AllEmployee />
            }

        ]
      },
=======
          {
            path: "/employeeHome",
            element: <EmployeeHome />,
          },
          {
            path: "/category",
            element: <Category />,
          },
          {
            path: "/productList",
            element: <ProductList />,
          },
          {
            path: "/addProduct",
            element: <AddProduct />,
          },
          {
            path: "/sellList",
            element: <ProductList />,
          },
          {
            path: "/productNotification",
            element: <ProductList />,
          },
          {
            path: "/addCategory",
            element: <ProductList />,
          },
          // admin routes
          {
            path: "adminHome",
            element: <AdminHome />,
          },
          {
            path: "allEmployee",
            element: <AllEmployee />,
          },
        ],
      }
>>>>>>> 1dd9b399d34f45c78e783752a1577927df731bd7
    ],
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'register',
    element: <Registration />
  },
  {
    path: 'loginSwitch',
    element: <LoginSwitch />
  }
],
);

export default router;
