import LogoFooter from "./LogoFooter";
import FooterNavSection from "./FooterNavSection";
import { LinksNav1, LinksNetworks } from "./LinksFooter";
import FooterNavNetworks from "./FooterNavNetworks";

export default function Footer() {
  return (
    <footer className="w-full bg-secondary">
      <div className="max-w-[1200px] h-auto m-auto p-10 flex justify-between flex-col md:flex-row gap-10">
        <LogoFooter />
        <FooterNavSection title="Contáctanos" links={LinksNav1}/>
        <FooterNavNetworks title="Redes" links={LinksNetworks} />
      </div>
    </footer>
  );
}
