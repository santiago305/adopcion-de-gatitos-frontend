// components/flashMessage/FlashMessage.tsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Message from "./Message";
import { FlashMessageType } from "./FlashTypes";
import { flashTypes } from "./Types";

interface FlashMessageProps {
  data: FlashMessageType | null;
  onClear: () => void;
}

export const FlashMessage = ({ data, onClear }: FlashMessageProps) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (data) {
      setVisible(true);
      const timeout = setTimeout(() => setVisible(false), 3000);
      return () => clearTimeout(timeout);
    }
  }, [data]);

  return (
    <AnimatePresence>
      {visible && data && (
        <motion.div
          key="flash"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          onAnimationComplete={(def) => def === "exit" && onClear()}
          className="fixed inset-0 h-screen w-full pointer-events-none select-none overflow-hidden z-50"
        >
          <div className="h-full w-full relative">
            <div
            className="absolute bottom-0 right-0 p-4 z-50"
            >
              <Message
                type={flashTypes[data.message.type].title}
                text={data.message.text}
                icon={flashTypes[data.message.type].icon}
                color={flashTypes[data.message.type].color}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};