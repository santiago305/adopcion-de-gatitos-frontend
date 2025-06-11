// SidebarForm.tsx
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi"; // Usamos el ícono de cierre

interface SidebarFormProps {
  children: ReactNode;
  onClose: () => void;
  side: "left" | "right";
}

export default function SidebarForm({ children, onClose, side }: SidebarFormProps) {
  const handleClickOutside = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-10"
        onClick={handleClickOutside} 
      />
      <motion.div
        className={`fixed ${side === "right" ? "right-0" : "left-0"} top-0 h-full bg-white w-1/3 shadow-lg z-20`}
        initial={{ x: side === "right" ? "100%" : "-100%" }} 
        animate={{ x: 0 }} 
        exit={{ x: side === "right" ? "100%" : "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }} 
      >
        <div
          className="p-4 flex justify-end cursor-pointer"
          onClick={onClose} 
        >
          <FiX size={24} className="text-gray-600 hover:text-gray-900" /> 
        </div>
        <div className="px-4 py-8 h-full overflow-auto">
          {children}
        </div>
      </motion.div>
    </>
  );
}
