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
  about: "about",
  contact: "contact",
  animals: "/animals",

  // 🔐 Rutas de autenticación
  login: "/login",
  register: "/register",
  clientsRegister: "/clients-register",

  // 📊 Rutas de Dashboard
  dashboard: "/dashboard",


  // 🐾 Rutas de Animales
  dashboardAnimals: "/dashboard/animals",

  // rutas de enermedadess
  dashboardDiseases: '/dashboard/diseases',

  // rutas de especies
  dashboardSpecies: '/dashboard/species',

  // rutas de razas
  dashboardBreed: '/dashboard/Breed',

  //ruta de personalidad
  dashboardPersonality: '/dashboard/personality',

  //ruta de caracteristicas
  dashboardCharacteristics: '/dashboard/characteristics',

  // // 🐶 Rutas de Adopción
  // adopcionList: "/dashboard/adopcion",
  // adopcionSolicitar: "/dashboard/adopcion/solicitar",
  // adopcionVersolicutud: "/dashboard/adopcion/ver-solicitud/:id", // :id for dynamic request ID
  // adopcionEvaluar: "/dashboard/adopcion/evaluar/:id", // :id for dynamic request ID
  // adopcionAprobarRechazar: "/dashboard/adopcion/aprobar-rechazar/:id", // :id for dynamic request ID
  // adopcionExportar: "/dashboard/adopcion/exportar",

  // // 👤 Rutas de Usuarios (solo para admin)
  // usersList: "/dashboard/users/list",
  // usersRegister: "/dashboard/users/register",

  // ⚙️ Rutas de Configuración
  dashboardManagement: "/dashboard/Management",
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
