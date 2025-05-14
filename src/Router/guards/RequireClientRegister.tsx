import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { PropsUrl } from "@/guards/typeGuards";
import { RoleType } from "@/types/role";
import { RoutesPaths } from "../config/routesPaths";

/**
 * Protege rutas específicas para usuarios que aún no han registrado un cliente.
 * 
 * @returns {ReactElement} Componente protegido o redirecciones correspondientes.
 */
const RequireClientRegister = ({ children }: PropsUrl) => {
  const { isAuthenticated, userRole, hasClient, loading } = useAuth();

  if (loading) return <div className="text-center p-4">guard de clients register...</div>;
  if (!isAuthenticated) return <Navigate to={RoutesPaths.login} replace />;
  if (userRole !== RoleType.USER) return <Navigate to={RoutesPaths.home} replace />;
  if (userRole === RoleType.USER) {
    if (hasClient) return <Navigate to={RoutesPaths.home} replace />
  }

  return children;
};

export default RequireClientRegister;
