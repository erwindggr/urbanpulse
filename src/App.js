import Main from "./pages/Main";
import ProductPage from "./pages/productPage";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import router from "./Routes/Route";
import { useState } from "react";


function App() {
  const [token, setToken] = useState(localStorage.getItem('userToken') ?? null);


  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
