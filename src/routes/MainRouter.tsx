import { useEffect, useRef } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  RouteObject,
} from "react-router-dom";
import useUser from "@/hooks/useUser";

import PublicRoutes from "./public.routes";
import AdminRoutes from "./admin.routes";

const allRoutes: { [key: string]: RouteObject[] } = {
  admin: AdminRoutes,
};

const MainRouter = () => {
  const router = useRef(createBrowserRouter(PublicRoutes));
  const { role, isLoggedIn } = useUser();

  useEffect(() => {
    let PrivateRoutes: RouteObject[] = [];
    if (isLoggedIn && !!role) {
      PrivateRoutes = allRoutes[role];
    }

    console.log([...PublicRoutes, ...PrivateRoutes]);

    const routes: RouteObject[] = [...PublicRoutes, ...PrivateRoutes];
    router.current = createBrowserRouter(routes);
  }, [role, isLoggedIn]);

  return <RouterProvider router={router.current} />;
};

export default MainRouter;
