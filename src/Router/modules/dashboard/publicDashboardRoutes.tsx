import { RouteObject } from "react-router-dom";
import { RoutesPaths } from "../../config/routesPaths";
import ErrorPage from "@/pages/Error404";
import RegisterForm from "@/components/register-form";
import Login from "@/pages/Auth/Login";

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

  {
    path: RoutesPaths.usersList,
    element:
    <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: RoutesPaths.usersRegister,
    element:
    <RegisterForm/>,
    errorElement: <ErrorPage />,
  },
  {
    path: RoutesPaths.usersUpdate,
    element:
    <div>Aqui va el componente de actualizar usuarios</div>,
    errorElement: <ErrorPage />,
  },
  {
    path: RoutesPaths.usersDelete,
    element:
    <div>Aqui va el componente de eliminar usuarios</div>,
    errorElement: <ErrorPage />,
  },

  {
    path: RoutesPaths.caracteristicasVer,
    element:
    <div>Aqui va el componente de ver caracteristicas</div>,
    errorElement: <ErrorPage />,
  },

  {
    path: RoutesPaths.caracteristicasUpdate,
    element:
    <div>Aqui va el componente de actualizar caracteristicas</div>,
    errorElement: <ErrorPage />,
  },

  {
    path: RoutesPaths.configProfile,
    element:
    <div>Aqui va el componente de perfil</div>,
    errorElement: <ErrorPage />,
  },

  {
    path: RoutesPaths.configGestion,
    element:
    <div>Aqui va el componente de gestion</div>,
    errorElement: <ErrorPage />,
  },

];