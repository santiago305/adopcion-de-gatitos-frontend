import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UrlPage } from "./RouterTypes";
import RedirectIfAuth from "@/guards/RedirectIfAuth";
import PrivateRoute from "@/guards/PrivateRoute";

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Products = lazy(() => import("@/pages/Product"));
const ProductShow = lazy(() => import("@/pages/Product.show"));
const Contact = lazy(() => import("@/pages/Contact"));
const Login = lazy(() => import("@/pages/Auth/Login"));
const Register = lazy(() => import("@/pages/Auth/Register"));
const ClientsRegister = lazy(() => import("@/pages/clients/ClientsRegister"));
const Dashboard = lazy(() => import("@/pages/dashboard/Dashboard"));
const DashboardLayout = lazy(() => import("@/pages/dashboard/DashboardLayout"));
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

            // Rutas públicas (login y registro)
            if (route.url === "/login" || route.url === "/register") {
              return (
                <Route
                  key={route.name}
                  path={route.url}
                  element={
                    <RedirectIfAuth>
                      <Component />
                    </RedirectIfAuth>
                  }
                />
              );
            }

            return <Route key={route.name} path={route.url} element={<Component />} />;
          })}

          <Route
            path="/dashboard/*"
            element={
              <PrivateRoute>
                <DashboardLayout />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductShow />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

