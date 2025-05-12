import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const AfterLoginRedirect = () => {
  const { isAuthenticated, userRole, hasClient, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || loading) return;

    if (userRole === "user") {
      if (hasClient === false) {
        navigate("/clientsregister", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } else {
      navigate("/", { replace: true }); 
    }
  }, [isAuthenticated, userRole, hasClient, loading, navigate]);

  return null;
};

export default AfterLoginRedirect;

