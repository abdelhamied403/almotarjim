import { RouteObject } from "react-router-dom";

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    children: [
      {
        path: "",
        element: <p className="bg-primary-400">home</p>,
      },
      {
        path: "login",
        element: <p>login</p>,
      },
      {
        path: "register",
        element: <p>register</p>,
      },
      {
        path: "*",
        element: <p>404</p>,
      },
    ],
  },
];

export default publicRoutes;
