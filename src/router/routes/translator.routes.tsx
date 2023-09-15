import { RouteObject } from "react-router-dom";

// pages
import Dashboard from "@/pages/translator/Dashboard";
import Requests from "@/pages/translator/Requests";
import SingleRequest from "@/pages/translator/SingleRequest";
import SubmitRequest from "@/pages/translator/SubmitRequest";
import Error404 from "@/pages/shared/error/Error404";

const translatorRoutes: RouteObject[] = [
  {
    path: "/translator",
    children: [
      {
        path: "",
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
        path: "*",
        element: <Error404 />,
      },
    ],
  },
];

export default translatorRoutes;
