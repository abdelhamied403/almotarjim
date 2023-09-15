import { RouteObject } from "react-router-dom";

const adminRoutes: RouteObject[] = [
  {
    path: "/admin",
    children: [
      {
        path: "",
        element: <p>admin page</p>,
      },
      {
        path: "*",
        element: <p>404</p>,
      },
    ],
  },
];

export default adminRoutes;
