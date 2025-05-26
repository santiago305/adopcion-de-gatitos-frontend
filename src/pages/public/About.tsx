import Paragraph from "@/components/about/Paragraph";
import { parrafos } from "@/components/about/TextAbout";
import HeaderDIV from "@/components/header/HeaderDIV";
import SidebarSticky from "@/components/SidebarSticky";
import { useParagraphPositions } from "@/hooks/useParagraphPositions";

export default function About() {
  const { refs, positions } = useParagraphPositions(parrafos.length);

  return (
    <div className="relative flex min-h-screen">
      <SidebarSticky className="lg:flex hidden" imageSrc="/assets/perritoabout.png" imageAlt="Perrito" />

      <div className="relative w-full lg:w-3/5 p-10 z-20 flex flex-col">
        <HeaderDIV />
        <div className="flex flex-col m-auto max-w-[600px]">
          <h1 className="text-5xl font-cindie-L mb-4">Sobre Nosotros</h1>
          {parrafos.map((text, i) => (
            <Paragraph
              key={i}
              ref={refs[i].ref}
              position={positions[i]}
            >
              {text}
            </Paragraph>
          ))}
        </div>
      </div>

      <SidebarSticky className="lg:flex hidden" imageSrc="/assets/gatitoabout.png" imageAlt="Gatito" />
    </div>
  );
}
