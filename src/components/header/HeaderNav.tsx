import { Link } from "react-router-dom";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/about", label: "Nosotros" },
  { to: "/services", label: "Servicios" },
  { to: "/contact", label: "Contacto" },
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
