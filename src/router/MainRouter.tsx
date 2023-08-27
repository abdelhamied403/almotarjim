import useUser from "@/hooks/useUser";
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { useMemo } from "react";
import role from "@/interfaces/role";

// routes
import adminRoutes from "./routes/admin.routes";
import publicRoutes from "./routes/public.routes";
import userRoutes from "./routes/user.routes";

const routesLookup: { [key in role]: RouteObject[] } = {
  admin: adminRoutes,
  agent: adminRoutes,
  supervisor: adminRoutes,
  translator: adminRoutes,
  user: userRoutes,
};

const MainRouter = () => {
  const { role } = useUser();
  const router = useMemo(() => {
    const routes: RouteObject[] = routesLookup[role] || [];
    console.log([...routes, ...publicRoutes]);
    return createBrowserRouter([...routes, ...publicRoutes]);
  }, [role]);

  return <RouterProvider router={router} />;
};

export default MainRouter;
