import HeaderDIV from "@/components/header/HeaderDIV"
import HeroMessage from "@/components/HeroMessage"
import SmartButton from "@/components/SmartButton"
import { RoutesPaths } from "@/router/config/routesPaths"
import { motion } from 'framer-motion';

export default function IndexHome() {
  return (
    <div
    className="w-full h-screen bg-cover bg-center flex flex-col"
    style={{ backgroundImage: "url('/assets/fondohome.webp')" }}
    >
      <HeaderDIV />
      <div
      className="h-full w-full max-w-[1200px] m-auto flex flex-col items-center justify-between py-15"
      >
        <HeroMessage
        title="TU MEJOR AMIGO TE ESTA ESPERANDO"
        description="Descubre cientos de animales que sueñan con un hogar lleno de amor. Adopta, cambia una vida… y deja que la tuya también se llene de alegría."
        className="text-center items-center"
        />
        
        <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          <SmartButton
          className="bg-[#b3b3b3]"
          text="Adopta un amigo"
          to={RoutesPaths.animals}
          />
        </motion.div>
      </div>
    </div>
  )
}