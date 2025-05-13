import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { PropsUrl } from "@/guards/typeGuards";

/**
 * Redirige a la página principal si el usuario ya está autenticado.
 * 
 * @param {ReactElement} children - Componente a renderizar si NO está autenticado.
 * @returns {ReactElement} El componente o redirección a la home.
 */
const RedirectIfAuth = ({ children }: PropsUrl) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return <Navigate to="/" replace />;
  return children;
};

export default RedirectIfAuth;
