import MainLayout from "../layout/MainLayout/MainLayout";
import AddProduct from "../pages/Dashboard-employee/addProduct/AddProduct";
import EmployeeHome from "../pages/Dashboard-employee/employeehome/EmployeeHome";
import ProductList from "../pages/Dashboard-employee/productList/ProductList";
import Errorpage from "../pages/Errorpage/Errorpage";
import Home from "../pages/Home/Home/Home";

import { createBrowserRouter } from "react-router-dom";

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
        ],
      },
    ],
  },
]);

export default router;
