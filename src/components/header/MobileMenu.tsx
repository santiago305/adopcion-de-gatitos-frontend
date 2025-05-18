import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { RoutesPaths } from "@/router/config/routesPaths";

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
  return (
    <motion.div
      initial={{ x: '-100%' }}
      animate={{ x: isOpen ? '0%' : '-100%' }}
      transition={{ duration: 0.3 }}
      className="fixed top-20 left-0 bg-blue-500 shadow-md p-8 z-40 rounded-r-2xl md:hidden 
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
