
import Login from "@/pages/Auth/Login";
import ErrorPage from "@/pages/Error404";
import { RouteObject } from "react-router-dom";


export const dashboardPublicRoutes: RouteObject[] = [
  {
    path: 'public-dashboard',
    element: (
        <Login />
    ),
    errorElement: <ErrorPage />
  },
];

