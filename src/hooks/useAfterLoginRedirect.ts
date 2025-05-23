import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { infoResponse, successResponse } from "@/common/utils/response";

export const useAfterLoginRedirect = () => {
  const { isAuthenticated, userRole, hasClient, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || loading) return;
    const msg = successResponse("Inicio de sesión exitoso");
    console.log("Mensaje a enviar:", msg);
    if (userRole === "user") {
      if (hasClient === false) {
        navigate("/clientsregister", { replace: true, state: { flashMessage: infoResponse("Completa tu registro de cliente.") } });
      } else {
        navigate("/", { replace: true, state: { flashMessage: successResponse("Inicio de sesión exitoso") } });
      }
    } else {
      navigate("/", { replace: true, state: { flashMessage: successResponse("Inicio de sesión exitoso") } });
    }
  }, [isAuthenticated, userRole, hasClient, loading, navigate]);
};
