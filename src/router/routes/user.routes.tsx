import { RouteObject } from "react-router-dom";

// pages
import Error404 from "@/pages/shared/error/Error404";
import CreateRequest from "@/pages/user/CreateRequest";
import Home from "@/pages/user/Home";
import Requests from "@/pages/user/Requests";
import SingleChat from "@/pages/user/SingleChat";
import SingleRequest from "@/pages/user/SingleRequest";
import UserLayout from "@/layouts/UserLayout";

const userRoutes: RouteObject[] = [
  {
    path: "/user",
    element: <UserLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "request",
        children: [
          {
            path: "",
            element: <Requests />,
          },
          {
            path: "create",
            element: <CreateRequest />,
          },
          {
            path: ":id",
            element: <SingleRequest />,
          },
        ],
      },
      {
        path: "chat",
        children: [
          {
            path: ":id",
            element: <SingleChat />,
          },
        ],
      },
      {
        path: "*",
        element: <Error404 />,
      },
    ],
  },
];

export default userRoutes;
