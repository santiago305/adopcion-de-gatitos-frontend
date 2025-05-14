import { Login } from "@/pages";
import ErrorPage from "@/pages/Error404";
import { RouteObject } from "react-router-dom";


export const monitorRoutes: RouteObject[] = [
  {
    path: '/monitor',
    element: (
        <Login />
    ),
    errorElement: <ErrorPage />
  },
];

