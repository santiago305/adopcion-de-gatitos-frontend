/**
 * Definición centralizada y tipada de las rutas de la aplicación.
 * 
 * - Evita el uso de strings "mágicos" al definir rutas.
 * - Permite realizar cambios de rutas en un solo lugar.
 * - Proporciona autocompletado y seguridad de tipos en todo el proyecto.
 * - Facilita el manejo de rutas con parámetros a través de funciones.
 * 
 * @example
 * import { RoutesPaths } from "@/routes/config/routesPaths";
 * 
 * // Uso en navegación o Links:
 * navigate(RoutesPaths.dashboard);
 * navigate(RoutesPaths.dashboardProductShow("123"));
 */

export const RoutesPaths = {
  // 📖 Rutas públicas
  home: "/",
  about: "/about",
  contact: "/contact",

  // 🔐 Rutas de autenticación
  login: "/login",
  register: "/register",
  clientsRegister: "/clients-register",

  // 📊 Rutas de Dashboard
  dashboard: "/dashboard",
  dashboardProfile: "/dashboard/profile",
  dashboardSettings: "/dashboard/settings",
} as const;

/**
 * Tipo que representa los nombres válidos de rutas.
 * 
 * @example
 * const routeName: RouteName = "dashboard";
 */
export type RouteName = keyof typeof RoutesPaths;
