/**
 * Definición de rutas públicas de la aplicación.
 * 
 * Estas rutas no requieren autenticación y están disponibles para todos los usuarios.
 * Cada ruta maneja su propio componente de error a través de `errorElement`.
 * 
 * @module PublicRoutes
 */


import { RouteObject } from "react-router-dom";
import { lazy } from "react";
import { RoutesPaths } from "../config/routesPaths";
import Layout from "@/components/layout/layoutPublic";

const Home = lazy(() => import("@/pages/public/Home"));
const About = lazy(() => import("@/pages/public/About"));
const Animals = lazy(() => import("@/pages/public/Animals"));
const Contact = lazy(() => import("@/pages/public/Contact"));
const ErrorPage = lazy(() => import("@/pages/Error404"));

export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />, // << Este wrapper manejará todas las transiciones
    children: [
      { index: true, element: <Home /> },
      {
        path: RoutesPaths.about,
        element: <About />,
      },
      {
        path: RoutesPaths.contact,
        element: <Contact />,
      },
      {
        path: RoutesPaths.animals,
        element: <Animals />,
      },
    {
      path: "*",
      element: <ErrorPage />,
    },
    ],
  },
];
