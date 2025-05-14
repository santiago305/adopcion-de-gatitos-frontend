/**
 * Rutas específicas para completar el registro de cliente.
 * 
 * Estas rutas solo son accesibles por usuarios autenticados con rol 'user' 
 * que aún no hayan completado su registro como cliente.
 * 
 * @module ClientsRoutes
 */

import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { RoutesPaths } from "../config/routesPaths";
import RequireClientRegister from "../guards/RequireClientRegister";

const ClientsRegister = lazy(() => import("@/pages/clients/ClientsRegister"));
const ErrorPage = lazy(() => import("@/pages/Error404"));

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
