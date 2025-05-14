import ErrorPage from "@/pages/Error404";
import { createBrowserRouter } from "react-router-dom";
import { publicRoutes } from "./modules/PublicRoutes";
import { clientsRoutes } from "./modules/ClientRoutes";
import { authRoutes } from "./modules/AuthRoutes";
// import { dashboardRoutes } from "./modules/DashboardRoutes";


export const router = createBrowserRouter([
  ...publicRoutes,
  ...authRoutes,
  ...clientsRoutes,
  // ...dashboardRoutes,
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
