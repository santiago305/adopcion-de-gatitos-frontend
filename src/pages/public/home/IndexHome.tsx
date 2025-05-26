import HeaderDIV from "@/components/header/HeaderDIV"
import HeroMessage from "@/components/HeroMessage"

export default function IndexHome() {
  return (
    <div
    className="w-full h-screen bg-cover bg-center bg-amber-300 flex flex-col"
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

        <button 
        type="button"
        className="px-4 py-2 rounded-full border border-black font-montserrat bg-[#b3b3b3] select-none cursor-pointer"
        >
            Conoce más
        </button>
      </div>
    </div>
  )
}