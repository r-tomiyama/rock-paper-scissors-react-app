import {
  createBrowserRouter,
} from "react-router-dom";
import { Room, Top } from "./pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Top />,
  },
  {
    path: "/room/:id",
    element: <Room />,
  },
]);