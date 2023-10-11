import { RouteObject } from "react-router-dom";

// pages
import Dashboard from "@/pages/agent/Dashboard";
import Chats from "@/pages/agent/Chats";
import SingleChat from "@/pages/agent/SingleChat";
import Requests from "@/pages/agent/Requests";
import CreateRequest from "@/pages/agent/CreateRequest";
import SingleRequest from "@/pages/agent/SingleRequest";
import Error404 from "@/pages/shared/error/Error404";
import AgentLayout from "@/layouts/AgentLayout";

const agentRoutes: RouteObject[] = [
  {
    path: "/",
    element: <AgentLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
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
        path: "*",
        element: <Error404 />,
      },
    ],
  },
];

export default agentRoutes;
