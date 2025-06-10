// components/sidebar/SidebarGroup.tsx
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import clsx from "clsx";
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

  useEffect(() => {
    const isActive = link.subItems?.some(
      (item) => item.path === location.pathname
    );
    if (isActive) setIsOpen(true);
  }, [location.pathname]);

  return (
    <div>
      <button
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
      {isOpen && open && (
        <div className="mt-1 ml-6 flex flex-col gap-1">
          {link.subItems?.map((subItem) => (
            <SidebarGroupItem key={subItem.path} item={subItem} />
          ))}
        </div>
      )}
    </div>
  );
}
