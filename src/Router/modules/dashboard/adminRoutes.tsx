
import DashboardAnimals from "@/pages/dashboard/Animals";
import DashboardBreed from "@/pages/dashboard/Breed";
import DashboardCharacteristics from "@/pages/dashboard/characteristics";
import DashboardDiseases from "@/pages/dashboard/Diseases";
import DashboardPersonality from "@/pages/dashboard/Personality";
import DashboardSpecies from "@/pages/dashboard/Species";
import ErrorPage from "@/pages/Error404";
import { RoutesPaths } from "@/router/config/routesPaths";
import { RouteObject } from "react-router-dom";


export const adminRoutes: RouteObject[] = [
  {
    path: RoutesPaths.dashboardAnimals,
    element: (
        <DashboardAnimals />
    ),
    errorElement: <ErrorPage />
  },
  {
    path: RoutesPaths.dashboardDiseases,
    element: (
        <DashboardDiseases />
    ),
    errorElement: <ErrorPage />
  },
  {
    path: RoutesPaths.dashboardSpecies,
    element: (
        <DashboardSpecies />
    ),
    errorElement: <ErrorPage />
  },
  {
    path: RoutesPaths.dashboardBreed,
    element: (
        <DashboardBreed />
    ),
    errorElement: <ErrorPage />
  },
  {
    path: RoutesPaths.dashboardPersonality,
    element: (
        <DashboardPersonality/>
    ),
    errorElement: <ErrorPage />
  },
  {
    path: RoutesPaths.dashboardCharacteristics,
    element: (
        <DashboardCharacteristics/>
    ),
    errorElement: <ErrorPage />
  },
];

