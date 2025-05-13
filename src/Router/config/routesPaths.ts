/**
 * Rutas de la aplicación centralizadas y tipadas.
 */
export const RoutesPaths = {
  home: "/",
  about: "/about",
  contact: "/contact",
  products: "/products",
  productShow: (productId: string) => `/products/${productId}`,

  // auth Routes
  login: "/login",
  register: "/register",
  clientsRegister: "/clientsregister",
  
  // Dashboard Routes
  dashboard: "/dashboard",
  dashboardProducts: "/dashboard/products",
  dashboardProductShow: (id: string) => `/dashboard/products/${id}`,
  dashboardProfile: "/dashboard/profile",
  dashboardSettings: "/dashboard/settings",
} as const;

/**
 * Tipos de rutas disponibles.
 */
export type RouteName = keyof typeof RoutesPaths;
