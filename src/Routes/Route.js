import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/Main";
import ProductPage from "../pages/productPage";
import Login from "../pages/Login";
import Shop from "../pages/shop";

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
    },
    {
        path: "/shop/:category?",
        element: <Shop />
    }
]);

export default router;