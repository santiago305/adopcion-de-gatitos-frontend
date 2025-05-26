import { Link } from "react-router-dom";

type FooterNavLink = {
  icon?: React.ReactNode;
  label: string;
  to: string;
  external?: boolean; // si es externo, usa <a>
};

interface FooterNavSectionProps {
  title: string;
  links: FooterNavLink[];
}

export default function FooterNavSection({ title, links }: FooterNavSectionProps) {
  return (
    <div
    className="md:flex flex-col hidden"
    >
      <h5 className="mb-4 font-montserrat font-bold text-lg text-center text-primary">{title}</h5>
      <ul className="space-y-2">
        {links.map(({ icon, label, to, external }, index) => (
          <li key={index}>
            {external ? (
              <a
                href={to}
                className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {icon && <span>{icon}</span>}
                {label}
              </a>
            ) : (
              <Link
                to={to}
                className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
              >
                {icon && <span>{icon}</span>}
                {label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
