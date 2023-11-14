import AdminLayout from "@/layouts/AdminLayout";
import Chats from "@/pages/admin/Chats";
import CreateRequest from "@/pages/admin/CreateRequest";
import Dashboard from "@/pages/admin/Dashboard";
import Reports from "@/pages/admin/Reports";
import Requests from "@/pages/admin/Requests";
import SingleChat from "@/pages/admin/SingleChat";
import SingleRequest from "@/pages/admin/SingleRequest";
import Error404 from "@/pages/shared/error/Error404";
import { RouteObject } from "react-router-dom";
import Agents from "@/pages/admin/Agents";
import Translators from "@/pages/admin/Translators";
import Supervisors from "@/pages/admin/Supervisors";
import Users from "@/pages/admin/Users";
import CreateAgent from "@/pages/admin/create/CreateAgent";

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
        path: "agents",
        children: [
          {
            path: "",
            element: <Agents />,
          },
          {
            path: "create",
            element: <CreateAgent />,
          },
        ],
      },
      {
        path: "translators",
        children: [
          {
            path: "",
            element: <Translators />,
          },
        ],
      },
      {
        path: "supervisors",
        children: [
          {
            path: "",
            element: <Supervisors />,
          },
        ],
      },
      {
        path: "users",
        children: [
          {
            path: "",
            element: <Users />,
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
