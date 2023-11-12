import AdminLayout from "@/layouts/AdminLayout";
import Chats from "@/pages/admin/Chats";
import CreateRequest from "@/pages/admin/CreateRequest";
import Dashboard from "@/pages/admin/Dashboard";
import Monitor from "@/pages/admin/Monitor";
import Reports from "@/pages/admin/Reports";
import Requests from "@/pages/admin/Requests";
import SingleChat from "@/pages/admin/SingleChat";
import SingleRequest from "@/pages/admin/SingleRequest";
import Error404 from "@/pages/shared/error/Error404";
import { RouteObject } from "react-router-dom";

const adminRoutes: RouteObject[] = [
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
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
        path: "monitor",
        children: [
          {
            path: "",
            element: <Monitor />,
          },
          {
            path: ":id",
            element: <Monitor />,
          },
        ],
      },
      {
        path: "reports",
        children: [
          {
            path: "",
            element: <Reports />,
          },
          {
            path: ":id",
            element: <Reports />,
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

export default adminRoutes;
