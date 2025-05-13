import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../guards/PrivateRoute";
import DashboardLayout from "@/pages/dashboard/DashboardLayout";
import Dashboard from "@/pages/dashboard/Dashboard";
import Products from "@/pages/Product";
import ProductShow from "@/pages/Product.show";
// import Profile from "@/pages/Profile";
// import Settings from "@/pages/Settings";

/**
 * Rutas protegidas bajo el DashboardLayout. 
 * Solo accesibles si el usuario está autenticado.
 */
export default function DashboardRoutes() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={
        <PrivateRoute>
          <DashboardLayout />
        </PrivateRoute>
      }>
        <Route index element={<Dashboard />} /> {/* /dashboard */}
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductShow />} />
        {/* <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} /> */}
      </Route>
    </Routes>
  );
}
