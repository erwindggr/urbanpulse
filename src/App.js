import Main from "./pages/Main";
import ProductPage from "./pages/productPage";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import router from "./Routes/Route";


function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
