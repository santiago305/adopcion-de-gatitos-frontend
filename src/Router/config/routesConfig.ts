import { Home, User, Settings, ShoppingCart, LogOut } from "lucide-react";
import { RouteMetadata } from "../types/RouterTypes";
import { RoutesPaths } from "./routesPaths";

// 📌 Rutas del Header (Top Navigation)
export const headerLinks: RouteMetadata[] = [
  { path: RoutesPaths.home, name: "Inicio", isPublic: true, icon: Home},
//   { path: RoutesPaths.profile, name: "Perfil", isProtected: true, roles: ["admin", "moderator", "user"], icon: User },
//   { path: RoutesPaths.settings, name: "Configuración", isProtected: true, roles: ["admin"], icon: Settings },
];

// 📌 Rutas del Main (Sidebar o Menú Principal)
export const mainLinks: RouteMetadata[] = [
  { path: RoutesPaths.dashboard, name: "Dashboard", isProtected: true, roles: ["admin", "moderator"], icon: Home },
  // { path: RoutesPaths.products, name: "Productos", isProtected: true, roles: ["admin", "moderator"], icon: ShoppingCart },
  // { path: RoutesPaths.clientProducts, name: "Mis Compras", isProtected: true, roles: ["user"], icon: ShoppingCart },
];

// 📌 Rutas del Footer
export const footerLinks: RouteMetadata[] = [
  { path: "/logout", name: "Cerrar Sesión", isProtected: true, roles: ["admin", "moderator", "user"], icon: LogOut },
];
