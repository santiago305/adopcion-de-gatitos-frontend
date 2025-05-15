import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FlashMessageType } from "@/components/flashMessage/FlashTypes";
import { useFlashMessage } from "./useFlashMessage";

/**
 * Hook para mostrar mensajes flash al navegar entre rutas.
 * 
 * Permite enviar mensajes flash mediante `location.state` 
 * y mostrarlos automáticamente al cargar la nueva página.
 */
export function useLocationFlashMessage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { showFlash } = useFlashMessage();

  useEffect(() => {
    const state = location.state as { flashMessage?: FlashMessageType };
    console.log("Location state", location.state, " y ", state);
    if (state?.flashMessage) {
      showFlash(state.flashMessage);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, location.pathname, showFlash, navigate]);
}
