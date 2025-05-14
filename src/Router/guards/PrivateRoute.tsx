import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

import { PropsUrl } from "@/guards/typeGuards";
import { RoleType } from "@/types/role";
import { RoutesPaths } from "../config/routesPaths";

/**
 * Protege las rutas que requieren autenticación.
 * 
 * @param {ReactElement} children - Componente a renderizar si está autenticado.
 * @returns {ReactElement} El componente protegido o redirección al login.
 */
const PrivateRoute = ({ children }: PropsUrl) => {
  const { isAuthenticated, loading, userRole, hasClient } = useAuth();

  if (loading) return <div>Cargando enviando a Dashboard...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (userRole === RoleType.USER){
    if (!hasClient) return <Navigate to={RoutesPaths.home}/>
  }

  return children;
};

export default PrivateRoute;
