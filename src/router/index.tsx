import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home";
import Memories from "../pages/Memories";

export const router = createBrowserRouter([
  {
    path: "",
    element: <HomePage />,
  },
  {
    path:"/memories",
    element:<Memories/>

  },

  {
    path: "*",
    element: <HomePage />,
  },
]);
