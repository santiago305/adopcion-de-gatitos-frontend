import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { PropsUrl } from "@/guards/typeGuards";

/**
 * Protege rutas específicas para usuarios que aún no han registrado un cliente.
 * 
 * @returns {ReactElement} Componente protegido o redirecciones correspondientes.
 */
const RequireClientRegister = ({ children }: PropsUrl) => {
  const { isAuthenticated, userRole, hasClient, loading } = useAuth();

  if (loading) return <div className="text-center p-4">Cargando...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  // if (userRole === "user") {
  //   if (!hasClient) return <Navigate to="/clients-register" replace />; // Si ya tiene cliente, no puede acceder
  // }

  return children;
};

export default RequireClientRegister;
