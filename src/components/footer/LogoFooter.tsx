import Logo from "../header/logo";

export default function LogoFooter() {
  return (
    <div className="flex flex-col gap-5 items-center">
        <Logo 
        className="w-[150px] text-primary"
        />
        <div className="w-[31ch] select-none">
          <h5
          className="text-primary text-1xl font-montserrat font-bold text-center"
          >
            Huellitas felices
          </h5>

          <span
          className="text-sm font-montserrat font-normal">
            Rescatamos y encontramos el mejor lugar para nuestros amigos animales.
          </span>
        </div>
      </div>
  )
}