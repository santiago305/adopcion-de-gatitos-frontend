import React from 'react';  // Necesario en algunos casos
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UrlPage } from './Router';
import { About, Dashboard, Home, Login, Products, ProductShow, Register } from '../pages';
import Contact from '../pages/Contact';


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
};

export default function AppRouter() {
  return (
    <Router>
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
    </Router>
  );
}
