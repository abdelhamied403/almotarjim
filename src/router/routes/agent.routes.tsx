import { RouteObject } from "react-router-dom";

// pages
import Dashboard from "@/pages/agent/Dashboard";
import Chats from "@/pages/agent/Chats";
import SingleChat from "@/pages/agent/SingleChat";
import Requests from "@/pages/agent/Requests";
import SingleRequest from "@/pages/agent/SingleRequest";
import Error404 from "@/pages/shared/error/Error404";
import AgentLayout from "@/layouts/AgentLayout";
import CreateRequests from "@/pages/agent/CreateRequests";
import InternalChat from "@/pages/agent/InternalChat";
import InternalChats from "@/pages/admin/InternalChats";
import CreateInternalChat from "@/pages/admin/CreateInternalChat";

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
        path: "internal-chats",
        children: [
          { path: "", element: <InternalChats /> },
          { path: "new", element: <CreateInternalChat /> },
          { path: ":id", element: <InternalChat /> },
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
        path: "request",
        children: [
          {
            path: "",
            element: <Requests />,
          },
          {
            path: "create",
            element: <CreateRequests />,
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
