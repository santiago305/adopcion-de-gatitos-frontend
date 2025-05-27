import HeaderDIV from "@/components/header/HeaderDIV";
import HeroMessage from "@/components/HeroMessage";
import SmartButton from "@/components/SmartButton";
import { RoutesPaths } from "@/router/config/routesPaths";
import { motion } from 'framer-motion';

export default function IndexAnimals() {
  return (
    <div
      className="w-full h-screen flex flex-col relative"
      >
         <video
          className="absolute top-0 left-0 w-full h-full object-cover -z-10"
          src="/assets/fondoAnimals.webm"
          autoPlay
          loop
          muted
          playsInline
        />
        <HeaderDIV />
        <div
        className="h-full w-full max-w-[1200px] m-auto flex flex-col items-center justify-between py-15 relative"
        >
          <HeroMessage
          title="CONOCE A QUIEN ESPERA POR TI"
          description="Estos adorables compañeros están listos para llenar tu vida de amor, alegría y lealtad. Cada uno tiene una historia, pero todos comparten el mismo sueño: encontrar un hogar donde puedan ser amados para siempre. ¡Haz clic en sus fotos y enamórate!"
          className="text-center items-center"
          />
          
          <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <SmartButton
            className="bg-[#b3b3b3]"
            text="Conoce mas sobre nosotros"
            to={RoutesPaths.about}
            />
          </motion.div>
        </div>
      </div>
  )
}