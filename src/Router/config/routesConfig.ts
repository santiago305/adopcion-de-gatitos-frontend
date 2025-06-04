import { Home, User, Settings, ShoppingCart, LogOut, PawPrint } from "lucide-react";
import { RouteMetadata } from "../types/RouterTypes";
import { RoutesPaths } from "./routesPaths";

// 📌 Rutas del Header (Top Navigation)
export const headerLinks: RouteMetadata[] = [
  { path: RoutesPaths.dashboard, name: "Inicio", isPublic: true, icon: Home },

  {
    path: RoutesPaths.animalsList, name: "Animales", isPublic: true, icon: PawPrint,
    subItems: [
      { path: RoutesPaths.animalsList, name: "Listar Animales", isPublic: true },
      { path: RoutesPaths.animalsRegister, name: "Registrar Animales", isPublic: true },
      { path: RoutesPaths.animalsUpdate, name: "Actualizar Animales", isPublic: true },
      { path: RoutesPaths.animalsDelete, name: "Eliminar Animales", isPublic: true },
    ],
  },

  { path: RoutesPaths.adopcionList, name: "Adopcion", isPublic: true, icon: Home,
    subItems: [
      { path: RoutesPaths.adopcionList, name: "Historial de Adopciones", isPublic: true },
      { path: RoutesPaths.adopcionSolicitar, name: "Solicitar adopción", isPublic: true },
      { path: RoutesPaths.adopcionVersolicutud, name: "Ver Solicitudes", isPublic: true },
      { path: RoutesPaths.adopcionEvaluar, name: "Evaluar Solicitudes", isPublic: true },
      { path: RoutesPaths.adopcionAprobarRechazar, name: "Aprobar/Rechazar", isPublic: true },
      { path: RoutesPaths.adopcionExportar, name: "Exportar Solicitudes", isPublic: true },
    ],
  },

  { path: RoutesPaths.caracteristicasVer, name: "Caracteristicas", isPublic: true, icon: Home,
    subItems: [
      { path: RoutesPaths.caracteristicasVer, name: "Ver caracteristicas", isPublic: true },
      { path: RoutesPaths.caracteristicasUpdate, name: "Actualizar caracteristicas", isPublic: true },
    ],
  },
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
