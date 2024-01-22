import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/Main";
import ProductPage from "../pages/productPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
    },
    {
        path: "/product",
        element: <ProductPage />,
    }
]);

export default router;