import { RouteObject } from "react-router-dom";

// pages
import Home from "@/pages/shared/Home";
import Login from "@/pages/shared/Login";
import Register from "@/pages/shared/Register";
import Error404 from "@/pages/shared/error/Error404";

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "*",
        element: <Error404 />,
      },
    ],
  },
];

export default publicRoutes;
