import { RouteObject } from "react-router-dom";
import { RoutesPaths } from "../../config/routesPaths";
import ErrorPage from "@/pages/Error404";
import Perfil from "@/pages/dashboard/Perfil";
import GestionCuenta from "@/pages/dashboard/GestionCuenta";

export const dashboardPublicRoutes: RouteObject[] = [
  // {
  //   path: RoutesPaths.animalsList,
  //   element: 
  //   <Mascotas/>,
  //   errorElement: <ErrorPage />,
  // },
  // {
  //   path: RoutesPaths.animalsRegister,
  //   element: 
  //   <FormularioNuevaMascota/>,
  //   errorElement: <ErrorPage />,
  // },
  
  // {
  //   path: RoutesPaths.adopcionList,
  //   element:
  //   <SolicitudesAdopcion/>,
  //   errorElement: <ErrorPage />,
  // },

  // {
  //   path: RoutesPaths.adopcionSolicitar,
  //   element:
  //   <div>d</div>,
  //   errorElement: <ErrorPage />,
  // },

  // {
  //   path: RoutesPaths.adopcionVersolicutud,
  //   element:
  //   <div>s</div>,
  //   errorElement: <ErrorPage />,
  // },

  // {
  //   path: RoutesPaths.adopcionEvaluar,
  //   element:
  //   <AnimalForm/>,
  //   errorElement: <ErrorPage />,
  // },

  // {
  //   path: RoutesPaths.adopcionAprobarRechazar,
  //   element:
  //   <ImageList/>,
  //   errorElement: <ErrorPage />,
  // },

  // {
  //   path: RoutesPaths.usersList,
  //   element:
  //   <ListaUsuarios />,
  //   errorElement: <ErrorPage />,
  // },
  // {
  //   path: RoutesPaths.usersRegister,
  //   element:
  //   <RegisterForm/>,
  //   errorElement: <ErrorPage />,
  // },

  {
    path: RoutesPaths.dashboardProfile,
    element:
    <Perfil/>,
    errorElement: <ErrorPage />,
  },

  {
    path: RoutesPaths.dashboardSettings,
    element:
    <GestionCuenta/>,
    errorElement: <ErrorPage />,
  },

];