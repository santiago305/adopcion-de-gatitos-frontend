import { RoutesPaths } from "@/router/config/routesPaths";
import { Link } from "react-router-dom";

const links = [
  { to: RoutesPaths.about, label: "Nosotros" },
  { to: "/animales", label: "Animales" },
  { to: RoutesPaths.contact, label: "Contacto" },
];

export default function HeaderNav() {
  return (
    <nav className="flex gap-8">
      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className="text-gray-800 dark:text-gray-200 hover:text-primary transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
