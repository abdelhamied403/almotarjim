import { RouteObject } from "react-router-dom";

const translatorRoutes: RouteObject[] = [
  {
    path: "/translator",
    children: [
      {
        path: "",
        element: <p>dashboard</p>,
      },
      {
        path: "request",
        children: [
          {
            path: "",
            element: <p>requests page</p>,
          },
          {
            path: ":id",
            element: <p>single request page</p>,
          },
          {
            path: ":id/submit",
            element: <p>submit request page</p>,
          },
        ],
      },
      {
        path: "*",
        element: <p>404</p>,
      },
    ],
  },
];

export default translatorRoutes;
