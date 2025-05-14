import ErrorPage from "@/pages/Error404";
import { RouteObject } from "react-router-dom";
import { RoutesPaths } from "../config/routesPaths";
import RequireClientRegister from "../guards/RequireClientRegister";
import ClientsRegister from "@/pages/clients/ClientsRegister";

export const clientsRoutes: RouteObject[] = [
  {
    path: RoutesPaths.clientsRegister,
    element: (
      <RequireClientRegister>
        <ClientsRegister />
      </RequireClientRegister>
    ),
    errorElement: <ErrorPage />,
  },
];

