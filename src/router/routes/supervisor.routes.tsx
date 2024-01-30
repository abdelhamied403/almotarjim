import { RouteObject } from "react-router-dom";

// pages
import Dashboard from "@/pages/supervisor/Dashboard";
import Requests from "@/pages/supervisor/Requests";
import SingleRequest from "@/pages/supervisor/SingleRequest";
import Chats from "@/pages/supervisor/Chats";
import SingleChat from "@/pages/supervisor/SingleChat";
import Error404 from "@/pages/shared/error/Error404";
import SupervisorLayout from "@/layouts/SupervisorLayout";
import CreateRequest from "@/pages/supervisor/CreateRequest";
import InternalChat from "@/pages/supervisor/InternalChat";
import InternalChats from "@/pages/supervisor/InternalChats";
import CreateInternalChat from "@/pages/supervisor/CreateInternalChat";

const supervisorRoutes: RouteObject[] = [
  {
    path: "/",
    element: <SupervisorLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "internal-chats",
        children: [
          { path: "", element: <InternalChats /> },
          { path: "new", element: <CreateInternalChat /> },
          { path: ":id", element: <InternalChat /> },
        ],
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
