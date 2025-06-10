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
    <div
      className="absolute bottom-0 w-full px-2 py-3 border-t border-gray-200"
      ref={menuRef}
    >
      {/* Usuario */}
      <div
        onClick={() => setMenuOpen((prev) => !prev)}
        className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-gray-100 transition"
      >
        <img
          src={`https://ui-avatars.com/api/?name=${user?.name || "U"}&background=random`}
          alt="Avatar"
          className="w-10 h-10 rounded-lg object-cover"
        />
        {open && (
          <div className="text-left">
            <div className="text-sm font-medium text-gray-900">
              {user?.name || "Usuario"}
            </div>
            <div className="text-xs text-gray-500 capitalize">{user?.rol || "rol desconocido"}</div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5, x: open ? 0 : 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, x: open ? 0 : 10, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className={`z-50 ${
              open
                ? "absolute bottom-full mb-2 w-full bg-white rounded-md shadow-lg"
                : "absolute left-full bottom-3 ml-2 w-48 bg-white rounded-md shadow-xl"
            }`}
          >
            <div className="py-1 text-sm">
              <Link
                to={RoutesPaths.Profile}
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
              >
                <FontAwesomeIcon icon={faUser} className="mr-3" />
                Ver perfil
              </Link>
              <Link
                to={RoutesPaths.Settings}
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
              >
                <FontAwesomeIcon icon={faCog} className="mr-3" />
                Configuración
              </Link>
              <button
                onClick={logout}
                className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />
                Cerrar sesión
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
