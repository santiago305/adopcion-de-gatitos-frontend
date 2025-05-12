import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useCheckExistingClient } from "@/hooks/useCheckClientsExisting";


const RequireClientRegister = () => {
  const { isAuthenticated, userRole } = useAuth();
  const { isClient, loading } = useCheckExistingClient();

  if (loading) return <div className="text-center p-4">Cargando...</div>;


  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (userRole !== "user") return <Navigate to="/" replace />;


  if (isClient) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default RequireClientRegister;
