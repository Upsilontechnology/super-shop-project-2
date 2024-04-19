import MainLayout from "../layout/MainLayout/MainLayout";
import Errorpage from "../pages/Errorpage/Errorpage";
import Home from "../pages/Home/Home/Home";

import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login/Login";
import Registration from "../pages/registration/Registration";
import LoginSwitch from "../pages/loginSwitch/LoginSwitch";


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <Errorpage />,
        children: [
            {
                path: "/",
                element: <Home />
            },

        ]
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
]);

export default router;