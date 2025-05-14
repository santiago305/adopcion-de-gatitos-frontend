import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

import { PropsUrl } from "@/guards/typeGuards";

/**
 * Protege las rutas que requieren autenticación.
 * 
 * @param {ReactElement} children - Componente a renderizar si está autenticado.
 * @returns {ReactElement} El componente protegido o redirección al login.
 */
const PrivateRoute = ({ children }: PropsUrl) => {
  const { isAuthenticated, loading,  } = useAuth();

  if (loading) return <div>Cargando...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
};

export default PrivateRoute;
