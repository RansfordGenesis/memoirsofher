import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home";
import MemoriesPage from "../pages/Memories";
import ShareMemory from "../pages/share-memory";
import AccessPage from "../pages/Access";

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
    path: "access",
    element: <AccessPage />,
  },
  {
    path: "*",
    element: <HomePage />,
  },
]);