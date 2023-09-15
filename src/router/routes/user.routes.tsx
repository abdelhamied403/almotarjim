import { RouteObject } from "react-router-dom";

const userRoutes: RouteObject[] = [
  {
    path: "/user",
    children: [
      {
        path: "",
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
      {
        path: "*",
        element: <p>404</p>,
      },
    ],
  },
];

export default userRoutes;
