import ErrorPage from "@/pages/Error404";
import { RouteObject } from "react-router-dom";
import PrivateRoute from "../guards/PrivateRoute";
import DashboardLayout from "@/pages/dashboard/DashboardLayout";
import { Dashboard } from "@/pages";
import { dashboardPublicRoutes } from "./dashboard/publicDashboardRoutes";
import { adminRoutes } from "./dashboard/adminRoutes";
import { monitorRoutes } from "./dashboard/monitorRoutes";
import { usersRoutes } from "./dashboard/usersRoutes";

export const dashboardRoutes: RouteObject[] = [
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard /> }, 
      ...dashboardPublicRoutes,
      ...adminRoutes,
      ...monitorRoutes,
      ...usersRoutes
    ]
  },
];

