import { RouteObject } from "react-router-dom";

const PublicRoutes: RouteObject[] = [
  {
    path: "/",
    children: [
      {
        path: "",
        element: <p>eee</p>,
      },
      {
        path: "login",
        element: <p>login</p>,
      },
      {
        path: "register",
        element: <p>register</p>,
      },
    ],
  },
  {
    path: "*",
    element: <p>err</p>,
  },
];

export default PublicRoutes;
