import { RouteObject } from "react-router-dom";

// pages
import Dashboard from "@/pages/supervisor/Dashboard";
import Requests from "@/pages/supervisor/Requests";
import CreateRequest from "@/pages/supervisor/CreateRequest";
import SingleRequest from "@/pages/supervisor/SingleRequest";
import Chats from "@/pages/supervisor/Chats";
import SingleChat from "@/pages/supervisor/SingleChat";
import Error404 from "@/pages/shared/error/Error404";
import SupervisorLayout from "@/layouts/SupervisorLayout";

const supervisorRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: <SupervisorLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
        index: true,
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
            path: "",
            element: <Chats />,
          },
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

export default supervisorRoutes;
