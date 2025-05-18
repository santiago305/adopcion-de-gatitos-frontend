
import Login from "@/pages/Auth/Login";
import ErrorPage from "@/pages/Error404";
import { RouteObject } from "react-router-dom";


export const adminRoutes: RouteObject[] = [
  {
    path: 'admin',
    element: (
        <Login />
    ),
    errorElement: <ErrorPage />
  },
];

