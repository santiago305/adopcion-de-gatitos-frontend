/**
 * Definición de rutas protegidas bajo el Dashboard.
 * 
 * - Se utiliza `PrivateRoute` para proteger las rutas que requieren autenticación.
 * - Las rutas están anidadas bajo `DashboardLayout`.
 * - Soporta subrutas específicas para roles (admin, monitor, users).
 * 
 * @module DashboardRoutes
 */

import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { dashboardPublicRoutes } from "./dashboard/publicDashboardRoutes";
import { adminRoutes } from "./dashboard/adminRoutes";
import { monitorRoutes } from "./dashboard/monitorRoutes";
import { usersRoutes } from "./dashboard/usersRoutes";
import { RoutesPaths } from "../config/routesPaths";
import PrivateRoute from "../guards/PrivateRoute";

const DashboardLayout = lazy(() => import("@/pages/dashboard/DashboardLayout"));
const Dashboard = lazy(() => import("@/components/layout/Dashboard"));
const ErrorPage = lazy(() => import("@/pages/Error404"));

export const dashboardRoutes: RouteObject[] = [
  {
    path: RoutesPaths.dashboard,
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard /> }, // /dashboard
      ...dashboardPublicRoutes,
      ...adminRoutes,
      ...monitorRoutes,
      ...usersRoutes,
    ],
  },
];
