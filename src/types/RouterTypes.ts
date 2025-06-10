import { LucideIcon } from "lucide-react";

/**
 * Metadata de las rutas de la aplicación para control de navegación y permisos.
 */
export interface RouteMetadata {
  path: string;                      // URL de la ruta
  name: string;                      // Nombre legible de la ruta
  icon?: LucideIcon;                 // Icono asociado a la ruta (de lucide-react)
  isPublic?: boolean;                // Ruta pública accesible sin autenticación
  isAuthRoute?: boolean;             // Ruta de login o registro
  isProtected?: boolean;             // Ruta protegida (requiere autenticación)
  requiresClientRegister?: boolean;  // Ruta para usuarios que no han completado su registro de cliente
  roles?: string[];                  // Roles permitidos para acceder (admin, moderator, user, etc.)
  showInNavigation?: boolean;        // Controla si se debe mostrar en la UI
  subItems?: Omit<RouteMetadata, "icon" | "subItems">[];
}
