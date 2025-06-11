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
      {/* Fondo oscuro y semi-transparente con opacidad del 50% */}
      <div
        className="fixed inset-0 bg-black/50 z-10"
        onClick={handleClickOutside} // Cierra el sidebar cuando se hace clic en el fondo
      />
      
      {/* Sidebar con animación de entrada */}
      <motion.div
        className={`fixed ${side === "right" ? "right-0" : "left-0"} top-0 h-full bg-white w-1/3 shadow-lg z-20`}
        initial={{ x: side === "right" ? "100%" : "-100%" }} // Inicia fuera de la pantalla
        animate={{ x: 0 }} // Se anima hacia su posición final
        exit={{ x: side === "right" ? "100%" : "-100%" }} // Anima fuera de la pantalla cuando se cierra
        transition={{ type: "spring", stiffness: 300, damping: 30 }} // Transición de la animación
      >
        {/* Área de cierre del sidebar */}
        <div
          className="p-4 flex justify-end cursor-pointer"
          onClick={onClose} // Cierra el sidebar al hacer clic en el área
        >
          <FiX size={24} className="text-gray-600 hover:text-gray-900" /> {/* Ícono de cierre */}
        </div>
        {/* El formulario ocupará todo el espacio disponible */}
        <div className="px-4 py-8 h-full overflow-auto">
          {children}
        </div>
      </motion.div>
    </>
  );
}
