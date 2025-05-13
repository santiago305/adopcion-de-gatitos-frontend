import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const RequireClientRegister = () => {
  const { isAuthenticated, userRole, hasClient, loading } = useAuth();

  if (loading || hasClient === null) {
    return <div className="text-center p-4">Cargando...</div>;
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (userRole !== "user") return <Navigate to="/" replace />;
  if (hasClient) return <Navigate to="/" replace />; // Bloquea si ya tiene cliente

  return <Outlet />;
};

export default RequireClientRegister;
