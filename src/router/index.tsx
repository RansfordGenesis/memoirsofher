import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home";
import MemoriesPage from "../pages/Memories";
import ShareMemory from "../pages/share-memory";
import AccessPage from "../pages/Access";
import Gallery from "@/pages/Gallery";

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
    path: "gallery",
    element: <Gallery />,
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
