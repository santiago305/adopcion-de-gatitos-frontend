
import Login from "@/pages/Auth/Login";
import ErrorPage from "@/pages/Error404";
import { RouteObject } from "react-router-dom";


export const usersRoutes: RouteObject[] = [
  {
    path: 'users',
    element: (
        <Login />
    ),
    errorElement: <ErrorPage />
  },
];

