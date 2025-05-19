import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { RoutesPaths } from "@/router/config/routesPaths";
import { useEffect, useRef } from "react";

const links = [
  { to: RoutesPaths.about, label: "Nosotros" },
  { to: "/animales", label: "Animales" },
  { to: RoutesPaths.contact, label: "Contacto" },
];

interface Props {
  isOpen: boolean;
  close: () => void;
}

export default function MobileMenu({ isOpen, close }: Props) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const isClickOnMenu = menuRef.current?.contains(target);
      const isClickOnButton = target.closest("#mobile-menu-button"); // Identificador para el botón

      if (!isClickOnMenu && !isClickOnButton) {
        close();
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleClickOutside, true); // Fase de captura
    } else {
      document.removeEventListener("click", handleClickOutside, true);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [isOpen, close]);

  return (
    <motion.div
      ref={menuRef}
      initial={{ x: '-100%' }}
      animate={{ x: isOpen ? '0%' : '-100%' }}
      transition={{ duration: 0.3 }}
      className="fixed top-20 left-0 bg-white/70 backdrop-blur-md shadow-md p-8 z-40 rounded-r-2xl md:hidden 
                 flex flex-col gap-6 max-w-[80%]"
    >
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          onClick={close}
          className="text-lg text-gray-800 hover:text-primary transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </motion.div>
  );
}
