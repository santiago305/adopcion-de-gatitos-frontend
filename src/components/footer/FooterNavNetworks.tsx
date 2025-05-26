type FooterNavLink = {
  icon?: React.ReactNode;
  to: string;
};

interface FooterNavSectionProps {
  title: string;
  links: FooterNavLink[];
}

export default function FooterNavNetworks({ title, links }: FooterNavSectionProps) {
  return (
    <div className="flex flex-col items-center">
      <h5 className="mb-4 font-montserrat font-bold text-lg text-center text-primary">{title}</h5>
      <ul className="space-y-2 flex gap-5">
        {links.map(({ icon, to}, index) => (
          <li key={index}>
            <a
              href={to}
              className="flex items-center gap-2 text-4xl text-foreground hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {icon}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
