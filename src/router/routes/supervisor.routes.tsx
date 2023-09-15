import { RouteObject } from "react-router-dom";

const supervisorRoutes: RouteObject[] = [
  {
    path: "/supervisor",
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
            path: "create",
            element: <p>create request page</p>,
          },
          {
            path: ":id",
            element: <p>single request page</p>,
          },
        ],
      },
      {
        path: "chat",
        children: [
          {
            path: "",
            element: <p>all chats</p>,
          },
          {
            path: ":id",
            element: <p>single chat page</p>,
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

export default supervisorRoutes;
