import { Login, Register } from "@/pages";
import ErrorPage from "@/pages/Error404";
import { RouteObject } from "react-router-dom";
import RedirectIfAuth from "../guards/RedirectIfAuth";
import { RoutesPaths } from "../config/routesPaths";

export const authRoutes: RouteObject[] = [
  {
    path: RoutesPaths.login,
    element: (
      <RedirectIfAuth>
        <Login />
      </RedirectIfAuth>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: RoutesPaths.register,
    element: (
      <RedirectIfAuth>
        <Register />
      </RedirectIfAuth>
    ),
    errorElement: <ErrorPage />
  },
];
