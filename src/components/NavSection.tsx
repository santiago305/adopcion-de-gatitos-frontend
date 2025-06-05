import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { useAuth } from "@/hooks/useAuth";
import { RouteMetadata } from "@/Router/types/RouterTypes";
import { ChevronDown, ChevronRight } from "lucide-react";

interface NavSectionProps {
  links: RouteMetadata[];
}

export default function NavSection({ links }: NavSectionProps) {
  const { userRole } = useAuth();
  const location = useLocation();
  const [openItem, setOpenItem] = React.useState<string | null>(null);

  const toggleOpen = (path: string) => {
    setOpenItem((prev) => (prev === path ? null : path));
  };

  // Sincronizar el estado del menú con la ruta actual
  React.useEffect(() => {
    const currentMainRoute = links.find((link) =>
      link.subItems?.some((subItem) => subItem.path === location.pathname)
    );
    if (currentMainRoute) {
      setOpenItem(currentMainRoute.path);
    } else {
      setOpenItem(null);
    }
  }, [location.pathname, links]);

  return (
    <nav className="flex flex-col gap-4">
      {links
        .filter((link) => !link.roles || link.roles.includes(userRole || ""))
        .map((link) => (
          <div key={link.path}>
            {link.subItems ? (
              <>
                <button
                  onClick={() => toggleOpen(link.path)}
                  className={clsx(
                    "flex items-center justify-between w-full px-4 py-2 rounded transition-colors",
                    location.pathname.startsWith(link.path) && "bg-gray-100 text-primary"
                  )}
                >
                  <div className="flex items-center gap-2">
                    {link.icon && <link.icon className="w-5 h-5" />}
                    <span>{link.name}</span>
                  </div>
                  {openItem === link.path ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
                {openItem === link.path && (
                  <div className="flex flex-col gap-2 mt-2 pl-6">
                    {link.subItems
                      .filter((subItem) => !subItem.roles || subItem.roles.includes(userRole || ""))
                      .map((subItem) => (
                        <Link
                          key={subItem.path}
                          to={subItem.path}
                          className={clsx(
                            "flex items-center gap-2 px-4 py-2 rounded transition-colors",
                            location.pathname === subItem.path && "bg-gray-100 text-primary"
                          )}
                        >
                          <span>{subItem.name}</span>
                        </Link>
                      ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                to={link.path}
                className={clsx(
                  "flex items-center gap-2 px-4 py-2 rounded transition-colors",
                  location.pathname === link.path && "bg-gray-100 text-primary"
                )}
              >
                {link.icon && <link.icon className="w-5 h-5" />}
                <span>{link.name}</span>
              </Link>
            )}
          </div>
        ))}
    </nav>
  );
}