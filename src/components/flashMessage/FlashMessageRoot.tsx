import { useEffect } from "react";
import { FlashMessage } from "./flashMessage";
import { useFlashMessage } from "@/context/FlashMessageContext";

export const FlashMessageRoot = () => {
  const { flash, clearFlash } = useFlashMessage();
   const location = useLocation();

  useEffect(() => {
    if (location.state?.flashMessage) {
      showFlash(location.state.flashMessage);
      // ✅ Limpiamos el mensaje de la ubicación actual para evitar que se repita al recargar
      window.history.replaceState({}, document.title);
    }
  }, [location, showFlash]);

  return flash ? <FlashMessage data={flash} onClear={clearFlash} /> : null;
};
