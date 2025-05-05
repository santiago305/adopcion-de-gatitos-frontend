import { FlashMessage } from "./flashMessage";
import { useFlashMessage } from "@/context/FlashMessageContext";

export const FlashMessageRoot = () => {
  const { flash, clearFlash } = useFlashMessage();

  return flash ? <FlashMessage data={flash} onClear={clearFlash} /> : null;
};
