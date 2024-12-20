import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home";
import MemoriesPage from "../pages/Memories";
import ShareMemory from "../pages/share-memory";

export const router = createBrowserRouter([
  {
    path: "",
    element: <HomePage />,
  },
  {
    path: "share-memory",
    element: <ShareMemory />,
  },
  {
    path: "memories",
    element: <MemoriesPage />,
  },
  {
    path: "*",
    element: <HomePage />,
  },
]);
