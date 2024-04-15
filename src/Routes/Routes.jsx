import MainLayout from "../layout/MainLayout/MainLayout";
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
                element: <Home />
            }
        ]
    },
]);

export default router;