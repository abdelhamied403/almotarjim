import { RouteObject } from "react-router-dom";

const adminRoutes: RouteObject[] = [
  {
    path: "/admin",
    children: [
      {
        path: "dashboard",
        element: <p>dashboard</p>,
      },
      {
        path: "requests",
        element: <p>requests</p>,
      },
      {
        path: "chat",
        element: <p>chat</p>,
      },
    ],
  },
];

export default adminRoutes;
