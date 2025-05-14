/**
 * Definición de rutas públicas de la aplicación.
 * 
 * Estas rutas no requieren autenticación y están disponibles para todos los usuarios.
 * Cada ruta maneja su propio componente de error a través de `errorElement`.
 * 
 * @module PublicRoutes
 */

import { RoutesPaths } from "../config/routesPaths";
import { RouteObject } from "react-router-dom";
import { lazy } from "react";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const ErrorPage = lazy(() => import("@/pages/Error404"));

export const publicRoutes: RouteObject[] = [
  {
    path: RoutesPaths.home,
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: RoutesPaths.about,
    element: <About />,
    errorElement: <ErrorPage />,
  },
  {
    path: RoutesPaths.contact,
    element: <Contact />,
    errorElement: <ErrorPage />,
  },
];
