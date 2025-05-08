import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFlashMessage } from "@/context/FlashMessageContext";
import { FlashMessageType } from "@/components/flashMessage/FlashTypes";

export function useLocationFlashMessage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { showFlash } = useFlashMessage();

  useEffect(() => {
    const state = location.state as { flashMessage?: FlashMessageType };

    if (state?.flashMessage) {
      showFlash(state.flashMessage);

      // Limpia el flashMessage del state después de mostrarlo
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, location.pathname, showFlash, navigate]);
}
