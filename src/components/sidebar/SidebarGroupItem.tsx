import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { RouteMetadata } from "@/Router/types/RouterTypes";

export default function SidebarGroupItem({ item }: { item: RouteMetadata }) {
  const location = useLocation();
  const active = location.pathname === item.path;

  return (
    <Link
      to={item.path}
      className={clsx(
        "flex items-center gap-2 px-4 py-2 text-sm rounded hover:bg-gray-100 transition-colors",
        active && "bg-gray-100 text-primary"
      )}
    >
      {item.name}
    </Link>
  );
}
