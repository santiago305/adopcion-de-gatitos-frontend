import { lazy } from "react";
import PrivateRoute from "../guards/PrivateRoute";
import RedirectIfAuth from "../guards/RedirectIfAuth";
import RequireClientRegister from "../guards/RequireClientRegister";
import { RouteConfig } from "../types/RouterTypes";

// Carga dinámica de componentes
const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const Products = lazy(() => import("@/pages/Product"));
const ProductShow = lazy(() => import("@/pages/Product.show"));
const Login = lazy(() => import("@/pages/Auth/Login"));
const Register = lazy(() => import("@/pages/Auth/Register"));
const ClientsRegister = lazy(() => import("@/pages/clients/ClientsRegister"));
const Dashboard = lazy(() => import("@/pages/dashboard/Dashboard"));
const DashboardLayout = lazy(() => import("@/pages/dashboard/DashboardLayout"));
const Error404 = lazy(() => import("@/pages/Error404"));

export const routesConfig: RouteConfig[] = [

   // 📄 Rutas públicas
  { path: "/", name: "Home", component: Home },
  { path: "/about", name: "About", component: About },
  { path: "/contact", name: "Contact", component: Contact },
  { path: "/products", name: "Products", component: Products },
  { path: "/products/:product", name: "Product.Show", component: ProductShow },

  // 🔐 Rutas de autenticación
  { path: "/login", name: "Login", component: Login, guard: RedirectIfAuth },
  { path: "/register", name: "Register", component: Register, guard: RedirectIfAuth },

  // 👤 Registro de cliente (protegido)
  { path: "/clientsregister", name: "ClientsRegister", component: ClientsRegister, guard: RequireClientRegister },

  // 📊 Dashboard y rutas anidadas bajo DashboardLayout
   { 
    path: "/dashboard", 
    name: "Dashboard", 
    component: Dashboard, //index del /dashboard
    guard: PrivateRoute, 
    layout: DashboardLayout, 
    children: [
      // cambiar estas rutas por los componetes de dashboard vrd
      // { path: "products", name: "Products", component: Products },
      // { path: "products/:id", name: "Product.Show", component: ProductShow },
      // { path: "profile", name: "Profile", component: Profile },
      // { path: "settings", name: "Settings", component: Settings }
    ] 
  },
  
   // 🌐 Ruta de error 404
  { path: "*", name: "Error404", component: Error404 }
];
