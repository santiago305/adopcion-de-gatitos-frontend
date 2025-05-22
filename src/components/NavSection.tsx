import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { useAuth } from "@/hooks/useAuth";
import { RouteMetadata } from "@/Router/types/RouterTypes";

interface NavSectionProps {
  links: RouteMetadata[];
}

export default function NavSection({ links }: NavSectionProps) {
  const { userRole } = useAuth();
  const location = useLocation();

  return (
    <nav className="flex flex-col gap-4">
      {links
        .filter(link => !link.roles || link.roles.includes(userRole || ""))
        .map(link => (
          <Link
            key={link.path}
            to={link.path}
            className={clsx(
              "flex items-center gap-2 px-4 py-2 rounded hover:bg-gray-700 transition-colors",
              location.pathname === link.path && "bg-gray-700 text-primary"
            )}
          >
            {link.icon && <link.icon className="w-5 h-5" />}
            <span>{link.name}</span>
          </Link>
        ))}
    </nav>
  );
}
