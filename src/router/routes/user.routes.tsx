import { RouteObject } from "react-router-dom";

const userRoutes: RouteObject[] = [
  {
    path: "/user",
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

export default userRoutes;
