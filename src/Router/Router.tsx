// routes/router.ts
import { Dashboard } from "@/pages";
import ErrorPage from "@/pages/Error404";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./guards/PrivateRoute";
import DashboardLayout from "@/pages/dashboard/DashboardLayout";
import { publicRoutes } from "./modules/PublicRoutes";
import { clientsRoutes } from "./modules/ClientRoutes";
import { authRoutes } from "./modules/AuthRoutes";


export const router = createBrowserRouter([
  ...publicRoutes,
  ...authRoutes,
  ...clientsRoutes,
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard /> }, // /dashboard
      // { path: "settings", element: <Settings /> }, // /dashboard/settings
      // { path: "profile", element: <Profile /> }  // /dashboard/profile
    ]
  },
  
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
