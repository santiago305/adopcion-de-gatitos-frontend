// components/sidebar/SidebarFooter.tsx
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCog, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { RoutesPaths } from "@/router/config/routesPaths";

export default function SidebarFooter({ open }: { open: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();

  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="absolute bottom-0 w-full px-2 py-3 border-t border-gray-200" ref={menuRef}>
      {/* Usuario */}
      <div
        onClick={() => setMenuOpen((prev) => !prev)}
        className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition"
      >
        <img
          src="https://i.pravatar.cc/40?img=68"
          alt="Avatar"
          className="w-10 h-10 rounded-lg object-cover"
        />
        {open && (
          <div className="text-left">
            <div className="text-sm font-medium text-gray-900">
              {user ? `${user.name}` : "Usuario"}
            </div>
            <div className="text-xs text-gray-500">{user ? `${user.rol}` : "cliente"}</div>
          </div>
        )}
      </div>

      {/* Menú hacia arriba */}
      <AnimatePresence>
        {menuOpen && open && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full mb-2 w-full bg-white rounded-md shadow-lg z-50"
          >
            <div className="py-1 text-sm">
              <button className="flex w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition">
                <FontAwesomeIcon icon={faUser} className="mr-4" />
                <Link to={RoutesPaths.Profile} className="w-full flex justify-start">
                  Ver perfil
                </Link>
              </button>
              <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition">
                <FontAwesomeIcon icon={faCog} className="mr-4" />
                <Link to={RoutesPaths.Settings} className="w-full flex justify-start">
                  Configuración
                </Link>
              </button>
              <button
                onClick={logout}
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-4" />
                Cerrar sesión
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
