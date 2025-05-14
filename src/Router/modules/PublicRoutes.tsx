import { RoutesPaths } from "../config/routesPaths";
import { RouteObject } from "react-router-dom";
import { lazy } from "react";

const Home = lazy(()=>import("@/pages/Home"))
const About = lazy(()=>import("@/pages/About"))
const Contact = lazy(()=>import("@/pages/Contact"))
const ErrorPage = lazy(()=>import("@/pages/Error404"))

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

