import useUser from "@/hooks/useUser";
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { useMemo } from "react";
import Role from "@/interfaces/role";

// routes
import adminRoutes from "./routes/admin.routes";
import publicRoutes from "./routes/public.routes";
import userRoutes from "./routes/user.routes";
import agentRoutes from "./routes/agent.routes";
import supervisorRoutes from "./routes/supervisor.routes";
import translatorRoutes from "./routes/translator.routes";

const routesLookup: { [key in Role]: RouteObject[] } = {
  admin: adminRoutes,
  agent: agentRoutes,
  supervisor: supervisorRoutes,
  translator: translatorRoutes,
  client: userRoutes,
};

const MainRouter = () => {
  const { isLoggedIn, role } = useUser();
  const router = useMemo(() => {
    const routes: RouteObject[] = isLoggedIn && role ? routesLookup[role] : [];
    return createBrowserRouter([...publicRoutes, ...routes]);
  }, [isLoggedIn, role]);

  return <RouterProvider router={router} />;
};

export default MainRouter;
