import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/Main";
import ProductPage from "../pages/productPage";
import Login from "../pages/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main  />,
    },
    {
        path: "/product/:id?",
        element: <ProductPage />,
    },
    {
        path: "/login",
        element: <Login />,
    }
]);

export default router;