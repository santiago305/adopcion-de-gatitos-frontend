import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import { RouteMetadata } from "@/types/RouterTypes";
import SidebarGroupItem from "./SidebarGroupItem";

export default function SidebarGroup({
  link,
  open,
}: {
  link: RouteMetadata;
  open: boolean;
}) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [menuTop, setMenuTop] = useState(0);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isActive = link.subItems?.some(
      (item) => item.path === location.pathname
    );
    if (isActive) setIsOpen(true);
  }, [location.pathname]);

  // Cerrar si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!open && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Calcular posición para menú flotante
  useEffect(() => {
    if (!open && isOpen && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const estimatedHeight = (link.subItems?.length || 1) * 40 + 16; // altura aprox. + padding

      let top = triggerRect.top + triggerRect.height / 2 - estimatedHeight / 2;
      if (top < 8) top = 8; // evitar que sobresalga arriba
      if (top + estimatedHeight > viewportHeight - 8) {
        top = viewportHeight - estimatedHeight - 8; // evitar que sobresalga abajo
      }

      setMenuTop(top);
    }
  }, [isOpen, open, link.subItems?.length]);

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          "flex justify-between items-center w-full px-4 py-2 rounded hover:bg-gray-100 transition-colors",
          location.pathname.startsWith(link.path) && "bg-gray-100 text-primary"
        )}
      >
        <div className="flex items-center gap-2">
          {link.icon && <link.icon className="w-5 h-5" />}
          {open && <span>{link.name}</span>}
        </div>
        {open &&
          (isOpen ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          ))}
      </button>

      {/* Subitems normales (modo abierto) */}
      {isOpen && open && (
        <div className="mt-1 ml-6 flex flex-col gap-1">
          {link.subItems?.map((subItem) => (
            <SidebarGroupItem key={subItem.path} item={subItem} />
          ))}
        </div>
      )}

      {/* Subitems flotantes (modo cerrado) */}
      <AnimatePresence>
        {isOpen && !open && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, x: 10, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            style={{ top: menuTop }}
            className="fixed left-20 z-50 w-48 bg-white rounded-md shadow-xl"
          >
            <div className="py-2 text-sm">
              {link.subItems?.map((subItem) => (
                <SidebarGroupItem key={subItem.path} item={subItem} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
