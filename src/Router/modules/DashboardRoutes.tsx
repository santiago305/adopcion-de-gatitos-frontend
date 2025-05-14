import { lazy } from "react";
import ErrorPage from "@/pages/Error404";
import { RouteObject } from "react-router-dom";
import PrivateRoute from "../guards/PrivateRoute";
import { dashboardPublicRoutes } from "./dashboard/publicDashboardRoutes";
import { adminRoutes } from "./dashboard/adminRoutes";
import { monitorRoutes } from "./dashboard/monitorRoutes";
import { usersRoutes } from "./dashboard/usersRoutes";

const DashboardLayout = lazy(()=> import("@/pages/dashboard/DashboardLayout"))
const Dashboard = lazy(()=> import("@/pages/dashboard/Dashboard"))

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

