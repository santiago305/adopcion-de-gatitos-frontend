import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useCheckExistingClient } from "@/hooks/useCheckClientsExisting";


const AfterLoginRedirect = () => {
  const { isAuthenticated, userRole } = useAuth();
  const { isClient, loading } = useCheckExistingClient();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || loading) return;

    if (userRole === "user") {
      if (isClient === false) {
        navigate("/clientsregister", { replace: true });
      } else if (isClient === true) {
        navigate("/", { replace: true });
      }
    } else {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, userRole, isClient, loading, navigate]);

  return null; 
};

export default AfterLoginRedirect;
