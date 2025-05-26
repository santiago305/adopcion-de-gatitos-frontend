import Paragraph from "@/components/about/Paragraph";
import { parrafos } from "@/components/about/TextAbout";
import HeaderDIV from "@/components/header/HeaderDIV";
import SidebarSticky from "@/components/SidebarSticky";

export default function About() {
  return (
    <div className="relative flex min-h-screen">
      <SidebarSticky imageSrc="/assets/perritoabout.png" imageAlt="Perrito" />

      <div className="relative w-3/5 p-4 z-20 flex flex-col">
        <HeaderDIV />
        <div className="flex flex-col m-auto max-w-[600px]">
          <h1 className="text-5xl font-cindie-L mb-4">Sobre Nosotros</h1>
          {parrafos.map((texto, idx) => (
            <Paragraph key={idx}>{texto}</Paragraph>
          ))}
        </div>
      </div>

      <SidebarSticky imageSrc="/assets/gatitoabout.png" imageAlt="Gatito" />
    </div>
  );
}
