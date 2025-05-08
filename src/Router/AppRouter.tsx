import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UrlPage } from './RouterTypes';

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
"Home" 
| "About me" 
| "Products" 
| "Product.Show"
| "Contact"
// | "Profile" 
| "Login"
| "Register"
| "Dashboard" 
| "ClientRegister"
//| "Settings";

const routeComponents: Record<RouteComponentName, React.ComponentType> = {
  Home: Home,
  "About me": About,
  Products: Products,
  Contact: Contact,
  "Product.Show": ProductShow,
  Dashboard: Dashboard,
  Login: Login,
  Register: Register,
  ClientRegister: ClientsRegister
};

export default function AppRouter() {
  return (
    <Router>
      <Suspense fallback={<div className="text-white p-4">Cargando página...</div>}>
        <Routes>
          {UrlPage.map((route) => {
            // Asegurarse de que route.name sea una clave válida de routeComponents
            const Component = routeComponents[route.name as RouteComponentName]; 
            if (!Component) {
              return null;
            }
            return <Route key={route.name} path={route.url} element={<Component />} />;
          })}
        </Routes>
      </Suspense>
    </Router>
  );
}
