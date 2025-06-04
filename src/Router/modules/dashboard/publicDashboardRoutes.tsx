import { RouteObject } from "react-router-dom";
import { RoutesPaths } from "../../config/routesPaths";
import ErrorPage from "@/pages/Error404";

export const dashboardPublicRoutes: RouteObject[] = [
  {
    path: RoutesPaths.animalsList,
    element: 
    <div>Aqui va el componente</div>,
    errorElement: <ErrorPage />,
  },
  {
    path: RoutesPaths.animalsRegister,
    element: 
    <div>Aqui va el componente de registrar animales</div>,
    errorElement: <ErrorPage />,
  },
  {
    path: RoutesPaths.animalsUpdate,
    element:
    <div>Aqui va el componente</div>,
    errorElement: <ErrorPage />,
  },
  {
    path: RoutesPaths.animalsDelete,
    element:
    <div>Aqui va el componente</div>,
    errorElement: <ErrorPage />,
  },
  {
    path: RoutesPaths.adopcionList,
    element:
    <div>Aqui va el componente</div>,
    errorElement: <ErrorPage />,
  },

  {
    path: RoutesPaths.adopcionSolicitar,
    element:
    <div>Aqui va el componente</div>,
    errorElement: <ErrorPage />,
  },

  {
    path: RoutesPaths.adopcionVersolicutud,
    element:
    <div>Aqui va el componente</div>,
    errorElement: <ErrorPage />,
  },

  {
    path: RoutesPaths.adopcionEvaluar,
    element:
    <div>Aqui va el componente</div>,
    errorElement: <ErrorPage />,
  },

  {
    path: RoutesPaths.adopcionAprobarRechazar,
    element:
    <div>Aqui va el componente</div>,
    errorElement: <ErrorPage />,
  },

  
];