import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UrlPage } from "./RouterTypes";
import AuthRedirectGuard from "@/guards/AuthRedirectGuard";
import PrivateRoute from "@/guards/PrivateRoute";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Products = lazy(() => import("@/pages/Product"));
const ProductShow = lazy(() => import("@/pages/Product.show"));
const Contact = lazy(() => import("@/pages/Contact"));
const Dashboard = lazy(() => import("@/pages/dashboard/Dashboard"));
const Login = lazy(() => import("@/pages/Auth/Login"));
const Register = lazy(() => import("@/pages/Auth/Register"));
const ClientsRegister = lazy(() => import("@/pages/clients/ClientsRegister"));

type RouteComponentName = 
  | "Home"
  | "About me"
  | "Products"
  | "Product.Show"
  | "Contact"
  | "Login"
  | "Register"
  | "Dashboard"
  | "ClientsRegister";

const routeComponents: Record<RouteComponentName, React.ComponentType> = {
  Home,
  "About me": About,
  Products,
  Contact,
  "Product.Show": ProductShow,
  Dashboard,
  Login,
  Register,
  ClientsRegister,
};

export default function AppRouter() {
  return (
    <Router>
      <Suspense fallback={<div className="text-white p-4">Cargando página...</div>}>
        <Routes>
          {UrlPage.map((route) => {
            const Component = routeComponents[route.name as RouteComponentName];
            if (!Component) return null;

            const element = (() => {
              if (route.url === "/login" || route.url === "/register") {
                return (
                  <AuthRedirectGuard>
                    <Component />
                  </AuthRedirectGuard>
                );
              }

              if (route.url === "/dashboard") {
                return (
                  <PrivateRoute>
                    <Component />
                  </PrivateRoute>
                );
              }

              return <Component />;
            })();

            return <Route key={route.name} path={route.url} element={element} />;
          })}
        </Routes>
      </Suspense>
    </Router>
  );
}
