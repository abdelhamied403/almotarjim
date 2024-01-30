import { RouteObject } from "react-router-dom";

// pages
import Dashboard from "@/pages/translator/Dashboard";
import Requests from "@/pages/translator/Requests";
import SingleRequest from "@/pages/translator/SingleRequest";
import SubmitRequest from "@/pages/translator/SubmitRequest";
import Error404 from "@/pages/shared/error/Error404";
import TranslatorLayout from "@/layouts/TranslatorLayout";
import SingleChat from "@/pages/translator/SingleChat";
import InternalChats from "@/pages/translator/InternalChats";
import CreateInternalChat from "@/pages/translator/CreateInternalChat";
import InternalChat from "@/pages/translator/InternalChat";

const translatorRoutes: RouteObject[] = [
  {
    path: "/",
    element: <TranslatorLayout />,
    children: [
      {
        path: "/dashboard",
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
            path: ":id",
            element: <SingleRequest />,
          },
          {
            path: ":id/submit",
            element: <SubmitRequest />,
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

export default translatorRoutes;
