import { RouteObject } from "react-router-dom";

const AdminRoutes: RouteObject[] = [
  {
    path: "/admin",
    children: [
      {
        path: "",
        element: <p>admin dashboard</p>,
      },
    ],
  },
];

export default AdminRoutes;
