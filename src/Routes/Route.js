import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/Main";
import ProductPage from "../pages/productPage";
import Login from "../pages/Login";
// import { useState } from "react";

// const [token, setToken] = useState(localStorage.getItem('userToken') ?? null);

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main  />,
    },
    {
        path: "/product",
        element: <ProductPage />,
    },
    {
        path: "/login",
        element: <Login />,
    }
]);

export default router;