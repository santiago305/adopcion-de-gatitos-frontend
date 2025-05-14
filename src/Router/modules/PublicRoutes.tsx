import { About, Contact, Home, } from "@/pages";
import ErrorPage from "@/pages/Error404";
import { RouteObject } from "react-router-dom";
import { RoutesPaths } from "../config/routesPaths";

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

