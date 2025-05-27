import Paragraph from "@/components/about/Paragraph";
import { parrafos } from "@/components/about/TextAbout";
import HeaderDIV from "@/components/header/HeaderDIV";
import SidebarSticky from "@/components/SidebarSticky";
import { useParagraphPositions } from "@/hooks/useParagraphPositions";
import { motion } from 'framer-motion';

export default function About() {
  const { refs, positions } = useParagraphPositions(parrafos.length);

  return (
    <div className="relative flex min-h-screen">
      <SidebarSticky className="lg:flex hidden" imageSrc="/assets/perritoabout.png" imageAlt="Perrito" />

      <div className="relative w-full lg:w-3/5 p-10 z-20 flex flex-col">
        <HeaderDIV />
        <div className="flex flex-col m-auto max-w-[600px]">
          <motion.h1 
          className="text-4xl md:text-5xl font-cindie-L mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          >
            Sobre Nosotros
          </motion.h1>
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
