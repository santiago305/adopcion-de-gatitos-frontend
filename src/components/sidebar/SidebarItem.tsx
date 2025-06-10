import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { RouteMetadata } from "@/Router/types/RouterTypes";

export default function SidebarItem({
  link,
  open,
}: {
  link: RouteMetadata;
  open: boolean;
}) {
  const location = useLocation();
  const active = location.pathname === link.path;

  return (
    <Link
      to={link.path}
      className={clsx(
        "flex items-center gap-3 px-4 py-2 rounded hover:bg-gray-100 transition-colors",
        active && "bg-gray-100 text-primary"
      )}
    >
      {link.icon && <link.icon className="w-5 h-5" />}
      {open && <span>{link.name}</span>}
    </Link>
  );
}
