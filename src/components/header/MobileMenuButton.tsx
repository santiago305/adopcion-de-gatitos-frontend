import { motion } from "framer-motion";

interface Props {
  isOpen: boolean;
  toggle: () => void;
}

export default function MobileMenuButton({ isOpen, toggle }: Props) {
  return (
    <button
      id="mobile-menu-button" // <-- Esto es la clave para identificarlo
      onClick={toggle}
      className="relative w-8 h-8 flex flex-col justify-center items-start gap-1 z-50"
    >
      {/* Líneas */}
      <motion.span
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 8 : 0,
          width: isOpen ? '100%' : '50%',
        }}
        transition={{ duration: 0.3 }}
        className="block h-1 bg-gray-800 dark:bg-gray-200 rounded-full"
        style={{ width: '50%' }}
      />
      <motion.span
        animate={{ opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className="block h-1 bg-gray-800 dark:bg-gray-200 rounded-full w-3/4"
      />
      <motion.span
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? -8 : 0,
          width: isOpen ? '100%' : '100%',
        }}
        transition={{ duration: 0.3 }}
        className="block h-1 bg-gray-800 dark:bg-gray-200 rounded-full w-full"
      />
    </button>
  );
}
