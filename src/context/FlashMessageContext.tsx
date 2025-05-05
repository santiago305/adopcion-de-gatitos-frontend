import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { FlashMessageType } from "@/components/flashMessage/FlashTypes";

interface FlashMessageContextProps {
  flash: FlashMessageType | null;
  showFlash: (msg: FlashMessageType) => void;
  clearFlash: () => void;
}

const FlashMessageContext = createContext<FlashMessageContextProps | undefined>(undefined);

export const FlashMessageProvider = ({ children }: { children: ReactNode }) => {
  const [flash, setFlash] = useState<FlashMessageType | null>(null);

  const showFlash = useCallback((msg: FlashMessageType) => setFlash(msg), []);
  const clearFlash = useCallback(() => setFlash(null), []);

  return (
    <FlashMessageContext.Provider value={{ flash, showFlash, clearFlash }}>
      {children}
    </FlashMessageContext.Provider>
  );
};

export const useFlashMessage = () => {
  const context = useContext(FlashMessageContext);
  if (!context) throw new Error("useFlashMessage must be used within FlashMessageProvider");
  return context;
};
