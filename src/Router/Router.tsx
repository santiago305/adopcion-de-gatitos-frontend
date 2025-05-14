// routes/router.ts
import { Dashboard, Home, Login } from "@/pages";
import ErrorPage from "@/pages/Error404";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./guards/PrivateRoute";
import DashboardLayout from "@/pages/dashboard/DashboardLayout";
import RedirectIfAuth from "./guards/RedirectIfAuth";
import RequireClientRegister from "./guards/RequireClientRegister";
import ClientsRegister from "@/pages/clients/ClientsRegister";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />
  },
  {
    path: "/login",
    element: (
      <RedirectIfAuth>
        <Login />
      </RedirectIfAuth>
    )
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard /> }, // /dashboard
      // { path: "settings", element: <Settings /> }, // /dashboard/settings
      // { path: "profile", element: <Profile /> }  // /dashboard/profile
    ]
  },
  {
    path: "/clients-register",
    element: (
      <RequireClientRegister>
        <ClientsRegister />
      </RequireClientRegister>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
